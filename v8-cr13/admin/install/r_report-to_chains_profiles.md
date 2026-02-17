# Configuring the Manager designation in user profiles {#report-tochainsforprofiles .reference}

When you map manager data in the Profiles database, you can mark manager profiles and also create report-to chains.

## Manager profiles and report-to chains { .section}

Each profile contains a manager\_uid field which stores the uid value of that person's manager. This information is used to build the Reports To display widget in the Profiles user interface. For information about the manager\_uid field, see *Mapping fields manually*.

Additionally, the isManager field \(which equates to the **Mark manager** mapping task in the Profiles population wizard\) is used to mark the user profile as being a manager. This information is used to build the People Managed display widget in the Profiles user interface. A Y or N attribute is assigned to an employee to indicate whether the employee is listed as a manager of other employees.

You can set the isManager field as described in the *Mapping fields manually* topic \(using either 1:1 mapping or function mapping\) or by running the Mark managers task \(using the population wizard or by running the mark\_managers.bat or mark\_managers.sh script\). For more information about these options see *Using the Profiles population wizard* and *Manually populating the Profiles database*.

If you are setting the ismanager field using a 1:1 mapping, ensure that you specified how to set the field in the map\_dbrepos\_from\_source.properties file. For example, if your LDAP has an ismanager field that is set to a value of Y or N, your map\_dbrepos\_from\_source.properties file could specify the following property:

```
PROF_IS_MANAGER=ismanager
```

If the manager information is supplied directly from the source, the Mark managers task is not necessary.

The Mark managers task will iterate through the profiles, and see if that particular profile is referenced as the manager for any other profiles. If yes, it will mark that profile as a manager. If that profile is not referenced as anyone else's manager, it will be marked as not a manager.

For information about configuring the display of the Reports To and People Managed widgets for your organization, see *Configuring the reporting structure feature*.

**Parent topic:**[Populating the Profiles database](../install/t_prof_install_profiles_db.md)

