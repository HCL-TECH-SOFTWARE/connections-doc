# Customizing the Wikis welcome page {#customize_wikis_welcome_page .task}

Customize the welcome page of the Wikis application.

You can change the default content of the welcome page to suit your needs. There are different versions of the content for the standard Wikis application, the Communities version of Wikis, and the SmartCloud version of Wikis.

For detailed information about editing property files, see the *Property file strings* topic.

1.  Open the following file for editing:

    com.ibm.lconn.share.services.handlers.wiki.nls.WikiWelcomeMessages\_locale.properties

    where locale is the two-letter code that indicates the language that is used in the file; for example, en indicates the English language.

    The file is in the installedApps/Wikis.ear/share.services.jar:/src/com/ibm/lconn/share/services/handlers/wiki/nls directory.

2.  Edit any of the following attributes:

    WELCOME\_PAGE.TITLE
    :   Name of the wiki.

    WELCOME\_MESSAGE\_HTML
    :   Welcome message in a standard wiki.

    WELCOME\_MESSAGE\_COMMUNITY\_HTML
    :   Welcome message in a community wiki.

    WELCOME\_CLOUD\_MESSAGE\_COMMUNITY\_HTML
    :   Welcome message in a SmartCloud wiki.

3.  Save the file.

4.  Copy the file to the customizationDir/strings directory. If necessary, confirm that you want to overwrite an existing file with the same name.


