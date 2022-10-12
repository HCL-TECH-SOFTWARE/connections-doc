# Troubleshooting Connections Content Manager \(CCM\) {#c_troubleshoot_ccm .concept}

If you experience problems when you are installing, configuring, or usingHCL Connections™ Content Manager, use this information to help resolve the problem.

Diagnostic information from other Connections components and FileNet® core logging can help in problem determination and troubleshooting. During library creation and when retrieving or modifying content, calls are made between Connections Communities, Profiles, and FileNet, so problems with Profile or Community configuration can adversely affect access to Libraries and FileNet.

Refer to this [technote](http://www.ibm.com/support/docview.wss?uid=swg21610336) for information on collecting diagnostic information from Connections Communities.

For FileNet core logging, refer to the following logs:

-   [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/<profile-name\>/FileNet/<server\_name\>/p8\_server\_error.log
-   [app\_server\_root](../plan/i_ovr_r_directory_conventions.md)/profiles/<profile-name\>/FileNet/<server\_name\>/p8\_server\_trace.log

Refer to [Collecting data for Content Platform Engine](http://pic.dhe.ibm.com/infocenter/p8docs/v5r2m0/index.jsp?topic=%2Fcom.ibm.p8.ce.trouble.doc%2Fp8pct011.htm) for complete information on collecting diagnostic information for FileNet core components.

FileNet Collaboration Services and FileNet Content Engine include the following configuration status pages that can be checked to gather information on the status of a deployment:

-   For status about FileNet Collaboration Services, check the status page at http://<hostname\>/dm/.
-   For status about FileNet Content Engine, check the status page at http://<hostname\>/FileNet/Engine.
-   For status about FileNet Content Engine Domain and Object Store, check the status page at http://<hostname\>/P8CE/Health
-   For status about FileNet Content Engine Domain and Object Store Upgrade, check the status page at http://<hostname\>/FileNet/AutomaticUpgradeStatus
-   For status about FileNet Collaboration Services seedlist URL, check the status page at http://<hostname\>/dm/atom/seedlist/myserver
-   You can also use theFNCE ACCE tool to check whether FileNet Content Engine can authenticate using Connections, and inspect other data in case of errors:

    http://<hostname\>/acce


