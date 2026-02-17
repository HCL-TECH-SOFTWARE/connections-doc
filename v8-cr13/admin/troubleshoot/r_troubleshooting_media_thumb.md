# Troubleshooting media views and thumbnail generation {#r_troubleshooting_media_thumb .reference}

The Files application provides a grid view to show thumbnails for files of various formats. When a user uploads, updates, or views a file, a thumbnail is generated \(provided a thumbnail is available for the file\). However, this solution does not work with existing files. You can use the global feature flag `<genericProperty name="filesMediaView">enabled</genericProperty>` to control whether the grid view is displayed when users upload, update, or open a file. Use the Files MBean FilesThumbnailService.generateForAllFiles\(\)command to modify `createThumbnail event` so that the thumbnail also displays existing files.

## Global feature flag { .section}

On deployment, the global feature flag `<genericProperty name="filesMediaView">enabled</genericProperty>` in LotusConnections-config.xml is set to false.

## Running MBean FilesThumbnailService.generateForAllFiles\(\)command { .section}

The Files MBean command scans all existing HCL Connections™ files and sends a `createThumbnail` event to viewer to generate thumbnails for existing files as follows:

1.  When you run FilesThumbnailService.generateForAllFiles\(\), a thread is dedicated to this task until finished.
2.  You can configure the rate of event generation. The default is one event every two seconds.
3.  FilesThumbnailService.generateForAllFiles\(\) loops to scan the Database from the beginning or restarts from where you left off from any previous run by persist the last timestamp on disk. The scan descends by file create time.
4.  For each file, FilesThumbnailService.generateForAllFiles\(\) checks if a thumbnail is available. If a thumbnail is not available, a `createThumbnail` event is sent.
5.  The log file is updated after every 150 events. Check the log intermittently, to monitor progress. .
6.  FilesThumbnailService.generateForAllFiles\(\) terminates after scanning all file records in the system.

If either Files.ear or the server restarts, you must runFilesThumbnailService.generateForAllFiles\(\) again.

## Changing event generation rate { .section}

The default rate for generation is one event very two seconds. This rate is based on a 24-cores conversion configuration. For example, if there are six conversion servers, with four 4 cores each \(as recommended by HCL Docs\), so there are 6\*4=24 cores for conversion.

To change the conversion rate, take the following steps:

1.  Navigate to the Files.ear installation directory in WAS, for example: `D:\IBM\WebSphere\AppServer\profiles\AppSrv01\installedApps\BXV5V631Node02Cell\Files.ear`
2.  Open config/com.ibm.lconn.share.platform.bootstrap.properties.
3.  Change the configuration, example:

    ```
    external.thumbnailGeneration.batchSize=1
    external.thumbnailGeneration.intervalInSeconds=2
    ```

4.  Using the following SQL statement, to get the total number of files need to generate thumbnails from the connect Files database:

    ```
    "select count(*) from FILES.MEDIA where FILE_EXTENSION IN ('.doc','.docx','.ppt','.pptx','.xls','.xlsx','.odt','.ods','.odp')"
    ```


## An example FilesThumbnailService.generateForAllFiles\(\)command and status check { .section}

1.  Navigate to /opt/IBM/WebSphere/AppServer/profiles/Dmgr01/bin
2.  Run the following commands:

    ```
     ./wsadmin.sh -lang jython -username wasadmin -password p@88w0rd
    WASX7209I: Connected to process "engage_server" on node ocs_app_node_acdmgr using SOAP connector; 
    The type of process is: ManagedProcess WASX7031I: For help, enter: "print Help.help()" 
    
    ```

    ```
    wsadmin>execfile("filesAdmin.py") 
    Connecting to WebSphere:name=FilesAdminService,type=LotusConnections,cell=ocs_cell,node=ocs_app_node_acdmgr,
    * Files Administration initialized. 
    ```

    ```
    wsadmin>FilesThumbnailService.generateForAllFiles()
    ```

