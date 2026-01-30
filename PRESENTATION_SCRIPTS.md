# GhidraMCP Presentation Scripts

## 2-MINUTE SCRIPT (Elevator Pitch)

---

**[SLIDE 1 - Title]**

"GhidraMCP is a bridge that connects AI assistants like Claude directly to Ghidra, the NSA's reverse engineering tool. This means AI can now analyze binaries, decompile code, and help with security research in real-time."

**[SLIDE 2 - The Problem]**

"Traditionally, reverse engineering is manual and time-consuming. You copy code from Ghidra, paste it to an AI, get suggestions, then manually apply changes back. It's slow and error-prone."

**[SLIDE 3 - The Solution]**

"GhidraMCP eliminates this. The AI sees your Ghidra project directly - it can read functions, decompile code, rename variables, and add comments. All through natural conversation."

**[SLIDE 4 - Demo Stats]**

"In our testing with a PS2 game, we decompiled 2,093 functions - that's 73,000 lines of C code - in just 37 seconds. The AI can then help analyze any of those functions instantly."

**[SLIDE 5 - Closing]**

"GhidraMCP is open source, works with Ghidra 12, and supports Claude, GPT, and other MCP-compatible AI. It's free, it's fast, and it changes how we do reverse engineering. Questions?"

---
*Total time: ~2 minutes*

---

## 5-MINUTE SCRIPT (Full Presentation)

---

**[SLIDE 1 - Title] (15 sec)**

"Good morning/afternoon. I'm here to show you GhidraMCP - a tool that fundamentally changes how we approach reverse engineering by connecting AI directly to Ghidra."

**[SLIDE 2 - What is Ghidra?] (30 sec)**

"For those unfamiliar, Ghidra is the NSA's open-source reverse engineering framework. Security researchers use it to analyze malware, find vulnerabilities, and understand how software works at the binary level. It's powerful, but it has a steep learning curve and analysis is largely manual."

**[SLIDE 3 - What is MCP?] (30 sec)**

"MCP - Model Context Protocol - is Anthropic's standard for connecting AI assistants to external tools. Think of it as a USB port for AI. Instead of copy-pasting data to ChatGPT or Claude, MCP lets the AI directly interact with your tools. GhidraMCP implements this protocol for Ghidra."

**[SLIDE 4 - The Problem] (45 sec)**

"Here's the traditional workflow: You're analyzing a binary in Ghidra. You find a suspicious function. You copy the decompiled code, paste it into Claude, ask 'what does this do?', get an answer, then manually rename variables and add comments back in Ghidra. 

For one function, that's fine. But real binaries have thousands of functions. A PS2 game we tested had over 2,000. Manual analysis doesn't scale."

**[SLIDE 5 - The Solution] (45 sec)**

"GhidraMCP changes this completely. The AI connects directly to your Ghidra session. You can say 'analyze the function at address 0x100230' and the AI reads it directly from Ghidra, understands the context, and can even rename variables or add comments for you.

It's like having an expert reverse engineer sitting next to you, but one who never gets tired and can process code instantly."

**[SLIDE 6 - Architecture] (30 sec)**

"Technically, GhidraMCP runs a small HTTP server inside Ghidra as a plugin. A Python bridge connects this to the MCP protocol. Claude or other AI assistants communicate through MCP to read and modify your Ghidra project. All processing stays local - your code never leaves your machine unless you want it to."

**[SLIDE 7 - Demo Stats] (45 sec)**

"Let me share some real numbers from our testing:

- We analyzed Samurai Showdown Anthology for PS2
- 2,093 functions decompiled automatically  
- 73,182 lines of C code generated
- 2,806 strings extracted
- Total processing time: 37 seconds

The AI can then analyze any of these functions on demand, identify patterns, suggest names, and help understand the game's architecture."

**[SLIDE 8 - Use Cases] (30 sec)**

"Who benefits from this?

- Security researchers analyzing malware faster
- Game preservation teams reverse engineering classics  
- Vulnerability researchers finding bugs in firmware
- Students learning reverse engineering with AI guidance
- Anyone who needs to understand how software works"

**[SLIDE 9 - Technical Details] (30 sec)**

"GhidraMCP works with:
- Ghidra 12.0.1 and JDK 21
- Claude, GPT-4, and any MCP-compatible AI
- All processors Ghidra supports - x86, ARM, MIPS, and more
- It's open source under Apache 2.0 license"

**[SLIDE 10 - Closing] (20 sec)**

"GhidraMCP is available now on GitHub. It's free, it's open source, and it's ready to use. We believe AI-assisted reverse engineering is the future, and this is how we get there.

Thank you. I'm happy to take questions or do a live demo."

---
*Total time: ~5 minutes*

---

## POWERPOINT STATS SLIDE

Use these bullet points for a stats/metrics slide:

### Samurai Showdown Anthology (PS2) - Test Results

| Metric | Value |
|--------|-------|
| Binary Size | 822 KB |
| Processor | MIPS R5900 (Emotion Engine) |
| Decompilation Time | 37.4 seconds |
| Functions Analyzed | 2,093 |
| Lines of C Code | 73,182 |
| Output File Size | 1.6 MB |
| Strings Extracted | 2,806 |
| Test Suite | 49 tests |
| Pass Rate | 100% (3 consecutive runs) |

### Key Benefits

- **Speed**: Full decompilation in under 40 seconds
- **Scale**: Handles thousands of functions automatically
- **Accuracy**: 100% test pass rate
- **Integration**: AI can query any function instantly
- **Cost**: Free and open source (vs $1000+ for IDA Pro)

