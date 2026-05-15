# Configuring Unicode for Oracle databases {#configuringunicodefororacledatabases .task}

You must configure each database used in the HCL Connections deployment for Unicode. Configuration for Unicode must be set before Connections installation because it cannot be set after installation.

Installation must be performed so the AL32UTF8 character set is used. This is mandatory for proper Unicode handling by Connections and must be set properly at install time, since it cannot be modified after installation.

1.  On the **Initialization Parameters** page, click the **Character Sets** tab.

2.  Select the Use Unicode \(AL32UTF8\) option.

    **Note:** Leave **Create As Container Database** unselected.


**Parent topic:**[Creating Oracle databases](../install/c_inst_create_database_oracle.md)

