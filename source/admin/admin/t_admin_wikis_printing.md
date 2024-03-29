# Printing library information {#printinglibraryinformation .task}

Use the WikisPrintService.saveToFile command to print information that is returned by other commands.

To run administrative commands, you must use the wsadmin client. For more information, see [Starting the wsadmin client](t_admin_wsadmin_starting.md).

This command prints `Map` or `List<Map>` Java objects that are returned by any of the following commands:

-   WikisMemberService.getById \(returns a `Map`\)
-   WikisMemberService.getByExtId \(returns a `Map`\)
-   WikisMemberService.getByEmail \(returns a `Map`\)
-   WikisLibraryService.getById \(returns a `Map`\)
-   WikisLibraryService.browseWiki \(returns a `List<Map>`\)
-   WikisPolicyService.getById \(returns a `Map`\)
-   WikisPolicyService.browse \(returns a `List<Map>`\)
-   WikisMetricService.browse \(returns a `List<Map>`\)

A `List<Map>` object is a list of `Map` Java objects. Maps are lists of key/value pairs. For example, the WikisLibraryService.browseWiki command returns a list of library maps. \(A library is the pages, attachments, and other data that make up a wiki.\) Each map in the list has a set of keys, and each key is paired with a value. Every library has the same set of keys, but unique values. Values are information about the library, such as its title and creation date.

1.  Start the wsadmin client.

2.  Start the Wikis Jython script interpreter using the following command:

    ```
    execfile("wikisAdmin.py")
    ```

3.  Run one the following command to print library information that is returned by other commands:

    ```
    WikisPrintService.saveToFile(Object object, 
       String filePath, String append)
    ```

    where object is a `Map` or `List<Map>` type of Java object. You provide the command that returns the object, for example, WikisLibraryService.browseWiki\(parameters\), which returns a `List<Map>` object.

    The filePath parameter is the location where you want the data that are printed in a comma-separated value \(.csv\) file.

    The append parameter determines whether to append the returned information to information in an existing file. If true \(the default\), returned information is appended, if false the file is overwritten.

    For example:

    ```
    WikisPrintService.saveToFile(WikisLibraryService.browseWiki("title","true",1,20), 
      "/opt/wsadmin/LibraryMap.csv")
    ```

    In this example, the command runs WikisLibraryService.browseWiki with the specified parameters and then prints the output to the LibraryMap.csv file. Because the append parameter is left at the default value of true, running the same command again appends the new data to the existing LibraryMap.csv. The following example shows data that is printed to a file:

    ```
    "id","createDate","label","lastUpdate","maximumSize","orphan","ownerUserId",
    "percentUsed","policyId","size","summary","title","type","externalInstanceId",
    "externalContainerId" 
    "ef8ed3e2-22c0-4f20-aa53-bdc6b262abbd","2009-06-25 12:30:32.797",
    "5adff8c0-7d67-102c-8452-e2ebc3ec5536","2009-06-25 12:30:32.797","524288000",
    "false","9ddb97f0-cea5-49fd-9158-06e45b01cd46","0.0",
    "00000000-0000-0000-0000-000000000000","0","","Amy Jones1","personal","",""
    "30676b64-c792-46d1-9c21-bcea1f3350cf","2009-06-25 16:23:23.354",
    "5b788f40-7d67-102c-8464-e2ebc3ec5536","2009-06-25 16:23:23.354","524288000",
    "false","1c00bd59-20c1-48ea-857b-9c998670d715","8.170700073242188E-5",
    "00000000-0000-0000-0000-000000000000","42838","","Amy Jones2","personal","",""
    "547b8f88-0cb9-4f84-95c2-382f235fe251","2009-06-26 10:57:57.384",
    "5b788f40-7d67-102c-8468-e2ebc3ec5536","2009-06-26 10:57:57.384","524288000",
    "false","a25fd14a-70d2-4978-b814-9e05f9b56503","3.90625E-5",
    "00000000-0000-0000-0000-000000000000","20480","","Amy Jones2","personal","",""
    "605ff4d6-956a-446f-a393-4995057213c5","2009-06-26 16:15:58.778",
    "5ca9bc40-7d67-102c-847c-e2ebc3ec5536","2009-06-26 16:15:58.778","524288000",
    "false","5a79bd44-e5d1-4b4d-b51f-338eff519636","3.1642913818359376E-6",
    "00000000-0000-0000-0000-000000000000","1659","","Amy Jones4","personal","",""
    "86aa4152-c661-4aae-ac7c-ca04da570715","2009-06-25 17:29:16.162",
    "5ddae940-7d67-102c-849e-e2ebc3ec5536","2009-06-25 17:29:16.162",
    "524288000","false","82252a4e-1355-4518-930c-983d7085ad6e","2.63214111328125E-7",
    "00000000-0000-0000-0000-000000000000","138","","Amy Jones5","personal","",""
    "fb9f97fe-0c41-4276-96f0-f1c91478df68","2009-06-25 11:52:22.843",
    "5e737fc0-7d67-102c-84b2-e2ebc3ec5536","2009-06-25 11:52:22.843",
    "524288000","false","8daf28ad-f51e-4ef3-8990-283c9fd4574a","0.0",
    "00000000-0000-0000-0000-000000000000","0","","Amy Jones6","personal","",""
    "179be703-7e44-45f5-9fa8-eeab1f46e896","2009-06-25 18:17:38.639",
    "5f0c1640-7d67-102c-84c6-e2ebc3ec5536","2009-06-25 18:17:38.639",
    "524288000","false","3a99634c-fd29-4966-ae6f-217472f5439c","0.0",
    "00000000-0000-0000-0000-000000000000","0","","Amy Jones7","personal","",""
    ```


**Parent topic:**[Administering Wikis](../admin/c_admin_wikis_overview.md)

**Related information**  


[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

