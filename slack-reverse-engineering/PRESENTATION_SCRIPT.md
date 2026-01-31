# Slack Reverse Engineering - Presentation Script

**Duration: 5 minutes | 16 slides**

---

## Slide 1: Title (10 seconds)

Good [morning/afternoon]. Today I'm presenting a reverse engineering breakdown of Slack—exploring how Electron apps work under the hood. This project demonstrates techniques for analyzing production desktop applications.

---

## Slide 2: What I Built (25 seconds)

I built an educational toolkit for reverse engineering Electron applications, using Slack as the case study. The project includes extracted and beautified source code—over 2MB of readable JavaScript. An architectural breakdown of Electron's security model. Documentation of interesting discoveries like hidden debug flags, security modes, and API endpoints. Plus a reproducible methodology anyone can apply to other Electron apps.

---

## Slide 3: Why I Chose This Idea (30 seconds)

Four reasons. First, Electron apps are everywhere—Slack, Discord, VS Code, Spotify, Figma, Notion. Understanding one means understanding dozens. Second, it bridges web and desktop development—Electron wraps Chromium and Node.js, so web skills transfer directly. Third, security research skills here transfer to bug bounty and penetration testing. Fourth, it's practical—no special hardware, no paid tools, just npm packages and curiosity.

---

## Slide 4: What is Electron? (25 seconds)

Electron combines Chromium—the browser engine—with Node.js—server-side JavaScript. Developers write web apps that run as native desktop applications. One codebase deploys to Windows, Mac, and Linux. The tradeoff: larger app size and higher memory usage. Slack's app bundle is over 500MB—mostly the Chromium engine duplicated.

---

## Slide 5: Electron Architecture (30 seconds)

Two process types work together. The Main Process runs Node.js with full system access—file I/O, native APIs, spawning processes. It's the "backend." Renderer Processes run Chromium—sandboxed web content, your React or Vue UI. It's the "frontend." The Preload Script bridges them securely using context isolation. This separation is critical—it prevents a cross-site scripting bug from becoming remote code execution.

---

## Slide 6: What is ASAR? (20 seconds)

ASAR stands for Atom Shell Archive—Electron's packaging format. It bundles thousands of JavaScript files into one archive. Apps can read files directly from it without extracting. But here's the key insight: ASAR provides no encryption, no obfuscation. It's packaging for convenience, not protection. One command extracts everything.

---

## Slide 7: Demo - ASAR Extraction (30 seconds)

Live demo. Slack bundles its JavaScript in app-arm64.asar. Watch me extract it:

```bash
cp /Applications/Slack.app/Contents/Resources/app-arm64.asar .
npx asar extract app-arm64.asar extracted/
ls extracted/dist/
```

Inside we find: bundled JavaScript modules, notification sound files—boop.mp3, hummus.mp3—font files, HTML templates. The entire application logic, now accessible.

---

## Slide 8: Demo - Code Beautification (25 seconds)

The extracted code is minified—variable names reduced to single letters, whitespace stripped, unreadable. One command fixes that:

```bash
npm install -g js-beautify
js-beautify extracted/dist/boot.bundle.cjs > boot.js
```

148KB of readable code. Variable names stay mangled, but logic, strings, and structure become clear. Minification optimizes for size, not security.

---

## Slide 9: Discovery - Security Modes (30 seconds)

In the boot code, line 47, I found this enum:

```javascript
e[e.NORMAL = 1000] = "NORMAL"
e[e.RESTRICTED = 1001] = "RESTRICTED"  
e[e.MILITARY = 1002] = "MILITARY"
```

Slack has three security tiers baked into the same binary. "MILITARY" mode—code 1002—is likely GovSlack, the FedRAMP-certified version for government clients. Enterprise features hidden in consumer code, activated by configuration flags. One codebase, multiple products.

---

## Slide 10: Discovery - Debug Flags (25 seconds)

Hidden environment variables found throughout the code:

```
SLACK_DEVELOPER_MENU    - Enables dev tools menu
SLACK_DISABLE_CACHE     - Bypasses caching layer
SLACK_FORCE_GPU         - Forces GPU acceleration
SLACK_LOG_LEVEL         - Verbose logging output
```

Setting these unlocks developer features in production builds. Useful for debugging—and useful for researchers. Try `SLACK_LOG_LEVEL=debug` next time Slack misbehaves.

---

## Slide 11: Discovery - API Endpoints (20 seconds)

