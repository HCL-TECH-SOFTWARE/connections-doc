# Managing @mentions in Content with Pseudonymization {#managing_mentions_with_pseudonymization}

## Configuring Pseudonymization and Cache Expiration

Follow these steps to enable pseudonymization and configure cache expiration:

1. Check out the configuration file

   1. Open a command prompt and navigate to the `bin` directory of your WebSphere Application Server profile:  

      ```bash
      cd C:\IBM\WebSphere\AppServer\profiles\Dmgr01\bin
      ```

   2. Run the following script to check out the `LotusConnections-config.xml` file:  

      ```bash
      wsadmin -lang jython -user <wasadmin> -password <password>
      execfile("connectionsConfig.py")
      LCConfigService.checkOutConfig("<TEMP_DIRECTORY>", AdminControl.getCell())
      ```

      !!! note 
         
          Replace `<TEMP_DIRECTORY>` with the path to a temporary working directory. Ensure the directory has write permissions.


2. Edit the configuration file

   1. Open the checked-out `LotusConnections-config.xml` file in an XML editor.

   2. Add or update the following property to enable pseudonymization:  

      ```xml
      <genericProperty name="isPseudonymizationEnabled">true</genericProperty>
      ```

   3. (Optional) To configure cache expiration for pseudonymized data, add or update the following property:  

      ```xml
      <genericProperty name="pseudonymization.cache.expiration.time.secs">900</genericProperty>
      ```

      !!! note 
      
          The default value is 900 seconds (15 minutes). Adjust this value as needed.

3. Check in the configuration file

   1. Save the changes and return to the command prompt.

   2. Run the following script to check in the updated configuration file: 

      ```bash
      LCConfigService.checkInConfig("<TEMP_DIRECTORY>", AdminControl.getCell())
      ```

   3. Synchronize the nodes in the WebSphere Integrated Solutions Console to apply the changes.

4. Restart the system
   
   Restart the WebSphere Application Server to apply the updated configuration.


## How Pseudonymization Works

1. **Inactive Users:**  
   When a user is marked as inactive, their display name is replaced with a pseudonym in the format `@<pseudonymized_name>`.

2. **Cache Lookup:**  
   The system first checks the cache for the user's pseudonymized data. If not found, it fetches the data from the database, caches it, and returns the pseudonymized name.

3. **Fallback:**  
   If pseudonymization is disabled or the user is not inactive, the original display name is returned.


!!! note

   - If pseudonymization is disabled, the system will display the user's original name, regardless of their state.
   - Always back up the configuration file before making changes.