# Investigating file content search issues {#c_admin_search_file_index_issues .concept}

An overview of file content search issues.

## Services covered by file content indexing { .section}

The following HCL Connections services are covered for file content indexing:

-   Files in the Files service
-   Wikis attachments
-   Activities attachments
-   Forums attachments

## Indexing schedule { .section}

Index scheduling is as follows:

-   Metadata from all files is indexed as part of the regular 10/15 minute indexing schedule.
-   File content extraction is handled by a separate process on its own schedule. Therefore, it might be up to 50 minutes after upload time before a file can be searched by its content.

## Supported file types { .section}

search-config.xml defines the file types that are handled for file content indexing:

```
<mimeType name="application/msword" processor="" />
<mimeType name="application/onenote" processor="" />
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
<mimeType name="application/csv" processor="" />
<mimeType name="text/csv" processor="" />
<mimeType name="text/htm" processor="" />
<mimeType name="text/html" processor="" />
<mimeType name="text/richtext" processor="" />
<mimeType name="text/plain" processor="" />
<mimeType name="text/xml" processor="" />
<mimeType name="application/msg" processor="" />
<mimeType name="application/eml" processor="" />
<mimeType name="message/rfc822" processor="" />
<mimeType name="application/rtf" processor="" />
<mimeType name="application/vnd.oasis.opendocument.text" processor="" />
<mimeType name="application/vnd.oasis.opendocument.spreadsheet" processor="" />
<mimeType name="application/vnd.oasis.opendocument.presentation" processor="" />
<mimeType name="application/vnd.oasis.opendocument.text-master" processor="" />
<mimeType name="application/vnd.oasis.opendocument.text-web" processor="" />
<mimeType name="application/vnd.oasis.opendocument.chart" processor="" />
<mimeType name="application/vnd.oasis.opendocument.formula" processor="" />
```

You can disable indexing of any of these file types by removing that entry from search-config.xml.

## General file content indexing switches { .section}

You can disable all file content indexing by removing all file type entries from search-config.xml.

You can also temporarily disable file content indexing by disabling the 20-minute file content retrieval scheduled task.

## File size cutoff { .section}

The search-config.xml file size cutoff maxAttachmentSize is a configuration setting for the maximum size of files that can have content that is indexed. Any file that exceeds the cutoff size is not indexed. By default this configuration is set to 52 MB.

## Limit on indexed text { .section}

The search-config.xml limit on indexed text tikaFileConversion.maxContentSize is a configuration setting that limits the amount of extracted text that is indexed for a file. This limit prevents large files from adversely affecting search relevancy by pushing down smaller more relevant files in the search results. This limit is configurable and the default is 204800 bytes of extracted text.

## Unsupported files { .section}

The following files are never indexed:

-   Encrypted files
-   Password protected files
-   Corrupted files of any type

## Searching files content for accented characters { .section}

Searching file content for accented characters works for all the supported file types, except in the case of .txt files that do not have UTF-8 encoding. For example, if a .txt file has ANSI encoding, then any accented characters it contains are not found by a full text search. To resolve this, save the file using UTF-8 encoding and then upload it again.

**Parent topic:**[The indexing process](../admin/c_admin_search_index_process.md)

**Related information**  


[Troubleshooting when files content is not found after searching](../troubleshoot/t_ts_missing_files_content_after_search.md)

