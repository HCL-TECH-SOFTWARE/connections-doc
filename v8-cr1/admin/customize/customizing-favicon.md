# Changing the favicon for Connections apps

Customize HCL Connections app pages by replacing the default browser tab icons with your own company images.

1.  Create a new folder named "javascript" in the customizationDir. This directory refers to the base customization directory where you need to save your customized files. This base directory is defined during the installation of HCL Connections when it is saved as a WebSphere® Application Server variable named CONNECTIONS_CUSTOMIZATION_PATH, for example: /data/Connections/customization/

2.  Inside the "javascript" folder, create the following subfolders: com/ibm/oneui3/styles/imageLibrary/Icons/ComponentsDarkBlue

    After all the folders have been created, the path should look like this: /data/Connections/customization/javascript/com/ibm/oneui3/styles/imageLibrary/Icons/ComponentsDarkBlue

3.  Copy the new icon into this folder and rename it according to the specific app for which it will be used, as shown in the following table. For example, if you want to change the icon for the Blogs app, rename the icon as "Blogs_Browser.ico".

    Similarly, if you want to change the icon for Metrics, you should create a "com/ibm/oneui3/styles/imageLibrary/Icons/ComponentsGray" folder inside the "javascript" folder and copy your image file with the same name, which would be "MetricsGray.ico".

    |App name|Icon name with path|
    |--------|---------|
    |Activities|Icons/ComponentsDarkBlue/Activities_Browser.ico|
    |Blogs|Icons/ComponentsDarkBlue/Blogs_Browser.ico|
    |Bookmark|Icons/ComponentsDarkBlue/Bookmark_Browser.ico|
    |Dogear|Icons/ComponentsDarkBlue/Bookmark_Browser.ico|
    |Cognos|Icons/ComponentsGray/MetricsGray.ico|
    |Communities|Icons/ComponentsDarkBlue/Communities_Browser.ico|
    |Connectionsmail|Icons/ComponentsGray/MailGray.ico|
    |Default|Icons/ComponentsDarkBlue/Connections_Browser.ico|
    |Ecm_Files|Icons/ComponentsGray/FilesGray.ico|
    |Files|Icons/ComponentsDarkBlue/Files_Browser.ico|
    |Forums|Icons/ComponentsDarkBlue/Forums_Browser.ico|
    |Homepage|Icons/ComponentsDarkBlue/Home_Browser.ico|
    |Media Gallery|Icons/ComponentsGray/MediaGalleryGray.ico|
    |Metrics|Icons/ComponentsGray/MetricsGray.ico|
    |Moderation|Icons/ComponentsGray/ModerationGray.ico|
    |Profiles|Icons/ComponentsDarkBlue/Contacts_Browser.ico|
    |Wikis|Icons/ComponentsDarkBlue/Wikis_Browser.ico|

4.  Once you've made your changes, restart the server.


**Parent topic**: [Customizing the user interface](t_admin_common_customize_main.md)