String searching revealed Slack's internal API structure:

```javascript
'https://slack.com/api/conversations.list'
'https://slack.com/api/chat.postMessage'
'https://slack.com/api/users.info'
'https://slack.com/api/rtm.connect'
```

These match their public API—good sign. No hidden endpoints found. The RTM—Real Time Messaging—endpoint handles WebSocket connections for live updates.

---

## Slide 12: Challenges Faced (30 seconds)

Three main challenges. First, webpack bundling—thousands of source modules combined into single files. Tracing a function through dependencies becomes detective work. Second, minification removed meaningful names—`getUserProfile` becomes `a`. Required pattern matching, string searching, and educated guessing. Third, no source maps—production builds strip all debugging information. Solution approach: grep for strings, trace API calls backward, build understanding incrementally. Patience required.

---

## Slide 13: Security Observations (30 seconds)

What Slack does right: context isolation enabled—renderers can't access Node directly. Preload scripts create controlled API boundaries. No nodeIntegration flag in renderer config. Content Security Policy headers enforced. Potential attack surface to consider: deep links using slack:// protocol could be vectors if not validated carefully. OAuth flows handle sensitive tokens. Bot and extension APIs have broad permissions. Overall: solid security architecture demonstrating defense in depth.

---

## Slide 14: Tools Used (20 seconds)

Four essential tools, all free. `asar` from npm—extracts Electron archives. `js-beautify` from npm—formats minified code. `grep` or ripgrep—pattern searching across files. Chrome DevTools launched with `--remote-debugging-port=9222`—runtime inspection. Total cost: zero dollars. Works on any platform.

---

## Slide 15: What I Learned (25 seconds)

Five takeaways. Electron apps are web apps you can fully inspect. ASAR and minification are not security measures. Security comes from architecture—process isolation, context bridges. Enterprise and consumer features often share codebases. Reverse engineering is systematic—extract, beautify, search, trace. These skills apply to any Electron application.

---

## Slide 16: Thank You (15 seconds)

To summarize: we extracted Slack's source code, beautified it for analysis, discovered security modes and debug flags, and learned how Electron's architecture provides real security. The code and documentation are on GitHub. Thank you—I'll take questions.

---

## Speaker Notes

- **Total time**: ~5 minutes at 140-150 words per minute
- **Demo slides**: 7-8 can be live demos, adding engagement
- **Emphasis points**: "ASAR provides no encryption", MILITARY mode discovery, "minification is not security"
- **Pause points**: After security modes reveal, after challenges summary
- **Q&A prep**: Ethics of reverse engineering, DMCA research exceptions, "did you find anything dangerous?"

---

## Slide Summary

| Slide | Topic | Duration | Key Points |
|-------|-------|----------|------------|
| 1 | Title | 10 sec | Introduction, Electron analysis |
| 2 | What I Built | 25 sec | Toolkit, 2MB code, methodology |
| 3 | Why This Idea | 30 sec | Ubiquity, skills transfer, practical |
| 4 | What is Electron? | 25 sec | Chromium + Node.js, tradeoffs |
| 5 | Architecture | 30 sec | Main/Renderer/Preload, XSS→RCE prevention |
| 6 | What is ASAR? | 20 sec | Packaging format, not encryption |
| 7 | Demo: Extraction | 30 sec | asar extract command, contents |
| 8 | Demo: Beautify | 25 sec | js-beautify, readable output |
| 9 | Security Modes | 30 sec | NORMAL/RESTRICTED/MILITARY enum |
| 10 | Debug Flags | 25 sec | Hidden environment variables |
| 11 | API Endpoints | 20 sec | Internal API structure |
| 12 | Challenges | 30 sec | Webpack, minification, no source maps |
| 13 | Security | 30 sec | Good practices, attack surface |
| 14 | Tools | 20 sec | asar, js-beautify, grep, DevTools |
| 15 | What I Learned | 25 sec | Five takeaways |
| 16 | Thank You | 15 sec | Summary, questions |
| | **Total** | **~5 min** | |

---

## GitHub Repository

**https://github.com/ismaelcaraballo-afk/slack-reverse-engineering**

Contents:
- `LEARN_THE_CODE.md` - Full educational walkthrough
- `PRESENTATION_SCRIPT.md` - This script
- `boot.js` - Beautified startup code (148KB)
- `preload.js` - Beautified security bridge (1.9MB)
