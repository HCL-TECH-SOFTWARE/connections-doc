# Supplemental user data for Profiles {#r_prof_fill-tables .reference}

You can supplement user profiles data using a mapping table, the profiles\_tdi.properties file, and CSV files.

## Mapping user data { .section}

You can map additional user data to supplemental tables within the Profiles database and then display that data in a user's profile.

When the LDAP directory provides a code or abbreviation for a particular setting, the supplemental table can provide extra data. For example, an employeeType of P in the LDAP directory might correspond to Permanent. If the employee-type table is populated with data such as p;permanent, this extra data can be displayed in the profile.

The profiles\_tdi.properties file stores the settings that determine how the files are formatted.

**Note:** These properties are supplied in the profiles\_tdi.properties file. The file path specified is relative to the TDI solution directory.

This step is mandatory if one or more entities have been selected as the Group By filter in Metrics. Otherwise, when you categorize the Metrics report by this entity, the report will show an unknown value, not the descriptive name of the entity in the chart. Metrics have three default Group By attributes: country, organization and title. The country and organization attributes are in the supported list.

The mapping task for Profiles maps your user data to the following entities:

Fill countries
:   Add country data to each profile. Use Country code script ./fill\_country.sh or fill\_country.bat to populate the Country table.

Fill departments
:   Add department data to each profile. Use Department code script ./fill\_department.sh or fill\_department.bat.

Fill organization
:   Add organization data to each profile. Use Organization code script ./fill\_organization.sh or fill\_organization.bat.

Fill employee types
:   Add employee-type data to each profile. Use Employee type code script ./fill\_emp\_type.sh or fill\_emp\_type.bat

Fill work locations
:   Add location data to each profile. Use Work location code script ./fill\_workloc.sh or fill\_workloc.bat.

## CSV files { .section}

A CSV \(comma separated value\) file is required as input for each of these tasks.

The following properties pertain to the CVS files used by these tasks:

```
country_table_csv_separator=;
country_table_csv_file=isocc.csv

department_table_csv_separator=;
department_table_csv_file=deptinfo.csv

emp_type_table_csv_separator=;
emp_type_table_csv_file=emptype.csv

organization_table_csv_separator=;
organization_table_csv_file=orginfo.csv

workloc_table_csv_separator=;
workloc_table_csv_file=workloc.csv
```

The separator character separates the different tokens in each line. The second property is the name of the file, relative to the solution directory.

The first token is the code. The next attributes are read in order for each additional field. No other fields are required.

The data that can be populated in these tables is usually provided as two values per line: code;description.

For the workloc code, the values can be code;addr1;addr2;city;state;zip. For example: `WSF;FIVE TECHNOLOGY PARK DR;;WESTFORD;MA;01886-3141`.

Fields that you do not require in your mapping can be omitted from the file; this example uses only one addr field.

The default file name for each codes is shown in the following list:

countryCode
:   isocc.csv

deptNumber
:   deptinfo.csv

orgId
:   orginfo.csv

employeeTypeCode
:   emptype.csv

workLocationCode
:   workloc.csv

## Sample CSV file { .example}

This sample shows some lines from the isocc.csv file, which can be used to fill countries data:

```
ad;Andorra, Principality of
ae;United Arab Emirates
af;Afghanistan, Islamic State of
ag;Antigua and Barbuda
ai;Anguilla
al;Albania
am;Armenia
an;Netherlands Antilles
ao;Angola
aq;Antarctica
ar;Argentina
```

You can find more sample CSV files in the wizard\_files\_directory/TDIPopulation/TDISOL/lin\|win/samples directory, where the wizard\_files\_directory is the location of the various Wizard files that you downloaded or received on disk, and lin\|win is the Linux® or Microsoft® Windows® version of the directory.

