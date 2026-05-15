# Managing moderation when email is disabled {#c_common_admin_moderation_no_email .concept}

If email is disabled or if users do not have email addresses, some parts of the moderation workflow must be completed manually.

If HCL Connections is configured so that email notification is disabled, the automatic notifications used for this workflow are disabled. The following activities would require manual intervention:

-   When an entry is flagged as inappropriate, the reviewers will not receive email indicating there is a potentially offensive posting. Reviewers will have to periodically visit the Flagged Content section of the Moderation interface to see what content needs action and then manually send confirmation notification messages to the user who flagged the content.
-   If the reviewer quarantines an item, the owner will not receive email notifications. The reviewer will have to manually send a notification message to the content owner.

!!! note 
    
    If your organization includes people with no email, the automatic notifications used for this workflow are disabled. The following activities would require manual intervention:

    -   If a reviewer has no email, when an entry or comment is flagged as inappropriate, the reviewer will not receive email indicating there is a potentially offensive posting. Reviewers will have to periodically visit the Flagged Entries or Flagged Comments pages of the Moderation interface to see what entries need action.
    -   If the content owner has no email, and the reviewer quarantines an item, the content owner will not receive email notifications.
    -   If the person who flagged the message as inappropriate has no email, the person will not receive a confirmation email that the post they found offensive is being reviewed.

**Parent topic:** [Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)
