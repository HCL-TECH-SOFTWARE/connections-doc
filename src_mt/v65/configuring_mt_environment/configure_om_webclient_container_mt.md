<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Configure the OrientMe web client container for Multi-Tenant

1.  Setting environment variables for OrientMe  

    Within Component Pack, add two environment variables to the orient-web-client deployment. Variables to add to the deployment  
    
      - name: *ORIENT_CNX_USE_REL_PATH* |   value: *"true"*

      - name: *USE_REQUEST_HOST_FOR_CNX* |  value: *"true"*

    Edit the orient-web-client deployment in the editor and add the environment variables using the following command:  
  
    ```
    kubectl -n connections edit deployment orient-web-client
    ```   
    
    **Note:** Caution on syntax spacing.  
      
2. Setting JWT and LTPA token timeout to the same value  

     - On kubernetes, please ensure that the configmap - connections-env variable jwt-expires-in-minutes is set to the same value as the LTPA timeout on WebSphere.  
  
     - On WebSphere Admin console, you can find the LTPA timeout value by navigating to: *Global security > LTPA*
  
     - You can find the current value in kubernetes using the following command.
   
        ```
        kubectl -n connections get configmap connections-env -o yaml | grep jwt-expires
        ```
 
     - You can use 'edit' to modify the value using the following command.
    
        ```
        kubectl edit configmap/connections-env -n connections
        ```  

<?tm 1541016643182 1 HCL Connections ?>
