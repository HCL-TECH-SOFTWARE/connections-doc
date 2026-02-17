# Customizing notifications for self-registering users {#c_admin_customize_self-registration_notifications .concept}

You can customize the content of the email notifications related to the self-registration feature by copying the relevant source files, saving them in the appropriate customization directory, and editing the files that correspond to notifications you want to change. As the source files are provided in different languages, you can also customize the notifications in those languages.

## General directory information { .section}

The source files for all following customization options are in the following installation directory for the self-registration feature: app\_server\_root/profiles/profile\_root/installedApps/cell\_name/Invite.ear/ \(hereafter referred to as the invite\_install directory\)

Copy the source files that you want to edit to the customization directory defined in selfregistration-config.xml. By default this directory is the invite directory in the Connections customization path as described in [Determining where to save your customizations](https://help.hcltechsw.com/connections/v7/admin/customize/t_customize_find_custom_directory.html). Hereafter, this directory is referred to as invite\_customization.

## Customizing email notifications { .section}

The files to customize email notifications related to self-registration are in the following installation directory: invite\_install/invi te.util.jar:/com/ibm/lconn/registration/templates/

Copy the files that you want to edit to invite\_customization/templates directory and modify as needed.

The following table lists which file is used for the respective type of mail notification.

|File Name|Content of Email Notification|
|---------|-----------------------------|
|INVITE\_NOTIFICATION\_TO\_INVITEE\_MAIL\_BODY.ftl|Invitation to guest to join Connections|
|INVITE\_NOTIFICATION\_TO\_INVITEE\_MAIL\_SUBJECT.ftl|Subject line of invitation|
|REGISTRATION\_NOTIFICATION\_TO\_INVITEE\_MAIL\_BODY.ftl|Registration notification to guest|
|REGISTRATION\_NOTIFICATION\_TO\_INVITEE\_MAIL\_SUBJECT.ftl|Subject line of registration notification|
|REGISTRATION\_NOTIFICATION\_TO\_INVITER\_MAIL\_BODY.ftl|Registration notification to user who initiated the invitation|
|REGISTRATION\_NOTIFICATION\_TO\_INVITER\_MAIL\_SUBJECT.ftl|Subject line of registration notification to user who initiated the invitation|
|REGISTRATION\_NOTIFICATION\_TO\_LEGAL\_MAIL\_BODY.ftl|Registration notification to guest having configured legal mail account|
|REGISTRATION\_NOTIFICATION\_TO\_LEGAL\_MAIL\_SUBJECT.ftl|Subject line of registration notification to guest having configured legal mail account|
|RESET\_PASSWORD\_NEXT\_MAIL\_BODY.ftl|Notification to reset guest password|
|RESET\_PASSWORD\_NEXT\_MAIL\_SUBJECT.ftl|Subject line of notification to reset guest password|

## Customizing email notifications in different languages { .section}

The files to adjust wording in different languages can be found in the following installation directory: `invite_install/invite.util.jar:/com/ibm/lconn/registration/strings`

Copy the files that you want to edit to the invite\_customization/nls directory and modify as needed. You must change the name of the language file changed in the following way:

- Source file name: `ui\_LANG.properties`

- Customization file name: `com.ibm.lconn.registration.strings.ui\_LANG.properties`

**Parent topic:** [Configuring self-registration for external users](../admin/t_install_config_self-registration_for_external_users.md)

