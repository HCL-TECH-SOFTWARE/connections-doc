<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Component Pack

1. Import 6.5 PVs (/pv-connections) onto new system at the same level as your source.

2. Install Component Pack v7.0.0.2 services on new system following this procedure, [Upgrading Component Pack to the latest version](https://help.hcltechsw.com/connections/v7/admin/install/cp_install_services_tasks.html)
   - Deploy orientme service with Elasticsearch7 (orient-indexing-service.indexing.elasticsearch7: true). Refer to the documentation.
 
3. To prepare migration for ES5 data to ES7, re-deploy elasticsearch7 with an enhanced set of Elasticsearch5 chart options (elasticsearch5.migrate=true, elasticsearch5.host=<hostname>, elasticsearch5.port=30099). 
   - Below is the command to re-deploy elasticsearch7 with enhanced set of elasticsearch5 options:
     ```
     helm upgrade elasticsearch7 component_pack_installation_folder/hybridcloud/helmbuilds/elasticsearch7-0.1.0-<timestamp>.tgz -i --reuse-values --set 
     elasticsearch5.migrate=true,elasticsearch5.host=es5_host,elasticsearch5.port=30099
     ```

4. Deploy Elasticsearch version5 on new system and ensure pods are ready/running. ES5 runs on default NodePort of 30099 and ES7 runs on NodePort of 30098.

   - Command:
   
     ```
     helm upgrade elasticsearch
     component\_pack\_installation\_folder/hybridcloud/helmbuilds/elasticsearch-0.1.0-\&lt;timestamp\&gt;.tgz -i -f
     component\_pack\_installation\_folder/hybridcloud/examples/multi\_domain\_environment/elasticsearch.yml
     ```
   
     **Note** : Deploy orientme service with Elasticsearch set to false (orient-indexing-service.indexing.elasticsearch: false). Refer to the documentation. This means, orientme&#39;s event listener listens to connections events and passes the event message to elasticsearch7 for indexing the data/content.

5. Migrate metrics and Quick results data from ES5 to ES7 (follow the document). While system is live, the current data is indexed in ES7 and the user who is performing the migration able to perform the migration at the same time.
   - Connect (enter bash mode into the pod)) to one of the ES7 client pod:
     - kubectl exec -it es-client-7-\&lt;pod-id\&gt; -n connections bash
     - cd /opt/elasticsearch-7.10.1/probe/REINDEX
     - Run create index scripts for Metrics and Quick Results
       - Run create index script for Metrics ./icMetricsIndexMigration.sh (This will create indices of Metrics from ES5 to ES7)
       - Run data migration script for Metrics ./icMetricsDataMigration.sh (This will migrate existing data of Metrics from ES5 to ES7.)
       - Run create index script for Quickresults ./quickresultsIndexMigration.sh (This will create indices of Quickresults from ES5 to ES7. This step can be skipped if quickresults index is already created in ES7 using wsadmin python script - SearchService.createES7QuickResultsIndex)
       - Run migrate script or Quickresults ./quickresultsDataMigration.sh (This will migrate existing data of Quickresults from ES5 to ES7)
       - Exit bash using command: exit

   - (Refer to the section **Validating and Verifying Data Validation and Verification**) Run es queries (./sendRequest.sh GET /ic\*/\_count) to determine the data and counts on both sides (ES5 and ES7). Note that data index count may be more in ES7 than in ES5 because users may have been creating the data while migration is being performed. The ES7 migration is done in batches and count of all batches should match the total number of records migrated from ES5.
   - If counts matches and results are satisfied, then proceed with #6. If the migration runs into an error, work with support team to fix the issue and then re-run the data migration scripts (refer to 5.a)
6. Update LCC.xml and search-config.xml to switch over to Elasticsearch7 (add properties required for Ealsticsearch7). This step requires a downtime of Connections.
  
7. Uninstall/delete Elasticsearch5 service
   - Command: 
     ```
     helm uninstall elasticsearch -n connections
     ```

8. Configure Metrics to accept the updated SSL certificates from Elasticsearch 7 keystore files.
   - Run config\_blue\_metrics.py and other wsadmin commands to enable Metrics and type-ahead search.
  
9. Verify Metrics and Quick Results on the UI (should see old and new data based on the Metrics options selected).

<?tm 1541016643182 1 HCL Connections ?>


