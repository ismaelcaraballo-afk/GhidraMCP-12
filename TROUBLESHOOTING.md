# GhidraMCP-12 Troubleshooting Guide

## "Could not attach" / Plugin Not Working

### Step-by-Step Setup (MUST follow in order)

1. **Install the Extension**
   - Download `GhidraMCP-2.0-ghidra12.zip` from Releases
   - In Ghidra: File → Install Extensions → + (green plus)
   - Select the ZIP file
   - **Restart Ghidra**

2. **Open a Binary (REQUIRED)**
   - Open or create a project
   - **Double-click a binary file** to open it in CodeBrowser
   - The plugin ONLY works in CodeBrowser, not the project window

3. **Enable the Plugin**
   - In CodeBrowser: File → Configure
   - Click **"Configure All"** checkbox at top
   - Find **GhidraMCPPlugin** in the list
   - Check the box to enable it
   - Click OK

4. **Verify It's Running**
   ```bash
   curl http://127.0.0.1:8080/methods?limit=3
   ```
   Should return function names like:
   ```
   entry
   FUN_00100300
   FUN_001003b0
   ```

---

## Common Issues

### "Extension mismatch" (Red warning)
- **Ignore this warning** - it's just a version check
- The plugin still works - proceed with installation

### Plugin Not Appearing in Configure Menu
- Make sure you have a **binary open in CodeBrowser**
- The plugin won't appear in the main project window
- Click "Configure All" to see all available plugins

### "Could not attach" / No Response
Check these:

1. **Is a binary open?**
   - Plugin requires an open binary in CodeBrowser

2. **Is the plugin enabled?**
   - File → Configure → Look for checkmark on GhidraMCPPlugin

3. **Is port 8080 available?**
   ```bash
   lsof -i :8080
   ```
   If something else is using it, close that application

4. **Check Ghidra console for errors**
   - Window → Console (or look at bottom panel)

### No Logs Appearing
- Logs go to: `~/Library/ghidra/ghidra_12.0.1_PUBLIC/application.log`
- On Windows: `%USERPROFILE%\.ghidra\ghidra_12.0.1_PUBLIC\application.log`
- On Linux: `~/.ghidra/ghidra_12.0.1_PUBLIC/application.log`

---

## Requirements

| Component | Required Version |
|-----------|------------------|
| Ghidra | 12.0.1 |
| JDK | 21 |
| Python | 3.10+ (for MCP bridge only) |

---

## Quick Diagnostic Commands

### Test if server is running:
```bash
curl http://127.0.0.1:8080/methods?limit=3
```

### Test decompilation:
```bash
curl -X POST http://127.0.0.1:8080/decompile -d "entry"
```

### Check port:
```bash
# macOS/Linux
lsof -i :8080

# Windows
netstat -an | findstr 8080
```

---

## Still Not Working?

1. **Completely restart Ghidra** (close all windows)
2. **Re-install the extension** (remove old one first)
3. **Check Ghidra version**: Help → About Ghidra (must be 12.0.1)
4. **Open an issue** on GitHub with:
   - Your Ghidra version
   - Your OS
   - Contents of application.log
   - What you see in Ghidra console

---

## Contact

Repository: https://github.com/ismaelcaraballo-afk/GhidraMCP-12
