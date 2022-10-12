# Upgrading an existing Community Surveys installation to HCL Connections Community Surveys {#t_upgrading_surveys_to_hcl_surveys .task}

This procedure applies to an existing installation of the Community Surveys and should only be used when upgrading to HCL Community Surveys 6.5 release.

**Note:**

-   To install Community Surveys for a production environment, you must have a database and WebSphere Application Server with security enabled installed and set up on your system.
-   You must be logged in as a user belonging to the Administrators group when you run the installer for Windows™. You must log in to the system as root when you install on Linux™.

Like the original installation of Community Surveys, this procedure contains both automated and manual installation activities. The IBM Installation Manager is used to upgrade the Community Surveys application on the WebSphere Application Server environment and then the files that implement the Communities specific widgets are manually replaced with newer versions from the installation kit.

1.  Download the [HCL Connections Community Surveys v6.5 nstallation kit](https://hclsoftware.flexnetoperations.com/flexnet/operationsportal/DownloadSearchPage.action?search=HCL+Connections+Community+Surveys+V6.5&resultType=Files&sortBy=relevance&listButton=Search) from the HCL License & Delivery Portal.

2.  Extract the installation kit into an appropriate location on the machine where Community Surveys is already installed, referred to as <install\_kit\>/ in the following steps.

3.  Launch the IBM Installation Manager and add the Community Surveys package to the Repositories list under File \| Preferences by clicking the Add Repository button and selecting the <install\_kit\>/FormsImage/repository.config file, then **Apply** the update.

4.  On the IBM Installation Manager main page, click the **Update** option and choose the Community Surveys option from the list of available updates.

5.  Step through the IBM Installation Manager panels, accept the updated license information and provide the requested information and run the upgrade.

6.  Once the IBM Installation Manager update process has completed, launch the WebSphere Administration Console and go to Applications \| WebSphere enterprise applications, select the **Community Surveys** app, **Manage Modules** and map all 3 modules listed to the cluster and IBM HTTP Server \(web server\).

7.  Stop and restart the application cluster.


To complete the upgrade refer to [Manual steps required to complete the upgrade to HCL Community Surveys](t_upgrading_to_hcl_surveys_manual.md).

-   **[Manual steps required to complete the upgrade to HCL Community Surveys](../install/t_upgrading_to_hcl_surveys_manual.md)**  
The following procedure provides the manual steps necessary to complete the upgrade from an existing installation of Community Surveys to HCL Community Surveys 6.5.

**Parent topic:**[Installing Community Surveys](../install/t_inst_installing_forms_experience_builder.md)

