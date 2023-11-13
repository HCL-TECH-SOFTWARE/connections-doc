# Downloading the latest version of the Update Wizard \(updateInstaller\) {#t_im_upgrade .task}

Download the latest version of the Update Wizard \(updateInstaller\) from the HCL Connections™ HCL License & Delivery Portal.

A CFix requires that we replace the updateInstaller with a new version downloaded from the HCL License & Delivery Portal. Refer to the [**Update Strategy for HCL Connections 7.0**](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0086997) for additional information.

-   HCL Connections v7.0 Update Wizard \(2104\) has been enhanced to support replacing application ears files in interim fixes \(iFixes\) and the HCL Connections v7.0 Update Wizard \(2104\) is required to install Cumulative Fixes.
-   The terms "Update Wizard" and updateInstaller are used interchangeably. On the HCL License & Delivery Portal, it's called "Update Wizard." while on the file system, it is called "updateInstaller." In the Connections user interface it is noted as "Update Wizard."

1.  Download the updated version as a zip file from the HCL License & Delivery Portal.

2.  Extract the contents of the downloaded zip file into a temporary location. The newly extracted Update Wizard will be in the following directory within the temporary location: temporaryLocation/HCL\_Connections\_Install/tools/updateInstaller

3.  Rename the current connections\_root/updateInstaller directory. For example, /opt/HCL/Connections/updateInstaller becomes /opt/HCL/Connections/updateInstaller\_backup

4.  Move the extracted **updateInstaller** directory and contents to the connections\_root location where the prior directory was located.

5.  Move existing fixes from connections\_root/updateInstaller\_backup/fixes to connections\_root/updateInstaller/fixes.


**Parent topic:**[Updating Connections 8.0 with the latest fixes](../migrate/c_updating_interim_fixes.md)

