import sys
import os
import ctypes
import time
import pymysql
import pymysql.cursors
import json

db = pymysql.connect(
    host="localhost",
    user="test2",
    password="test2",
    database="reflow",
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

dbcursor = db.cursor()

try:
    is_admin = os.getuid() == 0
except AttributeError:
    is_admin = ctypes.windll.shell32.IsUserAnAdmin() != 0

if is_admin == False:
    print("Must Run as Administrator, Blender 2.79 requirement")
    raise SystemExit
else:
    print("Running as Administrator")

print("\n\nBlueprint.js Automation v1.0.0")
print("Program by Toni Valverde | tovape.github.io\n")
importdir = r"C:\Users\toniv\Desktop\Work\Reflow\Sweet3D"
outputdir = r'C:\Users\toniv\Documents\Webdesign\Reflow\models\js\generic\\'
texturedir = r'C:\Users\toniv\Documents\Webdesign\Reflow\models\textures\generic\\'

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
            # Get Dimensions
            dimen = [0,0,0]
            with open("temp.txt") as file:
                for line in file:
                    dimen = line.split(",")
            # Move Textures
            file_names = os.listdir(importdir + '\\' + x)
            for file_name in file_names:
                if file_name.endswith('.jpg') or file_name.endswith('.png'):
                    os.rename(importdir + '\\' + x + '\\' + file_name, texturedir + file_name)
                    # Add Texture Route
                    with open(outputdir + x + ".js", 'r') as file :
                        filedata = file.read()
                    filedata = filedata.replace(file_name, 'generic/' + file_name)
                    with open(outputdir + x + ".js", 'w') as file:
                        file.write(filedata)
            # Add to sql database
            sql = "INSERT INTO objects VALUES (null, '" + x + "', null, 'Generic', 'models/js/generic/" + x + ".js', " + dimen[0] + "," + dimen[1] + "," + dimen[2] + ", 'models/thumbnails/generic/" + x + ".jpg', 0, 1, 1, null, null)"
            dbcursor.execute(sql)
            db.commit()
            print("All finished.")
    else:
        print("No subdirectories found")
        raise SystemExit
else:
    print("No Directory Found in " + importdir)
    raise SystemExit