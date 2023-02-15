# Configuring HCL Domino for email notification replies {#configuringdominoforemailnotificationreplies .task}

Configure HCL Domino® to direct email notification replies to a dedicated mailbox.

Install and configure an HCL Domino server. See the [HCL Connections system requirements](https://support.hcltechsw.com/csm?id=kb_article&sysparm_article=KB0073654) for supported Domino versions.

The steps in this topic are required to configure Forums so that users can reply to forum topics by email. When a reply is added to a forum topic, an email is sent to followers of that forum and that topic. Users receiving that email can respond by email. The content of that response is added as a new reply in the forum, after the original.

A mail server uses a rule or trigger to direct reply emails to a mailbox dedicated for this purpose. The HCL Connections server uses a WebSphere® Application Server mail session to process this mailbox periodically, adding content to the forums. This topic documents how to configure a Domino server to direct reply emails to a dedicated mailbox.

1.  Open the Domino server and click the **Domain** tab.

2.  Expand **Messaging** in the navigator, and then click **Configuration**.

3.  Select the messaging server and click **Edit Configuration**.

4.  Click the **Router/SMTP** tab, then the **Restrictions and Controls** tab, and then the **Rules** tab.

5.  Click **New Rule** and create a rule that moves emails containing lcreplyto\_ in the **To** field to the mailbox, for example:

    ```
    When To contains lcreplyto_ move to Database mail\\mailin.nsf
    ```

    Where mail\\mailin.nsf is the location and name of your dedicated email reply mailbox.

6.  Domino moves the emails to the **Sent** view instead of the **Inbox** of the mail database. Create a Notes® agent to move the emails from the **Sent** view to the **Inbox**.

    1.  Open the mail server in Notes.

    2.  In the **People & Groups** tab, expand **People****byOrganization**.

    3.  Edit the account of the user used to direct reply mail.

    4.  Click **Open Mail File**.

    5.  Select the **View** \> **Agents** menu item.

    6.  Click **New Agent**.

    7.  Add the following Lotusscript to the agent:

        **Note:** The following script is only an example to be used for reference, and you will need to change or adjust the script based on your actual environment.

        ```
        Sub Initialize
            
            Dim session As New NotesSession
            Dim db As NotesDatabase
            Dim view As NotesView
            Dim doc As NotesDocument
            
            Set db = session.CurrentDatabase
            Set view = db.getView("$Sent")
            
            Set doc = view.GetFirstDocument()
            While Not(doc Is Nothing)
                Call doc.PutInFolder("$inbox")
                Set doc = view.GetNextDocument(doc)
            Wend
            
            
        End Sub
        ```

    8.  Open the agent properties:

        -   In the **Options** section select **Shared**.
        -   In the **Runtime** section select **On schedule**, and then select **More than once a day**.
        -   In the Target field select **All new & modified documents**.
        -   Set a schedule, for example have it run every 5 minutes, all day.
    9.  Before running the script ensure you have adequate permissions to run it.


**Parent topic:**[Configuring Forums for email notification replies](../admin/c_admin_forums_notification_replies.md)

