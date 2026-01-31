# Slack Reverse Engineering: Code Walkthrough 🔍

## What We're Doing
Exploring how Slack (an Electron app) is built by extracting and analyzing its bundled JavaScript.

---

## Electron Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Slack.app                            │
├─────────────────────────────────────────────────────────┤
│  Electron (Chromium + Node.js)                          │
│  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │  Main Process   │  │    Renderer Process(es)     │  │
│  │  (Node.js)      │  │    (Chromium/Web)           │  │
│  │                 │  │                             │  │
│  │  - boot.js      │  │  - preload.js               │  │
│  │  - main.js      │  │  - renderer.js              │  │
│  │  - IPC handler  │  │  - React UI                 │  │
│  └─────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## File Structure

```
/Applications/Slack.app/Contents/
├── MacOS/
│   └── Slack              # Electron binary (native)
├── Frameworks/
│   └── Electron Framework # Chromium + V8 + Node
└── Resources/
    ├── app-arm64.asar     # JavaScript app (archived)
    ├── app-x64.asar       # Intel version
    └── *.mp3              # Notification sounds
```

---

## What is ASAR?

**A**tom **S**hell **AR**chive - Electron's packaging format

```bash
# Extract it
npx asar extract app.asar extracted/

# List contents
npx asar list app.asar
```

It's like a ZIP but optimized for Electron - apps can read files directly without extracting.

---

## Key Files Analyzed

### 1. `boot.js` - Application Startup

This is the entry point. Key patterns found:

```javascript
// Environment detection
var d = (e => (
    e[e.NORMAL = 1e3] = "NORMAL", 
    e[e.RESTRICTED = 1001] = "RESTRICTED", 
    e[e.MILITARY = 1002] = "MILITARY", 
    e
))(d || {});
```

**What this tells us:**
- Slack has different security modes
- "MILITARY" mode (1002) = highest security (GovSlack?)
- Enterprise features are baked into the same codebase

### 2. `preload.js` - Security Bridge

The preload script runs before web content loads. It's the security boundary:

```javascript
// Context isolation - web page can't access Node.js directly
contextBridge.exposeInMainWorld('slackAPI', {
    // Only these safe functions are exposed to the renderer
    sendMessage: (channel, text) => { ... },
    getUser: (id) => { ... }
});
```

**Security concept:**
- Web content (React UI) can't directly use Node.js
- Must go through approved APIs in preload
- Prevents XSS from becoming RCE

---

## Interesting Discoveries

### Notification Sounds
```
animal_stick.mp3    # Custom notification
been_tree.mp3       
boop.mp3            # Classic Slack sound
hummus.mp3          # Huddle sounds
knock_brush.mp3
```

### Hidden Features Found
```javascript
// Debug/dev flags in the code
SLACK_DEVELOPER_MENU
SLACK_DISABLE_CACHE
SLACK_FORCE_GPU
SLACK_LOG_LEVEL
```

### API Endpoints
```javascript
// Found in network handling code
'https://slack.com/api/conversations.list'
'https://slack.com/api/chat.postMessage'
'https://slack.com/api/users.info'
```

---

## Reverse Engineering Techniques Used

### 1. ASAR Extraction
```bash
npx asar extract app.asar extracted/
```

### 2. JavaScript Beautification
```bash
npm install -g js-beautify
js-beautify minified.js > readable.js
```

### 3. String Search
```bash
# Find interesting strings
grep -r "api.slack.com" extracted/
grep -r "password\|token\|secret" extracted/
```

### 4. Electron DevTools
```bash
# Launch Slack with DevTools enabled
/Applications/Slack.app/Contents/MacOS/Slack --remote-debugging-port=9222
```

---

## Security Observations

### Good Practices Found:
- ✅ Context isolation enabled
- ✅ Preload scripts for API boundaries
- ✅ No `nodeIntegration` in renderers
- ✅ CSP headers for web content

### Attack Surface:
- Deep links (`slack://`) could be vectors
- Protocol handlers need careful validation
- Extensions/bots have API access

---

## Try It Yourself

```bash
# 1. Extract Slack's code
cd /tmp
mkdir slack-explore && cd slack-explore
cp /Applications/Slack.app/Contents/Resources/app-arm64.asar .
npx asar extract app-arm64.asar extracted/

# 2. Beautify a file
npx js-beautify extracted/dist/preload.bundle.js > preload-readable.js

# 3. Search for interesting patterns
grep -n "token\|secret\|password" preload-readable.js
grep -n "api.slack.com" preload-readable.js

# 4. Find environment variables
grep -n "process.env" preload-readable.js
```

---

## What We Learned

1. **Electron apps are just web apps** - HTML/CSS/JS under the hood
2. **ASAR is not encryption** - It's just packaging, easily extracted
3. **Security comes from architecture** - Context isolation, preload scripts
4. **Minification ≠ security** - Beautifiers undo it trivially
5. **Enterprise features in consumer apps** - Same codebase, feature flags

---

## Presentation Talking Points

1. "What happens when you click the Slack icon?"
2. "How does Slack keep your messages secure?"
3. "Why can't a malicious website steal your Slack token?"
4. "What's the difference between Main and Renderer processes?"
5. "How would you find hidden features in any Electron app?"

---

## Tools Used

| Tool | Purpose |
|------|---------|
| `asar` | Extract Electron archives |
| `js-beautify` | Make minified JS readable |
| `grep` | Search for patterns |
| Chrome DevTools | Runtime debugging |

---

## Further Exploration

- [Electron Security Docs](https://www.electronjs.org/docs/latest/tutorial/security)
- [ASAR Format](https://github.com/electron/asar)
- [Slack API Docs](https://api.slack.com/)

---

*This is educational reverse engineering for understanding software architecture.
Always respect software licenses and terms of service.*
