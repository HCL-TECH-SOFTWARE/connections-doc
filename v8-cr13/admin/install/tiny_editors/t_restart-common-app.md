# Restart Common application {#restart-common-app .task}

Sometimes restarting the common application is needed to ensure all caches are cleared.

1.  Log in to the web interface of the WebSphere Application Server Console.

    The default address is: https://host\_name:9043/ibm/console

2.  Navigate to **Applications** \> **Application Types** \> **WebSphere enterprise applications**.

    ![Websphere enterprise applications link](resource/was/applications_applications.png)

3.  Select the checkbox for **Common** from the list of applications and click **Stop**.

    ![Stop the Common application](resource/was/applications_common_stop.png)

    ![Message shown when the Common application is stopped](resource/was/applications_common_stopped.png "Dialog shown when Common application is stopped")

4.  Select the checkbox for **Common** from the list of applications and click **Start**.

    ![Start the Common application](resource/was/applications_common_start.png)

    ![Message shown when the Common application is started](resource/was/applications_common_started.png "Dialog shown when Common application is started")


**Parent topic:** [Common tasks, concepts and reference information](r_appendix.md)

