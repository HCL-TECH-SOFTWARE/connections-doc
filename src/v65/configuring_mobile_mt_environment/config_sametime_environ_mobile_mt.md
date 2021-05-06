<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Configuring Sametime for the Multi-Tenant environment

This topic contains general information and guidance on integrating Sametime with Connections.

1. Configure Sametime integration with Connections as per usual Connections and Sametime documentation (i.e. LotusConnections-config.xml changes)
2. If you want to share the same LDAP between Connections and Sametime then make sure you populate the ibm- socialOrganizationName attribute in the person record appropriately.

**Note:**  This attribute is ALREADY in the schema that you imported into LDAP and configured to use with Connections.

<?tm 1541016643182 1 HCL Connections ?>

