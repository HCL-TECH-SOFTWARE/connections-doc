# Configuring moderation for communities {#task_ghk_td1_tx .task}

Owners can control what content is added by members \(pre-moderation\) and remove anything that might be considered inappropriate in your organization \(post-moderation\).

You can configure HCL Connections moderation using scripts accessed with the wsadmin client. These scripts use the connectionsConfig object available in WebSphere® Application Server wsadmin client to interact with the HCL Connections configuration file, which is named `contentreview-config.xml`.

The properties in the `contentreview-config.xml` file cannot be edited using the updateConfig command nor displayed using the showConfig command. Instead, you must check out the configuration file using the checkOutContentReviewConfig command, and then edit the property values by opening the checked out property file from the temporary directory using a text editor. After editing the property file, save the file in Unicode format and check the file back in using the checkInContentReviewConfig command and restart the application servers to see the changes.

When owner moderation is enabled for communities, community owners can access moderation options for their community by opening the community and selecting **Community Actions** \> **Moderate Community**. Community moderators only can manage the content of communities that they own.

Administrators configure the following section of the `contentreview-config.xml` file to set community moderation:

```
<commModerationConfiguration>
	<preModeration>
		<forceForAllCommunities enabled=boolean value of true or false />
		<enabledByCreation enabled="true" />
	</preModeration>
	<postModeration>
		<forceForAllCommunities enabled=boolean value of true or false />
		<enabledByCreation enabled="true" />
	</postModeration>
</commModerationConfiguration>

<service id="blogs">
		<contentApproval enabled=boolean value of true or false>
		    <ownerModerate enabled=boolean value of true or false/>
	</contentApproval>
		<contentFlagging enabled=boolean value of true or false>
		    <ownerModerate enabled=boolean value of true or false/>

<service id="files">
		<contentApproval enabled=boolean value of true or false>
		    <ownerModerate enabled=boolean value of true or false/>
        </contentApproval>
		<contentFlagging enabled=boolean value of true or false>
		    <ownerModerate enabled=boolean value of true or false/>


<service id="forums">
		<contentApproval enabled=boolean value of true or false>
           		 <ownerModerate enabled=boolean value of true or false/>
       </contentApproval>
		<contentFlagging enabled=boolean value of true or false>
			<ownerModerate enabled=boolean value of true or false/>
```

Where:

preModeration
:   Community owners must approve all content before it can be posted.

postModeration
:   Viewers can flag content.

forceForAllCommunities
:   Set to "true" to require moderation for communities. By default this attribute is set to "false". When the setting is set to false, moderation is not automatically required for a community, but moderation API command and filters still work. Moderators can still perform moderation tasks.

enabledByCreation
:   Setting determines if the moderation check boxes in the Start Community form should be checked when a user clicks **Start a Community**.

contentApproval
:   Set to "true" to require moderation for the specified application. By default this attribute is set to "false". When the setting is set to false, moderation is not automatically enforced for an application, but moderation API command and filters still work. Moderators can still perform moderation tasks.

contentFlagging
:   Set to "true" to require moderation for flagged content. By default this attribute is set to "false". When the setting is set to false, the user cannot flag content from the user interface or using an API command. Blogs Moderation API and filters still work. Moderators can still perform moderation tasks. Files and Forums API commands returns errors.

    **Note:** If you upgraded HCL Connections from release 2.5 to release 3.0 or higher, the default for Blogs is "true" for compatibility reasons.

ownerModerate
:   Must be set to "true" to specify that community owners can moderate the content in communities that they own, otherwise it is set to "false". If contentFlagging or contentApproval for a service is set to false, then ownerModerate must be set to false.

1.  To change community moderation configuration settings, complete the following steps:

2.  Determine if you want to give owners the ability to turn pre-approval on and off, or if you want to force owners to approve content.

    |Force pre-approval|Sample code|What the owner sees in the user interface|
    |------------------|-----------|-----------------------------------------|
    |Let owners turn off pre-approval|    ```
<preModeration>
<forceForAllCommunities enabled="**false**">
.....
</premoderation>
    ```

