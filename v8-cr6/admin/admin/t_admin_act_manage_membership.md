# Retrieving member information {#t_admin_act_manage_membership .task}

Learn about the administrative commands that display the members of an activity. You can retrieve either a single member or a list of members.

To run administrative commands, you must use the wsadmin client. See [Starting the wsadmin client](t_admin_wsadmin_starting.md) for details.

1.  Use the following command to access the Activities configuration file:

    ```
    execfile("activitiesAdmin.py")
    ```

    If prompted to specify a service to connect to, type 1 to pick the first node in the list. Most commands can run on any node. If the command writes or reads information to or from a file using a local file path, you must pick the node where the file is stored.

2.  Use any of the fetch member commands that are part of the ActivitiesMemberService to display activity members.

    ActivitiesMemberService.fetchMembers\(java.lang.String name\)
    :   Return a list of members or groups whose names match the search criteria.

    ActivitiesMemberService.fetchMemberByName\(java.lang.String name\)
    :   Retrieve information about a member or group by passing in their name.

    ActivitiesMemberService.fetchMemberByLogin\(java.lang.String name\)
    :   Retrieve information about a member by passing in their login.

    ActivitiesMemberService.fetchMemberByEmail\(java.lang.String mail\)
    :   Retrieve information about a member by passing in their email address.

    ActivitiesMemberService.fetchMemberById\(java.lang.String id\)
    :   Retrieve information about a member or group by passing in their unique member ID.


Use the following examples of the fetch commands to retrieve member lists.

ActivitiesMemberService.fetchMembers\(java.lang.String name\)
:   This command returns a vector of hash tables. Each hash table represents a member or group.

    -   ActivitiesMemberService.fetchMembers\("Jane Fairfax"\)

        Returns the following vector, which contains a single hash table:

        ```
        [{memberId=FBFG092191072384B4DB336C9B5BF9000043, 
        displayName=Jane Fairfax, loginNames=[], 
        staticProfile=false, externalId=3901C921-E104-40BC-8AAA-C947146C8F68, 
        email=jfairfax@acme.com, memberType=person}]
        
        {OrgDirectoryID=4000000001, loginNames=[jfairfax@acme.com, 
          Jane Fairfax], memberType=person, flags=0, activeProfile=true, 
          externalId=1000000368,
            OrgName=Organization A, staticProfile=false, email=jfairfax@acme.com,
            OrgMemberID=8e226166-cc69-4181-b5b2-12bac2b1cca7,
            memberId=13a31b05-b893-481f-9d33-95cbdd5f38c3, 
            displayName=Jane Fairfax, lemail=jfairfax@acme.com,
            lMemberDisp=jane fairfax}
        
        ```

    -   ActivitiesMemberService.fetchMembers\("Acme\*"\)

        This command uses a wildcard character to fetch all members or groups that begin with the word Acme. It returns the following vector, which contains two hash tables: one for Acme Sales and one for Acme Marketing.

        ```
        {OrgDirectoryID=4000000001, loginNames=[acme_sales@acme.com],
            memberType=group, flags=0, activeProfile=true, externalId=1000000366,
            OrgName=Organization A, staticProfile=false, 
            email=acme_sales@acme.com, 
            OrgMemberID=8e226166-cc69-4181-b5b2-12bac2b1cce9,
            memberId=memberId=0BEG7F00000145EAB17F33E66924AA00009D,
            displayName=Acme Sales, lemail=acme_sales@acme.com, 
            lMemberDisp=Acme Sales}
        ```


ActivitiesMemberService.fetchMemberByName\(java.lang.String name\)
:   ActivitiesMemberService.fetchMemberByName\("Paul Smith"\)

    This command returns a hash table that contains information for the one member that matched the name that is passed in as a parameter.

    ```
    {OrgDirectoryID=4000000001, loginNames=[paul_smith@acme.com],
        memberType=person, flags=0, activeProfile=true, externalId=1000000364,
        OrgName=Organization A, staticProfile=false,  email=paul_smith@acme.com,
        OrgMemberID=8e226166-cc69-4181-b5b2-12bac2b1cce7,
        memberId=ACF1093191092345B4DB336C9B5BF9000055, displayName=Paul Smith,
        lemail=paul_smith@acme.com, lMemberDisp=Paul Smith}
    ```

ActivitiesMemberService.fetchMemberByLogin\(java.lang.String name\)
:   ActivitiesMemberService.fetchMemberByLogin\("Paul Smith"\)

    This command returns a that represents Paul Smith.

    ```
    {OrgDirectoryID=4000000001, loginNames=[paul_smith@acme.com],
        memberType=person, flags=0, activeProfile=true, externalId=1000000364,
        OrgName=Organization A, staticProfile=false, email=paul_smith@acme.com,
        OrgMemberID=8e226166-cc69-4181-b5b2-12bac2b1cce7,
        memberId=ACF1093191092345B4DB336C9B5BF9000055, displayName=Paul Smith,
        lemail=paul_smith@acme.com, lMemberDisp=Paul Smith}
    ```

ActivitiesMemberService.fetchMemberByEmail\(java.lang.String mail\)
:   ActivitiesMemberService.fetchMemberByEmail\("paul\_smith@acme.com"\)

    This command returns a hash table that contains information for the member that matched the name that is passed in as a parameter.

    ```
    {OrgDirectoryID=4000000001, loginNames=[paul_smith@acme.com],
      memberType=person, flags=0, activeProfile=true,
      externalId=1000000364, OrgName=Organization A,
      staticProfile=false, email=paul_smith@acme.com,
      OrgMemberID=8e226166-cc69-4181-b5b2-12bac2b1cce7,
      memberId=ACF1093191092345B4DB336C9B5BF9000055,
      displayName=Paul Smith, lemail=paul_smith@acme.com,
      lMemberDisp=Paul Smith}
    ```

ActivitiesMemberService.fetchMemberById\(java.lang.String id\)
:   ActivitiesMemberService.fetchMemberById\("13a31b05-b893-481f-9d33-95cbdd5f38c4"\)

    This command returns a hash table for the user that matches the member ID. In this example, the member ID represents Amy Jones.

    ```
    {OrgDirectoryID=4000000001, loginNames=[ajones40@janet.iris.com],
      memberType=person, flags=0, activeProfile=true,
      externalId=1000000363, OrgName=Organization A, staticProfile=false,
      email=ajones40@janet.iris.com,
      OrgMemberID=8e226166-cc69-4181-b5b2-12bac2b1cce7,
      memberId=13a31b05-b893-481f-9d33-95cbdd5f38c4,
      displayName=Amy Jones40, lemail=ajones40@janet.iris.com,
      lMemberDisp=amy jones40}
    ```

For information about updating the data that is associated with a member, see *Managing users*.

There are other administrative commands that use java.util.Hashtable as a parameter. You can save the member information that is returned from the previous commands as a java.util.Hashtable variable. Then, you can use this value in another administrative command, such as `ActivityService.fetchActivitiesByMember(java.util.Hashtable member)`.

**Parent topic:**[Managing activity membership](../admin/c_admin_act_manage_membership.md)

**Related information**  


[Managing users](../admin/c_admin_common_user_life_cycle_over.md)

[Starting the wsadmin client](../admin/t_admin_wsadmin_starting.md)

