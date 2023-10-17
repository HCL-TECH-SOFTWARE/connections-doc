# Configuring Orient Me to support a reverse-proxy server 

Configure the Orient Me service to support the reverse-proxy server used by the Customizer offering of the Component Pack for HCL Connections™.

Do you need to complete this task?

You only need to update the connections-env release with the new Customizer reverse-proxy server if you did not specify it as the value for the `ic.host` setting when you initially installed your connections-env.

To determine whether you need to complete this task, run the following commands:

```
kubectl get configmap connections-env -o yaml -n connections | grep ic-homepage-url
kubectl get configmap connections-env -o yaml -n connections | grep ic-host
kubectl get configmap connections-env -o yaml -n connections | grep orient-cnx-host

```

If all of the results point to either the Customizer reverse-proxy server or a load balancer that sits in front it, you can skip this task. Otherwise, complete the following procedure.

If you deployed a reverse-proxy server for Customizer and you have already deployed Orient Me, then you must configure Orient Me to work with the new reverse-proxy server. Update Orient Me configuration settings to allow users to access the home page using the reverse proxy server; otherwise tiles will not load successfully and the action center will not function.

1. In the upgrade command, be sure to use the Customizer reverse-proxy server \(or a load balancer that sits in front of it\) for the `ic.host` setting, and use the IBM HTTP Server address that sits in front of Connections for the `ic.internal` setting.

2.  Restart the pods that use the updated configmap values by running the following commands:

    ```
    kubectl -n connections delete pods -l app=appregistry-client
    kubectl -n connections delete pods -l app=appregistry-service
    kubectl -n connections delete pods -l app=community-suggestions
    kubectl -n connections delete pods -l app=itm-services
    kubectl -n connections delete pods -l app=middleware-graphql
    kubectl -n connections delete pods -l app=orient-web-client
    kubectl -n connections delete pods -l app=people-migrate
    
    ```

3.  Check that all of the pods are running:

    ```
    kubectl -n connections get pods -o wide
    ```

4.  Verify that you can access Orient Me and that the tiles and action center display correctly.

    ```
    https://REVERSE-PROXY-FQDN/social
    ```


**Parent topic:**  [Configuring the Customizer component](../install/cp_config_customizer_intro.md)

