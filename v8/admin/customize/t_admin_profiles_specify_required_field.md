# Specifying a custom field as required and declaring maximum field length {#t_admin_profiles_specify_required_field .task}

You can make a custom field a required field by editing the validation.xml file. You must declare a maximum length definition for all custom fields.

**Note:** When upgrading to a newer HCL Connections™ release, be aware that custom fields are not included in the migration tools for the standard Connections configuration files. As well, the validation.xml file is also not automatically migrated when you upgrade from an earlier release of Connections. This file is needed by the Struts validation framework and is accessed at Connections startup. To ensure that your custom fields and files are usable after a release upgrade, see [Saving your customizations](../migrate/c_configuration_changes_after_update.md).

HCL Connections is built on Struts, allowing you to leverage the Struts validation framework to validate form data. The files validation.xml and validation-rules.xml are both part of the Struts validation framework. The validation.xml file defines the validation types that are applied to form fields; validation-rules.xml defines a set of standard validation routines. Validation routines, such as required and maximum length, are included in the validation framework.

All custom extension attributes must have a maximum length definition to ensure that values are within the limits of the database.

1.  To make a custom extension field a required field, perform the following steps.
2.  Save a copy of the was\_profile\_root\\installedApps\\cell\_name\\profiles.ear\\lc.profiles.app.war\\WEB-INF\\validation.xml file.

3.  Open the file in a text editor, and specify your validation requirements using the information in the following table.

    |Attribute|Role|
    |---------|----|
    |property|The name of the field that you want to make required. You obtain the field name by viewing the source of the rendered page.|
    |depends|The name of the validation to run.|
    |msg name|Overrides the default required error message. This value matches the validator's name attribute.|
    |msg key|The message to be displayed if the validation fails. The key in the property file contains the error message to display if validation fails. You need to add the key to the property file.|

    For example, to specify the maximum length of the custom extension attribute:

    ```
    <field property="attribute(school)" depends="maxbytelength,nonce">
    <msg name="maxbytelength" key="errors.maxlength" /> 
    <arg position="0" name="maxbytelength" key="label.editprofile.contactinformation.school" />
    <arg position="1" name="maxbytelength" key="(maxbytelength)" resource="false" />
    <var>
    <var-name>maxbytelength</var-name>
    <var-value>16</var-value>
    </var>
    <var>
    <var-name>subEditForm</var-name>
    <var-value>contactInfo</var-value>
    </var>
    ```

    For example:

    ```
    <form-validation>
     <formset>
      <form name="editProfileForm">
       <field property="attribute(contactInformation.extattr.property1)" depends="required">
        <msg name="required" key="errors.required" />
       </field>
       <field property="attribute(associatedInformation.description)" depends="maxlength">
        <msg name="maxlength" key="errors.aboutMe" />
         <var>
          <var-name>maxlength</var-name>
          <var-value>1500</var-value>
         </var>
       </field>
    ```

4.  Add the following code to the validation.xml file to enable the Struts validator to recognize the tab that you are editing.

    ```
    <var>
       <var-name>subEditForm</var-name>
       <var-value>sectionName</var-value>
    </var>
    ```

    where sectionName is one of the following values:

    -   contactInfo. For contact or job information fields.
    -   aboutMe. For associated information fields.
    For example:

    ```
    <form-validation>
     <formset>
      <form name="editProfileForm">
       <field property="attribute(contactInformation.extattr.property1)" depends="required">
        <msg name="required" key="errors.required" />
       ** <var\>
          <var-name\>subEditForm</var-name\>
          <var-value\>contactInfo</var-value\>
         </var\>**
       </field>
       <field property="attribute(associatedInformation.description)" depends="maxlength">
        <msg name="maxlength" key="errors.aboutMe" />
         <var>
          <var-name>maxlength</var-name>
          <var-value>1500</var-value>
         </var>
         **<var\>
          <var-name\>subEditForm</var-name\>
          <var-value\>aboutMe</var-value\>
         </var\>**
       </field>
    ```

    **Note:** These section identifiers also relate to the profileEdit.ftl display template as described in [Customizing edit display fields](t_admin_profiles_tbl_fields.md). The display sections specified in the profileEdit.ftl file must correspond to the section name defined in the validator attributes.

5.  Define a label for the required field. To do so, make a note of the ID of the extension, which is the value after .extrattr. in the attribute definition for the field.

    For example, the value for this field is property1:

    ```
    <field property="attribute(contactInformation.extattr.**property1**)" ...>
    ```

    Set the extensionIdRef attribute of the <extensionAttribute\> element to define the field in the profiles-config.xml file equal to the value you noted here. See [Enabling custom extension attributes for Profiles](t_admin_profiles_enable_custom_fields.md) for more details.

    **Note:** Do not hide any required attribute fields; if a user edits their profile contact information and required field information is hidden for that user type, the edited profile form cannot be saved.

    You should define a label for any custom fields that you add, but it is especially important to define a label for a required field because if the user does not enter a value in the field, but tries to save the form, a message is displayed telling them that x is required, where x is the field label. If you do not define a label for the field, the term null is used instead. As a result, users will see a null is required message when they try to save the page, and will not know which field to fill in before they can save the page successfully.


**Parent topic:**[Customizing the Profiles data model](../customize/r_admin_profiles_attributes.md)

**Related information**  


[Enabling custom extension attributes for Profiles](../customize/t_admin_profiles_enable_custom_fields.md)

[Saving your customizations](../migrate/c_configuration_changes_after_update.md)

