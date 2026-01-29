# GhidraMCP-12 Testing Log & Issues Documentation

## Test Results Summary

| Run | Static Tests | Bridge Tests | Total | Status |
|-----|--------------|--------------|-------|--------|
| 1   | 20/20        | 22/22        | 42/42 | PASS   |
| 2   | 20/20        | 22/22        | 42/42 | PASS   |
| 3   | 20/20        | 22/22        | 42/42 | PASS   |

**100% Pass Rate Achieved**

---

## Test Categories

### Static Tests (test_ghidramcp12.py) - 20 Tests

| Category | Tests | Description |
|----------|-------|-------------|
| TestBuildArtifacts | 3 | ZIP exists, not empty, correct structure |
| TestPomConfiguration | 3 | pom.xml exists, JDK 21 configured, no JDK 5 |
| TestBridgeScript | 4 | Script exists, valid syntax, MCP tools defined |
| TestJavaSource | 3 | Plugin source exists, annotations, endpoints |
| TestLibraryDependencies | 2 | lib/ exists, required JARs present |
| TestDocumentation | 2 | README exists and has content |
| TestExtensionMetadata | 2 | extension.properties and Module.manifest |
| TestMavenBuild | 2 | Maven available, clean build succeeds |

### Bridge Integration Tests (test_bridge_integration.py) - 22 Tests

| Category | Tests | Description |
|----------|-------|-------------|
| TestGhidraConnection | 9 | All HTTP endpoints respond |
| TestDecompilation | 2 | Decompile entry and verify code |
| TestSearch | 2 | Function search works |
| TestRename | 1 | Rename roundtrip (rename and revert) |
| TestMCPBridge | 8 | All bridge functions via HTTP |

---

## Issues Encountered & Resolutions

### Issue 1: JDK Version Mismatch (Original Issue #99)

**Problem:** Original GhidraMCP used JDK 5 which is no longer supported by modern Java versions.

**Error:**
```
Source option 5 is no longer supported. Use 7 or later.
```

**Resolution:** Updated `pom.xml`:
```xml
<maven.compiler.source>21</maven.compiler.source>
<maven.compiler.target>21</maven.compiler.target>
```

---

### Issue 2: Extension Version Mismatch

**Problem:** Ghidra showed "extension mismatch" error when installing.

**Error:** Red warning in Ghidra extension installer.

**Resolution:** Removed `ghidraVersion` line from `extension.properties`:
```properties
name=GhidraMCP
description=A plugin that runs an embedded HTTP server to expose program data.
author=LaurieWired
createdOn=2025-03-22
version=2.0
# Removed: ghidraVersion=11.3.2
```

---

### Issue 3: Plugin Not Appearing in Configure Menu

**Problem:** After installing extension, GhidraMCPPlugin didn't appear in File > Configure > Developer.

**Root Cause:** The `MANIFEST.MF` had wrong `Plugin-Class` value.

**Original (Wrong):**
```
Plugin-Class: com.lauriewired.GhidraMCP
```

**Fixed:**
```
Plugin-Class: com.lauriewired.GhidraMCPPlugin
```

---

### Issue 4: Ghidra Crash on Startup

**Problem:** Ghidra crashed immediately on startup after installing extension.

**Root Cause:** Old extension cached in user directory conflicting with new version.

**Resolution:** Cleaned up user extensions directory:
```bash
rm -rf ~/Library/ghidra/ghidra_12.0.1_PUBLIC/Extensions/GhidraMCP
```

---

### Issue 5: Module.manifest Format

**Problem:** Extension not being discovered by Ghidra.

**Root Cause:** Module.manifest had content when working extensions have empty manifest.

**Resolution:** Emptied Module.manifest (matches ghidra-emotionengine-reloaded extension format).

---

### Issue 6: Python MCP Package Requires 3.10+

**Problem:** MCP package couldn't be installed.

**Error:**
```
ERROR: No matching distribution found for mcp>=1.2.0
```

**Root Cause:** System Python was 3.9.6, MCP requires Python 3.10+.

**Resolution:** Used Homebrew Python 3.12:
```bash
/opt/homebrew/bin/python3.12 -m pip install --break-system-packages mcp requests
```

---

## Verified Working Configuration

| Component | Version |
|-----------|---------|
| Ghidra | 12.0.1 |
| JDK | 21 |
| Python | 3.12 (for MCP bridge) |
| Maven | 3.x |
| macOS | Darwin 25.2.0 |

---

## Test Binary Used

- **File:** Samurai Shodown Anthology (USA).elf
- **Project:** SamuraiShowdown.gpr
- **Functions:** 2,093+ identified
- **Location:** /Users/icaraballo/Documents/GhidraProjects/

---

## How to Run Tests

### Static Tests (no Ghidra required)
```bash
cd GhidraMCP-12
python3 tests/test_ghidramcp12.py
```

### Bridge Integration Tests (requires Ghidra running)
1. Open Ghidra and load a binary
2. Enable GhidraMCPPlugin (File > Configure > Developer)
3. Run tests:
```bash
/opt/homebrew/bin/python3.12 tests/test_bridge_integration.py
```

---

## Date

**Test Date:** January 29, 2026
**Tester:** Claude Code + Ismael Caraballo
