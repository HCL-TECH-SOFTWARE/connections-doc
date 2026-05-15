# Downloading the latest version of the Update Wizard \(updateInstaller\) {#t_im_upgrade .task}

Download the latest version of the Update Wizard \(updateInstaller\) from [My HCLSoftware](https://my.hcltechsw.com/).

-   The terms "Update Wizard" and updateInstaller are used interchangeably. On [My HCLSoftware](https://my.hcltechsw.com/), it's called "Update Wizard." while on the file system, it is called "updateInstaller." In the Connections user interface it is noted as "Update Wizard."

1.  Download the updated version as a zip file from [My HCLSoftware](https://my.hcltechsw.com/).

2.  Extract the contents of the downloaded zip file into a temporary location. The newly extracted Update Wizard will be in the following directory within the temporary location: temporaryLocation/HCL\_Connections\_Install/tools/updateInstaller

3.  Rename the current connections\_root/updateInstaller directory. For example, /opt/HCL/Connections/updateInstaller becomes /opt/HCL/Connections/updateInstaller\_backup

4.  Move the extracted **updateInstaller** directory and contents to the connections\_root location where the prior directory was located.

5.  Move existing fixes from connections\_root/updateInstaller\_backup/fixes to connections\_root/updateInstaller/fixes.


**Parent topic:** [Updating Connections 8.0 with the latest fixes](../migrate/c_updating_interim_fixes.md)