|Owners can clear the check box.

 ![Checked](checkable.jpg) **Owners must approve all content \(...\)**

|
    |Force owners to pre-approve content|    ```
<preModeration>
<forceForAllCommunities enabled="**true**">
.....
</premoderation>
    ```

|Owners cannot clear the check box.

 ![Cannot check](notcheckable.jpg) **Owners must approve all content \(...\)**

|

3.  After you decide whether or not you want to force owners to pre-approve content, you should select the specific content that requires pre-approval.

    |Content that requires owner's approval|Sample code|What owner sees in the user interface|
    |--------------------------------------|-----------|-------------------------------------|
    |Blog content requires the owner's approval|    ```
<service id="**blogs**">
<contentApproval enabled="**true**">
<ownerModerate enabled= "**true**">
</contentApproval>
    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Owners must approve all content \(Blogs\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box is gray.

 ![Cannot check](notcheckable.jpg) Owners must approve all content \(Blogs\)

|
    |Files content requires the owner's approval|    ```
<service id="**files**">
<contentApproval enabled="**true**">
<ownerModerate enabled= "**true**">
</contentApproval>
    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Owners must approve all content \(Files\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box is gray.

 ![Cannot check](notcheckable.jpg) Owners must approve all content \(Files\)

|
    |Forums content requires the owner's approval|    ```
<service id="**Forums**">
<contentApproval enabled="**true**">
<ownerModerate enabled= "**true**">
</contentApproval>
    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Owners must approve all content \(Forums\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box is gray.

 ![Cannot check](notcheckable.jpg) Owners must approve all content \(Forums\)

|
    |Blogs and Files require the owner's approval. Forums does not.|    ```
<service id="**blogs**">
<contentApproval enabled="**true**">
<ownerModerate enabled= "**true**">
</contentApproval>
<service id="**files**">
<contentApproval enabled="**true**">
<ownerModerate enabled= "**true**">
</contentApproval>
<service id="**Forums**">
<contentApproval enabled="**false**">
<ownerModerate enabled= "**true**">
</contentApproval>
    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Owners must approve all content \(Blogs, Files\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box is gray.

 ![Cannot check](notcheckable.jpg) Owners must approve all content \(Blogs, Files\)

|
    |Files requires the owner's approval.

 Blogs content is moderated in the community, but only the global moderator can approve it. The community owner cannot manage content or change the moderation options of Blogs in his community.

|    ```
<service id="blogs">
<contentApproval enabled= "**true**">
<ownerModerate enabled= "**false**">
<service id="files">
<contentApproval enabled= "**true**">
<ownerModerate enabled= "**true**">
    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Owners must approve all content \(Files\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box is gray.

 ![Cannot check](notcheckable.jpg) Owners must approve all content \(Files\)

|
    |Files requires the owner's approval.

 Blogs content does not require any approval. All content is published directly without approval.

|    ```
<service id="blogs">
<contentApproval enabled= "**false**">
<ownerModerate enabled= "**false**">
<service id="files">
<contentApproval enabled= "**true**">
<ownerModerate enabled= "**true**">
    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Owners must approve all content \(Files\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box is gray.

 ![Cannot check](notcheckable.jpg) Owners must approve all content \(Files\)

|

4.  Determine if you want to give owners the ability to let people flag inappropriate content. You can let owners decide if they want to include this ability in their community, or you can force them to offer this ability in their community.

    |Force pre-approval|Sample code|What the owner sees in the user interface|
    |------------------|-----------|-----------------------------------------|
    |Let owners turn off flagging|    ```
<postModeration>
<forceForAllCommunities enabled="**false**">
.....
</postmoderation>
    ```

|Owners can clear the check box.

 ![Checked](checkable.jpg) **Viewers can flag inappropriate content \(...\)**

|
    |Force owners to viewers to flag content.|    ```
<postModeration>
<forceForAllCommunities enabled="**true**">
.....
</postmoderation>
    ```

|Owners cannot clear the check box.

 ![Cannot check](notcheckable.jpg) **Viewers can flag inappropriate content \(...\)**

|

5.  After you decide if you want to force owners to let viewers flag content, select the specific widget where they can flag content.

    |Content that can be flagged|Sample code|What owner sees in the user interface|
    |---------------------------|-----------|-------------------------------------|
    |Blog content can be flagged as inappropriate by viewers|    ```
<service id="**blogs**">
<contentFlagging enabled="**true**">
<ownerModerate enabled="true"/>

    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Viewers can flag inappropriate content \(Blogs\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box and text are gray.

 ![Cannot check](notcheckable.jpg) Viewers can flag inappropriate content \(Blogs\)

|
    |Files content can be flagged as inappropriate by viewers|    ```
<service id="**files**">
<contentFlagging enabled="**true**">
<ownerModerate enabled="true"/>

    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Viewers can flag inappropriate content \(Files\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box and text are gray.

 ![Cannot check](notcheckable.jpg) Viewers can flag inappropriate content \(Files\)

|
    |Forums content can be flagged as inappropriate by viewers|    ```
<service id="**Forums**">
<contentFlagging enabled="**true**">
<ownerModerate enabled="true"/>

    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Viewers can flag inappropriate content \(Forums\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box and text are gray.

 ![Cannot check](notcheckable.jpg) Viewers can flag inappropriate content \(Forums\)

|
    |Files and Forums content can be flagged as inappropriate by viewers. Blogs cannot.|    ```
<service id="**blogs**">
<contentFlagging enabled="**false**">
<ownerModerate enabled="false"/>
<service id="**files**">
<contentFlagging enabled="**true**">
<ownerModerate enabled="true"/>
<service id="**Forums**">
<contentFlagging enabled="**true**">
<ownerModerate enabled="true"/>

    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Viewers can flag inappropriate content \(Files, Forums\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box and text are gray.

 ![Cannot check](notcheckable.jpg) Viewers can flag inappropriate content \(Files, Forums\)

|
    |Files content can be flagged as inappropriate by viewers.

 Blogs content can be flagged as inappropriate by viewers, but only the global moderator can take action. The community owner cannot manage content or change the moderation options of Blogs in his community.

|    ```
<service id="**blogs**">
<contentFlagging enabled="**true**">
<ownerModerate enabled= "**false**">
<service id="**files**">
<contentFlagging enabled="**true**">
<ownerModerate enabled= "**true**">
    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Viewers can flag inappropriate content \(Files\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box and text are gray.

 ![Cannot check](notcheckable.jpg) Viewers can flag inappropriate content \(Files\)

|
    |Files content can be flagged as inappropriate by viewers.

 Blogs content cannot be flagged as inappropriate. The community owner cannot manage flagged content or change the flag moderation options of Blogs in his community.

|    ```
<service id="**blogs**">
<contentFlagging enabled="**false**">
<ownerModerate enabled= "**false**">
<service id="**files**">
<contentFlagging enabled="**true**">
<ownerModerate enabled= "**true**">
    ```

|If forceForAllCommunities is set to false, the check box can be cleared by owners.

 ![Checked](checkable.jpg) Viewers can flag inappropriate content \(Files\)

 If forceForAllCommunities is set to true, the check box cannot be cleared by owners. The check box and text are gray.

 ![Cannot check](notcheckable.jpg) Viewers can flag inappropriate content \(Files\)

|

6.  Save your changes to the contentreview-config.xml file.

7.  Check the file back in, using the command:

    ```
    LCConfigService.checkInContentReviewConfig(<temp-dir>,"<cell-name>")
    ```

    During the check-in process validation is done to ensure no xml syntax errors are in the file.

8.  Restart the affected applications to see the changes.


**Parent topic:**[Managing content moderation and flagged content](../admin/t_admin_blogs_flag_inappropriate.md)

