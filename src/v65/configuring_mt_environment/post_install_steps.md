<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Post installation steps

Complete the following manual procedures after validating the auto deploy scripts.

## Configuring the notification_v2 templates

To use Connections notification_v2 templates, the default templates for email notifications, follow these steps:

**1.** Enable all mail channels in notification-config.xml, as documented in [Enabling email notifications](https://help.hcltechsw.com/connections/v65/admin/admin/t_admin_common_enable_mail.html) on the Connections product documentation site.

**2.** Locate LotusConnections-config.xml in the deployment manager, add the following two properties in the <properties> section

```
<genericProperty name="mt_internalhostname">mtdemo1.cnx.cwp.pnp- hcl.com</genericProperty> 
<genericProperty name="mt_externalhostname">{org}.cnx.cwp.pnp- hcl.com</genericProperty>
```

where:

property: mt_internalhostname is the hostname from the URLs of the *sloc:static* attribute for any Connections service in the same file

property: mt_externalhostname is the hostname from the URLs of the *sloc:pattern* attribute for any Connections service, which should have the {org}.xxx.com pattern in it

**3.** Sync the nodes, and restart allservers.

## Configuring session management for the Blogs server

If Blogs is installed and run on its own cluster or server on a multiple-node deployment, follow these steps to avoid issues with creating new blog entries:

**1.** Follow the steps in this Support documentation to add the customer property [HttpSessionIdReuse](https://www.ibm.com/support/pages/node/340997)

**2.** On all nodes, use a session cookie name specifically for the Blogs server. 

For example, JSESSIONID\_BLOGS. Then on the WAS admin console, use the following path to configure the session cookie name:

> Application servers > BlogsCluster_server1 > Session management > Cookies

<?tm 1541016643182 1 HCL Connections ?>

