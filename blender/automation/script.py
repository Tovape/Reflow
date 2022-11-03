import sys
import os
import ctypes
import time

try:
 is_admin = os.getuid() == 0
except AttributeError:
 is_admin = ctypes.windll.shell32.IsUserAnAdmin() != 0

if is_admin == False:
    print("Must Run as Administrator, Blender 2.79 requirement")
    raise SystemExit
else:
    print("Running as Administrator")

print("\n\nReflow Automation Program by Toni Valverde")
print("-------------tovape.github.io-------------\n")
importdir = r"C:\Users\toniv\Desktop\Work\Reflow\Sweet3D\testing"
outputdir = r'C:\Users\toniv\Documents\Webdesign\Reflow\blender\automation\output\\'

if os.path.isdir(importdir):
    print("Importing from " + importdir + "\n")
    importsubdir = [dI for dI in os.listdir(importdir) if os.path.isdir(os.path.join(importdir,dI))]
    if importsubdir is not None or len(importsubdir) > 0:
        print(str(len(importsubdir)) + " subdirectories found")
        for x in importsubdir:
            print("Formatting " + x)
            os.system('blender.bat' + " " + x)
            # JSON to JS
            while not os.path.exists(outputdir + x + ".json"):
                time.sleep(3)
            if os.path.isfile(outputdir + x + ".json"):
                os.rename(outputdir + x + ".json", outputdir + x + ".js")
            # Stablish Texture Routes
            #file = open(outputdir + x + '.js', 'w+')

    else:
        print("No subdirectories found")
        raise SystemExit
else:
    print("No Directory Found in " + importdir)
    raise SystemExit