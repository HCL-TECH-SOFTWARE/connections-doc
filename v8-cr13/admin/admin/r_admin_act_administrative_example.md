# Example: Activities administrative session {#r_admin_act_administrative_example .reference}

The following sample is a typical Activities administrative session. Reference this example to see how various administrative commands are used.

```bash
    EXAMPLE OF USING ACTIVITIES ADMINISTRATIVE COMMANDS
# The following example adds two new members to existing activities.
# User manager@company.com will be added to all activities where user 
# employee1@company.com is a member. This user will be added with "owner"
# access to those activities. Next, user employee2@company.com will be
# added as a member to all activities that employee1@company.com has access
# to, but with "author" access.

# Create a member object by using their email and assign the value that is returned
# to a variable.

wsadmin>employee1=ActivitiesMemberService.fetchMemberByEmail("employee1@company.com")
wsadmin>employee2=ActivitiesMemberService.fetchMemberByEmail("employee2@company.com")
wsadmin>manager=ActivitiesMemberService.fetchMemberByEmail("manager@company.com")

# Call the ActivityService to fetch all activities that employee1 is a member of.

wsadmin>activities=ActivityService.fetchActivitiesByMember(employee1)

# Call AccessControlService to add 'manager' to all of 'employee1' activities as 
# new owner

wsadmin>AccessControlService.setOwnerAccess(activities,manager)

# Call the AccessControlService to add 'employee2' to all of 'employee1' 
# activities as a new member (with author access).  Because the 
# AccessControl.setMembersAccess command is expecting the second argument 
# (member to be added) to be a "vector", the first 3 commands convert the value 
# that is stored in the variable "employee2" from a "Hashtable"
# into a "Vector" and stores the new vector in the variable "newMembers".

wsadmin>from java.util import Vector
wsadmin>newMembers=Vector()
wsadmin>newMembers.add(employee2)
wsadmin>AccessControlService.setMembersAccess(activities,newMembers)



# Export all activities of which a person is a member to location "c:/temp/zips".
# Create a member object by using their email and assign it to the variable 
# "member".
wsadmin>member=ActivitiesMemberService.fetchMemberByEmail("employee@company.com")

# Call the ActivityService to fetch all of the standard activities and assign the 
# result to the variable "activities".

wsadmin>activities=ActivityService.fetchActivitiesByMember(member)



```

**Parent topic:** [Running Activities administrative commands](../admin/t_admin_act_change_admin_props.md)

