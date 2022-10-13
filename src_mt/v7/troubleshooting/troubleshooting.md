<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">
# Troubleshooting

## Docs not working with 401 to the entitlement api call 

If you are getting 401 auth errors and 

**Logs indicate:**  "com.ibm.websphere.security.auth.WSLoginFailedException: SSO token uniqueID not null, but opaque token not found. 

You will need to re-challenge the user to login again then review this knowledge Article:  [SSO Token Propagation in Connections](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0021265&sys_kb_id=c407baf31bd9fb4077761fc58d4bcb5a)

## Useful trace settings
   - General 
   - Docs
   - Files
   - Wikis 
   - Profiles

## Performance guide

Please refer to guidances in the [Connections Perfomance Tuning Guide](https://ds_infolib.hcltechsw.com/ldd/lcwiki.nsf/xpDocViewer.xsp?%20lookupName=Tuning+for+Performance#action=openDocument&res_title=IBM_Connections_V6_Tuning_guide&content=pdcontent) that could apply to your environment. 

## HCL Connection 7.0 MT interim fix (iFix) to remove the "PDF Export Access" tab in Edit Community.
HCL Connection 7.0 MT interim fix (iFix) to remove the "PDF Export Access" tab in Edit Community. The "Export to PDF" feature is not supported in a multi-tenant environment and the tab should not be displayed.

Refer to the following topics for additional information

- [Updating HCL Connections™ 7.0 with the latest interim fix](https://opensource.hcltechsw.com/connections-doc/v7/downloading/HCL%20MT%20CH-MSP%20Downloading%20HCL%20Connections%20Multi-Tenant%20packages%20and%20Monthly%20releases.html)
- [Connections](https://opensource.hcltechsw.com/connections-doc/v7/migrating/connections.html)

<?tm 1541016643182 1 HCL Connections ?>

