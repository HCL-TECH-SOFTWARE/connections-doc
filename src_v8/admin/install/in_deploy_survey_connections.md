# Deploying the survey gadget on the HCL Connections home page {#deployingthesurveygadgetontheconnectionshomepage .task}

To deploy the survey gadget so community members can use it, follow these steps.

1.  Open a browser. Navigate to `/homepage` and log in to the Administrator's home page as an administrator.

2.  Click **Administration** in the navigation.

3.  Click the **Add another app** button.

4.  Select the following options.

    1.  Select **Open Social Gadget**

    2.  In the Security section, choose **Trusted**.

    3.  In the UI integration points section, check the **Show for Activity stream events** check box.

    4.  In the Server access via Proxy section, select **All servers**.

    5.  Leave Service Mappings blank.

    6.  Add an app title, such as Surveys, the URL address, and the secure URL address. The gadget URL is $\{COMMON\_CONTEXT\_ROOT\}/web/com.ibm.form.integrations.formiwidget/SurveyInStream.xml.

5.  Click **Save**.

6.  Enable the gadget by clicking the **Enable** button in the Disabled widgets list.


To quickly check to set up, look in the Enabled widgets window. **Surveys Gadget** is in that list.

**Parent topic:**[Surveys in HCL Connections communities](../install/conn_work_connections.md)

