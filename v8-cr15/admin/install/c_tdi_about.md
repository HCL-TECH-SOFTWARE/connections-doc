# Introduction to IBM Tivoli Directory Integrator {#c_tdi_about .concept}

HCL Connections uses IBM® Tivoli® Directory Integrator to transform, move, and synchronize data from your LDAP directories to the Profiles database.

## AssemblyLines { .section}

The main tool within Tivoli Directory Integrator is the AssemblyLine. An AssemblyLine processes data such as entries, records, items, and objects from an LDAP directory, transforms it, and outputs it to the Profiles database. When you import data from multiple LDAP directories, the AssemblyLine processes, transforms, and combines all the source data before outputting it.

How data is organized can differ greatly from system to system. For example, databases usually store information in records with a fixed number of fields. Directories usually work with variable objects called entries, and other systems use messages or key-value pairs.

## Connectors { .section}

Connectors are the components that you need to build an AssemblyLine. Connectors are designed so that you do not need to deal with the technical details of working with various data stores, systems, services, or transports. Each type of connector uses a specific protocol or API to handle the details of data source access. You can create your own connectors to support different functions or use the connectors that are provided with HCL Connections.

For more information about creating connectors, see the *Developing custom IBM Tivoli Directory Integrator assembly lines for Profiles* topic.

## Work Entries { .section}

Tivoli Directory Integrator collects and stores all types of information in a Java™ data container called a work Entry. The data values are kept in objects called Attributes that the work Entry holds and manages. AssemblyLine components process the information in the work Entry by joining in additional data, verifying content, computing new attributes and values, as well as changing existing ones, until the data is ready for delivery to the Profiles database.

Tivoli Directory Integrator internal attribute mapping, business rules, and transformation logic do not need to deal with type conflicts.

## Attribute mapping { .section}

Attribute Maps are your instructions on which attributes are brought into the AssemblyLine during input, or included in output operations. An AssemblyLine is designed and optimized for working with one item at a time, such as one data record, one directory entry or one registry key. If you want to perform multiple updates or multiple deletes, then you must write AssemblyLine scripts.

**Parent topic:**[Configuring IBM Security Directory Integrator](../install/t_prof_install_tdi.md)

