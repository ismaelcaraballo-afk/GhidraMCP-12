# GhidraMCP-12: Code Walkthrough 🎓

## What This Project Does
Connects Claude (AI) to Ghidra (reverse engineering tool) so you can ask questions about binaries in plain English.

---

## Architecture Overview

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Claude    │────▶│  bridge_mcp_     │────▶│   Ghidra    │
│   (AI)      │◀────│  ghidra.py       │◀────│   Plugin    │
└─────────────┘     └──────────────────┘     └─────────────┘
      MCP             Python Bridge           Java Extension
```

---

## File-by-File Breakdown

### 1. `src/main/java/com/lauriewired/GhidraMCPPlugin.java`
**The Heart of the Extension**

```java
// This is a Ghidra Plugin - runs inside Ghidra's GUI
@PluginInfo(
    status = PluginStatus.STABLE,
    packageName = "GhidraMCP",
    category = PluginCategoryNames.MISC,
    shortDescription = "MCP Server for Ghidra",
    description = "Exposes Ghidra functionality via MCP protocol"
)
public class GhidraMCPPlugin extends ProgramPlugin {
```

**Key Concepts:**
- `@PluginInfo` - Annotation that tells Ghidra this is a plugin
- `ProgramPlugin` - Base class for plugins that work with loaded programs
- Plugin gets access to `currentProgram` - the binary you have open

**What It Exposes:**
- `listFunctions()` - Get all functions in the binary
- `decompileFunction(name)` - Get C code for a function
- `getReferences(address)` - Find cross-references
- `renameFunction(old, new)` - Rename functions

---

### 2. `bridge_mcp_ghidra.py`
**The Python Bridge**

```python
# MCP = Model Context Protocol
# It's how Claude talks to external tools

class GhidraBridge:
    def __init__(self, ghidra_host="localhost", ghidra_port=18080):
        self.base_url = f"http://{ghidra_host}:{ghidra_port}"
    
    def list_functions(self):
        """Get all functions from Ghidra"""
        response = requests.get(f"{self.base_url}/functions")
        return response.json()
```

**Key Concepts:**
- Bridge pattern: Python talks HTTP to Java plugin
- MCP protocol: Standardized way for AI to use tools
- JSON responses: Easy to parse and understand

---

### 3. `pom.xml`
**Maven Build Configuration**

```xml
<properties>
    <!-- We updated these for Ghidra 12 -->
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <ghidra.version>12.0.1</ghidra.version>
</properties>
```

**Key Concepts:**
- Maven builds Java projects
- JDK 21 required for Ghidra 12 (was JDK 17)
- Dependencies in `lib/` folder (Ghidra JARs)

---

## How It All Works

1. **User opens binary in Ghidra**
2. **Plugin starts HTTP server** on port 18080
3. **Claude uses MCP** to call the Python bridge
4. **Bridge sends HTTP requests** to Ghidra plugin
5. **Plugin queries Ghidra's API** for data
6. **Response flows back** to Claude
7. **Claude explains** in plain English

---

## Key Ghidra Concepts

### Program
The loaded binary file (EXE, ELF, etc.)

### Function
A subroutine in the code with entry/exit points

### Decompiler
Converts assembly → C-like code

### Cross-References (XREFs)
Where is this function called from?

---

## Try It Yourself

```bash
# Build the plugin
cd ~/Documents/GitHub/GhidraMCP-12
mvn clean package

# Output: target/GhidraMCP-2.0-ghidra12.zip

# Install in Ghidra:
# File → Install Extensions → Select the .zip
```

---

## Exercises

1. **Read the Plugin Source**
   Open `GhidraMCPPlugin.java` and find the `listFunctions()` method

2. **Trace a Request**
   Follow how `decompileFunction` goes from Python → Java → Ghidra

3. **Add a Feature**
   Try adding a `getStrings()` endpoint that returns all strings in the binary

---

## Resources

- [Ghidra API Docs](https://ghidra.re/ghidra_docs/api/)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [Maven Tutorial](https://maven.apache.org/guides/getting-started/)
