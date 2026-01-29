# GhidraMCP for Ghidra 12.0.1

[![Ghidra Version](https://img.shields.io/badge/Ghidra-12.0.1-blue.svg)](https://ghidra-sre.org)
[![JDK Version](https://img.shields.io/badge/JDK-21-orange.svg)](https://openjdk.org)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://www.apache.org/licenses/LICENSE-2.0)

An updated fork of [LaurieWired's GhidraMCP](https://github.com/LaurieWired/GhidraMCP) with full support for **Ghidra 12.0.1** and **JDK 21**.

## What's Changed from Original

| Feature | Original | This Fork |
|---------|----------|-----------|
| Ghidra Version | 11.3.2 | **12.0.1** |
| JDK Version | 5 (deprecated) | **21** |
| Maven Compiler | Default | 3.11.0 with release 21 |
| JUnit | 3.8.1 | 5.10.0 |

### Fixes for Known Issues

This fork addresses the following issues from the original repository:

- ✅ **[Issue #99](https://github.com/LaurieWired/GhidraMCP/issues/99)**: "Source option 5 is no longer supported" - Fixed with JDK 21 configuration
- ✅ **[Issue #96](https://github.com/LaurieWired/GhidraMCP/issues/96)**: Extension installation errors - Rebuilt for Ghidra 12
- ✅ **[Issue #54](https://github.com/LaurieWired/GhidraMCP/issues/54)**: Installation issues - Updated JAR dependencies

## Features

- **MCP Server** - Exposes Ghidra functionality via Model Context Protocol
- **LLM Integration** - Connect Claude, GPT, or other LLMs to Ghidra
- **Decompilation** - Automated binary analysis and decompilation
- **Symbol Management** - Rename methods, variables, and data
- **Analysis Tools** - List methods, classes, imports, exports

## Quick Start

### Prerequisites

- [Ghidra 12.0.1](https://github.com/NationalSecurityAgency/ghidra/releases)
- [JDK 21](https://openjdk.org/projects/jdk/21/)
- Python 3.8+
- [MCP SDK](https://github.com/modelcontextprotocol/python-sdk)

### Installation

1. **Download** the latest release: `GhidraMCP-2.0-ghidra12.zip`

2. **Install in Ghidra**:
   ```
   File → Install Extensions → + → Select GhidraMCP-2.0-ghidra12.zip
   ```

3. **Restart Ghidra**

4. **Enable the Plugin**:
   ```
   File → Configure → Developer → Enable GhidraMCPPlugin
   ```

5. **Install Python Dependencies**:
   ```bash
   pip install mcp modelcontextprotocol
   ```

### Configure Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "ghidra": {
      "command": "python",
      "args": [
        "/path/to/bridge_mcp_ghidra.py",
        "--ghidra-server",
        "http://127.0.0.1:8080/"
      ]
    }
  }
}
```

### Configure Cline (VS Code)

1. Start the MCP server:
   ```bash
   python bridge_mcp_ghidra.py --transport sse --mcp-host 127.0.0.1 --mcp-port 8081
   ```

2. In Cline, add Remote Server:
   - Name: `GhidraMCP`
   - URL: `http://127.0.0.1:8081/sse`

## Building from Source

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/GhidraMCP-12.git
cd GhidraMCP-12

# Copy JARs from your Ghidra 12 installation
cp /Applications/Ghidra/Ghidra/Framework/Generic/lib/Generic.jar lib/
cp /Applications/Ghidra/Ghidra/Framework/SoftwareModeling/lib/SoftwareModeling.jar lib/
cp /Applications/Ghidra/Ghidra/Framework/Project/lib/Project.jar lib/
cp /Applications/Ghidra/Ghidra/Framework/Docking/lib/Docking.jar lib/
cp /Applications/Ghidra/Ghidra/Features/Decompiler/lib/Decompiler.jar lib/
cp /Applications/Ghidra/Ghidra/Framework/Utility/lib/Utility.jar lib/
cp /Applications/Ghidra/Ghidra/Features/Base/lib/Base.jar lib/
cp /Applications/Ghidra/Ghidra/Framework/Gui/lib/Gui.jar lib/

# Build
mvn clean package

# Output: target/GhidraMCP-2.0-ghidra12.zip
```

## Troubleshooting

### "No context found for request" (404 Error)

1. Make sure Ghidra is running with a program loaded
2. Verify the plugin is enabled in File → Configure → Developer
3. Check the port matches between Ghidra and the bridge script

### Plugin Not Appearing

1. Verify you're using Ghidra 12.0.1
2. Check File → Install Extensions shows GhidraMCP as installed
3. Restart Ghidra completely after installation

### Build Errors

If you see "Source option X is no longer supported":
- Ensure you're using this fork's `pom.xml` with JDK 21 configuration
- Verify `JAVA_HOME` points to JDK 21

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/methods` | List all methods/functions |
| `/decompile/{address}` | Decompile function at address |
| `/rename/method` | Rename a method |
| `/rename/variable` | Rename a variable |
| `/classes` | List all classes |
| `/imports` | List all imports |
| `/exports` | List all exports |
| `/symbols` | List all symbols |

## Credits

- Original project: [LaurieWired/GhidraMCP](https://github.com/LaurieWired/GhidraMCP)
- Ghidra: [NSA/ghidra](https://github.com/NationalSecurityAgency/ghidra)
- MCP: [modelcontextprotocol](https://github.com/modelcontextprotocol)

## License

Apache License 2.0 - See [LICENSE](LICENSE) for details.
