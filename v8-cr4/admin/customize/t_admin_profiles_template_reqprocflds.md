# Configuring required fields for processing {#t_admin_profiles_template_reqprocflds .task}

Edit the profiles-config.xml file to configure additional required fields for template processing.

When rendering the profile details or edit form templates, all the information about a user profile is retrieved and made available to the template’s author. This enables you to reference the additional data required for your templates.

To optimize system performance, you can use a limited set of data to render the profile business card and profile search results pages if the application templates do not require these fields.

|Template data|Description|
|-------------|-----------|
|codes

|The application will resolve the related fields for work location, organization, and department information so it may be used in the template.

|
|extensions

|The application will resolve all simple and rich text extension fields for the profile. XML extension fields are not currently made available to the template author.

|
|secretary

|The application will resolve the secretary name and email address if the profile has an associated secretary.

|
|manager

|The application will resolve the manager name and email address if the profile has an associated manager.

|
|connection

|The application will resolve the connection status between the profile and the user viewing the profile. This is only supported for the businessCardInfo template.

|

1.  Open the profiles-config.xml file using a text editor.

2.  Locate the `<template/>` element for the business card or search results.

3.  Add a `<templateData/>` element with one of the required template data values to the template elements `<templateDataModel/>` container.

    For example, the following configuration states that when rendering the business card template, all the profile record data including resolved codes, extension values, secretary, manager, and connection information is resolved for use by the template code.

    ```
    <template name="businessCardInfo">
     <templateDataModel>
      <templateData>codes</templateData>
      <templateData>extensions</templateData>
      <templateData>secretary</templateData>
      <templateData>manager</templateData>
      <templateData>connection</templateData>
     </templateDataModel>
    </template>
    ```

4.  Save your changes.

5.  Check in the configuration update.

6.  Restart the application.


**Parent topic:**[Template configuration options](../customize/c_admin_template_config.md)

