# Customizing the branding strings and images for the desktop plug-in {#r_files_windows_ms_custom_branding .reference}

Customize the name strings and images that displays in the user interface and menus to provide a custom branding for the desktop plug-in

## Registry settings for branding strings { .section}

To display a name and image other than the default names and images for HCL Connections, you must edit the registry settings that control the display of names in the user interface and menus, and update paths to replace the default images with images that you provide.

|Keys: HKEY\_LOCAL\_MACHINE\\SOFTWARE\\IBM\\Social Connectors \(for 32-bit\)</br>or</br/>HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Wow6432Node\\IBM\\Social Connectors \(for 64-bit\)|Value \(data type REG\_SZ\)|Description|
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|-----------|
|Branding |Main Title |The default text that is used unless the specific Title registry entry exists for a rebranded area. For example, if ContextMenu Title exists for the shell extension, it overrides the value in Main Title. This string displays in the following places:<ul><li>Microsoft Office and Outlook ribbon</li><li>Microsoft Office Save & Send menu</li><li>Files monitor</li><li>Context menus \(menus that display when a user right-clicks an object\)</li></ul>|
|Branding\\ShellExt |ContextMenu Image |Provide the full path to a 13x13 pixel bmp file to replace the default IBM icon, for example: `c:\ibm\ibm-13x13.bmp`, in the context menu. If the image fails to load, the default image is used.  |
|Branding\\Office |Backstage SendTo Image |Provide the full path to a 32x32 pixel bmp file to replace the default IBM icon, for example: `c:\ibm\ibm-32x32.bmp`, in the save and send-to operations in Microsoft Office. If the image fails to load, the default image is used.  |
|Branding\\Outlook |ContextMenu ContactCard Image |Provide the full path to a 16x16 pixel bmp file to replace the default IBM icon, for example: `c:\ibm\ibm-16x16.bmp`, in the business card for Connections users. If the image fails to load, the default image is used.  |
|Branding\\Monitor |SystemTray Busy Image |Provide the full path to a 16x16 pixel icon file to replace the default IBM icon, for example: `c:\ibm\ibm-16x16busy.ico`, in the Windows system tray. This icon specifically represents the busy state when the monitor is working. If the image fails to load, the default image is used.  |
|Branding\\Monitor |SystemTray Idle Image |Provide the full path to a 16x16 pixel icon file to replace the default IBM icon, for example: `c:\ibm\ibm-16x16idle.ico`, in the Windows system tray. This icon specifically represents the idle state of the monitor. If the image fails to load, the default image is used.  |
|Branding\\Monitor |SystemTray Pending Image |Provide the full path to a 16 x16 pixel icon file to replace the default IBM icon, for example: `c:\ibm\ibm-16x16pending.ico`, in the Windows system tray. This icon specifically represents the pending state of the monitor. If the image fails to load, the default image is used.  |
|Branding\\Sync |Local Folder Name |Provide a string to replace the name of the local sync folder.  |
|Branding\\Sync |Local Folder Icon |Provide the full path to a 16 x16 pixel icon file to replace the default sync icon, for example: `c:\ibm\ibm-16x16newsync.ico`. If the image fails to load, the default image is used.  |

## 32-Bit namespace { .section}

Customize the settings in the following table for updating the branding strings and images for a 32-bit namespace.

|Key: HKEY\_CLASSES\_ROOT\\CLSID\\\{A0D85EDF-50B5-4B12-9D74-0D69E6729A11\}|Value \(data type REG\_SZ\)|Description|
|-------------------------------------------------------------------------|---------------------------|-----------|
| \(Default\) | |Provide the default text that is used in the namespace. The default is HCL Connections. Changing this string changes the name that displays in the main navigation in the Windows Explorer navigation pane.  |
|InfoTip| |Provide the text that is used in the Namespace InfoTip. This text displays when a user hovers over the namespace.  |
|DefaultIcon |\(Default\) |Provide the full path to a 256 x 256 pixel icon file, for example: c:\\ibm\\ibm-256x256.ico.  |

## 64-Bit namespace { .section}

Customize the settings in the following table for updating the branding strings and images for a 64-bit namespace.

|Key: HKEY\_CLASSES\_ROOT\\CLSID\\\{21034BDC-B57E-400b-A5D5-2B1E98502805\}|Value \(data type REG\_SZ\)|Description|
|-------------------------------------------------------------------------|---------------------------|-----------|
|\(Default\)| |Provide the default text that is used in the namespace. The default is HCL Connections. Changing this string changes the name that displays in the main navigation in the Windows Explorer navigation pane.  |
|InfoTip| |Provide the text that is used in the Namespace InfoTip. This text displays when a user hovers over the namespace.  |
|DefaultIcon |\(Default\) |Provide the full path to a 256 x 256 pixel icon file, for example: c:\\ibm\\ibm-256x256.ico.  |

**Parent topic:**[HCL Connections Desktop Plug-ins for Microsoft Windows](../../connectors/enduser/c_files_window_install_ovr.md)

