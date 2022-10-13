<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# How to set an org to Read-Only

When you are ready to request the final DB export and update binary files it is recommended that you set the org to read only. This can be performed by an admin of the Org using the customizer tool. Instructions for setting an org to read- only can be found here: [https://github.com/ibmcnxdev/global-samples/tree/master/disable-content-creation](https://github.com/ibmcnxdev/global-samples/tree/master/disable-content-creation)

## Downloading the exported data

**Background**

The Connections data for the hosted organizations (exported database and binary files) are available to be downloaded from the IBM cloud and can be imported into your Connections MT environment. Database and file exports will be available for download from an AWS S3 provided by the CH-MSP. Download and installation instructions are provided in this document. All artifacts are uploaded and are to be downloaded using the rclone tool. This document discusses the processes for downloading and importing the Connections data artifacts. A separate document has been provided with the details for setting up the Amazon s3 and how that information is to be conveyed to IBM.

## Downloading the export package

**Before you begin**

Please see the document that describes how to set up an S3 bucket and convey the bucket information to IBM for data transfer.

**About this task**

As part of the transfer process, a directory will be created in the target bucket folder that identifies the organization for which exports are being transferred. The name of the directory is the orgid.

The files that are written to that folder in the bucket will be encrypted using an rclone &quot;crypt.&quot; The keys used to encrypt the uploaded content are provided to IBM by the CH-MSP. The files must be downloaded using a corresponding crypt at the CH-MSP.

For each organization that is being migrated to the CH-MSP environment is a set of Db2 Export files, consisting of .ixf files as well as any binary large object files, or .lob files. The database export files will be found in directories named for the database that has been exported.

These directories are ACTIVITIES, BLOGS, CALENDAR, EMPINST, FILES, FORUM, HOMEPAGE, SNCOMM,

WIKIS, and XCC. The .ixf and .lob files in each directory generally correspond to that database&#39;s tables. The database exports are found underneath a directory called db-exports on AWS S3 under an org specific directory.

In addition to those database export files, there is a set of binary files that represent the on-disk content managed by each application. Those applications are Files, Wikis, Activities, Forums, and Blogs.

For Forums, Activities, and Blogs, the binary files represent attachments to the content for those applications. For Wikis, the on-disk binary content represents Wiki pages as well as attachments to Wikis. For the Files application, the on-disk files represent all the versions of the files as well as accompanying thumbnails for those files.

File exports can be found in compressed archives under the organization specific file-exports directory, in subdirectories that correspond to each application. The use of tarballs to transfer the files was introduced to more efficiently transfer the files using rclone.

In each application-specific subdirectory there should be one archive file (e.g. wikis.tar.gz), a timestamp file, and if appropriate a file that contains a list of files for which there were references in the database but which could not be found on disk at export time. The exception is that in the Files application subdirectory there will be three archive files (e.g., files1.tar.gz, files2.tar.gz and files3.tar.gz), which correspond to the storage structure in the Cloud production environments.

Once the export package has been downloaded to a location in the MSP environment, the imports can be performed.

The Files exports should be copied from the S3 bucket to a staging directory, expanded, and then copied into the locations where Connections has been configured to store them.

Each of the applications stores files in different locations. The directories are configured as WebSphere environment variables in the WebSphere admin console.

## Importing the binary files

**Directory layouts for files and attachments**

All applications, with the exception of blogs and some activities, use the same scheme for naming on-disk files. File names are globally unique using a UUID format where a directory structure of a depth of two is calculated from the UUID name. You will note that the two levels of directory are named from 0-128. This scheme is used to evenly distribute files across the directory tree. Files, Wikis, and Forums use this approach for all files and the GUID references are present in the DB tables, so their on-disk location is easily calculated.

Activities uses the same approach that Files, Wikis, and Blogs uses for &quot;newer&quot; files under a directory called &quot;activityobjectstore4.&quot; You might or might not note that there are directories activityobjectstore1-3 under which there are directories and files that use a different naming scheme. That scheme was deprecated at some point in the past, though you might see some files that were created when that scheme was in use. Activities has references in its database tables for all of the file attachments.

For Blogs, each &quot;website&quot; object, which is effectively the blog container object, maintains a correspondingly named GUID directory that can be found under directory structure of a depth of three that are named for the first three characters in that GUID name. For example, 4C2617BB-12D2-404D-9D7F-D0EC1D76ADE5 would be found under a directory of &quot;4/C/2&quot; (case insensitive). Blogs can also have attached folders in addition to attached files, and those directory names, which are not UUID based, use that same 3 depth directory naming scheme: a folder named &quot;MyPhotos&quot; would be found under &quot;m/y/p&quot;. Because the naming scheme is somewhat less predictable, we have added each directory from the top level as a tarball itself to package things up neatly. It appears that the Blog application might have created directories that have no subfolders or files in them. For the sake of referential integrity, we tar those up as well. Aside from the Website UUID, there are no additional file references in the Blogs tables. You also might find a blogs\_nf.txt file; those are very likely false positives in which there might have been files that were not found on the disk volumes where cloud files had beenstored.

Below are examples for copying each of the files for each application to the appropriate location. Note that organizational separation is maintained in the database tables, but all files are mixed when on the file system.

### Activities

1. ACTIVITIES\_CONTENT\_DIRECTORY:/opt/HCL/data/shared/activities/content
2. Expand Activities archive to the Activities staging directory.
3. Copy the files to the ACTIVITIES\_CONTENT\_DIRECTORY, as follows:
   ```
   cp -vrT <staging directory>/file-exports/activities/activitiesobjectstore4 /opt/HCL/data/shared/activities/content 
   cp -vrT <staging directory>/files-exports/activities/activitiesobjectstore1 /opt/HCL/data/shared/activities
   ```

### Blogs

1. BLOGS\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/blogs/upload/content
2. Expand Blogs archive to the Blogs staging directory.
3. Because Blogs directories are also archived, perform the following command to expand the Blogs directories and clean them up:
   ```
   find . -type f -name *.tar.gz -exec sh -c dir="$(dirname "{}")"; tar xvf "{}" -C "${dir}"; rm "{}" ;
   ```
4. Copy the files to the BLOGS\_CONTENT\_DIRECTORY as follows:
   ```
   cp -vrT <staging directory>/file-exports/blogs /opt/HCL/data/shared/blogs/upload/content
   ```

### Files

1. FILES\_CONTENT\_DIRECTORY:/opt/HCL/data/shared/files/upload/files
2. Expand files archive files to the files staging directory:
   ```
   cp -vrT <staging directory>/file-exports/files /opt/HCL/data/shared/files/upload/files
   ```

### Forums

1. FORUMS_CONTENT_DIRECTORY: /opt/HCL/data/shared/forums/content 
2. Expand forums archive file to the forums staging directory:
   ```
   cp -vrT <staging directory>/file-exports/forums /opt/HCL/data/shared/forums/content
   ```
 
### Wikis

1. WIKIS\_CONTENT\_DIRECTORY: /opt/HCL/data/shared/wikis/upload/files
2. Expand wikis archive file to the wikis staging directory:
   ```
   cp -vrT <staging directory>/file-exports/wikis /opt/HCL/data/shared/wikis/upload/files
   ```

<?tm 1541016643182 1 HCL Connections ?>


