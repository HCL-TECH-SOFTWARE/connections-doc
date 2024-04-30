# Properties that you can change only by editing the XML file {#properties_edit_xml .reference}

Common configuration properties for HCL Connections that you can change only by manually editing the LotusConnections-config.xml file.

## Manually changing properties { .section}

The following properties are stored in the LotusConnections-config.xml file but you cannot edit them by using the wsadmin `updateConfig` command. Instead, you must check out the configuration file and edit the property in a text editor.

Use the wsadmin `LCConfigService.checkOutConfig` command to check out the file. When you finish editing the file, check it in by using the `LCConfigService.checkInConfig` command. the file is validated and you are notified if an error is found.

**acf\_config\_file**

For some applications, you can customize the configuration file that is used by the active content filter. To do so, you must manually edit the acf\_config\_file attribute of the <sloc:serviceReference\> element that represents the application. For more information, see the *Configuring the active content filter for Blogs, Wikis, and Forums* or *Configuring the active content filter for Activities, Communities, and Bookmarks* topics.

**connections.blogs.feed.return401\_fornopermission\_toviewblog**

**connections.blogs.lastModifierDisabled**

**connections.blogs.onlymembercanvote**

-   Virus scanning properties:

    ```
    <!-- 
      To enable virus scanning, first delete the empty avFilter element.
      Then, uncomment the avFilter in the comment and replace hostname as 
      appropriate
      Replace myScannerService with the appropriate name for your scanner 
      (eg AVSCAN for Symantec, RESPMOD for McAfee)
    -->
        <avFilter>
        </avFilter>
        <!-- <avFilter class="AVScannerICAP">
            <property>av.scanner.servers=myscanner.host.com</property>
            <property>exception.on.virus=yes</property>
            <property>av.scanner.service=myScannerService</property>
            <property>av.chunk.size=50000</property>
            <property>first.read.timeout=120000</property>
        </avFilter>
    	   -->
    ```

    The XML elements and attributes function as follows:

    **av.chunk.size**
    
    Defines the data transfer rate in bytes. This property is not displayed in the configuration file by default. If you want to specify a value for it, you must add it.

    **av.scanner.servers**
   
   Defines the virus scanning server to use to scan uploaded files for viruses. Replace my.virus.scanning.server.com with a list of one or more of the virus scanning servers that are used by your organization. Separate multiple servers with a comma. For example:

        `<property>av.scanner.servers=ssoc.acme.com</property>` or `<property>av.scanner.servers=ssoc1.acme.com,ssoc2.acme.com</property>`

    **av.scanner.service**
    
    Defines the service name that is used by the anti virus scanner. Set this property to AVSCAN for Symantec, and RESPMOD for McAfee.

    **exception.on.virus**
   
    Defines what to do when a virus is found. This property must always be set to yes.

    **first.read.timeout**
    Defines timeout length in milliseconds. This property is not displayed in the configuration file by default. If you want to specify a value for it, you must add it.

-   Display language customization support:

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

    The XML entries and attributes function as follows:

    **cookieDomain**
    
    Optional. Defines a cookie domain that enables the language setting to work across multiple servers. Specify a valid, fully qualified domain name of the server where the cookie is located. For example: `.example.com`. Note that the domain name begins with a period \(.\). If you specify this cookie domain, the language setting would work for Profiles on profiles.acme.com and for Activities on activities.acme.com. By default, no cookie domain is used.

    **cookieName**

    Optional. The default cookie name is lcLang. If you want to use a different name for the cookie, specify a new name in this attribute.

    **defaultLanguage**

    By default, the product user interface is displayed in the language specified as the preferred language by the web browser. You can use the defaultLanguage attribute to define a fallback language in which to display the user interface if the preferred language specified by the browser is not included in the language elements list. It there are no language elements specified, the language specified in this attribute is the only language in which HCL Connections is displayed. Specify the language using the exact strings listed in the example.

    **enabled**

    Specifies whether to allow users to change the display language of the product. This attribute accepts a Boolean value; the options are true and false.

    **language**

    Each <language\> element represents a language that you want users to be able to select from the language selector drop-down list in the product navigation bar. Add and remove language elements to create a full list of the languages you want to make available. Include a lang attribute that specifies the ISO country code associated with the language. Provide the language name as it should be displayed in the list as the value of the language element. Specify non-Latin characters in Javascript-escaped unicode format. You can only specify languages that the product supports. For a list of languages, see *Supported languages*.

    Also, remove any of the language elements that are included in the languageSelector element by default if you do not want them to be displayed from the drop-down list of language options in the product menu bar. They are English, French, Chinese, and Arabic.

    **usePermanentCookie**
    
    Optional. Specifies whether you want the cookie to persist for longer than the duration of the web browser session. This attribute accepts a Boolean value; the options are true and false. If you set the attribute to true, it creates a persistent cookie that has an expiry date of ten years from the date it was created.


**Parent topic:** [Common configuration properties](../admin/r_admin_common_props.md)

