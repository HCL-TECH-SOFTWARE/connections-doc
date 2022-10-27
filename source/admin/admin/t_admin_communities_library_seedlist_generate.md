# Generating thumbnails for library files {#t_admin_communities_library_seedlist_generate .task}

Use the generatePreviews command to generate thumbnails for library files.

You do not need to check any files out or restart any server to perform these tasks.

1.  Navigate to the /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin directory.

    For example:

    AIX® or Linux™: cd /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin

2.  Run the wsadmin tool. ./wsadmin.sh -lang jython -user wasadmin -password wasadmin.

3.  Run the library administration script. execfile\('libraryAdmin.py'\).

4.  Generate the library thumbnails. LibraryAdminService.generatePreviews\(\).

    **Note:** LibraryAdminService.generatePreviews\(\) is a long-running command that might take hours to complete. In this situation, the command might time out and send an exception to the console, however, if the command times out it still is running on the CCM server in the Extensions.ear. If there is a timeout, monitor SystemOut.log for the status of the command. Look for the SUCCESS or FAILURE messages.

    You can remove the exception by increasing the timeout. For more information, see *Troubleshooting connection timeouts when running a wsadmin script*

    Increasing the timeouts is necessary only if you need the wsadmin command to exit in the normal \(non-exceptional\) state.

5.  If the generation process fails, restart generation from the last successful page. Take the following steps:

    1.  Find the last occurrence of the following message in the logs: `CLFWY0828I: About to process page results:`

    2.  Included in the message is a URL of the following format: `https://<pathname>/dm/atom/seedlist/myserver?Start=3500&Checkpoint=_itO1UYWXKNuINxQHsh7h5G_Xzy2_2wtuTlKm2855-HpkK83755tWOnqNAwSl5JC7...&Range=100&StartTime=20150206T121346Z`

    3.  Run generatePreviewsWithRestart\("URL"\). Use this URL as input to the generatePreviewsWithRestart\(\) command, for example:

        ```
        generatePreviewsWithRestart("https://<pathname>/dm/atom/seedlist/myserver?Start=3500
        &Checkpoint=_itO1UYWXKNuINxQHsh7h5G_Xzy2_2wtuTlKm2855-HpkK83755tWOnqNAwSl5JC7...
        &Range=100&StartTime=20150206T121346Z")
        ```


Success, library thumbnails are generated:

```
SUCCESS:CLFWY0821I: Successful crawl {0} completed in {1} seconds. {2} events processed on {3} pages
```

Failure

```
CLFWY0819E: Failed crawl {0} exited after {1} seconds. {2} events processed on {3} pages
```

LibraryAdminService.generatePreviews\(\) generates more information for both SUCCESS and FAILURE in the SystemOut.log. The amount of information that is logged is controlled by the <traceLevel\> setting in library-config.xml. For more information, see *Configuring library seedlists to generate library thumbnails*.

**Related information**  


[Configuring library seedlists to generate library thumbnails](../admin/t_admin_communities_library_seedlist_configure.md)

[Troubleshooting connection timeouts when running a wsadmin script](../troubleshoot/r_troubleshooting_timeouts.md)

