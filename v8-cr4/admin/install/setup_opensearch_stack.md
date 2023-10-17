# Setting up OpenSearch Stack for search and data analytics

OpenSearch Stack is a collection of open-source tools that collect log data and help you visualize those logs in a central location. Specific tools in OpenSearch Stack include OpenSearch Dashboards (forked from Kibana), Logstash, and FileBeat-8.

## Before you begin

Ensure that the OpenSearch chart is already installed on your Kubernetes cluster. For more information, refer to [Set up OpenSearch](cp_install_services_tasks.md#os_chart).

## Installing OpenSearch Stack

Installing the OpenSearch Stack chart uses the OpenSearch secret.

1.  Get chart and version:

    ```
    helm search repo v-connections-helm --devel | grep opensearchstack | awk {'print $2'}
    ```

    The output is expected to be like the following:

    ```
    2.7.0-20230703-050007
    ```

2.  Download the j2 template for `opensearchstack.yml` from the [HCL Connections deployment automation Git repository](https://github.com/HCL-TECH-SOFTWARE/connections-automation/tree/main/roles/hcl/component-pack-harbor/templates/helmvars) and modify it according to your environment.

3.  Install OpenSearch Stack:

    ```
    helm upgrade opensearchstack v-connections-helm/opensearchstack -i --version 2.7.0-20230625-170007 --namespace connections -f opensearchstack.yml --wait --timeout 10m
    ```

4.  Check that the OpenSearch Stack pods are up and running:

    ```
    kubectl get po -n connections | grep "opensearch\|filebeat" 
    ```

## Default configurations

-   For Filebeat-8, the default configuration in the chart is set to use filebeat input types as filestream, and output as logstash. Without any additional modifications, Filebeat-8 will send documents to OpenSearch Logstash.

    To send the output to the desired destination, you need to make changes in the `filebeatConfig` section in `values.yml`.

-   For OpenSearch Logstash, the default configuration is inside the `opensearch-logstash-0` pod in the `/usr/share/logstash/pipeline/logstash.conf` file. It receives input from the Filebeat application on port 5044 and outputs logs to the OpenSearch host.


## Accessing the OpenSearch dashboard from your browser

The NGINX configurations are located in `/etc/nginx/conf.d/customizer.conf`:

```
location /dashboards/ {
                   proxy_http_version 1.1;
                   proxy_set_header Upgrade $http_upgrade;
                   proxy_set_header Connection 'upgrade';
                   proxy_set_header Host $host;
                   proxy_cache_bypass $http_upgrade;
                   proxy_pass https://{{ kubernetes worker node dns }}:32601/;
                   rewrite ^/dashboards/(.*)$ /$1 break;
               }

```

On your browser, use the following URL to access the OpenSearch dashboard:

```
https://{{ application url }}/dashboards/
```