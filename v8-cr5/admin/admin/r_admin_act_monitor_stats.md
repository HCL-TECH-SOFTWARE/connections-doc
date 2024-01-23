# Activity statistics {#r_admin_act_monitor_stats .reference}

Activities provides a variety of statistics that you can use to monitor operations and make configuration adjustments when necessary.

## Using statistics { .section}

Activities maintains sets of statistics that keep track of usage information. The values for these statistics, and the change in value between the last sample and the current one are maintained in text files. The statistics collected, the frequency with which they are collected, and the text file names all have default settings. You can change the configuration to collect fewer statistics or to change the collection frequency.

Available statistics include:

-   Number of activities and activity members
-   Number of times that a service was accessed
-   Response times for services

Activities runs scheduled tasks that save current statistics values. The jobs are defined in the oa-config.xml file. You can edit this file to change the time intervals of the jobs or to change the start times of the jobs.

Activities runs the following scheduled jobs:

**DatabaseRuntimeStats**:   Runs once per hour by default. Its function is to query the Activities database for database related statistics, such as the number of Activities, or number of members.

**30MinStats**:   Runs once every half hour by default. Its function is to maintain the current values of the Activities statistics specified in the <stats\> element of oa-config.xml to disk.

**DailyStats**:   Runs once a day at 11:00 AM by default. Its function is to maintain the current values of the Activities statistics specified in the <stats\> element of oa-config.xml to disk.

By default, the statistics jobs capture some standard statistics that are defined in the oa-config.xml file. You can edit this file to collect the statistics that best suit your implementation. Activities saves the collected data into files whose names are composed by combining the job name with the following names:

**AddedData.txt**:   Collects the number of bytes of data added to the system.

**Average.txt**:   Collects the average time required to process a request to a particular Activities service in milliseconds.

**ContentStore.txt**:   Collects the content store activity: uploads, downloads, and deletions.

**Counts.txt**:   Collects the number of times that a particular service was accessed.

**Current®.txt**:   Collects information about aspects of the currently running system.

**Events.txt**:   Collects the number of errors being reported by the system.

**Totals.txt**:   Collects the number of objects in the system.

For example, the 30MinStats scheduled job maintains files named 30MinStatsAddedData.txt, 30MinStatsAverage.txt, and so on. The DailyStats job maintains files named DailyStatsAddedData.txt, DailyStatsAverage.txt, an so on. Additionally, each file maintained by Activities has an associated delta file that tracks the difference between the previous value of the statistic and the current value. For example: Delta30MinStatsAddedData.txt and DeltaDailyStatsAddedData.txt. There are also average delta files, which track the average time required to process the requests within the collection interval. These are named as follows: Delta30MinStatsAverage.txt and DeltaDailyStatsAverage.txt.

Statistics text files use a comma separated value \(CSV\) format. This format enables you to import the files into a spreadsheet, and then compute and chart the values.

All of the files into which Activities stores data are in the directory referenced by the ACTIVITIES\_STATS\_DIR WebSphere® Application Server variable. The files for the statistics for each server are located in the ACTIVITIES\_STATS\_DIR/\{nodeName\}/\{serverName\} directory. To edit the variable, access the websphere Application Server Integrated Solutions Console, navigate to **Environment** \> **WebSphere Variables**, and search in the server scope. You can view the current value of the ACTIVITIES\_STATS\_DIR variable and modify it, if necessary.

## The statistics and what they measure { .section}

The following tables list the statistics available and describe what each statistic represents.

Table 1. Statistics in jobName Totals.txt file

|Statistic|Description|
|---------|-----------|
|activities.data.totals.activities|Number of activities in the database.|
|activities.data.totals.entries|Number of activity entries \(for example standard entries, to-do items\) in the database.|
|activities.data.totals.members|Number of activity members in the database.|

Table 2. Statistics in jobName Current®.txt file

|Statistic|Description|
|---------|-----------|
|activites.requests.concurrent.max|Maximum number of simultaneous requests processed by the Activities application since the application was started.|
|activities.service.eventqueue.entries.current|Current number of events waiting to be processed.|
|activities.users.active.current|Number of users that have accessed the Activities application within the last five minutes.|
|activities.users.active.max|Maximum number of users that have accessed the Activities application within a five minute window since the application was started.|

Table 3. Statistics in jobName Events.txt file

|Statistic|Description|
|---------|-----------|
|activities.fatals|Number of fatal errors reported by the Activities application since the application was started.|
|activities.errors|Number of non-fatal errors reported by the Activities application since the application was started.|
|activities.warnings|Number of warnings reported by the Activities application since the application was started.|
|activities.service.virus.scan.found.count|Number of viruses removed from content by the virus scanning software configured for the Activities application since the application was started. If virus scanning is not enabled, then zeros \(0\) are collected for this statistic.|
|activities.service.acf.badcontent.found|Number of instances of active content removed by the Activities application since the application was started. If active content filtering is not enabled for Activities, then zeros \(0\) are collected for this statistic.|

