# Blogs field limits {#r_admin_blogs_field_limits .reference}

This topic lists character input limits for key Blogs fields.

## Limits { .section}

The field limits are listed for single-byte languages. They will vary for multi-byte languages. For example, a field that holds a text string up to 255 characters in a single-byte language might hold a text string up to only 128 characters in a double-byte language. The length may also vary based on the database type. For example, the length limit for a blog name is 255 bytes in DB2® and Oracle, and 255 characters in SQL server. The following limits are based on DB2.

|Field|Character input limit|
|-----|---------------------|
|Blog name|255 characters|
|Blog handle|255 characters|
|Blog description|16K characters|
|Entry title|255 characters|
|Link name|You can enter and store up to 255 characters, but only the first 30 will display in the user interface.|
|Link description|The first 255 characters entered into the field will be saved.|

**Parent topic:**[Administering Blogs](../admin/c_administering_blogs.md)

