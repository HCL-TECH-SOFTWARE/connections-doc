<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Validating and Verifying the Data

1. Connect to es-client-7 pod:
   - kubectl exec -it es-client-7-*pod-id*-n connections bash
1. pwd: /opt/elasticsearch-7.10.1
2. cd probe
3. Use sendRequest to search for indexed documents
   
   **Note** : After migration to ES7, run below queries to find out the equality of counts on both ES5 and ES7. ES7 data counts may be slightly larger than ES5. You can run the data migration as many times as you can but each run you run data migration, count increases by version of the index document.

   - Search for indexed documents:
     - ./sendRequest.sh GET /orient-me-collection/event/\_search?pretty
     - ./sendRequest.sh GET /ic\*/\_search
     - ./sendRequest.sh GET /ic\*/event/\_search?pretty
     - ./sendRequest.sh GET /icmetrics\_a\_2020\_2h/event/\_search?pretty
     - /sendRequest.sh GET /icmetrics\_a\_2021\_1h /event/\_search?pretty
     - /sendRequest.sh GET /icmetrics\_a\_2020\_1h /event/\_search?pretty
     - ./sendRequest.sh GET /quickresults\*/event/\_search?pretty

   - Count the records:
     - ./sendRequest.sh GET /ic\*/\_count
     - ./sendRequest.sh GET /q\*/\_count

   - What are the current indices existing…?
     - ./sendRequest.sh GET /\_cat/indices

   - Community owner metrics data … (save this to a .sh file and run the sh script)
     - ./sendRequest.sh GET "/ic*/_search" -H 'Content-Type: application/json' -d'
     
    ```
    {
     "query": {
      "term": {
       "communityUuid": "f6188344-b339-4991-8108-beeb38d0733e"
      }
      }
    }
    '
    ```
   
    **Note**:  Change the value for communityuuid for different community metrics

<?tm 1541016643182 1 HCL Connections ?>


