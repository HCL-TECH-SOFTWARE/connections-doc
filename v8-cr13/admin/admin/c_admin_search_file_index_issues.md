# Investigating file content search issues {#c_admin_search_file_index_issues .concept}

An overview of file content search issues.

## Services covered by file content indexing { .section}

The following HCL Connections services are covered for file content indexing:

-   Files in the Files service
-   Wikis attachments
-   Activities attachments
-   Forums attachments
-   CCM files

## Indexing schedule { .section}

Index scheduling is as follows:

-   Metadata from all files is indexed as part of the regular 10/15 minute indexing schedule.
-   File content extraction is handled by a separate process on its own schedule. Therefore, it might be up to 50 minutes after upload time before a file can be searched by its content.

## Supported file types { .section}

`search-config.xml` defines the file types that are handled for file content indexing:

```bash
<mimeType name="application/msword" processor="" />  
<mimeType name="application/vnd.ms-excel" processor="" />  
<mimeType name="application/vnd.ms-powerpoint" processor="" />  
<mimeType name="application/vnd.visio" processor="" />
<mimeType name="application/vnd.ms-project" processor="" />  
<mimeType name="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" processor="" />  
<mimeType name="application/vnd.openxmlformats-officedocument.presentationml.presentation" processor="" />  
<mimeType name="application/vnd.openxmlformats-officedocument.wordprocessingml.document" processor="" />  
<mimeType name="application/pdf" processor="" /> 
<mimeType name="application/postscript" processor="" />
<mimeType name="application/xhtml+xml" processor="" /> 
<mimeType name="application/xml" processor="" />
<mimeType name="text/html" processor="" />  
<mimeType name="text/htm" processor="" />  
<mimeType name="text/plain" processor="" />  
<mimeType name="text/richtext" processor="" />  
<mimeType name="text/xml" processor="" />  
<mimeType name="application/rtf" processor="" />  
<mimeType name="application/vnd.oasis.opendocument.text" processor="" />  
<mimeType name="application/vnd.oasis.opendocument.spreadsheet" processor="" />  
<mimeType name="application/vnd.oasis.opendocument.presentation" processor="" />  
<mimeType name="application/vnd.oasis.opendocument.text-master" processor="" />  
```

You can disable indexing of any of these file types by removing that entry from `search-config.xml`.

## General file content indexing switches { .section}

You can disable all file content indexing by removing all file type entries from `search-config.xml`.
You can also temporarily disable file content indexing by disabling the 20-minute file content retrieval scheduled task.

## File size cutoff { .section}

The `search-config.xml` file size cutoff `maxAttachmentSize` is a configuration setting for the maximum size of files that can have content that is indexed. Any file that exceeds the cutoff size is not indexed. By default this configuration is set to 52 MB.

## Limit on indexed text { .section}

The `search-config.xml` limit on indexed text `maxAttachmentSize` is a configuration setting that limits the amount of extracted text that is indexed for a file. This limit prevents large files from adversely affecting search relevancy by pushing down smaller more relevant files in the search results. This limit is configurable and the default is 200 KB of extracted text.
## Unsupported files { .section}

The following files are never indexed:

-   Encrypted files
-   Password protected files
-   Corrupted files of any type

## Searching files content for accented characters { .section}

Searching file content for accented characters works for all the supported file types, except in the case of .txt files that do not have UTF-8 encoding. For example, if a .txt file has ANSI encoding, then any accented characters it contains are not found by a full text search. To resolve this, save the file using UTF-8 encoding and then upload it again.

## **General parameters for Apache Tika file conversions** { .section}

HCL Connections uses the Apache Tika conversion libraries to convert business documents to plain text before they are indexed. There are a number of properties that could be modified if required, though the default values typically should be sufficient.

These parameters can be updated in the `search-config.xml` file.

!!! note 
    
    The following properties might not be present in `search-config.xml`. If a property is missing from `search-config.xml`, it will use the default value documented in this article. If you need to specify a different value for any of these properties, add the property to `search-config.xml`: Edit `search-config.xml` and find `<propertySettings>` at the end of the file. Inside this element, at the bottom of the list of `<property>` names, add the following:

```bash
 {#codeblock_v2m_fqq_55b}
        <property name="tikaFileConversion">
            <propertyField name="tikaFileConversion.javaOptions" value=""/>
            <propertyField name="tikaFileConversion.maxContentSize" value="204800"/>
            <propertyField name="tikaFileConversion.maxConversionSeconds" value="180"/>
            <propertyField name="tikaFileConversion.maxDocConversionsPerProcess" value="100"/>
            <propertyField name="tikaFileConversion.tempDirectory" value="${SEARCH_INDEX_DIR}/filesTemp"/>
            <propertyField name="tikaFileConversion.deleteTempFiles" value="true"/>
            <propertyField name="tikaFileConversion.maxConversionThreads" value="5"/>
        </property>		
```

Save the file, perform a full synchronization for all nodes, and restart the Search application for any new values to take effect.

|**Property**|**Default value**|**Description**|
|-----------|-----------|-----------|
|tikaFileConversion.deleteTempFiles|true|The conversion process creates temporary files containing the plain text that are deleted by default. If debugging and it is necessary to review these files, change this to false.|
|tikaFileConversion.javaOptions| |Update only if specific JVM options are required such as increasing the process heap size|
|tikaFileConversion.maxContentSize|204800|Indicates the Maximum number of bytes to index at the beginning of a document.|
|tikaFileConversion.maxConversionSeconds|180|Indicates the number of seconds that the Connections server waits for a tika process to respond to a conversion request.|
|tikaFileConversion.maxDocConversionsPerProcess|100|Indicates the number of conversions each tika server process is allowed to execute before the process is recycled and started over.|
|tikaFileConversion.maxConversionThreads|5|Displays the maximum number of threads that will be allowed to run conversions simultaneously. This is also the maximum number of tika processes which run simultaneously.|
|tikaFileConversion.tempDirectory|$\{SEARCH\_INDEX\_DIR\}/filesTemp|Displays the directory used to store temporary conversion file output|

**Parent topic:** [The indexing process](../admin/c_admin_search_index_process.md)

**Related information**  


[Troubleshooting when files content is not found after searching](../troubleshoot/t_ts_missing_files_content_after_search.md)

