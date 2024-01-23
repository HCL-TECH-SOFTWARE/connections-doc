# Troubleshooting when files content is not found after searching {#t_ts_missing_files_content_after_search .reference}

Connections uses the Apache Tika file conversion libraries for converting business documents from various types to plain text. The plain text is required before the content can be indexed. If search cannot find the content from a file, it could be due to an issue with this conversion from the business document format to plain text. This article describes some steps that can be used to troubleshoot this process.

## Running the conversion manually {#section_v1d_xtd_q5b .section}

You can run a standalone tika process by itself, passing in the document to convert to plain text as a parameter. This should produce the same plain text that is created when the Connections server is running the process and it can be used to determine if the tika conversion is working properly.

You need to have a test document saved locally to run the conversion against. The followings steps are using Linux as an example, but similar steps can be used on Windows.

1.  Setup the command line. Using the terminal, go to to the WebSphere DMgr/bin directory and execute the following:

    ``` {#codeblock_gsb_n5d_q5b}
    cd /opt/IBM/WebSphere/AppServer/profiles/DMgr01/bin
    . ./setupCmdline.sh
    ```

2.  On a WebSphere node, go to the Search.ear/tika directory by executing the following:

    ``` {#codeblock_g4z_r5d_q5b}
    cd /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/bvtdb2Node01Cell/Search.ear/tika
    ```

3.  Run java using the tika jar that is present in this directory. The jar name may vary slightly depending on the version that is present.

    ``` {#codeblock_n2l_w5d_q5b}
    java -jar tika-app-2.4.1.jar -t <filename>
    ```

    for example

    ``` {#codeblock_wr1_gvd_q5b}
    java -jar tika-app-2.4.1.jar -t /home/lcuser/testdoc.docx
    ```

4.  This action will produce plain text output to the console which can be examined for the missing text.

## cnx-tika-server process {#section_qg1_mvd_q5b .section}

Since file conversions are required, HCL Connections server launches a java process to perform the conversions. To avoid a long startup time for the jvm, Connections keeps these processes running for up to ***tikaFileConversion.maxDocConversionsPerProcess***conversions before ending the process. You can see these processes running on your Connections server by checking the process list:

``` {#codeblock_nzg_5vd_q5b}
ps -ef|grep tika
```

The results are displayed in the ***tikaFileConversion.maxConversionThreads*** processes, such as:

``` {#codeblock_xdv_yvd_q5b}
[lcuser@lcauto100 ~]$ ps -ef | grep tika
lcuser    3353  1928 49 15:19 ?        00:00:18 /opt/IBM/WebSphere/AppServer/java/jre/bin/java Dlog4j.configurationFile=/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/bvtdb2Node01Cell/Search.ear/tika/cnxtikalog4j2.xml -jar /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/bvtdb2Node01Cell/Search.ear/tika/cnxtika-server.jar -server
lcuser    3356  1928 26 15:19 ?        00:00:09 /opt/IBM/WebSphere/AppServer/java/jre/bin/java Dlog4j.configurationFile=/opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/bvtdb2Node01Cell/Search.ear/tika/cnxtikalog4j2.xml -jar /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/bvtdb2Node01Cell/Search.ear/tika/cnxtika-server.jar -server
```

**Parent topic:**[Troubleshooting Search](../troubleshoot/c_ts_search.md)

