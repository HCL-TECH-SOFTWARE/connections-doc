# Installing HCL Connections Engagement Center (WebEngine) using Helm

This section explains how to perform the actual installation of the HCL Connections Engagement Center (WebEngine) component on your Kubernetes cluster using Helm. This step leverages the `values.yaml` file that you prepared in the [preparation before installing CEC](../prepare-installation/preinstall_overview.md) phase, which contains all your environment-specific configurations.

## Helm installation command

Run the following command to deploy CEC using the `hcl-cnx-cec-deployment` Helm chart with your prepared configuration:

```sh
helm install -n connections -f <custom-values-path> <release_name> <oci_registry_url>/hcl-cnx-cec-deployment
```

Where:

- `<release_name>`: The Helm release name you choose (for example, cnx-cec). This name will be used as a prefix for all Kubernetes resources created by this deployment. It must be unique within the target namespace.

- `<custom-values-path>`: The full path to your values.yaml file (for example, ./my-custom-values.yaml). This file contains all the configuration values you have prepared to customize the deployment for your specific requirements.

- `<oci_registry_url>`: The URL of the HCL Harbor OCI container registry, which is oci://hclcr.io/cnx-cec.

After a successful deployment, Helm will display output similar to:

```txt
NAME: cnx-cec
LAST DEPLOYED: Thu Jun 23 14:27:58 2025
NAMESPACE: connections
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

## Accessing HCL Connections Engagement Center (WebEngine)

After deployment, once all pods are running and healthy, you can access CEC. The specific access URL will depend on your networking configuration. Typically, you might access it at:

```txt
https://<YOUR_HOST>/wps/portal
```
