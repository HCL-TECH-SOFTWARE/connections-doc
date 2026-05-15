# Default profile-type {#r_admin_profiles_ovr_types_def .reference}

To maintain compatability with earlier versions, Profiles maintains the concept of a default profile-type.

## Profile types { .section}

It is strongly encouraged that you explicitly map a defined profile-type to each profile record in the Profiles database as a part of the Profiles population process

If no profile-type is associated with the profile record, the Profiles application will interpret the empty profile-type value as equivalent to the default value.

If the declaration of the default profile-type has been removed from the profiles-types.xml file, the application assigns the profile record the snx:person profile type. As a consequence, when rendering profile data in the user interface, the application onlys present the minimal set of attributes defined in the snx:person profile-type.

For more information on the default properties supported in this scenario, see [Person profile-type](r_admin_profiles_ovr_types_per.md).

As stated, if a profile record contains an empty or null profile-type value, the profile-type label is assumed to be set to the default value as defined in the associated profile-types.xml file. If the default profile-type is not found, the snx:person profile type definition is used.

**Parent topic:**[Profile-types](../customize/r_admin_profiles_ovr_types.md)

**Related information**  


[Person profile-type](../customize/r_admin_profiles_ovr_types_per.md)

