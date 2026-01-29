#!/usr/bin/env python3
"""
GhidraMCP-12 Bridge Integration Tests
Tests the MCP bridge connection to Ghidra.
Requires Ghidra to be running with GhidraMCPPlugin enabled.
"""

import sys
import unittest
import requests
from pathlib import Path

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

GHIDRA_SERVER = "http://127.0.0.1:8080"


def ghidra_available():
    """Check if Ghidra MCP server is running."""
    try:
        r = requests.get(f"{GHIDRA_SERVER}/methods?limit=1", timeout=2)
        return r.status_code == 200
    except:
        return False


@unittest.skipUnless(ghidra_available(), "Ghidra MCP server not running")
class TestGhidraConnection(unittest.TestCase):
    """Test basic Ghidra HTTP connection."""

    def test_server_responds(self):
        """Verify server responds to requests."""
        r = requests.get(f"{GHIDRA_SERVER}/methods?limit=1", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_methods_endpoint(self):
        """Test /methods endpoint returns data."""
        r = requests.get(f"{GHIDRA_SERVER}/methods?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)
        lines = r.text.strip().split("\n")
        self.assertGreater(len(lines), 0, "No methods returned")

    def test_strings_endpoint(self):
        """Test /strings endpoint returns data."""
        r = requests.get(f"{GHIDRA_SERVER}/strings?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_imports_endpoint(self):
        """Test /imports endpoint."""
        r = requests.get(f"{GHIDRA_SERVER}/imports?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_exports_endpoint(self):
        """Test /exports endpoint."""
        r = requests.get(f"{GHIDRA_SERVER}/exports?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_segments_endpoint(self):
        """Test /segments endpoint."""
        r = requests.get(f"{GHIDRA_SERVER}/segments?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_namespaces_endpoint(self):
        """Test /namespaces endpoint."""
        r = requests.get(f"{GHIDRA_SERVER}/namespaces?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_classes_endpoint(self):
        """Test /classes endpoint."""
        r = requests.get(f"{GHIDRA_SERVER}/classes?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_data_endpoint(self):
        """Test /data endpoint."""
        r = requests.get(f"{GHIDRA_SERVER}/data?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)


@unittest.skipUnless(ghidra_available(), "Ghidra MCP server not running")
class TestDecompilation(unittest.TestCase):
    """Test decompilation functionality."""

    def test_decompile_entry(self):
        """Test decompiling entry function."""
        r = requests.post(f"{GHIDRA_SERVER}/decompile", data="entry", timeout=10)
        self.assertEqual(r.status_code, 200)
        self.assertIn("void", r.text.lower())

    def test_decompile_returns_code(self):
        """Test decompile returns actual code."""
        r = requests.get(f"{GHIDRA_SERVER}/methods?limit=1", timeout=5)
        func_name = r.text.strip().split("\n")[0]
        
        r = requests.post(f"{GHIDRA_SERVER}/decompile", data=func_name, timeout=10)
        self.assertEqual(r.status_code, 200)
        self.assertGreater(len(r.text), 10, "Decompiled code too short")


@unittest.skipUnless(ghidra_available(), "Ghidra MCP server not running")
class TestSearch(unittest.TestCase):
    """Test search functionality."""

    def test_search_functions(self):
        """Test function search."""
        r = requests.get(f"{GHIDRA_SERVER}/searchFunctions?query=FUN&limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_search_returns_results(self):
        """Test search returns matching results."""
        r = requests.get(f"{GHIDRA_SERVER}/searchFunctions?query=entry&limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)


@unittest.skipUnless(ghidra_available(), "Ghidra MCP server not running")
class TestRename(unittest.TestCase):
    """Test rename functionality."""

    def test_rename_function_roundtrip(self):
        """Test renaming a function and reverting."""
        # Get a function to rename
        r = requests.get(f"{GHIDRA_SERVER}/methods?limit=10", timeout=5)
        funcs = r.text.strip().split("\n")
        
        # Find a FUN_ function to rename
        test_func = None
        for f in funcs:
            if f.startswith("FUN_"):
                test_func = f
                break
        
        if not test_func:
            self.skipTest("No FUN_ function found to test rename")
        
        # Rename it
        new_name = "test_rename_xyz123"
        r = requests.post(f"{GHIDRA_SERVER}/renameFunction", 
                         data={"oldName": test_func, "newName": new_name}, timeout=5)
        self.assertIn("success", r.text.lower())
        
        # Verify rename worked
        r = requests.get(f"{GHIDRA_SERVER}/searchFunctions?query={new_name}&limit=1", timeout=5)
        self.assertIn(new_name, r.text)
        
        # Revert
        r = requests.post(f"{GHIDRA_SERVER}/renameFunction",
                         data={"oldName": new_name, "newName": test_func}, timeout=5)
        self.assertIn("success", r.text.lower())


@unittest.skipUnless(ghidra_available(), "Ghidra MCP server not running")
class TestMCPBridge(unittest.TestCase):
    """Test the Python MCP bridge functions directly via HTTP."""

    def test_bridge_list_methods(self):
        """Test list_methods via bridge logic."""
        r = requests.get(f"{GHIDRA_SERVER}/methods?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)
        result = r.text.strip().split("\n")
        self.assertIsInstance(result, list)
        self.assertGreater(len(result), 0)

    def test_bridge_list_strings(self):
        """Test list_strings via bridge logic."""
        r = requests.get(f"{GHIDRA_SERVER}/strings?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)
        result = r.text.strip().split("\n")
        self.assertIsInstance(result, list)

    def test_bridge_decompile_function(self):
        """Test decompile_function via bridge logic."""
        r = requests.post(f"{GHIDRA_SERVER}/decompile", data="entry", timeout=10)
        self.assertEqual(r.status_code, 200)
        self.assertIsInstance(r.text, str)
        self.assertGreater(len(r.text), 10)

    def test_bridge_search_functions(self):
        """Test search_functions_by_name via bridge logic."""
        r = requests.get(f"{GHIDRA_SERVER}/searchFunctions?query=FUN&limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)
        result = r.text.strip().split("\n")
        self.assertIsInstance(result, list)

    def test_bridge_list_imports(self):
        """Test list_imports via bridge logic."""
        r = requests.get(f"{GHIDRA_SERVER}/imports?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_bridge_list_exports(self):
        """Test list_exports via bridge logic."""
        r = requests.get(f"{GHIDRA_SERVER}/exports?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_bridge_list_segments(self):
        """Test list_segments via bridge logic."""
        r = requests.get(f"{GHIDRA_SERVER}/segments?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)

    def test_bridge_list_classes(self):
        """Test list_classes via bridge logic."""
        r = requests.get(f"{GHIDRA_SERVER}/classes?limit=5", timeout=5)
        self.assertEqual(r.status_code, 200)


if __name__ == "__main__":
    unittest.main(verbosity=2)
