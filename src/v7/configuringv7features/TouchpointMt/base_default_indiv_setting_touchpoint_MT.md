# Base, Default and Individual Settings
Touchpoint MT uses a triple-phased config inheritance approach.
- In the first step the values from touchpoint-config.xml are being read and provide a base configuration.
- In the second step, the defaultConfig.json is being processed, overriding any value that might already exist in the config-list resulting from step 1.
- In the third step, the org-specific configuration from App Registry is being fetched and overidies any value that might be set in the result list from step 2.

That way, Touchpoint provides a safe way of having a complete configuration in order to serve an org specific configuration for Touchpoint.

