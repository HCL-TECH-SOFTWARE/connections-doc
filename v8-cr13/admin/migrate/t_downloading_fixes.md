# Downloading fixes {#downloadingfixes .task}

Download fixes from the [My HCLSoftware](https://my.hcltechsw.com/).

List all the fixes that are already installed by completing the following steps:

1.  Open a command line and change to the [connections\_root](../plan/i_ovr_r_directory_conventions.md)/updateInstaller directory.
2.  Run the following command to list installed fixes:

    updateSilent.sh\|bat -installDir connections\_root -fix -applications application\_name

    Where application\_name is one of the following HCL Connections™applications:

    -   activities
    -   blogs
    -   communities
    -   dogear
    -   files
    -   forums
    -   homepage
    -   metrics
    -   mobile
    -   moderation
    -   news
    -   profiles
    -   search
    -   wikis
    Use a comma or semicolon to delimit multiple applications. If you do not provide this variable, all installed fixes are listed.


To download fixes, complete the following steps.

1.  Refer to the [What's New in HCL Connections](../overview/i_ovr_r_whats_new_cr1.md) to review the latest new features in a release, gather download links, and look over update strategy information.

    **Note:** Refer to the Knowledge Article, [**Road map for Upgrading Connections**](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0076286) for additional information.

2.  From the [My HCLSoftware](https://my.hcltechsw.com/), find or select the product **Connections**.

<!--3.  Select your currently installed version from the **Installed Version** drop-down menu, then select your platform from the **Platform** menu, and click **Continue**.-->

4.  Use one of the available search methods to identify the fix that you want to install.

5.  Follow the online instructions to download the fix to a temporary directory.

6.  Extract the contents of the fix file and then copy the extracted files to the following directory:

    -   Linux: [connections\_root](../plan/i_ovr_r_directory_conventions.md)/updateInstaller/fixes
    -   Microsoft Windows: [connections\_root](../plan/i_ovr_r_directory_conventions.md)\\updateInstaller\\fixes

    !!! note 
        
        If a fixes subdirectory does not already exist in the update directory, create it. You need to specify this directory when you install fixes.


**Parent topic:** [Updating Connections 8.0 with the latest fixes](../migrate/c_updating_interim_fixes.md)

