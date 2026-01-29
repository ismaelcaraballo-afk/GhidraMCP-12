# GhidraMCP-12 Quick Reference Card

## Installation Checklist

- [ ] Ghidra 12.0.1 installed
- [ ] JDK 21 installed and JAVA_HOME set
- [ ] Python 3.8+ with pip
- [ ] MCP SDK installed (pip install mcp)

## Quick Install

1. Download: GhidraMCP-2.0-ghidra12.zip
2. Ghidra: File > Install Extensions > + > Select ZIP
3. Restart Ghidra
4. Enable: File > Configure > Developer > GhidraMCPPlugin

## Start MCP Bridge

For Claude Desktop (stdio):
    python bridge_mcp_ghidra.py

For Cline/VS Code (SSE):
    python bridge_mcp_ghidra.py --transport sse --mcp-host 127.0.0.1 --mcp-port 8081

## Claude Desktop Config

Location: ~/Library/Application Support/Claude/claude_desktop_config.json

{
  "mcpServers": {
    "ghidra": {
      "command": "python",
      "args": ["/path/to/bridge_mcp_ghidra.py", "--ghidra-server", "http://127.0.0.1:8080/"]
    }
  }
}

## Common Commands to Ask Claude

- "List all functions in this binary"
- "Decompile the main function"
- "What does function at 0x401000 do?"
- "Rename functions based on their behavior"
- "Find all string references"
- "List imported libraries"

## Troubleshooting

404 Error / No context:
  - Ensure Ghidra has a program open
  - Check plugin is enabled in File > Configure > Developer

Plugin not appearing:
  - Verify Ghidra version is 12.0.1
  - Restart Ghidra after installation

Build errors:
  - Ensure JAVA_HOME points to JDK 21
  - Use this forks pom.xml (not original)

## API Endpoints (Port 8080)

GET  /methods          - List all functions
GET  /decompile/{addr} - Decompile function
POST /rename/method    - Rename function
POST /rename/variable  - Rename variable
GET  /classes          - List classes
GET  /imports          - List imports
GET  /exports          - List exports
GET  /symbols          - List symbols

## Build from Source

git clone https://github.com/ismaelcaraballo-afk/GhidraMCP-12.git
cd GhidraMCP-12
# Copy JARs from Ghidra 12 installation to lib/
mvn clean package
# Output: target/GhidraMCP-2.0-ghidra12.zip

## Links

Repository: https://github.com/ismaelcaraballo-afk/GhidraMCP-12
Original:   https://github.com/LaurieWired/GhidraMCP
Ghidra:     https://ghidra-sre.org
MCP:        https://modelcontextprotocol.io
