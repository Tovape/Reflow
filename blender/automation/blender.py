import bpy
import sys

print("Blender Launched")
outputdir = r'C:\Users\toniv\Documents\Webdesign\Reflow\blender\automation\output'

if sys.argv[-1] is not None:
    print("Got FileName")
    string_to_use = sys.argv[-1]
    string_to_use = string_to_use[2:]
    text_data = bpy.data.curves.new('txt', 'FONT')
    text_data.body = string_to_use
    text_obj = bpy.data.objects.new('text', text_data)
    bpy.context.scene.objects.link(text_obj)
else:
    raise SystemExit