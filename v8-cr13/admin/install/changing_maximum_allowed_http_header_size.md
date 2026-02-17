# Changing maximum allowed HTTP header size {#changing_maximum_allowed_http_header_size .task}

The Nodejs server code enforces a maximum HTTP header size on requests. In Nodejs v8 and v12, the maximum HTTP header size was 8 KB. For v14 and later versions, it was 16 KB. In Nodejs v11.6.0 and later versions, the command line parameter `*--max-http-header-size*` was introduced, allowing you to customize the maximum size.

Perform this task only if requests to the HCL Connections environment are being routed via the Customizer related microservices \(*appregistry-client*, *appregistry-service*, and *mw-proxy*\), and if the requests also contain sufficient HTTP header content that the headers exceed the maximum default size of 16 KB in total. For details on the command line parameter, see the [Node.js command line](https://nodejs.org/docs/latest-v12.x/api/cli.html#cli_max_http_header_size_size) documentation.

By default, the maximum HTTP header size is set in the Helm charts of the *appregistry-client*, *appregistry-service*, and *mw-proxy* microservices to 16,384 bytes \(16 KB\) to match the default Nodejs allowed maximum size, since the images are built with Nodejs v14 or later.

The value is passed in a deployment environment variable called NODE\_MAX\_HEADER\_SIZE, which is used at container startup by including `--max-http-header-size=${NODE_MAX_HEADER_SIZE}` in the command.

If the environment requires support of headers with a size greater than 16 KB, then perform the following procedure to change the size.

Once the microservices are deployed, repeat the steps for each of the *appregistry-client*, *appregistry-service*, and *mw-proxy* deployments as requests to all of these services are likely to contain the same header information and thus size.

1.  Edit the deployment:

    ``` {#codeblock_ysh_rqn_m5b}
    kubectl -n <namespace> edit deployment <deployment_name>
    ```

2.  Locate the NODE\_MAX\_HEADER\_SIZE environment variable definition:

    ``` {#codeblock_l3w_sqn_m5b}
    - name: NODE_MAX_HEADER_SIZE
      value: "16384"
    ```

3.  Change the value to the desired size \(in bytes\):

    ``` {#codeblock_u14_5qn_m5b}
    - name: NODE_MAX_HEADER_SIZE
      value: "32768"
    ```

4.  Save and quit the editor.

5.  Verify that the microservice pod or pods restart.

6.  If logging is enabled, the value now being used should be shown near the start of the pod log output:

    ``` {#codeblock_gct_xqn_m5b}
    {"pid":33,"hostname":"appregistry-service-69d77dc9cd-x968f","name":"appregistry-service/lib/server/boot/root.js","level":30,"time":1646088202972,"msg":"Maximum nodejs http header size: **NODE\_MAX\_HEADER\_SIZE=32768 bytes**","v":1}
    ```


**Parent topic:**[Configuring the Customizer component](../install/cp_config_customizer_intro.md)

