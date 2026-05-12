# Adding a welcome video to Touchpoint {#tp_t_add_welcome_video .task}

If your organization has enabled the Touchpoint onboarding wizard, you can configure it to include a video to welcome users to HCL Connections.

To enable Touchpoint, see [Touchpoint configuration properties](tp_r_touchpoint_config_properties.md).

**Supported video file types:** Touchpoint currently supports the video formats MP4, WebM, and Ogg. It is best to use MP4 as it provides the best browser support. Other video file types might not play natively on your users' browsers and operating systems.

**Note:** In step 1, you'll need to supply the URL to your video. The video source can be any video host that provides a URL to a video resource.

1.  Update welcomeVideoUrl with the respective host name as follows:

    ```
    <!-- Link to welcome video to be displayed to users -->
    <welcomeVideoUrl>https://server.host.tld/myvideo.mp4</welcomeVideoUrl>
    ```

2.  Upload the video file to your Connections server's webserver htdocs folder, for example, at /opt/IBM/HTTPServer/htdocs/myvideo.mp4

3.  On the server, open the touchpoint-config.xml file from this location: /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/bvtdb2Node01Cell/LotusConnections-config

4.  Add welcomeVideo to Touchpoint's configured views by extending steps.path.defaultPath, for example:

    ```
    <!-- Defines the views internal users will be walked through in the Touchpoint experience. -->
    <defaultPath>welcome,welcomeVideo,editProfile,profileTags,findColleagues,followCommunities</defaultPath>
    ```

5.  Now add welcomeVideo to steps.order, which determines the order in which the views will be displayed, for example:

    ```
    <!-- Defines the order in which the various views will be displayed -->
    <order>welcome,welcomeVideo,editProfile,profileTags,findColleagues,followCommunities</order>
    ```

6.  After all changes are done, save touchpoint-config.xml and restart Touchpoint. If required for your type of installation, do a full synchronization of your nodes.


**Parent topic:**[Post-installation tasks for Connections Touchpoint](../install/c_post-install_tasks_for_touchpoint.md)

