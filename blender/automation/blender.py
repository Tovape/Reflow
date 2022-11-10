import bpy
import sys

print("Blender Launched")
outputdir = r'C:\Users\toniv\Documents\Webdesign\Reflow\models\js\generic\\'

if sys.argv[-1] is not None:
    print("Got FileName")
    # Formatting Nmae
    filename = sys.argv[-1]
    filename = filename[2:]
    # Getting Objs
    file_loc = 'C:\\Users\\toniv\\Desktop\\Work\\Reflow\\Sweet3D\\' + filename + '\\' + filename + '.obj'
    imported_object = bpy.ops.import_scene.obj(filepath=file_loc)
    obj_object = bpy.context.selected_objects[0]
    # Selecting All
    objects = bpy.context.scene.objects
    for obj in objects:
        obj.select = True
        bpy.context.scene.objects.active = obj
        bpy.ops.object.join()
        break
    # Set active
    bpy.context.scene.objects.active = bpy.context.scene.objects[0]
    # Exporting
    Ufilename = filename.capitalize()
    bpy.ops.export.threejs(filepath=outputdir + Ufilename + '.json')
    bpy.ops.wm.quit_blender()
else:
    raise SystemExit