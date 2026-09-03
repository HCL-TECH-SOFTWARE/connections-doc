# Uninstalling HCL Connections Engagement Center (WebEngine)

Perform the following steps to uninstall the HCL Connections Engagement Center (CEC) (WebEngine) from your environment.

## Removing the Helm Deployment

To remove your CEC (WebEngine) deployment from your environment, use the helm uninstall command.

!!! note
    
    Run the following command, replacing `<release_name>` with your specific Helm release name (for example, cnx-cec).

To run the uninstall, use the following command as shown in this example:

```sh
# Helm uninstall command
helm uninstall -n connections <release_name>
```

After a successful deployment, Helm responds with the following message:

```sh
release <release_name> uninstalled
```

## Cleaning up Kubernetes Secrets and Storage (PVCs/PVs)

Helm uninstallation leaves persistent resources and secrets behind by default to prevent accidental data loss. Run these commands to clean them up:

1. Verify image pull secrets:
   ```bash
   kubectl get secrets -n connections
   ```
2. Delete remaining secrets associated with the deployment. Replace <secret_name> with the actual secret name you want to delete:
```sh
kubectl delete secret -n connections <secret_name>
```
3. Verify PersistentVolumeClaims (PVCs) and PersistentVolumes (PVs):
   PV names and PVC names have the text web-engine in them. You can use grep to filter the output.
   ```bash
   kubectl get pvc,pv -n connections | grep web-engine
   ```
4. Delete remaining PVCs and PVs associated with the deployment. Replace <pvc_name> and <pv_name> with the actual names you want to delete:
```sh
kubectl delete pvc -n connections <pvc_name>
kubectl delete pv <pv_name>
```

## Dropping DB2 Databases

After completing the uninstallation and cleanup of Kubernetes resources, drop the DB2 databases by performing the following steps:

1. Switch to the DB2 instance user:

   ```sh
   sudo su - <db2_instance_user>
   ```
2. Verify existing databases:

   ```sh
   db2 list db directory | grep WP
   ```
3. Drop the databases associated with HCL Connections Engagement Center (WebEngine) one by one. Replace <database_name> with the actual database name you want to drop:

   ```sh
   db2 drop database <database_name>
   ```
4. Verify that the databases have been dropped:

   ```sh
   db2 list db directory | grep WP
   ```
5. Exit the DB2 instance user session:

   ```sh
   exit
   ```
   