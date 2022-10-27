# Sample roadmap for a side-by-side upgrade {#concept_i52_cqj_kqb .concept}

The following roadmap is a guide to upgrading to HCL Connections 8.0 by installing it in a new environment and then migrating data from your existing environment. In this example, the existing environment is Connections 7.0.

This approach can also be applied to upgrading to Connections 8.0 from versions earlier than 7.0, in which case additional database schema updates would be required.

## Pre-installation tasks {#section_nwy_yqj_kqb .section}

These are some key tasks before installing version 8.0 of Connections in the new environment. For more detail on these tasks, plus some that are optional, see the whitepaper.

To review all tasks that typically precede a Connections installation, see the [Pre-installation tasks](../install/c_preinstall_actions.md) section in this product documentation.

1.  Prepare to install software:
    -   Review the [software and hardware requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) for the system that will host Connections 8.0.
    -   [Download Connections 7](https://id.hcltechsw.com/login/login.htm?fromURI=%2Fapp%2Fhclcust_licensedownloadportal_1%2Fexk8jshjulHatp2g8357%2Fsso%2Fsaml%3FSAMLRequest%3DhZJPb9swDMW%252FiqF7%252FBdeDSEJ4MYdFqAbirTboZdAkOlZnSxpItVk336yg23tJTsJIPnE93vgGsWkHW8DjeYAPwMgJedJG%252BRLY8OCN9wKVMiNmAA5Sf7Yfr7nZZpz5y1ZaTV7I7muEIjgSVnDkn23Yce8qauqa6qqqT%252FkVVt0Xb2ry%252BLu9rat7mKHJd%252FAY5zfsCiPIsQAe4MkDMVSXhar%252FGZVNk95wfOc5%252FUzS7rIoIygRTUSOeRZpvp0lJpAjnhKpZ0y4VwWKzIgHbWSYBB6ezLait5ZT0IfiwzOP5oXHF%252BC%252FiTIld%252Bbqr7JEG02g7JkZ6No9nGNWF6GuAzex3elJhfXKWLJR%252BslLMFv2CA0woz3EBNSr%252FC30v4JbF4WJvCP4F%252Bj3a%252BH%252B39wkQPtQCfhIR00nA2QdeCXCHChnUBrazJnkQ6AbvbEtusZgy%252BR%252Bu1%252F%252F1hnb8fXl7v5Enn33YONSL9moElciaNIi6Wi%252BtWwjPJg0IFUg4I%252BokaLp50HQRGffACWbS9L39%252Fn9jc%253D%26RelayState%3D%252Fflexnet%252Foperationsportal%252Flogon.do%253Fauthtype%253Dexternal%26SigAlg%3Dhttp%253A%252F%252Fwww.w3.org%252F2001%252F04%252Fxmldsig-more%2523rsa-sha256%26Signature%3DDNPQoGz%252Fo9n3YTnUzT7%252B1B5ugD4Y7S0ME1GdGwboxiHzprcyEyT5MSl5C6IXNG3LczWIwGyk%252FWt1EmDgsPjZmM7AjVil47YZqxhQiH8OJM71J7XY9qxoobIzN%252Bbe%252FHCNG2LRQJ9A4kmmS7aSnmr2Khasw3MTRJAM1mTct6M1STM88sYSmp1TTHJqJclgKQ3BVtq9jzTjmwH3ga5twmZs9PgL0BCnIN5OLcJpgOQiRxHf5J2ieJL2wbHqAtPry4uTNs2mcYfOa%252Fj4pwiPuRM4Z0DUa16nCkeBjurN4J2I5dCamf2hzBtxOhTmcD6uh5bg0w418Wtn5Fh3GIt0wieeoQ%253D%253D) and [WebSphere Application Server v8.5.5 and fixpack 19](https://id.hcltechsw.com/login/login.htm?fromURI=%2Fapp%2Fhclcust_licensedownloadportal_1%2Fexk8jshjulHatp2g8357%2Fsso%2Fsaml%3FSAMLRequest%3DhZJLb9swEIT%252FisC79XL9CGEbUKQaNZAWgZP20ItBUKuKKUWy3GXs%252FvtSMtqmF%252FdEYDjD3W%252FADYpBO14F6s0RfgRASi6DNsiniy0L3nArUCE3YgDkJPlT9fGBl2nOnbdkpdXsTeR2QiCCJ2UNSw7Nlp32VT6%252Ff1eXxbKp6tV8tc%252BL5v3doiiXd%252FvVsr5nyRfwGP1bFuMxhBjgYJCEoSjlZTHL17N88VwseV7yYvGVJU1kUEbQlOqJHPIsU23aS00gezyn0g6ZcC6LigxIJ60kGITWno22onXWk9CnIoPL9%252FUL9i9BfxDkym%252Fr%252BWKVIdpsBGVJbWNo3OMWsbyauAzex3OmBhfHKWLJ3noJU%252FFb1gmNMOI9xobUK%252FxRqt%252BFjcPCAP4J%252FGtc9%252FPx4S9c5EDb0Vl4SDsNFwNkHfipApxoB9DamsxZpCOgG3diu82IwadK%252Fe6%252Fb2yyt%252FbN9d98iryH5tFGpJ8j0CBu1FGkxaSodtZNVh4MOpCqU9BG1LjiufYgKOKTD8Cy3XXov%252F9z9ws%253D%26RelayState%3D%252Fflexnet%252Foperationsportal%252Flogon.do%253Fauthtype%253Dexternal%26SigAlg%3Dhttp%253A%252F%252Fwww.w3.org%252F2001%252F04%252Fxmldsig-more%2523rsa-sha256%26Signature%3DbJ1pScYTjj5jliAsmhCni%252BmgEdYA%252Bo44SEikRiIt1jasPQ6YRj6kDeWWCWhjkW%252F%252BhY7QkILPNlJqOKYVnux18Qbx%252FB6ObVV6As8z5VX%252BXXypjfXCXA3YOv3h0bcUKUuR2SQa8Uwi%252BA%252BwPyTF%252BblpBOJVRpNkx9I7zsXx%252FDCymrC8fhOblD8tUewmjyYB0hn53GCFDjeNZRIwlR%252FHbtzmuXWCRLP%252B6IvSdsxjs8vazf2yQ89tsDQbri0%252B7X6mkb0nw41l5bXYH%252BGSRJcHUfBbjyQxPA%252BTQsiu5v2gnkFjNHH%252BWU0hYp7zwAWF%252FSHhhYPb6AJzbbgVAS2dmTNmvCg5rQ%253D%253D) from the HCL Software License and Download Portal.
    -   Make sure that your servers contain enough free disk space for unpacking the installation files as well as keeping the platform operational.
2.  [Install IBM Security Directory Integrator](../install/t_prof_tdi_new_deploy.md), which is used to synchronize your LDAP information with Connections profiles.
3.  If you need to populate the Profiles database with people from your company's LDAP, you will use the Connections 8.0 wizards package and merge its default assembly line with your existing Connections 7.0 configuration. In this case take care to follow the steps in the *Populate the Profiles database* section of the whitepaper.
4.  [Create databases for Connections, XCC, and ESSAPPS \(IC360\)](../install/c_install_db_over.md).
5.  [Install IBM WebSphere Application Server](../install/t_install_was.md).
6.  Configure WebSphere security by choosing the LDAP and SSO settings that you used for Connections 6.5 as you follow the steps in [Setting up federated repositories](../install/t_inst_federated_repositories.md).

    **Note:** If you are making significant changes between your Connections 6.5 CR1 and Connections 7 security configuration, consider the dependencies described in [Considerations for a side-by-side upgrade](c_sbs_upgrade_considerations.md).

7.  [Install and configure IBM HTTP Server](../install/t_create_webserver1_node.md).

## Installing Connections 8.0 {#section_fpl_crj_kqb .section}

See [Installing HCL Connections 8.0](../install/t_install_cluster.md), taking care to read the suggestions under *About this task*.

## Post-installation tasks {#section_eg1_2rj_kqb .section}

1.  [Migrate 6.5 databases and update the database schema](t_sbs_migrate_data.md).
2.  Use the sample steps in the whitepaper to guide you as you complete the remaining post-installation tasks that apply to your organization. These include the following tasks:
    -   Export and import Connections customizations and content shares
    -   Re-run synchronization of the Profiles database
    -   Migrate Connections configurations
    -   Clear scheduled tasks
3.  If you installed the Feature Foundation module during the Connections 8.0 installation, see the post-installation task [Post-installation tasks for PDF Export](../install/install-guide-preparations.md).
4.  If both Feature Foundation and Component Pack are part of your new deployment, and you want to deploy the Tailored Experience for communities, do the following:
    1.  Set up Tailored Experience for communities. See [Steps to install or upgrade to Component Pack 8](../install/cp_install_services_tasks.md).
    2.  [Configure the community creation wizard](Configure the community creation
                            wizard../install/t_configure_community_wizard.dita).
    3.  If Component Pack is included in your existing deployment, see [Upgrade considerations for side-by-side migration of data](../install/cp_upgrade_considerations_for_side_by_side_migration.md) in the Component Pack section of the Connections documentation.

**Parent topic:**[Side-by-side upgrades](../migrate/c_sbs_upgrade_container.md)

