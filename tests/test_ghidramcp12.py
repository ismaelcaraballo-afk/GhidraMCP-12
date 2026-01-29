#!/usr/bin/env python3
import os, sys, unittest, subprocess, zipfile
from pathlib import Path

PROJECT_ROOT = Path(__file__).parent.parent

class TestBuildArtifacts(unittest.TestCase):
    def test_extension_zip_exists(self):
        zip_path = PROJECT_ROOT / "target" / "GhidraMCP-2.0-ghidra12.zip"
        self.assertTrue(zip_path.exists(), f"Extension ZIP not found at {zip_path}")
    
    def test_extension_zip_not_empty(self):
        zip_path = PROJECT_ROOT / "target" / "GhidraMCP-2.0-ghidra12.zip"
        if zip_path.exists():
            self.assertGreater(zip_path.stat().st_size, 1000, "Extension ZIP is too small")
    
    def test_extension_zip_structure(self):
        zip_path = PROJECT_ROOT / "target" / "GhidraMCP-2.0-ghidra12.zip"
        if not zip_path.exists():
            self.skipTest("Extension ZIP not found")
        with zipfile.ZipFile(zip_path, "r") as zf:
            names = zf.namelist()
            self.assertTrue(any("extension.properties" in n for n in names), "Missing extension.properties")
            self.assertTrue(any("Module.manifest" in n for n in names), "Missing Module.manifest")
            self.assertTrue(any(n.endswith(".jar") for n in names), "Missing JAR file")

class TestPomConfiguration(unittest.TestCase):
    def test_pom_exists(self):
        self.assertTrue((PROJECT_ROOT / "pom.xml").exists(), "pom.xml not found")
    
    def test_jdk_21_configured(self):
        content = (PROJECT_ROOT / "pom.xml").read_text()
        self.assertIn("<maven.compiler.source>21</maven.compiler.source>", content)
        self.assertIn("<maven.compiler.target>21</maven.compiler.target>", content)
    
    def test_no_jdk5_references(self):
        content = (PROJECT_ROOT / "pom.xml").read_text()
        self.assertNotIn("<maven.compiler.source>5</maven.compiler.source>", content)

class TestBridgeScript(unittest.TestCase):
    def test_bridge_script_exists(self):
        self.assertTrue((PROJECT_ROOT / "bridge_mcp_ghidra.py").exists())
    
    def test_bridge_script_syntax(self):
        result = subprocess.run([sys.executable, "-m", "py_compile", str(PROJECT_ROOT / "bridge_mcp_ghidra.py")], capture_output=True)
        self.assertEqual(result.returncode, 0, "Syntax error in bridge script")
    
    def test_bridge_has_mcp_tools(self):
        content = (PROJECT_ROOT / "bridge_mcp_ghidra.py").read_text()
        for tool in ["list_methods", "decompile_function", "rename_function", "list_imports"]:
            self.assertIn(f"def {tool}", content, f"Missing MCP tool: {tool}")

class TestJavaSource(unittest.TestCase):
    def test_plugin_source_exists(self):
        plugin_path = PROJECT_ROOT / "src/main/java/com/lauriewired/GhidraMCPPlugin.java"
        self.assertTrue(plugin_path.exists())
    
    def test_plugin_has_annotation(self):
        content = (PROJECT_ROOT / "src/main/java/com/lauriewired/GhidraMCPPlugin.java").read_text()
        self.assertIn("@PluginInfo", content)
    
    def test_plugin_endpoints(self):
        content = (PROJECT_ROOT / "src/main/java/com/lauriewired/GhidraMCPPlugin.java").read_text()
        for ep in ["/methods", "/decompile", "/imports", "/exports"]:
            self.assertIn(ep, content, f"Missing endpoint: {ep}")

class TestLibraryDependencies(unittest.TestCase):
    def test_lib_directory_exists(self):
        self.assertTrue((PROJECT_ROOT / "lib").exists())
    
    def test_required_jars_present(self):
        jar_names = [j.name for j in (PROJECT_ROOT / "lib").glob("*.jar")]
        for required in ["Generic.jar", "SoftwareModeling.jar", "Decompiler.jar", "Base.jar"]:
            self.assertIn(required, jar_names, f"Missing JAR: {required}")

class TestDocumentation(unittest.TestCase):
    def test_readme_exists(self):
        self.assertTrue((PROJECT_ROOT / "README.md").exists())
    
    def test_readme_content(self):
        content = (PROJECT_ROOT / "README.md").read_text()
        self.assertIn("Install", content)
        self.assertIn("12.0", content)

class TestExtensionMetadata(unittest.TestCase):
    def test_extension_properties_source(self):
        self.assertTrue((PROJECT_ROOT / "src/main/resources/extension.properties").exists())
    
    def test_module_manifest_source(self):
        self.assertTrue((PROJECT_ROOT / "src/main/resources/Module.manifest").exists())

class TestMavenBuild(unittest.TestCase):
    def test_maven_available(self):
        result = subprocess.run(["mvn", "--version"], capture_output=True)
        self.assertEqual(result.returncode, 0, "Maven not available")
    
    def test_clean_build(self):
        result = subprocess.run(["mvn", "clean", "package", "-DskipTests"], cwd=PROJECT_ROOT, capture_output=True, timeout=120)
        self.assertEqual(result.returncode, 0, "Build failed")

if __name__ == "__main__":
    unittest.main(verbosity=2)
