# Creating a simple profile data model and template customization {#t_admin_profiles_tbl_custombiz .task}

This example demonstrates the required steps for customizing the profile data model and template files to complete a simple customization.

In this example, an administrator adds an Education section to the master profile page. The new section is available to all users and contains the following new fields:

-   College – simple text input field for college name
-   High School – simple text input field for high school name
-   Publications – rich text field to describe any patents or publications, for example linking and attachments are allowed in this field

Profile owners can edit these fields on their Edit Profile page. The fields are searchable.

For more information about the wsadmin client that is used to change these settings, see [Customizing display using templates](t_admin_profiles_customize_biz_card_main.md).

1.  Modify LotusConnections-config.xml to register your custom resource bundle to provide new labels for your custom properties by adding the following into the <resources/\> section.

    ```
    	<widgetBundle prefix="customBundle" name="com.example.resources.customBundle"/>
    ```

    **Note:** For related information, see [Extension properties in the data model](r_admin_profiles_attributes_ext.md).

2.  Declare the new extension properties in the profiles-config.xml file.

    ```
    		 <profileExtensionAttributes>
    		 		 <!-- sample extension -->
    		 		 <simpleAttribute extensionId="highSchool" length="256"/>
    		 		 <simpleAttribute extensionId="college" length="256"/>
    		 		 <richtextAttribute extensionId="publications" maxBytes="1000000"/>
    		 </profileExtensionAttributes>
    ```

    **Note:** For related information, see [Profile-types](r_admin_profiles_ovr_types.md).

3.  Declare the usage of a custom resource bundle in the profiles-config.xml file that is used for custom property labels in your template files.

    ```
    <templateNlsBundles>customBundle</templateNlsBundles>
    ```

    **Note:** For related information, see [Customizing profile page display](t_admin_profiles_tbl_layout.md).

4.  Create a file in IBM\_Connections\_Customization\_Dir/stringscalled com.example.resources.customBundle.properties and add the following key/value pairs.

    ```
    Education=Education
    label.highSchool=High School:
    label.college=College:
    label.publications=Publications:
    ```

    **Note:** For related information, see [Configuring template custom resource bundles for processing](t_admin_profiles_template_crbundles.md).

5.  Add properties to the associated profile-type definition by editing profiles-types.xml. For example, add the following to the default profile type definition.

    ```
    		 <property>
    		 		 <ref>college</ref>
    		 		 <updatability>readwrite</updatability>
    		 		 <hidden>false</hidden>
    		 		 <fullTextIndexed>true</fullTextIndexed>
    		 </property>		 		 
    		 <property>
    		 		 <ref>highSchool</ref>
    		 		 <updatability>readwrite</updatability>
    		 		 <hidden>false</hidden>
    		 		 <fullTextIndexed>true</fullTextIndexed>
    		 </property>		 		 
    		 <property>
    		 		 <ref>publications</ref>
    		 		 <updatability>readwrite</updatability>
    		 		 <hidden>false</hidden>
    		 		 <fullTextIndexed>true</fullTextIndexed>
    		 </property>   
    ```

    **Note:** For related information, see [Configuring profile types for widget layout](t_admin_profiles_add_profile_type.md).

6.  Modify profileDetails.ftl to define a custom section for the new information that renders the fields with labels from your custom resource bundle.

    ```
    <#-- for custom scenario -->
    <@util.renderSection sectionLabel="education">
    		 <div class="lotusSectionBody">
    		 		 <table class="lotusVertTable">
    		 		 		 <tbody>		 		 
        <@util.renderProperty ref="highSchool" nlsBundle="customBundle" nlsKey="label.highSchool" 
    hideIfEmpty=false ; ref, dataId, dataKey, nlsKey, nlsBundle>		 		 		 		 		 		 		 
    		 <tr>
    		 		 <th scope="row">
    		 		 <@util.renderNls nlsKey=nlsKey nlsBundle=nlsBundle/> 		 		 		 
    		 		 </th>
    		 		 <td>
    		 		 		 <@util.renderValue ref=ref/>		 		 		 
    		 		 </td>
    		 </tr>		 		 		 		 		 		 
        </@util.renderProperty>		 		 		 		 		 
        <@util.renderProperty ref="college" nlsBundle="customBundle" nlsKey="label.college" 
    hideIfEmpty=false ; ref, dataId, dataKey, nlsKey, nlsBundle>		 		 		 		 		 		 		 
    		 <tr>
    		 		 <th scope="row">
    		 		 <@util.renderNls nlsKey=nlsKey nlsBundle=nlsBundle/> 		 		 		 
    		 		 </th>
    		 		 <td>
    		 		 		 <@util.renderValue ref=ref/>		 		 		 
    		 		 </td>
    		 </tr>		 		 		 		 		 		 
        </@util.renderProperty>		 
        <@util.renderProperty ref="publications" nlsBundle="customBundle" nlsKey="label.publications" 
    hideIfEmpty=false ; ref, dataId, dataKey, nlsKey, nlsBundle>		 		 		 		 		 		 		 
    		 <tr>
    		 		 <th scope="row">
    		 		 <@util.renderNls nlsKey=nlsKey nlsBundle=nlsBundle/> 		 		 		 
    		 		 </th>
    		 		 <td>
    		 		 		 <@util.renderValue ref=ref/>		 		 		 
    		 		 </td>
    		 </tr>		 		 		 		 		 		 
       </@util.renderProperty>		 		 		 
    		 		 		 </tbody>
    		 		 </table>		 		 		 		 
    		 </div>
    		 
    </@util.renderSection>
    ```

    **Note:** For related information, see [Customizing edit display fields](t_admin_profiles_tbl_fields.md).

