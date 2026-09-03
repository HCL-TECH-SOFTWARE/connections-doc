# Scenario: Collaborating on a document using automatic sync {#scenario_file_sync .concept}

Nancy Smith is a project manager for Greenwell, a fast-growing corporate event planning service. She creates a customer proposal that multiple people, including people outside of Greenwell, must access and edit. Some people are working from a laptop, others are working on the same file locally from their desktop system. Sync is used by the people who work offline. The automated file sync eliminates the stress of having to download the latest version of the file.

## File sync scenario { .section}

**Note:** In this scenario, all companies and people are fictitious.

These are the people who need to collaborate on the project. They all have subscriptions to Connections Cloud:

|Person:|Role:|
|-------|-----|
|![Photograph of Nancy Smith](images/Nancy_Smith_96x96.jpg)|Nancy Smith
:   Project Manager

 Nancy must create a proposal that other people can update. Nancy needs to feel confident that she is always working on the latest version of the file, whether she accesses it from her desktop or her laptop.

The file sync feature in HCL Connections Cloud automatically updates a local copy of a file with the file on the Connections Cloud server, ensuring that Nancy is always updating the most recent version. Using sync in conjunction with the Files application is much more efficient than sending copies of the file back and forth.

|
|![Photograph of Lukas Geiger](images/Lukas_Geiger_96x96.jpg)|Lukas Geiger
:   Vendor Relations Manager

|
|![Photograph of Li Pin Tan](images/LiPin_Tan_96x96.jpg)|Li Pin Tan
:   Vendor

|

## Using File sync for the first time { .section}

1.  Nancy's organization has the Connections Cloud file sync capability enabled for the Connections Files application.
2.  In order to work locally on a file and then have it sync with the copy on the Connections Cloud server, Nancy installs the HCL Connections Plug-ins for Microsoft™ Windows™ . Now she can share and sync files directly from her local drive using the <Connections Cloud server name\>My Drive folder.
3.  Nancy uses Microsoft Word to create a draft presentation for her customer, an event coordinator at ACME.
4.  Nancy uploads the presentation file to the Connections Cloud Files application and shares it with Lukas Geiger and Li Pin Tan. Nancy asks Lukas and Li Pin to supply pricing and other details for the presentation.
5.  Nancy right-clicks the local version of the file and adds it to her My Drive folder. This way, she knows that when Lukas or Li Pin updates the file, the changes are automatically copied to her version.

## Collaborating with other users { .section}

1.  Nancy flies to her customer site. While she is traveling, Lukas and Li Pin update the presentation file.
2.  When Nancy lands and her laptop connects to the internet, the file changes are synced, and she automatically has all the updates when she opens the presentation file in her local My Drive folder.
3.  Nancy proceeds to the customer meeting, ready to present the updated presentation.

## How does the file sync capability work? { .section}

The file sync capability requires the following things:

-   Enablement of the Connections Cloud sync capability by the organization administrator
-   Installation of the HCL Connections Plug-ins for Microsoft Windows on each computer that wants to file sync with Connections Cloud. The plug-ins can be downloaded from [https://xspy.mybluemix.net/](https://xspy.mybluemix.net/). This installation creates the local sync directory.

If someone is working on a file in the local sync directory, that file is automatically synced with the server copy. If there is no internet connection, the file is synced the next time that person connects to the internet.

When working in Connections Cloud, everyone sees the latest version in their **My Drive** view.

**Parent topic:**[Getting started with sync](../../connectors/enduser/ms_desktop_plugin_filesync_gs2.md)

