# Disable SSL certificate validation for testing {#setup-services-certificates-disable-certificate-validation-for-testing .task}

This task outlines the process for disabling certificate validation. Do not use these settings in a production environment.

CAUTION:

Disabling certificate validation should only be used for testing. Using these settings in a production environment will leave users vulnerable to [man in the middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

1.  Open the [service configuration file application.conf](t_01-setup_02-services_01-appconf_01-create-an-application-conf.md) in a text editor.

    **Note:** Use a plain text editor to avoid inserting invalid formatting or symbols into application.conf. Do not use a rich text editor such as Microsoft Word for editing configuration files.

2.  Set the value for the key `ephox.http.websphere.use-ssl-config` to false and `ephox.http.trust-all-cert` to true.

    ```
    ephox {
      # ... other settings not shown
      http {
        websphere.use-ssl-config = false
        trust-all-cert = true
      }
    }
    ```


**Parent topic:**[Common tasks, concepts and reference information](../../install/tiny_editors/r_appendix.md)

**Related information**  


[Tiny Editor Services configuration](../../install/tiny_editors/c_application-conf.md)

[List of valid application.conf settings](../../install/tiny_editors/r_application-conf.md)

[Sample application.conf](../../install/tiny_editors/r_application-conf-samples.md)