7.  Edit widgets-config.xml to define the new widget definition to present the data, associate it with your custom resource bundle, and add the widget to the profileView page.

    **Note:** The widget definition and reference ID cannot be repeated.

    ```
    ...
    <widgetDef defId="Education" url="{contextRoot}/widget-catalog/profile-details.xml?version={version}" 
    modes="view fullpage" helpLink=
    "{helpSvcRef}/topic/com.ibm.lotus.connections.profiles.help/c_pers_profiles.html" 
    bundleRefId="customBundle">
    <itemSet>
    <item name="section" value="education"/>
    </itemSet>
    </widgetDef> 
    ....
    <page pageId="profilesView">
    <widgetInstance uiLocation="col2" defIdRef="multiWidget" instanceId="tabsWidget1"/>
    <widgetInstance uiLocation="tabsWidget1" defIdRef="Education"/>
    <widgetInstance uiLocation="tabsWidget1" defIdRef="Updates"/>
    <widgetInstance uiLocation="tabsWidget1" defIdRef="contactInfo"/>
    <widgetInstance uiLocation="tabsWidget1" defIdRef="backgroundInfo"/>
    ...
    </page>
    ```

8.  Edit the profileEdit.ftl file to allow the user to edit the field values by adding the following to the end of the contactInformation and associatedInformation sections.

    ```
    <@util.renderSection sectionLabel="contactInformation">
    	...    		 		 
    	<@util.renderFormControl ref="highSchool" singleColumnLayout=false nlsBundle="customBundle" 
    nlsKey="label.highSchool"/>
    		 
    	<@util.renderFormControl ref="college" singleColumnLayout=false nlsBundle="customBundle" 
    nlsKey="label.college"/>
    		 
    </@util.renderSection>   		 		 		 		 		 		 		     
        
    <@util.renderSection sectionLabel="associatedInformation">
    	...
    		 		  		 		 
    	<@util.renderFormControl ref="publications" singleColumnLayout=true nlsBundle="customBundle" 
    nlsKey="label.publications"/>		 		 		 
    		 
    </@util.renderSection> 
    ```

9.  Restart the server. View your changes on the profile page and profile edit form.

10. Stop the server and make the following changes to make the High School field required when making edits in the web interface.

11. Save a copy of the was\_profile\_root\\installedApps\\cell\_name\\profiles.ear\\lc.profiles.app.war\\WEB-INF\\validation.xml file.

12. Open the file in a text editor and add the following field validation syntax to the <form/\> section. Save the file, and ensure that your changes are pushed to each node in a cluster.

    ```
    			<field property="attribute(highSchool)" depends="required,nonce">
    				<msg name="required" key="errors.required" /> 
    				<arg position="0" name="required" key="label.editprofile.highSchool" />
    				<var>
    					<var-name>subEditForm</var-name>
    					<var-value>contactInfo</var-value>
    				</var>
    			</field>
    ```

13. Open the installedApps/Profiles.ear/lc.profiles.app.war/WEB-INF/lib/lc.profiles.web.app.jar: com/ibm/lconn/profiles/strings/ui.properties file. Extract the version of each resource file for each locale and save a copy for each locale using the following sample as a guide.

    ```
    IBM\_Connections\_Customization\_Dir/strings/com.ibm.lconn.profiles.strings.ui.properties 
    ```

14. Edit the properties file for each locale, and add the following key and value pair for locale.

    ```
    label.editprofile.highSchool=High School
    ```

15. Restart the server and go to a user profile for edit. The High School field is now required and the error message is applied with your custom field label key.


**Parent topic:**[Customizing Profiles](../customize/c_admin_profiles_customizing.md)

**Related information**  


[Customizing profile page display](../customize/t_admin_profiles_tbl_layout.md)

[Customizing edit display fields](../customize/t_admin_profiles_tbl_fields.md)

[Configuring template custom resource bundles for processing](../customize/t_admin_profiles_template_crbundles.md)

[Configuring profile types for widget layout](../customize/t_admin_profiles_add_profile_type.md)

[Extension properties in the data model](../customize/r_admin_profiles_attributes_ext.md)

[Enabling custom extension attributes for Profiles](../customize/t_admin_profiles_enable_custom_fields.md)

[Customizing the Profiles data model](../customize/r_admin_profiles_attributes.md)

