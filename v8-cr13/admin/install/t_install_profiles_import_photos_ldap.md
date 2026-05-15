# Populating Profiles with photos from LDAP {#t_install_profiles_import_photos_ldap .task}

You can use the IBM® Tivoli® Directory Integrator assembly-line command load\_photos\_from\_ldap to load the Profiles database with photos of your users.

Make sure that the Profiles database is already populated with users. The assembly line relies on the distinguished name to locate photos in LDAP.

1.  To load photos from LDAP:
2.  Open profiles\_tdi.properties, locate the load\_photos\_from\_ldap\_attr\_name property, and set it to the name of the LDAP binary attribute that contains the photo.

    Typical names for the LDAP binary attribute are photo;binary, jpegPhoto;binary, and image;binary, but you must use the same name that your LDAP uses. For example:

    load\_photos\_from\_ldap\_attr\_name=photo;binary

3.  Run the load\_photos\_from\_ldap assembly line command.

    **Note:** You must run this command for each LDAP server and each LDAP branch that contains photos.


**Parent topic:**[Populating the Profiles database](../install/t_prof_install_profiles_db.md)

