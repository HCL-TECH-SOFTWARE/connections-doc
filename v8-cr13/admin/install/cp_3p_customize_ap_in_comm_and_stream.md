# Adding Activities Plus to a community or home page {#cp_3p_customize_ap_in_comm_and_stream .concept}

You can add the Activities Plus app \(Docker widget\) to communities and the home page stream.

## Adding Activities Plus to a community { .section}

1.  On the WebSphere® deployment manager machine, start the wsadmin client as described in [Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md). Check out the widgets-config.xml file:

    ```
    execfile("communitiesAdmin.py")
    CommunitiesConfigService.checkOutWidgetsConfig("/tmp//LCCheckedOut", AdminControl.getCell())
    ```

2.  Edit the `widgets-config.xml` file. Find the resource element with the type of community \(<resource … type=“community” … \>\), then under <widgets\>, then within <definitions\> add the following lines, replacing \[BOARDS\_URL\] with your URL:

    ```
    <!-- Kudos Boards -->
    <widgetDef defId="Kudos Boards" modes="view fullpage" url="{webresourcesSvcRef}/web/com.ibm.social.urliWidget.web.resources/widget/urlWidget.xml" themes="wpthemeNarrow wpthemeWide wpthemeBanner" uniqueInstance="true">
      <itemSet>
      <item name="resourceId" value="{resourceId}"/>
        <item name="width" value="100%"/>
        <item name="height" value="500px"/>
        <item name="url" value="https://[BOARDS_URL]/boards/community/connections"/>
      </itemSet>
    </widgetDef>
    <!-- END Kudos Boards -->
    ```

3.  Check in the `widgets-config.xml` file:

    ```
    CommunitiesConfigService.checkInWidgetConfig()
    ```


## Adding Activities Plus to the home page stream { .section}

1.  Access **Homepage** \> **Administrator**.
2.  Select the following:
    -   Open Social Gadget
    -   Trusted and Use SSO
    -   Show for Activity Stream events
    -   All servers
3.  Click the **Add Mapping** button.
4.  Add a Mapping for the Activities Plus service to the Huddo Boards \(formerly Kudos Boards\) client. Ensure OAuth Client is set to conn-ee and the Service name is Kudos Boards. Click the OK button.
5.  Enter the following, replacing \[BOARDS\_URL\] with your URL:

    |Field|Value|
    |-----|-----|
    |Title|Kudos Boards Activity Stream|
    |URL Address|http://\[BOARDS\_URL\]/stream/connections|
    |Secure URL Address|https://\[BOARDS\_URL\]/stream/connections|
    |ICON URL|http://\[BOARDS\_URL\]/favicon.ico|
    |ICON SECURE URL|https://\[BOARDS\_URL\]/favicon.ico|

6.  Select:
    -   Use HCL Connections specific tags
    -   Opened by default
7.  Select the following prerequisites:
    -   oauthprovider
    -   webresources
    -   oauth
    -   opensocial
8.  Scroll down and click **Save**.

**Parent topic:**[Customizing Activities Plus](../install/cp_3p_customize_ap.md)

