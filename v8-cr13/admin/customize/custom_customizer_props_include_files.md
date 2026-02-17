# Managing file resources used in the "include-files" property {#custom_customizer_props_include_files .concept}

The include-files payload property lists one or more files to be inserted into the response so that the display is modified when it is returned to the HCL Connections™ user.

## Where do include-files reside? { .section}

Any files declared in the include-files property list must be stored on the Storage node in the /pv-connections/customizations directory.

<!--For more information on configuring persistent volumes in Connections, see [Setting up persistent volumes on a high availability deployment \(NFS\)](../install/r_Orient_Me_setup_pers_vols_HA.md).-->

## How do you add your own include-files to Connections? { .section}

Complete the following steps to upload your own include-files to Connections:

1.  Open an FTP connection to the Storage node.
2.  On the Storage node, navigate to the /pv-connections/customizations directory.
3.  Copy your files to the customizations directory.

Your files are now available to be accessed by Connections Customizer.

**Parent topic:**[Customizer-specific properties](../customize/custom_customizer_props.md)

