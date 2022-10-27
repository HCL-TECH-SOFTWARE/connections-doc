# Uploading pronunciation files {#t_admin_profiles_import_pronunciation .task}

Profiles users can add a recording of how their name is pronounced to enhance their profile. As administrator, you can use IBM® Tivoli® Directory Integrator assembly-line commands to populate the profiles database repository with pronunciation files for your users.

You can use the dump\_pronounce\_to\_files and load\_pronounce\_from\_file assembly-line commands to populate the profiles database with pronunciation files. These commands are useful when you are moving the profiles database, allowing you to save the pronunciation information from the existing database on disk, repopulate the new database from the LDAP, and then load the pronunciation files back into the new database.

1.  To populate a new profiles database with pronunciation files, complete the following steps.
2.  Use the dump\_pronounce\_to\_files.bat or dump\_pronounce\_to\_files.sh command to read the existing pronunciation files from the Profiles database and store them on disk:

    The following table shows the properties that are used by this command and their default values. These properties can be found in the profiles\_tdi.properties file.

    |Property|Description|
    |--------|-----------|
    |dump\_pronounce\_directory|The directory where the extracted files are stored.

The default value is ./dump\_pronounce.

|
    |dump\_pronounce\_file|The list of people whose pronunciation files were collected.

The default value is collect\_pronounce.in.

|
    |load\_pronounce\_simple\_file|The list of people whose pronunciation files were collected.

The default value is collect\_pronounce.in.

If you want to load only a subset of files from a location, you edit this file.

|

    **Note:** When dumping multiple pronunciation files, there must be a period separator between each entry. If the separator is omitted, an error is generated when you use the load command to import the files into the profiles database.

3.  To populate the new database with the pronunciation files that you saved in the previous step, use the load\_pronounce\_from\_files.bat or load\_pronounce\_from\_files.sh command to read the files from disk and populate the profiles database with them

    **Note:** The table in step 1 shows the properties that relate to this command.


Here is an example of an entry from the collect\_pronounce.in file:

```
file:/C:/install\_directory/TDISOL/TDI/./dump_pronounce/pron1197046202619_9.dat 
uid:FAdams
.
```

The characters following `uid:` correspond to the PROF\_UID in the profiles database.

Note the required period separator between each entry.

For example:

```
file:/C:/install\_directory/TDISOL/TDI/./dump_pronounce/pron1197046202619_9.dat 
uid:FAdams
.
file:/C:/install\_directory/TDISOL/TDI/./dump_pronounce/pron6198046102314_6.dat 
uid:TAmado
.
```

**Parent topic:**[Adding supplemental content to Profiles](../admin/c_admin_profiles_add_content.md)

**Related information**  


[Enabling the use of pronunciation files in an HTTPS environment](../admin/t_admin_profiles_enable_pronunciation.md)

[Using the PronunciationConnector](../admin/t_admin_profiles_using_pronunciation_connector.md)

