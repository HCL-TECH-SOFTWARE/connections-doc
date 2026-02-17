# Excluding nicknames from the Profiles database {#task_wj1_jyr_wv .task}

You can exclude nicknames when adding or updating user profiles by adding a property in the tdi-profiles-config.xml file.

A server restart is not required for the change to take effect.

The change affects only new users that are added to Profiles. To remove nicknames \(aliases\) from existing users, see the article [Removing Automatically Generated Nicknames from the Profiles Database](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0020730) on the HCL Support site.

1.  In the directory TDI/conf/LotusConnections-config, open the file tdi-profiles-config.xml.

2.  Add the following property to the <properties\> section:

    ```
    <properties>
      <property name="com.ibm.lconn.profiles.perform.name.expansion" value="false" /> 
    </properties>
    ```


**Parent topic:**[Managing profile content](../admin/c_admin_profiles_control_content.md)

