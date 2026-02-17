# Populating Profiles with photos from another Profiles database {#t_admin_profiles_import_photos_export-import .task}

You can use IBM® Tivoli® Directory Integrator assembly-line commands to transfer photos of your users from one Profiles database to another.

You can use the dump\_photos\_to\_files and load\_photos\_from\_file assembly-line commands to populate the Profiles database with user photos. This is useful when you're upgrading Connections, or when you're moving the Profiles database. Use dump\_photos\_to\_files to save the photos from the existing database to disk. Then, after the new database has been repopulated from your LDAP server, use load\_photos\_from\_file to load the photo files into the new database.

1.  To populate a new Profiles database with photos:
2.  Use the dump\_photos\_to\_files command to store the photos from the existing Profiles database on disk.

    The following table shows the properties that are used by this command, and their default values. These properties are in the profiles\_tdi.properties file.

    |Property|Description|
    |--------|-----------|
    |dump\_photos\_directory|The directory where the extracted photo files are stored. The default value is ./dump\_photos, which is a sub-directory of the TDI solution directory.

|
    |dump\_photos\_file|The file that contains the user and photo information. The default value is collect\_photos.in, and it's in the TDI solution directory.

 Each entry consists of three lines:

     -   The absolute file path and file name of the photo.
    -   The uid of the user, corresponding to PROF\_UID in the Profiles database.
    -   A single period.
|

3.  Use the load\_photos\_from\_files command to populate the new Profiles database with the photos that you saved in the previous step.

    The following property in profiles\_tdi.properties is used by this command:

    |Property|Description|
    |--------|-----------|
    |load\_photos\_simple\_file|The file that contains the user and photo information. The default value is collect\_photos.in.

 You can edit this file before running the load\_photos\_from \_files command. For example, you might want to load only a subset of photos into the Profiles database.

|

    **Note:** Make sure that new Profiles database is populated with users before running the load\_photos\_from\_files command.


This sample collect\_photos.in file contains three entries.

```
photo:file:/C:/<tdi-solution-install-directory\>/TDI/./dump_photos/img1365046622554_4.dat 
uid:AAmadou
.
photo:file:/C:/<tdi-solution-install-directory\>/TDI/./dump_photos/img1197046202619_9.dat 
uid:FAdams
.
photo:file:/C:/<tdi-solution-install-directory\>/TDI/./dump_photos/img1197146402316_7.dat 
uid:TAmado
.
```

The characters following `uid:` correspond to the PROF\_UID in the Profiles database. Also, note the required period separator between each entry.

**Parent topic:**[Adding supplemental content to Profiles](../admin/c_admin_profiles_add_content.md)