Table 4. Statistics in jobName Average.txt file (Average time in milliseconds required to process a request to a particular Activities service

|Statistic|Description|
|---------|-----------|
|activities.service.db.totals.Average|Average time to complete a database request.|
|activities.service.api.totals.Average|Average time to complete a service request.|
|activities.service.directoryprofile.totals.Average|Average time to complete a directory lookup request.|
|activities.service.smtp.totals.Average|Average time to deposit mail to the SMTP server. If SMTP is not enabled, then zeros \(0\) are collected for this statistic.|
|activities.service.trash.totals.Average|Average time to purge an activity or activity entry from the trash.|

Table 5. Statistics in jobName Counts.txt file

|Statistic|Description|
|---------|-----------|
|activities.service.db.totals.Count|Number of database requests made since the application was started.|
|activities.service.api.totals.Count|Number of service requests made since the application was started.|
|activities.service.directoryprofile.totals.Count|Number of directory lookups made since the application was started.|
|activities.service.smtp.totals.Count|Number of SMTP requests made since the application was started. If SMTP is not enabled, then zeros \(0\) are collected for this statistic.|
|activities.service.trash.totals.Count|Number of activities or activity entries purged from the trash since the application was started.|

Table 6. Statistics in jobName AddedData.txt file

|Statistic|Description|
|---------|-----------|
|activities.service.contentstore.filesystem.upload.bytes|Number of bytes added to the content store by uploaded files.|

Table 7. Statistics in "jobName"ContentStore.txt file

|Statistic|Description|
|---------|-----------|
|activities.service.contentstore.filesystem.upload.Count|Number of files uploaded to Activities since the application was started.|
|activities.service.contentstore.filesystem.download.Count|Number of files downloaded from Activities since the application was started.|
|activities.service.contentstore.filesystem.remove.Count|Number of files removed from Activities since the application was started.|

## Examples of Activities configuration files { .section}

The following example demonstrates the data that Activities collects by default:

```
<stats>
        <!--  Specify where statistics files should be kept. 
         --> 
        <statsDirectory/>${ACTIVITIES_STATS_DIR}</statsDirectory> 
        <stat>
          <fields>
            <field>dates</field> 
            <field>activities.data.totals.activities</field> 
            <field>activities.data.totals.entries</field> 
            <field>activities.data.totals.members</field> 
          </fields>
          <file>Totals.txt</file> 
          <samples>144</samples> 
        </stat>
        <stat>
          <fields>
            <field>dates</field> 
            <field>activities.requests.concurrent.max</field> 
            <field>activities.service.eventqueue.entries.current</field> 
            <field>activities.users.active.current</field> 
            <field>activities.users.active.max</field> 
          </fields>
          <file>Current.txt</file> 
          <samples>144</samples> 
        </stat>
        <stat>
          <fields>
            <field>dates</field> 
            <field>activities.fatals</field> 
            <field>activities.errors</field> 
            <field>activities.warnings</field> 
          </fields>
          <file>Events.txt</file> 
          <samples>144</samples> 
        </stat>
        <stat>
          <fields>
            <field>dates</field> 
            <field>activities.service.db.totals.Average</field> 
            <field>activities.service.api.totals.Average</field> 
            <field>activities.service.directoryprofile.totals.Average</field> 
            <field>activities.service.smtp.totals.Average</field> 
            <field>activities.service.trash.totals.Average</field> 
          </fields>
          <file>Average.txt</file> 
          <samples>144</samples> 
        </stat>
        <stat>
          <fields>
            <field>dates</field> 
            <field>activities.service.db.totals.Count</field> 
            <field>activities.service.api.totals.Count</field> 
            <field>activities.service.directoryprofile.totals.Count</field> 
            <field>activities.service.smtp.totals.Count</field> 
            <field>activities.service.trash.totals.Count</field> 
          </fields>
          <file>Counts.txt</file> 
          <samples>144</samples> 
        </stat>
        <stat>
          <fields>
            <field>dates</field> 
            <field>
              activities.service.contentstore.filesystem.upload.bytes
            </field> 
          </fields>
          <file>AddedData.txt</file> 
          <samples>144</samples> 
        </stat>
        <stat>
            <fields>
                <field>dates</field>
                <field>
                  activities.service.contentstore.filesystem.upload.Count
                </field>
                <field>
                  activities.service.contentstore.filesystem.download.Count
                </field>
                <field>
                  activities.service.contentstore.filesystem.remove.Count
                </field>
            </fields>
            <file>ContentStore.txt</file>
            <samples>144</samples>
        </stat>
      </stats>


```

**Parent topic:** [Monitoring statistics and metrics](../admin/t_admin_act_collecting_statistics.md)

