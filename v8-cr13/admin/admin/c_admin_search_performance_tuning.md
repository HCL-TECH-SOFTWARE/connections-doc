# Enabling Additional Performance Tuning for Lucene 

Background indexing lets you rebuild the Search index without downtime by removing inconsistencies in the existing index. It runs in three phases: crawling, file content extraction, and index creation.

This performance-tuning parameter can be enabled to help alleviate Lucene indexing issues when processing components with large numbers of entries.

## Configuring Additional Performance Tuning for Lucene

Follow these steps to enable additional performance tuning for Search indexing:

### 1. Check Out the Configuration File
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
   **Note:** Replace `<TEMP_DIRECTORY>` with the path to a temporary working directory. Ensure the directory has write permissions.

---

### 2. Edit the Configuration File
1. Open the checked-out `LotusConnections-config.xml` file in an XML editor.

2. Add or update the following property to enable Lucene performance tuning:  
   ```xml
   <genericProperty name="isLucenePerformanceTuningEnabled">true</genericProperty>
   ```
    **Note:** The default value is false. Set this value to true to enable the additional performance tuning.

---

### 3. Check In the Configuration File
1. Save the changes and return to the command prompt.

2. Run the following script to check in the updated configuration file:  
   ```bash
   LCConfigService.checkInConfig("<TEMP_DIRECTORY>", AdminControl.getCell())
   ```

3. Synchronize the nodes in the WebSphere Integrated Solutions Console to apply the changes.

---

### 4. Restart the System
Restart the WebSphere Application Server to apply the updated configuration.

---

**Parent topic:** [Index settings](../admin/c_admin_search_index_settings.md)
