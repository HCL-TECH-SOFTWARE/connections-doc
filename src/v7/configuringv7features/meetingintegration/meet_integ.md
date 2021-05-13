# Integrating Meetings (meetingIdentity)

Connections 7.0 includes support for Meetings integration. The Meeting URL is managed via a profile extension attribute `meetingIdentity` and will be set up via an administrator.


**Note:** The following is one way to supply information via an API call among other options and is provided as an example.  

## Using a CURL command to update the profile attributes using the Admin API
Refer to the topic,  [Updating a profile using the Administration API](https://ds_infolib.hcltechsw.com/ldd/lcwiki.nsf/xpAPIViewer.xsp?lookupName=HCL+Connections+7.0+API+Documentation#action=openDocument&res_title=Updating_a_profile_using_the_Administration_API_70&content=apicontent) for additional information.

```
curl -v --insecure -u username:password -d @nameofxmlfile -H "Content-Type:application/atom+xml" -X PUT -v url
```


1. Provide an Admin username and password after *-u*.
2. The API url: **profiles/admin/atom/profileEntry.do**, query parameter.  Specify either a key or an email address of the profile to be updated in the url.
   - For example, the following is the curl command to update the profile extension attribute (chatIdentity) for user Ajones180 with an email address, `ajones180@janet.iris.com`

```
curl -v --insecure -u Ajones1:jones1 -d @profiledemo.xml -H "Content-Type:application/atom+xml" -X PUT -v https:// lcauto21.cnx.cwp.pnp-hcl.com /profiles/admin/atom/profileEntry.do?email=ajones180@janet.iris.com
```

**URL for `meetingIdentity`**

```
<entry>
   <key>com.ibm.snx_profiles.ext.meetingIdentity</key>
   <value>
    <type>text</type>
    <data> * https://meetings.hcltechsw.com/meeting/JitendraKumar * </data>
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
                    <key>com.ibm.snx_profiles.ext.meetingIdentity</key>
                    <value>
                        <type>text</type>
                        <data>https://meetings.hcltechsw.com/meeting/JitendraKumar</data>
                    </value>
                </entry>
            </com.ibm.snx_profiles.attrib>
        </person>
    </content>
</entry>
```


**profiledemoWithEmptydata.xml**

To remove the value of current `meetingdentity` from an existing record, provide the xml file leaving the \<data> element empty.

```
<entry
	xmlns="http://www.w3.org/2005/Atom">
    <content type="application/xml">
        <person
		xmlns="http://ns.opensocial.org/2008/opensocial">
            <com.ibm.snx_profiles.attrib>
                <entry>
                    <key>com.ibm.snx_profiles.ext.meetingdentity</key>
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


