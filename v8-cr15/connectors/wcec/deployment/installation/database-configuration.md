---
title: Configuring DB2 database
tags:
    - DB2
    - CEC (WebEngine)
    - Helm
    - database configuration
    - external database
    - values.yaml
    - WebEngine
---
# Configuring DB2 database

This section describes how to configure an external DB2 database for CEC (WebEngine) using the Helm `values.yaml`.

!!! note
    Replace all placeholder values (for example, `<<db_hostname>>`, `<<db_username>>`) with your actual database details.

```yaml
configuration:
  webEngine:
    # If set to true, the external database specified in dbDomainProperties will be used for the WebEngine database.
    # On the first startup of the WebEngine, the database will be transferred automatically from Derby to the external database.
    useExternalDatabase: false
    # If set to true, existing WebEngine database tables will be dropped and re-created whenever database transfer is run.
    dropDatabaseTables: false
    # Provide a custom secret that will be used to set the DB Domain properties.
    # Ensure that the secret uses the following key: dx_dbdomain.properties
    # If customDbDomainPropertiesSecret is provided then all dbDomainProperties values are ignored
    customDbDomainPropertiesSecret: ""
    dbDomainProperties:
      InitializeFeedbackDB: "true"
      feedback.DbType: "db2"
      feedback.DbName: "WPFDBK"
      feedback.DbSchema: "feedback"
      feedback.DataSourceName: "wpfdbkdbDS"
      feedback.DbUrl: "jdbc:db2://<<db_hostname>>:<<db_port>>/WPFDBK:returnAlias=0;"
      feedback.DbUser: "<<db_username>>"
      feedback.DbPassword: "<<db_password>>"
      feedback.DbRuntimeUser: "<<db_username>>"
      feedback.DbRuntimePassword: "<<db_password>>"
      feedback.DBA.DbUser: "<<db_username>>"
      feedback.DBA.DbPassword: "<<db_password>>"
      feedback.DbConfigRoleName: "<<db_group>>"
      feedback.DbRuntimeRoleName: "<<db_group>>"
      feedback.XDbName: "WPFDBK"
      feedback.DbNode: "pznNode"
      likeminds.DbType: "db2"
      likeminds.DbName: "WPLM"
      likeminds.DbSchema: "likeminds"
      likeminds.DataSourceName: "wplmdbDS"
      likeminds.DbUrl: "jdbc:db2://<<db_hostname>>:<<db_port>>/WPLM:returnAlias=0;"
      likeminds.DbUser: "<<db_username>>"
      likeminds.DbPassword: "<<db_password>>"
      likeminds.DbRuntimeUser: "<<db_username>>"
      likeminds.DbRuntimePassword: "<<db_password>>"
      likeminds.DBA.DbUser: "<<db_username>>"
      likeminds.DBA.DbPassword: "<<db_password>>"
      likeminds.DbConfigRoleName: "<<db_group>>"
      likeminds.DbRuntimeRoleName: "<<db_group>>"
      likeminds.XDbName: "WPLM"
      likeminds.DbNode: "pznNode"
      release.DbType: "db2"
      release.DbName: "WPREL"
      release.DbSchema: "release"
      release.DataSourceName: "wpreldbDS"
      release.DbUrl: "jdbc:db2://<<db_hostname>>:<<db_port>>/WPREL:returnAlias=0;"
      release.DbUser: "<<db_username>>"
      release.DbPassword: "<<db_password>>"
      release.DbRuntimeUser: "<<db_username>>"
      release.DbRuntimePassword: "<<db_password>>"
      release.DBA.DbUser: "<<db_username>>"
      release.DBA.DbPassword: "<<db_password>>"
      release.DbConfigRoleName: "<<db_group>>"
      release.DbRuntimeRoleName: "<<db_group>>"
      release.XDbName: "WPREL"
      release.DbNode: "wpsNode"
      community.DbType: "db2"
      community.DbName: "WPCOMM"
      community.DbSchema: "community"
      community.DataSourceName: "wpcommdbDS"
      community.DbUrl: "jdbc:db2://<<db_hostname>>:<<db_port>>/WPCOMM:returnAlias=0;"
      community.DbUser: "<<db_username>>"
      community.DbPassword: "<<db_password>>"
      community.DbRuntimeUser: "<<db_username>>"
      community.DbRuntimePassword: "<<db_password>>"
      community.DBA.DbUser: "<<db_username>>"
      community.DBA.DbPassword: "<<db_password>>"
      community.DbConfigRoleName: "<<db_group>>"
      community.DbRuntimeRoleName: "<<db_group>>"
      community.XDbName: "WPCOMM"
      community.DbNode: "wpsNode"
      customization.DbType: "db2"
      customization.DbName: "WPCUST"
      customization.DbSchema: "customization"
      customization.DataSourceName: "wpcustdbDS"
      customization.DbUrl: "jdbc:db2://<<db_hostname>>:<<db_port>>/WPCUST:returnAlias=0;"
      customization.DbUser: "<<db_username>>"
      customization.DbPassword: "<<db_password>>"
      customization.DbRuntimeUser: "<<db_username>>"
      customization.DbRuntimePassword: "<<db_password>>"
      customization.DBA.DbUser: "<<db_username>>"
      customization.DBA.DbPassword: "<<db_password>>"
      customization.DbConfigRoleName: "<<db_group>>"
      customization.DbRuntimeRoleName: "<<db_group>>"
      customization.XDbName: "WPCUST"
      customization.DbNode: "wpsNode"
      jcr.DbType: "db2"
      jcr.DbName: "WPJCR"
      jcr.DbSchema: "jcr"
      jcr.DataSourceName: "wpjcrdbDS"
      jcr.DbUrl: "jdbc:db2://<<db_hostname>>:<<db_port>>/WPJCR:returnAlias=0;"
      jcr.DbUser: "<<db_username>>"
      jcr.DbPassword: "<<db_password>>"
      jcr.DbRuntimeUser: "<<db_username>>"
      jcr.DbRuntimePassword: "<<db_password>>"
      jcr.DBA.DbUser: "<<db_username>>"
      jcr.DBA.DbPassword: "<<db_password>>"
      jcr.DbConfigRoleName: "<<db_group>>"
      jcr.DbRuntimeRoleName: "<<db_group>>"
      jcr.XDbName: "WPJCR"
      jcr.DbNode: "wpsNode"
```
