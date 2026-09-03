# \(Optional\) Encoding the LDAP password in self-registration-confg.xml {#t_admin_encode_ldap_pwd_self-reg .task}

The password for the LDAP BindDN in Invite’s selfregistration-config.xml can optionally be XOR-encoded. For this, the set\_invite\_pass.py wsadmin script provided by the Connections installation can be used to encode the given password and persist it in the configuration file.

1.  Locate the wsadmin script to execute the command with: Open a command prompt and then change to the following directory of the system on which you installed the deployment manager: app\_server\_root/profiles/dm\_profile\_root/bin

2.  Enter the following command to encode and store the password:

    -   Linux:

        ```
        ./wsadmin.sh -lang jython \
         -host dmgr.connections.example.com \
         -javaoption "-Dpython.path=connections_root/lib" \
         -wsadmin_classpath "connections_root/lib/lccfg.jar;connections_root/lib/jose4j-0.9.3.jar" \
         -f "connections_root/bin/set_invite_pass.py"\
         --password ldap_bind_password

        ```

    -   Windows:

        ```
        wsadmin.bat -lang jython ^
         -host dmgr.connections.example.com ^
         -javaoption "-Dpython.path=connections_root\lib" ^
         -wsadmin_classpath "connections_root\lib\lccfg.jar;connections_root\lib\jose4j-0.9.3.jar" ^
         -f "connections_root\bin\set_invite_pass.py" ^
         --password ldap_bind_password

        ```


**Parent topic:**[Configuring self-registration for external users](../admin/t_install_config_self-registration_for_external_users.md)