3.  Search for: "ThumbnailMBean" in System.out to get the status of FilesThumbnailService.generateForAllFiles\(\).

    Every 150 events \(or every 5 minutes if the generation interval=2\), there is a log update, for example:

    ```
    [4/22/14 23:01:54:446 EDT] 0000006b ThumbnailMBea I   ThumbnailMBean.generateInBatch(), totally generated events 16800.
    [4/22/14 23:01:54:447 EDT] 0000006b ThumbnailMBea I   ThumbnailMBean.generateInBatch(), The last media id is ee1c9764-a2c3-4b9c-9147-512f79731f91, create date is 2013-11-08 07:18:59.37.
    [4/22/14 23:06:58:708 EDT] 0000006b ThumbnailMBea I   ThumbnailMBean.generateInBatch(), totally generated events 16950.
    [4/22/14 23:06:58:710 EDT] 0000006b ThumbnailMBea I   ThumbnailMBean.generateInBatch(), The last media id is cfc3cdc3-81e4-43d2-9533-d6f0ce328b52, create date is 2013-11-07 11:47:32.723
    ```


## Where are thumbnails stored? { .section}

Thumbnails are stored in a hashed directory FILES\_CONTENT\_DIR/preview.

FilesThumbnailService.generateForAllFiles\(\) triggers the thumbnail events for files. Viewer consumes the events to perform the actual conversions to generate thumbnails. Therefore, there is a delay for the thumbnail generation.

You can search the file id in FILES\_CONTENT\_DIR/preview to see if a thumbnail is generated for a file.

For example:

```
find /mnt/nas/files/files/preview -name 938d6c34-2e23-4223-8316-9cd2cf5ed098
```

## Troubleshooting { .section}

If you do not see thumbnails for office files, you can use these steps to see whether thumbnails are already generated. Open the following trace to troubleshoot any errors that are reported during processing of the thumbnail request:

```
com.ibm.lconn.core.web.previewcache
```

If you do not see thumbnails for image files, use the following SQL statement to see whether a thumbnail is available in the database:

```
select * from FILES.MEDIA_ADDITIONAL_FILE where MEDIA_ID=x'f146f4ad5e3741d582893a4a29bfe146' , 
input parameter is file id, you can trim the "-" from file id in url.
```

If there are no thumbnails in the database. The Files application provides a daily task to generate thumbnail for images. This daily task is configured in files-config.xml as follows:

```
<task enabled="true" interval="0 0 0 * * ?" name="RenditionDailyGeneration" type="internal"/>
```

## Notes { .section}

You can ignore any thread hung logs. FilesThumbnailService.generateForAllFiles\(\) dedicates a long-living thread to generate the thumbnail events. The WebSphere Application Server ThreadMonitor logs any persistent threads, for example:

```
[4/22/14 13:46:00:662 EDT] 00000029 ThreadMonitor W WSVR0605W: Thread "Default : 1" (0000006b) has been active for 727487 milliseconds and may be hung. 
There is/are 1 thread(s) in total in the server that may be hung. 
   at java.lang.Thread.sleep(Native Method) 
   at java.lang.Thread.sleep(Thread.java:896) 
   at com.ibm.lconn.share.platform.mbean.ThumbnailMBeanImpl.generateInBatch(ThumbnailMBeanImpl.java:275) 
   at com.ibm.lconn.share.platform.mbean.ThumbnailMBeanImpl.generateForAllFiles(ThumbnailMBeanImpl.java:138) 
   at com.ibm.lconn.share.platform.mbean.ThumbnailMBeanImpl.generateForAllFiles(ThumbnailMBeanImpl.java:174) 
   at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) 
   at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:60) 
   at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:37) 
   at java.lang.reflect.Method.invoke(Method.java:611) 
   at sun.reflect.misc.Trampoline.invoke(MethodUtil.java:49)
```

**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

