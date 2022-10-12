# Customizing images {#c_customize_images .concept}

You can update the images used in HCL Connections™ to suit the needs of your organization. For example, you can replace the IBM® logo with your company logo, or customize the sprited images and file type icons that are used in the product interface to fit with your company's branding.

**Note:**

When HCL Connections encounters a new image, it attempts to rewrite the URI to the resource. This behavior cannot be changed. Therefore, you can no longer use relative paths in your CSS to identify the location of your images. Instead, you must now provide a full path to the images so that the server can find them.

Example:

```
Using a custom image in CSS
.lotusui30 .lotusBanner .lotusLogo {
background-image: url("/com.ibm.lconn.core.styles.oneui3/gen4Theme/images/logo.png");
height: image_heightpx;
width: image_widthpx;
}
```

All of your existing themes must be updated if you plan to use them in HCL Connections.

-   **[Replacing images](../customize/t_customize_replace_logo.md)**  
Customize the product by replacing images specific to HCL Connections with your own company images.
-   **[Changing the HCL Connections logo](../customize/t_customize_change_logo.md)**  
To customize HCL Connections to reflect the look and feel of your organization, specify a CSS override that replaces the HCL Connections logo with your company logo.
-   **[Customizing file type icons](../customize/t_admin_files_customize_icons.md)**  
You can add new file extensions to an existing file type icon, or add a new file extension with a new icon. Custom file type icons display in the Activities, Files, and Communities applications. They also display in the activity stream.

**Parent topic:**[Customizing the user interface](../customize/t_admin_common_customize_main.md)

