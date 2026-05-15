# Sample complex mappings of Profiles data {#r_pers_complex_map_ex .reference}

These examples contains sample complex mappings using Javascript functions to define mapping between the LDAP directory and the Profiles database.

## Examples of mapping options { .section}

When manually mapping Profiles fields you can perform 1:1 mapping as described in the *Mapping fields manually* parent topic, or complex mapping as described here.

The following examples progress in their complexity. The examples are designed to convey mapping options, not necessarily to provide practical use cases. Sample code is annotated to help further describe its intent and functional behavior.

Example 1:

This first example returns a single value, namely the employee number value obtained from the LDAP with the string \_ACME appended to show a simple programmatic change.

Normally, the following line would be entered in the map\_dbrepos\_from\_source.properties file to copy the LDAPemployeeNumber value:

```
employeeNumber=LDAPemployeeNumber
```

However, the resulting value cannot be modified to add additional information, such as an organization name. To use the func\_employeeNumber\_simple function to append an organization name such as \_ACME, the following line could be entered:

```
employeeNumber={func_employeeNumber_simple}
```

Notice that the function name is surrounded by curly braces, thus the return value of the function is a string that is copied into the Profiles database as the employee number \(`employeeNumber`\).

The following func\_employeeNumber\_simple function definition needs to be added to the profiles\_functions.js file in the TDI solution directory.

```
function func_employeeNumber_simple( propertyName) {
        // propertyName would be ‘employeeNumber’; not used
        var propertyNameStr = propertyName.toString();
        // assume no error getting value
        var result = work.getString("LDAPemployeeNumber") + "_ACME";
        return result;
}
```

Note that the function references a work entry named LDAPemployeeNumber in the third line \(`var result = work.getString("LDAPemployeeNumber`"\). This is the name of the employee number attribute in the LDAP.

Enter the following line in map\_dbrepos\_from\_source.properties prior to the line where the function is called, seen as follows:

```
xxx=LDAPemployeeNumber
employeeNumber={ func_employeeNumber_simple}
```

**Note:** The purpose of the `xxx=LDAPemployeeNumberline` line is simply to make LDAPemployeeNumber available in the work entry.

Example 2:

This example shows how to return multiple values, namely the employee number value and the correlating employee's short name value, a Domino attribute that also uniquely identifies a person. This example assumes that you want users be able to log in using their LDAPemployeeNumber and an LDAP attribute named shortName, in addition to the standard uid and email attributes. You also want all user login values to appear in the Profiles database EMPLOYEE or PROFILE\_LOGIN tables. If there were only one attribute, you could use the loginId= property in `map_dbrepos_from_source.properties`, but there are two so that method is not available.

**Note:** The LDAPemployeeNumber and shortName attributes are single value attributes.

You'll need to create a function call that returns a list containing the employeeNumber and shortName; in this example the function call is created in profiles\_functions.js as usual as `func_logins_ext`. To simplify this example, the uid and email attributes are not shown in the list.

```
....xxx=employeeNumber
    yyy=shortName
    logins={func_loginNames_ext}

```

Because of the `logins={func_loginNames_ext}` line, the list that is returned because of the following statements becomes the logins value and is added to the PROFILE\_LOGINS table. While typically not needed for valid login, this method illustrates the mapping technique.

```
function func_loginNames_ext( propertyName) {
        var propertyNameStr = propertyName.toString(); // ='logins'; not 
							used in later statement
        var result = work.getAttribute("givenName"); // get any single valued 
							defined attribute
        if (result == null) {
            result = "no_work_element";
        }
        else
        {
            result = result.clone(); // required
            result.removeValue(0);  // remove givenName (not required here)
            var result0 = work.getString("employeeNumber"); //assume 	
								no error, 1 value
            result.setValue( 0, result0);
            var result1 = work.getString("shortName"); // assume no 
								error, single value
            result.setValue( 1, result1);
        }
        return result;
    }
```

Example 3:

In this final example, the mapping pertains to a multivalue list of surnames using thesn attribute. From the list of returned surnames, we append the string Jr. to demonstrate a simple change.

The needed properties in map\_dbrepos\_from\_source.properties are as follows.

```
     surname=sn
     surnames={func_surnames_Acme}
```

In this example, the LDAP sn field contains a list of surnames.

The surname=sn line causes the first entry in the resulting list to be stored in the surname field in the Profiles user table.

The surnames=\{func\_surnames\_Acme\} line causes the returned list from the following func\_surnames\_Acme line to be placed in the Profiles SURNAME table, and available for name search.

```
function func_surNames_Acme( propertyName) {
        var propertyNameStr = propertyName.toString(); // =’surnames’; not used in l
        var result = work.getAttribute("sn"); // get the sn list
        if(result == null) {
                result = "no sn work element"; // return bogus value.
                // See the function func_compute_givenName() in
                // profiles_functions.js for a more realistic approach
        }
        else
        {
                result = result.clone();
                var len = result.size();
                for (var i = 0; i < len; i++) {
                        var val = result.getValue(i);
                        if (!(val instanceof java.lang.String)) {
                                val = java.lang.String.valueOf(val);
                        }
                        val = val + " Jr." // append "Jr."
                        result.setValue(i, val); // update value
                }
        }

        return result; 
} 
```

In the function func\_surNames\_Acme\( propertyName\) \{ line, the propertyName parameter value is the name of the property that appears in the map\_dbrepos\_from\_source.properties file on the line where the function is referenced. This makes it possible to use the same function for a number of properties. In this example, the value is surnames.

In the var result = work.getAttribute\("sn"\); line, an attribute object is obtained. In this example, the argument for getAttribute\(\) must be sn to obtain the list of surnames.

The result = "no sn work element"; line is simply a test for sn not being available.

Given that the list is available, we clone it with the result = result.clone\(\); line to avoid changing the entry list that belongs to TDI.

We next iterate through the list testing to verify that each value is a string. This is a best practice even though in this actual example it is unnecessary.

The result.getValue\(i\); line gets the next item in the list; this represents the R element of CRUD.

The result.setValue\(i, val\); line shows how to modify a value; this represents the U element of CRUD.

In the previous example 2, the setValue method was used to perform both these functions.

To demonstrates how the delete \(D\) and remove \(R\) CRUD functions would work, let’s limit the surnames list to five names by adding the following Javascript after the for \(var i = 0; i <len; i++\) line:

```
if (i > 4)
        {
                result.removeValue(i);
                len--; i--;
                continue;
        }
```

**Parent topic:**[Mapping fields manually](../install/t_prof_tdi_mapfields.md)

