# Optional: Adjusting Security Directory Integrator \(SDI\) profile functions {#t_adjust_tdi_profile_function .task}

If you prefer, you can adjust SDI profile functions \(TDISOL/profiles\_functions.js\) to match the LDAP structure in your HCL Connections environment.

1.  Adjust the function `func_generate_recommended_tags` to return a comma-separated string with the LDAP attributes that you want as recommended tags, such as tag1, tag2, tag3.

    Example 1: Fetch displayName from LDAP and extract departmentCode \(the value in braces\). Then split it up by separator "/" and append all subvalues to the tags array.

    Example 2: Fetch workLocation\(extattr.city\) and append it to the tags array.

    Example 3: Fetch country and append it to the tags array.

2.  Adjust the function `func_make_department_key` to return the correct identifier that is later used to determine the "promoted" experts and communities for the following example:

    Fetch displayName from LDAP and extract the departmentCode \(value in braces\) . Then split it up by separator "/" and return the first match.


**Parent topic:**[Post-installation tasks for Connections Touchpoint](../install/c_post-install_tasks_for_touchpoint.md)

