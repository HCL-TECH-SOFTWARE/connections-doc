# Accessing Activities in HCL Notes {#task_xkk_dgb_bm .task}

Create and work with activities from within Notes®.

If you use Notesversion 8.5.2 or later with SmartCloud Notes, these steps are not necessary to work with Activities. In that case, any user with a HCL Connections™ Cloud S2 subscription automatically sees Activities displayed in the sidebar.

1.  Open the Activities sidebar and click **Show Connections preferences** to display the Activities preferences.

2.  Enter the URL that corresponds to the data center used by your organization.

    Your data center URL is the URL that you see in the browser after you log in to HCL Connections.

    -   apps.ap.collabserv.com
    -   apps.ce.collabserv.com
    -   apps.na.collabserv.com
3.  Enter your user name and password.

4.  Click **Advanced** and select the **Tivoli Access Manager Form** option.

5.  Select **Enforce SSL**.

6.  Clear **Enforce Trusted Sites** so that it is not selected.

7.  Click **OK** and then click **Apply**.


If the preceding steps do not work, perform the following steps and then try the preceding steps again.

1.  Open the Notes client and go to **File** \> **Preferences** \> **Activities**.
2.  Click **Restore Defaults** and then the Apply button to restore the default settings for Activities.
3.  Select **Accounts** and delete any accounts that refer to Activities. For example, delete entries for Activities or ActivitiesRedirect.
4.  Restart the Notes client.

