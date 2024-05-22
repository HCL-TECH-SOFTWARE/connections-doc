# Touchpoint configuration properties {#tp_r_touchpoint_config_properties .reference}

Configuration properties in the touchpoint-config.xml file control how users interact with the Touchpoint onboarding feature in HCL Connections.

## Modifying configuration properties { .section}

Modify properties by editing the touchpoint-config.xml file directly. When you modify a property, ensure that you apply the following guidelines:

-   Enabled properties must have a value of either `true` or `false`.
-   Number values must be integers.

You can modify the following configuration properties. The location of the touchpoint-config.xml is similar to the following sample location:

/opt/IBM/WebSphere/AppServer/profiles/Dmgr01/config/cells/Cell01/LotusConnections-config/touchpoint-config.xml

## General properties { .section}

uiEnabled
:   Determines whether the Touchpoint onboarding feature is displayed to users when they first log in to Connections. The default value is `false`. Setting this value to `true` enables the onboarding experience: users are either directed to set up their profiles, or \(if enabled\) first asked to read and acknowledge the company privacy policy and guidelines.

    **Note:** This is the only property change required to start Touchpoint for users if you are keeping all of the defaults for other properties.

contentDirectory
:   The directory that stores Touchpoint-related data. The default value is `${placeholder}`.

defaultPath
:   Defines the views that internal users are guided through in the onboarding experience. The default value is `welcome,editProfile,profileTags,findColleagues,followCommunities`.

icExternalPath
:   Defines the views that external users are guided through in the onboarding experience. The default value is `welcome,editProfile,profileTags`.

order
:   Defines the order in which the various views are displayed. The default value is `welcome,editProfile,profileTags,findColleagues,followCommunities`.

pagStandalone
:   Defines the view that users are directed to during a privacy policy and guidelines update. The default value is `pagStandalone`.

templateFile
:   The landing page that users first see \(the "welcome" view\). The default value is templates/welcome.html.

welcomeVideoUrl
:   Link to a welcome video that is displayed to users. For more information, see [Adding a welcome video to Touchpoint](tp_t_add_welcome_video.md).

## Privacy policy and guidelines properties { .section}

enabled
:   Prompts user to accept the privacy policy and guidelines as defined by the following properties in this section. The default value is `false`.

version
:   The version of the privacy policy and guidelines that the user will accept. The default value is `1.0`. When the document is updated, increasing this value requires the user to accept again.

internalLink
:   The link to the document that contains the privacy policy and guidelines for internal users.

externalLink
:   The link to the document that contains the privacy policy and guidelines for external users.

## Properties for promoting colleagues and communities to users { .section}

maxPromotedExperts
:   The maximum number of colleagues to be suggested to a user as network contacts. The default value is `3`.

promotedExperts
:   A comma-separated list of colleagues within your Connections organization, identified by their user-id. The default value is `3`.

maxPromotedCommunities
:   The maximum number of communities to be suggested to a user. The default value is `3`.

promotedCommunities
:   A comma-separated list of communities, identified by their community-id.

## Orient Me properties { .section}

enabled
:   If Orient Me is deployed, defines whether the Touchpoint experience should include Orient Me features, such as the user's being able to mark people and communities as "Important to Me" during onboarding. The default value is `false`.

socialCtxRoot
:   The URL context root for Orient Me. The default value is `/social`.

itmCtxRoot
:   The URL context root for the Important to Me API. The default value is `/itm`.

**Parent topic:**[Post-installation tasks for Connections Touchpoint](../install/c_post-install_tasks_for_touchpoint.md)

