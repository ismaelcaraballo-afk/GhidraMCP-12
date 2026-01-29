# GhidraMCP-12 Presentation

## Slide 1: Title

# GhidraMCP for Ghidra 12.0.1
### Connecting AI to Reverse Engineering

**Updated fork with full Ghidra 12 and JDK 21 support**

---

## Slide 2: The Problem

### Original GhidraMCP Issues

- **Issue #99**: Source option 5 is no longer supported
  - Original pom.xml targeted JDK 5
  - Modern JDK versions (17+) do not support JDK 5
  
- **Issue #96**: Extension installation errors with Ghidra 12

- **Issue #54**: JAR dependency mismatches

**Result**: Users could not build or use GhidraMCP with current Ghidra

---

## Slide 3: The Solution

### GhidraMCP-12

| Component | Before | After |
|-----------|--------|-------|
| Ghidra | 11.3.2 | **12.0.1** |
| JDK | 5 | **21** |
| Maven Compiler | Default | **3.11.0** |
| JUnit | 3.8.1 | **5.10.0** |

**Key Changes**:
- Updated pom.xml with modern Java configuration
- Rebuilt with Ghidra 12.0.1 JARs
- Full compatibility verification

---

## Slide 4: What is MCP?

### Model Context Protocol

MCP allows AI models to:
- Query Ghidra for function lists
- Request decompilation
- Rename functions and variables
- Analyze binary structure

Architecture: Claude (LLM) <-> Bridge Server <-> Ghidra Plugin

---

## Slide 5: Architecture

### Components

1. **GhidraMCPPlugin.java**
   - Runs inside Ghidra
   - Exposes REST API on port 8080
   - Handles decompilation requests

2. **bridge_mcp_ghidra.py**
   - MCP server component
   - Translates MCP protocol to REST calls
   - Supports stdio and SSE transports

3. **Claude/Cline Integration**
   - Configure MCP server in settings
   - AI can now see into your binary

---

## Slide 6: Available Tools

### MCP Tools Exposed

| Tool | Description |
|------|-------------|
| list_methods | Get all functions in binary |
| decompile_function | Get C pseudocode for address |
| rename_function | AI can name functions |
| rename_variable | AI can name variables |
| list_classes | Object-oriented analysis |
| list_imports | External dependencies |
| list_exports | Exposed functions |
| get_symbols | Symbol table access |

---

## Slide 7: Use Cases

### Practical Applications

1. **Automated Analysis**
   - What does this malware do?
   - AI reads decompiled code and explains

2. **Reverse Engineering Assist**
   - Rename functions based on behavior
   - AI analyzes and suggests meaningful names

3. **Vulnerability Research**
   - Find potential buffer overflows
   - AI scans decompiled functions

4. **Documentation Generation**
   - Document this binary functionality
   - AI generates reports from analysis

---

## Slide 8: Installation

### Quick Setup

1. Download GhidraMCP-2.0-ghidra12.zip
2. Install in Ghidra: File -> Install Extensions -> +
3. Enable plugin: File -> Configure -> Developer
4. Configure Claude Desktop with MCP server

---

## Slide 9: Demo Flow

### Live Demonstration

1. Load Binary in Ghidra
2. Start MCP Bridge: python bridge_mcp_ghidra.py
3. Ask Claude questions about the binary
4. Watch AI query Ghidra in real-time

---

## Slide 10: Building from Source

### Development Setup

1. Clone the repository
2. Copy Ghidra 12 JARs to lib/
3. Run: mvn clean package
4. Output: target/GhidraMCP-2.0-ghidra12.zip

---

## Slide 11: Technical Details

### pom.xml Changes

Key updates:
- maven.compiler.source: 5 -> 21
- maven.compiler.target: 5 -> 21
- maven-compiler-plugin: 3.11.0
- release configuration: 21

---

## Slide 12: Comparison

### GhidraMCP vs Manual Analysis

| Task | Manual | With GhidraMCP |
|------|--------|----------------|
| Function naming | Hours | Minutes |
| Behavior analysis | Expert needed | AI assisted |
| Documentation | Manual writing | Auto-generated |
| Pattern recognition | Experience-based | AI-powered |

GhidraMCP does not replace analysts - it amplifies them

---

## Slide 13: Security Considerations

### Important Notes

- MCP server runs locally (127.0.0.1)
- No data sent to external servers
- AI analysis happens in your configured LLM
- Binary data stays on your machine

Best Practices:
- Use for authorized analysis only
- Understand your LLM data policies
- Keep binaries on local systems for sensitive work

---

## Slide 14: Future Possibilities

### Roadmap Ideas

- Batch analysis of multiple functions
- Integration with YARA rules
- Automated vulnerability scanning
- Custom analysis prompts
- Multi-binary comparison
- Integration with other RE tools

---

## Slide 15: Resources

### Links

- This Fork: https://github.com/ismaelcaraballo-afk/GhidraMCP-12
- Original: https://github.com/LaurieWired/GhidraMCP
- Ghidra: https://ghidra-sre.org
- MCP Spec: https://modelcontextprotocol.io

Requirements: Ghidra 12.0.1, JDK 21, Python 3.8+, Maven 3.8+

---

## Slide 16: Q and A

# Questions?

Contact: Check the GitHub repo for issues and discussions

Contributions Welcome: PRs accepted for improvements

---

# Thank You!

### GhidraMCP-12
Bringing AI to Binary Analysis
