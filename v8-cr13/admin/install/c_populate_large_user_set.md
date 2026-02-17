# Considerations when populating a large user set {#populatingalargeuserset .concept}

Populate the Profiles database with many users from an LDAP directory.

LDAP servers are sometimes configured with a limit on the number of users that are returned by a single query. The limit is known as the page size, which can vary depending on the settings in the LDAP. For example, the default page size for IBM® Tivoli® Directory Server is 1,000. The purpose of the page size is to prevent the LDAP directory from being overloaded by a large number of queries that return many users. The page size might be set by the LDAP administrator to a number that is lower than the total number of users in your organization, which causes problems when you populate the Profiles database.

You can also run into problems if the page size is too large and there are many users, in which case the LDAP response can exceed the memory capacity of the Tivoli Directory Integrator LDAP connector.

## If the LDAP connector memory capacity is exceeded { .section}

If the page size is unlimited or very large, and the Tivoli Directory Integrator LDAP connector memory capacity is exceeded by the response, Tivoli Directory Integrator notifies you that its page buffer was overrun. In this case, set the -Xmx parameter to the largest possible value in the command that starts the Tivoli Directory Integrator server. The maximum value is determined by the memory size of the system where Tivoli Directory Integrator is running. If the problem is not fixed by raising the value of the -Xmx parameter, then the LDAP page size is too large and the LDAP administrator needs to reduce it.

When you reduce the page size, it’s likely that the new value is lower than the number of users in your LDAP. In this case, the LDAP page size is too small, and you will encounter the size limit error that is described in the next section.

## If the LDAP page size is too small { .section}

The LDAP page size is too small if the collect\_dns script or the sync\_all\_dns script ends with the following error message in the ibmdi.log file:

```
LDAP: error code 4 - Sizelimit Exceeded
```

The solution to this problem depends on your LDAP type.

Microsoft™ Active Directory supports breaking up the LDAP response into a series of pages, or batches, each of which is less than the LDAP size limit. The page size is specified by the `source_ldap_page_size` property in `profiles_tdi.properties`. Make sure this feature is enabled on your LDAP. Set the value close to the LDAP query size limit. For example, if the limit is 5000:

```
source_ldap_page_size=5000
```

Tivoli Directory Server supports essentially the same batching capability, but in a slightly different way. You specify that the response is to be sorted, and that the result is to be broken up into batches. Set the `source_ldap_sort_attribute` property and the `source_ldap_sort_page_size` property in `profiles_tdi.properties` to accomplish this.

For the `source_ldap_sort_attribute` property, use a single-valued ASCII LDAP text attribute that has a unique value for each user, and few or no empty values. Good choices usually are `mail` or `employeenumber`. For example:

```
source_ldap_sort_attribute=mail
source_ldap_sort_page_size=5000
```

If you don’t want to use `mail` or `employeenumber`, select an attribute from the property values, not the property names, in the file `map_dbrepos_from_source.properties`.

Domino® LDAP does not support either of the batching techniques. Thus you must use the relatively more difficult alternative population process outlined in the next section.

For LDAP types other than Microsoft Active Directory, Tivoli Directory Server, or Domino, try one of these approaches first before resorting to the alternative population process.

## Alternative population process { .section}

If neither of the paging approaches is supported by your LDAP, the only alternative is to issue a series of LDAP queries where the response to each query is kept within the LDAP page size limit. That is, reformulate the LDAP query to request data in batches by manipulating the LDAP search filter per query. To accomplish this, you code a small table in the Javascript file named `collect_ldap_dns_chunks.js` that specifies the id of the last user in each batch. Most of the work, including generating the table, is automated.

You request this feature by setting the `source_ldap_iterate_with_filter` property in the `profiles_tdi.properties` file to true. This property is acted upon by the `collect_dns` and `sync_all_dns` commands, and the result is to request data in batches.

For more information on techniques for importing users to Profiles, see the HCL Connections™ wiki article [IBM Tivoli Directory Integrator solutions for HCL Connections real-world scenarios](https://www-10.lotus.com/ldd/lcwiki.nsf/dx/IBM_Tivoli_Directory_Integrator_solutions_for_IBM_Connections_real-world_scenarios).

**Parent topic:**[Manually populating the Profiles database](../install/t_prof_populate_manual.md)

