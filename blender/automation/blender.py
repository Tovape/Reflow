import bpy
import sys

print("Blender Launched")
print(sys.argv)

idx = sys.argv.index('--') + 1
string_to_use = sys.argv[idx]

text_data = bpy.data.curves.new('txt', 'FONT')
text_data.body = string_to_use
text_obj = bpy.data.objects.new('text', text_data)
bpy.context.scene.objects.link(text_obj)