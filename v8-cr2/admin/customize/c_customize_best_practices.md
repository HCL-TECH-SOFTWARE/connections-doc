# Customization best practices {#c_customize_best_practices .concept}

Use the following guidelines to help you to implement and manage customizations in your deployment of HCL Connections™.

Most of the changes that you make to product files are stored in the customization directory, the location of which is defined by the IBM® WebSphere® Application Server variable, CONNECTIONS\_CUSTOMIZATION\_PATH. It is best practice to make your customization changes within the customization directory only. Changes that cannot be made using the customization directory are known as product modifications.

The type of changes that you can make using the customization directory include:

-   Changes to static files, such as images, CSS, HTML, and text files.
-   Changes to real files, that is, files that are not generated at runtime and which get served directly to the browser.
-   Changes to JSP files using a standard include request, for example, `<jsp:include page="myjspfragment.jspf" .../>` and `<c:import url= myjspfragment.jspf/>`.

The following types of change cannot be made using the customization directory:

-   Changes to JSP files using the JSP include directive. For example: `<%@ include file="myjspfragment.jspf"%>`.
-   Changes to files within a Java™ Archive \(JAR\) file. For example, adding custom strings to the ui.properties file in the lc.profiles.web.app-3.0.jar archive to customize error messages for field validation.
-   Changes to Java classes \(Java class files\).
-   Changes to TAG files. These files are used in the Communities and Forums applications.
-   Changes to TLD files.
-   Changes to most XML configuration files in the WEB-INF directory. This includes web.xml.

## Customization guidelines { .section}

-   Keep your customization directory under source control to allow you to maintain it and track your changes over time.
-   Copy only the resources files that you want to modify to your customization directory. This makes it easier for you to track which files you changed and when.
-   Always add comments to your customized files to describe where and why changes were made.
-   Use a web inspector to help you to locate the CSS rules that you want to change. For example, Firebug on Mozilla Firefox, Webkit Inspector on Google Chrome or Apple Safari, or Weinre for Mobile.
-   Use documented, public APIs where possible.
-   Do not modify JSP files inside web modules or JAR files. Instead, use supported extension points where available, for example, for login pages or error pages, and so on.
-   Back up the customization directory before a product upgrade:

    1.  Rename the customization directory to a temporary name.
    2.  Apply the HCL Connections interim fix or fix pack.
    3.  Verify the functionality.
    4.  Compare the updated files to the customized copy and then merge the changes.
    5.  Change the name of the customization directory back to the original name.
    6.  Test your customizations.
    For more information, see [Saving your customizations](../migrate/c_configuration_changes_after_update.md).


**Parent topic:**[Customizing](../customize/c_customize_overview.md)

**Related information**  


[Customizing the user interface](../customize/t_admin_common_customize_main.md)

[Replacing images](../customize/t_customize_replace_logo.md)

[Saving your customizations](../migrate/c_configuration_changes_after_update.md)

