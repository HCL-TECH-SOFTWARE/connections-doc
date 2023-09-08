# Adding third-party links via the XML configuration file {#t_admin_profiles_extend_biz_card .task}

You can extend the Profiles business card by adding links to applications from another vendor.

To edit configuration files, you must use the wsadmin client. See [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md) for information about how to start the wsadmin command-line tool.

You can specify links to services acquired from another vendor in the WAS\_HOME\\profiles\\WAS\_Profile\\config\\cells\\Host\_name\\LotusConnections-config \\LotusConnections-config.xml file. The service reference must have a person\_card\_service\_url\_pattern attribute and a person\_card\_service\_name\_js\_eval attribute. Without these attributes, the service link does not display in the inline or pop-up business cards.

To extend the Profiles business card, complete the following steps:

1.  Start the wsadmin client from the following directory of the system on which you installed the Deployment Manager:

    ```
    [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)\profiles\dm\_profile\_root\bin
    ```

    where app\_server\_root is the IBM WebSphere® Application Server installation directory and dm\_profile\_root is the Deployment Manager profile directory, typically dmgr01.

    You must start the client from this directory or subsequent commands that you enter do not execute correctly.

2.  Use the wsadmin client to access and check out the HCL Connections™ configuration files.

    1.  Enter the following command to load the HCL Connections configuration file: execfile\("connectionsConfig.py"\)

        If you are prompted to specify a service to connect to, type 1 to select the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file by using a local file path, you must select the node where the file is stored. This information is not used by the wsadmin client when you are making configuration changes.

    2.  Enter the following command to check out HCL Connections configuration files:

        `LCConfigService.checkOutConfig("working\_directory","cell\_name")`

        where:

        -   working\_directory is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edit them.

            **Notes:**

            -   When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp".
            -   Linux only: The directory must grant write permissions or the command fails.
        -   cell\_name is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

            **Note:** This input parameter is case-sensitive.

3.  Open the LotusConnections-config.xml file, and modify it to include the following attributes:

    |Attribute|Description|
    |---------|-----------|
    |person\_card\_service\_url\_pattern|Represents the URL pattern that is used when users click the service link. The ampersand character \(&\) must be expressed using the actual character in the pattern. This attribute takes a string value.The following parameters inside the URL pattern are placeholders. When the business card is rendered at runtime, the parameters are replaced by the real values.

    -   \{email\}. The profile user's email address.
    -   \{userid\}. The profile user's user ID.
    -   \{uid\}. The profile user's UID.
    -   \{displayName\}. The profile user's full name.
    -   \{workPhoneNumber\}. The profile user's work telephone number.
|
    |person\_card\_service\_name\_js\_eval|Represents a JavaScript™ statement that is used by the framework to generate the text displayed in the business card for the given service.This attribute takes a string value.

You can add a resource string as the value for this attribute. The resource string must include "generalrs." before the resource bundle key. 

|

    For example:

    ```
    <sloc:serviceReference serviceName="googleService"
      href="http://www.google.com"   enabled="true"
      ssl_href="http://www.google.com"   ssl_enabled="false"
      person_card_service_url_pattern="/search?hl=en&amp;q={email}&amp;btnG=Google+Search"
      person_card_service_name_js_eval="'Google Me'"/>
    
    <sloc:serviceReference serviceName="quickr"
      href="http://quickrdomino.tap.ibm.com/servlet"   enabled="true"
      ssl_href="https://quickrdomino.tap.ibm.com/servlet"   ssl_enabled="true"
      person_card_service_url_pattern="/QuickrEntry?email={email}"
      person_card_service_name_js_eval="generalrs.label_personcard_quickrlink"/>
    
    <sloc:serviceReference serviceName="communities"
      href="http://wd40.lotus.com/communities"   enabled="true"
      ssl_href="https://wd40.lotus.com/communities"   ssl_enabled="true"
      person_card_service_url_pattern="/service/html/allcommunities?email={email}"
      person_card_service_name_js_eval="generalrs.label_personcard_communitieslink"/>
    
    <sloc:serviceReference serviceName="profiles"
      href="http://wd40.lotus.com/profiles"   enabled="true"
      ssl_href="http://wd40.lotus.com/profiles"   ssl_enabled="true"
    person_card_service_url_pattern="/html/simpleSearch.do?searchFor={email}&amp;searchBy=email"
      person_card_service_name_js_eval="generalrs.label_personcard_profilelink"/>
    
    ```

4.  Edit the service-location.xsd file to define the service names used.

    For example:

    ```
    <xsd:simpleType name="serviceNames">
        <xsd:restriction base="xsd:string">
          <xsd:enumeration value="activities" />
          <xsd:enumeration value="blogs" />
          <xsd:enumeration value="communities" />
          <xsd:enumeration value="directory" />
          <xsd:enumeration value="dogear" />
          <xsd:enumeration value="personTag" />
          <xsd:enumeration value="presenceAwareness" />
          <xsd:enumeration value="profiles" />
          <xsd:enumeration value="sametimeLinks" />
          <xsd:enumeration value="homepage" />
          <xsd:enumeration value="googleService" />
         <xsd:enumeration value="quickr" />
        </xsd:..>
      </xsd:..>
    
    ```

5.  After making changes, you must check the configuration files back in, and you must do so during the same wsadmin session in which you checked them out for the changes to take effect. See [Applying common configuration property changes](../admin/t_admin_common_save_changes.md) for information about how to save and apply your changes.

    **Note:** If you added third-party links to the Profiles business card and those links are no longer needed, you can remove them by modifying the LotusConnections-config.xml configuration file to undo or comment out what was done to add them. You cannot remove third-party links using JavaScript.


**Parent topic:**[Customizing the Profiles business card](../customize/c_admin_profiles_customize_biz_card_links.md)

**Related information**  


[Applying common configuration property changes](../admin/t_admin_common_save_changes.md)

