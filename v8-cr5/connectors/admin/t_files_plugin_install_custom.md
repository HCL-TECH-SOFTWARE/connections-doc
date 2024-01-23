# Customizing the installation of the HCL Connections plug-ins {#t_files_plugin_install_custom .task}

Customize the installer by editing the install.addon.xml file to install a custom set of HCL Connections plug-ins for an IBM Notes client.

**Attention:** Activities and Status Updates depend on the Business Card plug-in. Do not remove the Business Card plug-in if you are installing Activities or Status Updates.

**Note:** Customizing the installation of the HCL Connections plug-ins is supported only for the Windows platform. Currently there is no plan to support the Mac platform.

Customize the installer to install parts of the plug-ins so that they are integrated with the IBM Notes client. For example, if you do not want to deploy Status Updates, you can exclude that plug-in from the installation by commenting it out in the install.addon.xml file.

1.  Open install.addon.xml in a text editor from the /deploy folder.

    For example \(Windows\), /ConnectionsAddonInstaller/deploy

2.  Comment out the plug-ins you do not want to deploy or uncomment the plug-ins you do want to deploy. For example, if you don't want to install Status Updates plug-in, comment out the Status Updates plug-in. For example:

    ```
    <!-- Below is the Status Updates plug-in install block, comment it out if you don't want to install Status Updates plug-in. -->
    <!-- Status Updates -->
    <!--
    <feature action="install" id="com.ibm.lconn.statusupdates.feature" match="equivalent" shared="true" version="4.5.0.20130224-1730"/>
    -->
    <!-- Status Updates -->
    ```

3.  Click **setup.exe** to start the installation.


**Parent topic:**[HCL Connections Plug-ins for HCL Notes](../../connectors/admin/files_plugin_install_overview.md)

