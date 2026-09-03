# Customizing the branding strings and images for the desktop plug-in {#r_files_windows_ms_custom_branding .reference}

Customize the name strings and images that displays in the user interface and menus to provide a custom branding for the desktop plug-in

## Registry settings for branding strings { .section}

To display a name and image other than the default names and images for HCL Connections, you must edit the registry settings that control how names are displayed in the user interface and menus, and update file paths to replace the default images with custom images.

## Registry configuration paths

Depending on your system architecture, apply the following registry keys to the appropriate path:

* **32-bit Windows:** 
````sh
    HKEY_LOCAL_MACHINE\SOFTWARE\IBM\Social Connectors
````

* **64-bit Windows:** 
````sh
    HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\IBM\Social Connectors
````

| Registry Subkey | Value Name (REG_SZ) | Description |
| :--- | :--- | :--- |
| `Branding` | Main Title | The default text used unless a more specific title registry entry exists for a rebranded area. <br><br>For example, if `ContextMenu Title` exists for the shell extension, it overrides `Main Title`. This string appears in the following locations:<ul><li>Microsoft Office and Outlook ribbon</li><li>Microsoft Office **Save & Send** menu</li><li>Files monitor</li><li>Context menus (displayed when right-clicking an object)</li></ul> |
| `Branding\ShellExt` | ContextMenu Image | The full path to a 13×13 pixel `.bmp` file used to replace the default IBM icon in the context menu (for example, `c:\ibm\ibm-13x13.bmp`). If the image fails to load, the system uses the default image. |
| `Branding\Office` | Backstage SendTo Image | The full path to a 32×32 pixel `.bmp` file used to replace the default IBM icon in Microsoft Office **Save & Send** operations (for example, `c:\ibm\ibm-32x32.bmp`). If the image fails to load, the system uses the default image. |
| `Branding\Outlook` | ContextMenu ContactCard Image | The full path to a 16×16 pixel `.bmp` file used in the Connections business card for Outlook users (for example, `c:\ibm\ibm-16x16.bmp`). If the image fails to load, the system uses the default image. |
| `Branding\Monitor` | SystemTray Busy Image | The full path to a 16×16 pixel `.ico` file used in the Windows system tray to indicate the busy state (for example, `c:\ibm\ibm-16x16busy.ico`). If the image fails to load, the system uses the default image. |
| `Branding\Monitor` | SystemTray Idle Image | The full path to a 16×16 pixel `.ico` file used in the Windows system tray to indicate the idle state (for example, `c:\ibm\ibm-16x16idle.ico`). If the image fails to load, the system uses the default image. |
| `Branding\Monitor` | SystemTray Pending Image | The full path to a 16×16 pixel `.ico` file used in the Windows system tray to indicate the pending state (for example, `c:\ibm\ibm-16x16pending.ico`). If the image fails to load, the system uses the default image. |
| `Branding\Sync` | Local Folder Name | A string used to replace the name of the local sync folder. |
| `Branding\Sync` | Local Folder Icon | The full path to a 16×16 pixel `.ico` file used to replace the default sync icon (for example, `c:\ibm\ibm-16x16newsync.ico`). If the image fails to load, the system uses the default icon. |

## 32-Bit namespace { .section}

Customize the settings in the following table to update branding strings and images for a 32-bit namespace.

| Registry key: `HKEY_CLASSES_ROOT\CLSID\{A0D85EDF-50B5-4B12-9D74-0D69E6729A11}` | Value (REG_SZ) | Description |
|---|---|---|
|  | `(Default)` | Specifies the default text used in the namespace. The default value is `HCL Connections`. Changing this string changes the name displayed in the main navigation area of the Windows Explorer navigation pane. |
|  | `InfoTip` | Specifies the text displayed in the namespace InfoTip when a user hovers over the namespace. |
| `DefaultIcon` | `(Default)` | Specifies the full path to a 256×256 ICO file (for example, `c:\ibm\ibm-256x256.ico`). |

## 64-Bit namespace { .section}

Customize the settings in the following table to update branding strings and images for a 64-bit namespace.

| Registry key: `HKEY_CLASSES_ROOT\CLSID\{21034BDC-B57E-400b-A5D5-2B1E98502805}` | Value (REG_SZ) | Description |
|---|---|---|
|  | `(Default)` | Specifies the default text used in the namespace. The default value is `HCL Connections`. Changing this string changes the name displayed in the main navigation area of the Windows Explorer navigation pane. |
|  | `InfoTip` | Specifies the text displayed in the namespace InfoTip when a user hovers over the namespace. |
| `DefaultIcon` | `(Default)` | Specifies the full path to a 256×256 ICO file (for example, `c:\ibm\ibm-256x256.ico`). |

**Parent topic:**[HCL Connections Desktop Plug-ins for Microsoft Windows](../../connectors/enduser/c_files_window_install_ovr.md)
