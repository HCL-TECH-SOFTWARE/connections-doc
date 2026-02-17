# Performing a silent installation {#t_files_windows_silent_install .task}

Administrators can silently upgrade or install HCL Connections for Mac from the Terminal application. User notification is disabled during the silent installation, except in error cases such as notification of failed prerequisites.

A silent installation uses the same installation program that the graphical user interface \(GUI\) version uses. However, instead of displaying a wizard interface, the silent installation reads all of your responses from parameters that you pass to the command line. In order for the installation to work successfully, you must run the silent installation from the directory where you extracted the plug-in files. You must be running OS X 10.8 or later.

1.  Download the plug-in from the HCL Connections Cloud

    [download package](http://public.dhe.ibm.com/software/dw/ibm/connections/IBMConnectionsMac.zip) or from the IBM® Connections catalog at the following website:[https://xspy.mybluemix.net/](https://xspy.mybluemix.net/).

2.  Extract the file.

3.  Open a Terminal window and navigate to the directory where you saved IBMConnectionsMac.pkg.

4.  Type `sudo Installer -pkg <package name> -target <destination volume>`.


**Parent topic:**[HCL Connections for Mac](../../connectors/enduser/msdesktop_mac_over.md)

