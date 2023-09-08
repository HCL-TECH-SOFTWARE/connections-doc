# Updating the LotusConnections-config.xml file {#id_name .reference}

Edit the LotusConnectionsConfig.xml file to add the Connections Engagement Center widget bundle.

|Step|Instructions|
|----|------------|
|1

|Open a command window and execute the following script to check out the LotusConnectionsConfig.xml file; leave the command prompt open for the next step.

**Tip:** Alternatively you can modify the LotusConnectionsConfig.xml file manually and then synchronize the nodes in the WebSphere Integrated Solutions Console.

 ```

cd C:\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
wsadmin -lang jython -user <wasadmin> -password <password>
execfile("connectionsConfig.py")
LCConfigService.checkOutConfig("<TEMP_DIRECTORY>", AdminControl.getCell())

```

|
|2

|Open the checked-out LotusConnectionsConfig.xml file in an XML editor of your choice and add the `widgetBundle` section to the resources node as shown in the following image.

 ![image](images/image79.png)

 Use the following code for the `widgetBundle` setting:

 ```

<resources>
<widgetBundle name="ibm.resources.ICEC" prefix="ICEC"/>
</resources>

```

|
|3

|Execute the following scripts:

-   `CommunitiesConfigService.checkInwidgetsConfig(“<*working\_directory*>","<*cell\_name*>")`
-   `LCConfigService.checkInwidgetsConfig(“<*working\_directory*>","<*cell\_name*>")`

 where *working\_directory* is the temporary working directory to which configuration files are copied. The files are kept in this working directory while you edited them, and *cell\_name* is the name of the WebSphere Application Server cell that hosts the HCL Connections application. If you do not know the cell name, display it by typing the following command in the wsadmin client: print AdminControl.getCell\(\)

 **Note:** When you specify a path to the working directory on a system that is running Microsoft Windows, use a forward slash for the directory. For example: "C:/temp". On Linux the directory must grant write permissions or the command fails.

|

**Parent topic:**[Community on-premises mode configuration](../../connectors/icec/cec-inst-community-on-prem-config.md)

**Previous topic:**[Updating the widgets-config.xml file](../../connectors/icec/cec-inst-widgets-config.md)

**Next topic:**[Creating string properties files](../../connectors/icec/cec-inst-create-string-prop-files.md)

