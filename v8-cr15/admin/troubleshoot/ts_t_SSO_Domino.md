# Troubleshooting single sign-on problems with Domino {#ts_t_SSO_Domino .task}

Troubleshoot problems when using single sign-on \(SSO\) with Domino® Directory.

When you configured Domino Directory as your LDAP directory, you might have entered no value for the Distinguished name of a base entry in this repository attribute because Domino Directory contains flat groups. However, SSO does not work correctly with this configuration.

To resolve this problem, configure the Virtual Member Manager component of WebSphere® Application Server to use Domino Directory flat groups:

1.  Open the wimconfig.xml file in a text editor. The file is stored in the following location:

    |**Linux™**|/opt/IBM/WebSphere/AppServer/profiles/<profile\_name\>/config/cells/ <cell\_name\>/wim/config|
    |**Microsoft™ Windows™**|C:\\IBM\\WebSphere\\AppServer\\profiles\\<profile\_name\>\\config\\cells\\ <cell\_name\>\\wim\\config|

2.  Replace the `<config:baseEntries name="o=example" nameInRepository="o=example"/>` string with the following string: `<config:baseEntries name="" nameInRepository=""/>`.

3.  Replace the `<config:participatingBaseEntries name="o=example"/>` string with the following string: `<config:participatingBaseEntries name=""/>`.

4.  Save and close the wimconfig.xml file.

5.  Restart the Deployment Manager.


**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

**Related information**  


[Enabling single sign-on for Domino](../secure/t_secure_domino.md)

