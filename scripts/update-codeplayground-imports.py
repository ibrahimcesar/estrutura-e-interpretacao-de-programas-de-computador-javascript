#!/usr/bin/env python3
"""
Script to update CodePlayground imports to use lazy-loaded version
"""

import os
import re
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent.parent
DOCS_DIR = BASE_DIR / "docs"

# Pattern to match the old import
OLD_IMPORT = "import CodePlayground from '@site/src/components/CodePlayground';"
NEW_IMPORT = "import CodePlayground from '@site/src/components/CodePlaygroundLazy';"

def update_file(file_path):
    """Update imports in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if file contains the old import
        if OLD_IMPORT in content:
            # Replace the import
            new_content = content.replace(OLD_IMPORT, NEW_IMPORT)

            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

            return True

        return False

    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}")
        return False

def main():
    """Main function"""
    print("🔄 Updating CodePlayground imports to lazy-loaded version...\n")

    # Find all .mdx files
    mdx_files = list(DOCS_DIR.rglob("*.mdx"))

    print(f"📂 Found {len(mdx_files)} MDX files\n")

    updated_count = 0

    for mdx_file in mdx_files:
        if update_file(mdx_file):
            relative_path = mdx_file.relative_to(BASE_DIR)
            print(f"✅ Updated: {relative_path}")
            updated_count += 1

    print(f"\n📊 Summary:")
    print(f"   Files updated: {updated_count}")
    print(f"   Total files processed: {len(mdx_files)}")
    print("\n✨ Done!")

if __name__ == "__main__":
    main()
