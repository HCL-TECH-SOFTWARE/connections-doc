# Enabling users to set a language preference {#t_admin_common_enable_lang_change .task}

By default, the HCL Connections user interface \(UI\) is displayed in the language that is identified in the locale settings of the web browser. You can set it up to allow users to explicitly select the language in which the product is displayed.

Before you begin this procedure, determine which subset of supported languages you want to support. For a full list of the languages that are supported by HCL Connections, see *Supported languages*.

After performing this procedure, users can select a language from the language selector in the product's menu bar.

You can also use this configuration to force the user interface to be displayed in only a single language. For example, to display the user interface in French only, you can use the following settings: enabled=true, defaultLanguage=fr, and make sure that no language elements are defined.

To enable users to set their language preference, complete the following steps:

1.  Start the wsadmin client from the following directory of the system where you installed the deployment manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    ```
    app\_server\_root\profiles\dm\_profile\_root\bin
    ```

    **Note:** You must start the client from this directory or subsequent commands that you try to run will not execute properly. For more information, see the *Starting the wsadmin client* topic.

2.  Use the wsadmin client to access and check out the HCL Connections configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
            -   Linux only: The directory must grant write permissions or the command fails.
            
        -   cell\_name is the name of the WebSphere® Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

3.  Navigate to the working directory that you specified in the previous step and open the LotusConnections-config.xml file in a text editor.

4.  Find the <languageSelector\> element, and then make the following changes:

    1.  Change the value of the enabled attribute from false to true.

    2.  By default, the defaultLanguage attribute is blank and the product user interface is displayed in the language that is specified as the preferred language by each user's web browser. Use the defaultLanguage attribute to define a fallback language in which to display the user interface if the preferred language is not one that is supported by IBM Connections. The language that you specify here is displayed in the language selector in the product's navigation bar. Specify the language using the language code values in Table 1.

        **Note:** Use the language code `iw` to specify Hebrew.

    3.  The default cookie name is lcLang. If you want to change it, specify a name in the cookieName attribute.

    4.  No cookie domain is used by default, but you can specify a domain by adding the domain name of your deployment as the value of the cookieDomain attribute. The domain name must be a valid, fully qualified domain name of the server where the cookie is located. For example: `.acme.com`. Note that the domain name begins with a period \(.\). When you provide this value for the cookie domain property, you enable the language setting to work across multiple servers, such as both profiles.acme.com and activities.acme.com.

    5.  By default, the cookie persists during the web browser session. To create a persistent cookie that has an expiry date of 10 years from the date it was created, set the usePermanentCookie to true.

    6.  Within the <languageSelector\> element, add one <language\> element for each language that you want users to be able to select from the language selector list in the product menu bar. Include a lang attribute that specifies the ISO country code that is associated with the language. Provide the language name as it is to be displayed in the list as the value of the language element. Specify non-Latin characters in JavaScript-escaped unicode format. You can specify languages that the product supports only. For a list of languages, see *Supported languages*.

        Also, remove any of the language elements that are included in the languageSelector element by default/ Remove language elements if you do not want them to be displayed from the drop-down list of language options in the product menu bar. They are English, French, Chinese, and Arabic. For example:

        ```
        <languageSelector 
         enabled="true" 
         defaultLanguage="" 
         cookieName="lcLang"
         cookieDomain=".acme.com" 
         usePermanentCookie="true">
          <language lang="en">English</language>
          <language lang="zh">\u4e2d\u6587\uff08\u7b80\u4f53\uff09</language>
          <language lang="zh_tw">\u4e2d\u6587 (\u7e41\u9ad4)</language>
          <language lang="ja">\u65e5\u672c\u8a9e</language>
          <language lang="ko">\ud55c\uad6d\uc5b4</language>
          <language lang="fr">Français</language>
          <language lang="de">Deutsch</language>
          <language lang="it">Italiano</language>
          <language lang="es">Español</language>
          <language lang="pt_br">Portugu\u00eas (Brasil)</language>
          <language lang="cs">\u010ce\u0161tina</language>
          <language lang="da">Dansk</language>
          <language lang="nl">Nederlands</language>
          <language lang="fi">suomi</language>
          <language lang="el">\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac</language>
          <language lang="hu">Magyar</language>
          <language lang="no">Norsk (Bokm\u00e5l)</language>
          <language lang="pl">polski</language>
          <language lang="pt">Portugu\u00eas (Portugal)</language>
          <language lang="ru">\u0420\u0443\u0441\u0441\u043a\u0438\u0439</language>
          <language lang="sl">slovenščina</language>
          <language lang="sv">Svenska</language>
          <language lang="tr">T\u00fcrk\u00e7e</language>
          <language lang="iw">\u05e2\u05d1\u05e8\u05d9\u05ea</language>
          <language lang="ar">\u200f\u0627\u0644\u0639\u0631\u0628\u064a\u0629\u200f</language>
          <language lang="ca">Catal\u00e0</language>
          <language lang="kk">\u049a\u0430\u0437\u0430\u049b\u0448\u0430</language>
          <language lang="th">\u0e44\u0e17\u0e22</language>
          <language lang="in">Bahasa Indonesia</language> <!-Indonesian-> 
          <language lang="bg">\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438</language> 
          <language lang="ro">Rom\u00E2n\u0103</language> 
          <language lang="sk">Sloven\u010Dina</language> 
          <language lang="hr">Hrvatski</language>
          <language lang="eu">Euskara</language> 
        </languageSelector>
        ```

        The following table identifies the languages based on the lang property value:

        |Lang property value|Language|
        |-------------------|--------|
        |ar|Arabic|
        |bg|Bulgarian|
        |ca|Catalan|
        |cs|Czech|
        |da|Danish|
        |de|German|
        |en|English|
        |el|Greek|
        |es|Spanish|
        |eu|Basque|
        |fi|Finnish|
        |fr|French|
        |hr|Croatian|
        |hu|Hungarian|
        |in|Indonesian|
        |it|Italian|
        |iw|Hebrew|
        |ja|Japanese|
        |kk|Kazakh|
        |ko|Korean|
        |nl|Dutch|
        |no|Norwegian|
        |pl|Polish|
        |pt|Portuguese|
        |pt\_br|Brazilian Portuguese|
        |ro|Romanian|
        |ru|Russian|
        |sk|Slovak|
        |sl|Slovene|
        |sv|Swedish|
        |th|Thai|
        |tr|Turkish|
        |zh|Simplified Chinese|
        |zh\_tw|Traditional Chinese|

5.  Save your changes to the LotusConnections-config.xml file.

6.  When you have made changes, check the configuration files back in and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See *Applying common configuration property changes* for information about how to save and apply your changes.


**Parent topic:**[Customizing the deployment](../admin/c_admin_common_customizing.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

[Enabling users to specify email notification preferences](../admin/t_admin_common_user_specifies_email.md)

[Supported languages](../overview/i_ovr_c_supported_langs.md)

[Index settings](../admin/c_admin_search_index_settings.md)

