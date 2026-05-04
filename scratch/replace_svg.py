import os
import re

def replace_svg_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Pattern to match the specific download SVG used in Modpacks
    pattern = r'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"\s+stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 10px;">.*?</svg>'
    
    replacement = '<img src="https://cdn.simpleicons.org/curseforge/000" alt="" style="width:20px; margin-right: 10px;">'
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(new_content)

replace_svg_in_file('Modpacks/index.html')
