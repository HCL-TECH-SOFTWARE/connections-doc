# Deploying OpenSearch Metrics {#cp_config_es_metrics_no_cognos .task}

Deploying OpenSearch-based metrics for HCL Connections™ involves testing the environment and then switching users to the OpenSearch Metrics component.

Before proceeding, make sure that you have changed the number of shards for the index \(if your environment warrants it\), and enabled the Metrics component to connect to your OpenSearch server.

Complete the following steps to set up OpenSearch Metrics:

1.  Validate that the OpenSearch user experience is functioning well by confirming the test context root URL is working:

    Log in to the following URL as the admin user: https://Connections\_server/metricssc

2.  When validation is complete, run the following Python script to switch users to the OpenSearch Metrics component.

    This script causes the RDBMS-based app to stop capturing data, and the OpenSearch component to start capturing it.

    1.  On the WebSphere deployment manager server, start the wsadmin client as described in [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md).

    2.  Run the following commands to switch users to the OpenSearch Metrics component:

        ```
        execfile('metricsEventCapture.py')
        switchMetricsToElasticSearch()
        ```

3.  \(Optional\) Map user profile attributes to report dimensions.

    Metrics reports support up to three different dimensions, which are based on user profile attributes. The following user attributes are supported for mapping to report dimensions:

    -   com.ibm.snx\_profiles.base.countryCode
    -   com.ibm.snx\_profiles.base.orgId
    -   com.ibm.snx\_profiles.base.title
    -   com.ibm.snx\_profiles.base.employeeTypeCode
    -   com.ibm.snx\_profiles.base.deptNumber
    -   com.ibm.snx\_profiles.base.workLocationCode
    -   com.ibm.snx\_profiles.base.isManager
    -   com.ibm.snx\_profiles.base.timezone
    -   com.ibm.snx\_profiles.base.profileType
    By default, mapping is provided for the following three attributes:

    -   com.ibm.snx\_profiles.base.countryCode - Mapped to the Geography dimension in Metrics reports
    -   com.ibm.snx\_profiles.base.orgId - Mapped to the Department dimension in Metrics reports
    -   com.ibm.snx\_profiles.base.title - Mapped to the Role dimension in Metrics reports
    You can change the attribute mapping by completing the following steps:

    **Note:** You should only change mappings with your first use of Metrics. Otherwise, Metrics data will be inconsistent and lead to incorrect report data.

    1.  Get the default mapping:

        ```
        MetricsAdminService.getUserAttributesMapping()
        ```

        Returns:

        '\{"attribute1":"com.ibm.snx\_profiles.base.countryCode","attribute2":"com.ibm.snx\_profiles.base.orgId","attribute3":"com.ibm.snx\_profiles.base.title"\}'

    2.  Update the mapping:

        Do not change the keys "attribute1", "attribute2", and "attribute3". Just replace the attributes with the values that you want to use.

        Run the following command:

        ```
        MetricsAdminService.setUserAttributesMapping(mappingStr)
        ```

        For example:

        ```
        MetricsAdminService.setUserAttributesMapping('{"attribute1":"com.ibm.snx_profiles.base.profileType","attribute2":"com.ibm.snx_profiles.base.orgId","attribute":"com.ibm.snx_profiles.base.title"}' )
        ```

    3.  Get the mapping again to verify that it was changed successfully:

        ```
        MetricsAdminService.getUserAttributesMapping()
        ```

        If the mapping did not update correctly, review the logs in the following location:

        app\_server\_root/profiles/AppSrv01/logs/Metrics\_Server/

4.  Confirm that the URL for metrics is working: https://Connections\_server/metrics.


**Parent topic:**[Configuring the OpenSearch Metrics component](../install/cp_config_os_intro.md)

