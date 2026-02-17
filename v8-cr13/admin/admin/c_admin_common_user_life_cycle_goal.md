# User life cycle details {#c_admin_common_user_life_cycle_goal .concept}

HCL Connections can identify whether people in the directory are active, meaning current employees or inactive, meaning were once listed in the directory, but have since left the company. Users who are inactive can be kept in the product membership and login tables, rather than being removed from the product databases entirely.

The ability to identify a person as inactive or active both conserves the data the inactive user created and makes it possible for inactive employees to return to the organization and regain access to their previously created data.

!!! note 
    
    This feature implements the following behavior:

-   In searches and membership selection fields, only active people are displayed by default.
-   Useful data that people no longer in the company contributed to HCL Connections applications does not have to be removed; it can remain for use by others, but the product user interface reflects the fact that the contributing user is currently inactive.
-   People who return to the company can be reactivated and can regain access to their old data.
-   Support is available to search for inactive people specifically.

**Parent topic:** [Managing users](../admin/c_admin_common_user_life_cycle_over.md)

