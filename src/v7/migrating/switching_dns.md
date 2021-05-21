<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Switching the dns to route to a new system (Post upgrade completion) 

Before giving access the new system to users and want to test locally with few users, you can make following change, test, and then give access to users in production by registering the ip&#39;s into DNS as DNS aliases entries.

1. Add the hostAliases to pods within the deployment (deployment.yaml) in two charts: middleware-graphql and orient-web-client.
2. Locate orientme-0.1.0-*timestamp*.tgz file in HELMBUILD directory of the Component Pack zip you had extracted earlier, i.e., extractedFolder/microservices\_connections/hybridcloud/helmbuilds/
3. Copy the file to a specific directory of your choice (/tmp). And backup this file (orientme-0.1.0-*timestamp*.tgz_original. You need this file later after testing is completed.
4. Extract the file to a specific directory of your choice (/tmp). For example, you can use: Untar -xvf orientme-0.1.0-*timestamp*.tgz /tmp
   - Location(s) of deployment.yaml
     - /tmp/orientme/charts/middleware-graphql/templates/deployment.yaml/tmp/orientme/charts/orient-web-client/templates/deployment.yaml

5. You need to add &quot;hostAliases&quot; to the pod template spec section. It should be in line with &#39;containers&#39;. There are two &#39;spec&#39; sections. Do not add it to the first spec section, but rather the template spec section which defines the pod template.
   - Location(s) of deployment.yaml: 
     - chart of charts:  orientme/charts/middleware-graphql/templates/deployment.yamlorientme/charts/orient-web-client/templates/deployment.yaml
      
   **Note** : A related document reference to adding entries to pod&#39;s /etc/hosts with hostAliases: [https://kubernetes.io/docs/concepts/services-networking/add-entries-to-pod-etc-hosts-with-host-aliases/](https://kubernetes.io/docs/concepts/services-networking/add-entries-to-pod-etc-hosts-with-host-aliases/)

6. Then recreate the helm chart from the directory /tmp/orientme using the command:
   - helm package orientme
   - It creates an orientme helm chart with the same archive name as orientme-0.1.0-*timestamp*.tgz
   - Copy this file (updated helm chart) to extractedFolder/microservices\_connections/hybridcloud/helmbuilds/

7. After making above change, re-deploy the orientme service using helm upgrade command (it is how you have re-deployed earlier):
     helm upgrade orientme /opt/hcl-cnx-component-pack/microservices\_connections/hybridcloud/helmbuilds/orientme-0.1.0-20210414-144208.tgz -i -f /*your_directory*/generated/_charts/orientme.yml --namespace connections
8. Add org-based URL with its ip to Component Pack server&#39;s hosts file
9. After testing is completed and before register ip&#39;s of Connections deployment (CP and Cnx) into DNS as DNS aliases, re-deploy the orientme service with original helm chart.
   1. Rename the orientme-0.1.0-*timestamp*.tgz\_original to orientme-0.1.0-*timestamp*.tgz
   2. Run this command to re-deploy:
helm upgrade orientme /opt/hcl-cnx-component-pack/microservices\_connections/hybridcloud/helmbuilds/orientme-0.1.0-20210414-144208.tgz -i -f /*your_directory*/generated\_charts/orientme.yml --namespace connections
10. After testing is completed, register your ip&#39;s into DNS which switches to new environment.

**Note:**  After you install the MT v7.0 (7.0.0.0-MT-Common-Fix), refer to [Updating HCL Connections 7.0 with the latest interim fix](https://opensource.hcltechsw.com/connections-doc/v7/downloading/HCL%20MT%20CH-MSP%20Downloading%20HCL%20Connections%20Multi-Tenant%20packages%20and%20Monthly%20releases.html) to check for any additional updates. 


<?tm 1541016643182 1 HCL Connections ?>


