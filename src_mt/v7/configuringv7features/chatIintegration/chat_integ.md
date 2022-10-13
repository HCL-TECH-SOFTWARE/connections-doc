# Integrating Chat
Connections 7.0 includes support for Chat integration with Microsoft Teams, HCL Sametime and Slack. An administrator would follow the steps in the [Enabling app registry extensions for Microsoft Teams integration](https://help.hcltechsw.com/connections/v7/connectors/admin/t_ms_teams_enable_reg_ext.html) topic to enable two appreg apps and also update LCC to make sure that app reg extensions are enabled. Once this is done, the Important To Me bubble will now include a Chat icon beside a person that can be clicked by the user. Also, the bizcard for a person will have a new Chat action, as well as there will be a chat action showing up on a person's profile page.

**Note:**  When integrating with HCL Sametime, see the [HCL Sametime extension](https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/sametime) and associated files that are available on the HCL Tech Software github site under the connections-samples repository.

**Note:**  When integrating with Slack, see the [slackChat extension](https://github.com/HCL-TECH-SOFTWARE/connections-samples/tree/main/customizer/samples/slackChat) and associated files that are available on the HCL Tech Software github site under the connections-samples repository.

## Using a CURL command to update the profile attributes using the Admin API
Refer to the topic,  [Updating a profile using the Administration API](https://ds_infolib.hcltechsw.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=HCL+Connections+7.0+API+Documentation#action=openDocument&res_title=Updating_a_profile_using_the_Administration_API_70&content=apicontent) for additional information.

```
curl -v --insecure -u username:password -d @nameofxmlfile -H "Content-Type:application/atom+xml" -X PUT -v url
```

1. Provide an Admin username and password after *-u*.
2. The API url: **profiles/admin/atom/profileEntry.do**, query parameter.  Specify either a key or an email address of the profile to be updated in the url.
   - For example, the following is the curl command to update the profile extension attribute (chatIdentity) for user Ajones180 with an email address, `ajones180@example.com`

```
curl -v --insecure -u Ajones1:jones1 -d @profiledemo.xml -H "Content-Type:application/atom+xml" -X PUT -v https:// lcauto21.cnx.cwp.pnp-hcl.com /profiles/admin/atom/profileEntry.do?email=ajones180@example.com
```

**`chatIdentity` value**

```
<entry>
   <key>com.ibm.snx_profiles.ext.chatIdentity</key>
   <value>
    <type>text</type>
    <data>*1234567890*</data>
    </value>
</entry>
```


**profiledemo.xml**
```
<entry
	xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <person
		xmlns="http://ns.opensocial.org/2008/opensocial">
            <com.ibm.snx_profiles.attrib>
                <entry>
                    <key>com.ibm.snx_profiles.ext.chatIdentity</key>
                    <value>
                        <type>text</type>
                        <data>1234567890</data>
                    </value>
                </entry>
            </com.ibm.snx_profiles.attrib>
        </person>
    </content>
</entry>
```


**profiledemoWithEmptydata.xml**

To remove the value of current chatIdentity from an existing record, provide the xml file leaving the \<data> element empty.
```
<entry
	xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <person
		xmlns="http://ns.opensocial.org/2008/opensocial">
            <com.ibm.snx_profiles.attrib>
                <entry>
                    <key>com.ibm.snx_profiles.ext.chatIdentity</key>
                    <value>
                        <type>text</type>
                        <data></data>
                    </value>
                </entry>
            </com.ibm.snx_profiles.attrib>
        </person>
    </content>
</entry>
```


