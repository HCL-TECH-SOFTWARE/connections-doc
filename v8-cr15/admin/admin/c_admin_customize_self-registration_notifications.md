# Customizing notifications for self-registering users {#c_admin_customize_self-registration_notifications .concept}

You can customize the content of the email notifications related to the self-registration feature by copying the relevant source files, saving them in the appropriate customization directory, and editing the files that correspond to notifications you want to change. As the source files are provided in different languages, you can also customize the notifications in those languages.

## General directory information { .section}

The source files for all following customization options are in the following installation directory for the self-registration feature: `app_server_root/profiles/profile_root/installedApps/cell_name/Invite.ear/` \(hereafter referred to as the invite\_install directory\)

Copy the source files that you want to edit to the customization directory defined in selfregistration-config.xml. By default this directory is the invite directory in the Connections customization path as described in [Determining where to save your customizations](https://help.hcltechsw.com/connections/v7/admin/customize/t_customize_find_custom_directory.html). Hereafter, this directory is referred to as invite\_customization.

## Customizing email notifications { .section}

The files to customize email notifications related to self-registration are in the following installation directory: `invite_install/invite.util.jar:/com/ibm/lconn/registration/templates/`

Copy the files that you want to edit to `invite_customization/templates` directory and modify as needed.

The following table lists which file is used for the respective type of mail notification.

|File Name|Content of Email Notification|
|---------|-----------------------------|
|`INVITE_NOTIFICATION_TO_INVITEE_MAIL_BODY.ftl`|Invitation to guest to join Connections|
|`INVITE_NOTIFICATION_TO_INVITEE_MAIL_SUBJECT.ftl`|Subject line of invitation|
|`REGISTRATION_NOTIFICATION_TO_INVITEE_MAIL_BODY.ftl`|Registration notification to a guest|
|`REGISTRATION_NOTIFICATION_TO_INVITEE_MAIL_SUBJECT.ftl`|Subject line of registration notification|
|`REGISTRATION_NOTIFICATION_TO_INVITER_MAIL_BODY.ftl`|Registration notification to a user who initiated the invitation|
|`REGISTRATION_NOTIFICATION_TO_INVITER_MAIL_SUBJECT.ftl`|Subject line of registration notification to a user who initiated the invitation|
|`REGISTRATION_NOTIFICATION_TO_LEGAL_MAIL_BODY.ftl`|Registration notification to a guest with a configured legal mail account|
|`REGISTRATION_NOTIFICATION_TO_LEGAL_MAIL_SUBJECT.ftl`|Subject line of registration notification to a guest with a configured legal mail account|
|`RESET_PASSWORD_NEXT_MAIL_BODY.ftl`|Notification to reset guest password|
|`RESET_PASSWORD_NEXT_MAIL_SUBJECT.ftl`|Subject line of notification to reset guest password|

## Customizing email notifications in different languages { .section}

The files to adjust wording in different languages can be found in the following installation directory: `invite_install/invite.util.jar:/com/ibm/lconn/registration/strings`

Copy the files that you want to edit to the invite\_customization/nls directory and modify as needed. You must change the name of the language file changed in the following way:

- Source file name: `ui\_LANG.properties`

- Customization file name: `com.ibm.lconn.registration.strings.ui\_LANG.properties`

**Parent topic:** [Configuring self-registration for external users](../admin/t_install_config_self-registration_for_external_users.md)

