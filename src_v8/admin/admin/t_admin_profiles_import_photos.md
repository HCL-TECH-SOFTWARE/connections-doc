# Populating Profiles with photos from LDAP {#t_admin_profiles_import_photos .task}

Use the load\_photos\_from\_ldap assembly-line command to load photos directly from your LDAP.

Make sure that the Profiles database is populated, because the load\_photos\_from\_ldap command iterates through the users in the Profiles database, using the distinguished name to look up the user in the LDAP directory.

1.  To populate a Profiles database with photos from LDAP:
2.  Open profiles\_tdi.properties, locate the load\_photos\_from\_ldap\_attr\_name property, and set it to the name of the LDAP binary attribute that contains the photo.

    Typical names for the LDAP binary attribute are photo, jpegPhoto, and image, but you must use the same name that your LDAP uses.

3.  Run the load\_photos\_from\_ldap command.


If you have more than one LDAP or LDAP branch that contains the photos that you need for Profiles, you must repeat the procedure for each LDAP or LDAP branch. Make sure that you modify the LDAP-specific properties in profiles\_tdi.properties before each run. For example, the following properties should be specified for each LDAP or LDAP branch: source\_ldap\_url, source\_ldap\_search\_base, source\_ldap\_user\_login, among others.

**Related information**  


[Using the PhotoConnector](../admin/t_admin_profiles_using_photo_connector.md)

