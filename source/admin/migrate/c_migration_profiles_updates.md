# Post-migration steps for profile types and profile policies {#c_migration_profiles_updates .concept}

In migrating to this release, there are significant changes to Profiles configuration that should be validated. In prior releases, the layout of the profile and the underlying data model were defined in the profiles-config.xml file. In this release, the data model for profile-type definitions has been moved into a dedicated profiles-types.xml file and the rules for presentation of a profile have been moved into a set of FreeMarker template files.

It is important to understand how the default migration for each file works to validate the results for your environment:

-   profiles-types.xml file

    This file was introduced in Connections 4.0 and identifies the set of properties associated with each profile-record based on its associated profile-type.

    A profile-type declaration is generated on the previous data in the profiles-config.xml file using the following procedure:

    -   For each apiModel element previously defined in the profiles-config.xml, a corresponding profile-type is declared with the associated properties. A property is identified as editable or hidden in the new file based on the original definition.
    -   For each profileLayout element previously defined in the profiles-config.xml, a corresponding profile-type is declared or merged with the definition derived from the apiModel. A property is identified as editable, hidden, or rich-text based on the original definition.
    If your deployment associates a profile-record with a profile-type that was not previously declared in profiles-config.xml, you must manually define your type in the generated profiles-types.xml to make the system aware of the properties to be associated with that type. Finally, it is possible that you reference profile-type identifiers in either the profiles-policy.xml or widgets-config.xml file that were not previously declared in profiles-config.xml. You must manually declare these profile-type definitions in the generated profiles-types.xml to enumerate the set of properties to be leveraged at run-time.

    For more information, see [Profile-types](../customize/r_admin_profiles_ovr_types.md).

-   User interface template files \(profileEdit.ftl, profileDetails.ftl, searchResults.ftl, businessCardInfo.ftl\)

    A set of template files now control the rendering of a profile record in the user interface.

    Each template file is generated based on previous layout definitions present in the prior release profiles-config.xml file.

    -   profileDetails.ftl – This file is generated using the profileLayout elements from the prior profiles-config.xml file. It controls rendering of attributes on the main profile page.
    -   profileEdit.ftl – This file is generated using the profileLayout elements from the prior profiles-config.xml file. It controls rendering the input controls when editing your profile.
    -   searchResults.ftl – This file is generated using the searchResultsLayout elements from the prior profiles-config.xml file. It controls rendering profiles in the directory search and report-to chain application views.
    -   businessCardInfo.ftl – This file is generated using the businessCardLayout elements from the prior profiles-config.xml file. It controls the display of profile properties on the business card.
    The migrated template files should preserve the behavior of the previous releases layout definitions, but it is recommended that you review the generated template file, and leverage the features of the FreeMarker template language to simplify the result of each migrated file. If there were multiple profile-type layouts defined, each migrated file will have a set of if-elseif-else logic to handle profile-type specific rendering behavior. It is often the case that there were common rendering semantics across profile-type layout definitions, and as a result the migrated file may appear to have redundant content that can be removed or cleaned up.

    For more information, see [Customizing display using templates](../customize/t_admin_profiles_customize_biz_card_main.md).

-   LotusConnections-config.xml

    If your Profiles customization included custom strings, ensure that your custom resource bundle is properly registered in the LotusConnections-config.xml file and that you have manually applied your custom resource bundle to the target deployment.

    For more information, see [Adding custom strings for widgets and other scenarios](../customize/t_admin_profiles_add_custom_strings.md).

    **Note:** Be sure to check the url and port in the LotusConnections-config.xml file.

-   profiles-policy.xml

    If you have modified this file in prior releases, your must manually update it again with the same changes, or copy and replace the profiles-policy.xml file in the target release.


