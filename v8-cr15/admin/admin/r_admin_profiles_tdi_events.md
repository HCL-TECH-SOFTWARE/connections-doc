# IBM Tivoli Directory Integrator events {#r_admin_profiles_tdi_events .reference}

By default, all IBM® Tivoli® Directory Integrator-related events are stored in the Profiles database and are published to the event infrastructure in HCL Connections.

## Tivoli Directory Integrator events { .section}

The following Tivoli Directory Integrator events are logged by default:

|Event name|Description|
|----------|-----------|
|profiles.person.updated|Generated when a user's profile is modified.|
|profiles.person.added|Generated when a new user record is added to Profiles. There is no user interface for this task. This action can only be performed using the API or Tivoli Directory Integrator.|
|profiles.person.deleted|Generated when a new user record is deleted from the Profiles database.|
|profiles.code.created|Generated when new profile code is created using a Tivoli Directory Integrator script. The code might be for department, work location, or organization.|
|profiles.code.updated|Generated when profile code is updated using a Tivoli Directory Integrator script. The code might be for department, work location, or organization.|
|profiles.code.deleted|Generated when profile code is deleted using a Tivoli Directory Integrator script. The code might be for department, work location, or organization.|

**Parent topic:**[Configuring Profiles events](../admin/t_admin_profiles_configure_events.md)

