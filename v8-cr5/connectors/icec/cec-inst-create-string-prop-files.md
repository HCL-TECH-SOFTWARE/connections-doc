# Creating string properties files {#id_name .reference}

Create property files to contain translated strings for when HCL Connections Engagement Center is used in other languages.

1.  For each language, create a properties file in the <CUSTOMIZATION\_DIR\>/strings directory. The properties file is a text file that uses the following format for the file name: ibm.resources.ICEC\{\_language\}.properties, as shown in the following image:

    ![File name syntax](images/image80.png)

2.  In the property file for a specific language, create a label called "ICEC2" and provide a name to display in the navigation list as shown in the following image:

    ```
    ICEC2=Community Home (ICEC)
    ```

    ![Navigation list](images/image81.png)

3.  Create a label called "ICEC.desc" and provide a brief description to display in the **Add apps** menu.

    ```
    ICEC.desc=ICEC - the Web Content Management Extension enhances HCL Connections with classic Web CMS capabilities to create an integrated Social Intranet.
    ```

4.  Save and close the file.

**Parent topic:**[Community on-premises mode configuration](../../connectors/icec/cec-inst-community-on-prem-config.md)

**Previous topic:**[Updating the LotusConnections-config.xml file](../../connectors/icec/cec-inst-connections-config.md)

**Next topic:**[Registering the Engagement Center to the Widget Container on the Homepage](../../connectors/icec/cec-inst-registering-icec-homepage.md)

