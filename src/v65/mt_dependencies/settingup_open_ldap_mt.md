<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">
# Setting up OpenLDAP for Mulit-Tenant

The following changes were made to the way ldap is defined - the mtldif.zip file attached herein contains all the updates for the sample tree that you can populate into a test ldap server.

1. Redefining the DN to be uid=<subscriber Id> instead of cn=<users name>
2. uid attribute has the value of subscriberId instead of the name
3. The ibm-entryUuid attribute is available in the schema however it is not populated now (not needed to be populated)
 

These steps were performed on CentOS 7. In theory, similar commands should work on any other Linux-based platforms.

Download the supporting zip file here: [mtldif.zip](https://help.hcltechsw.com/connectionscloud/downloads/mtldif.zip)

## Install OpenLDAP: OS: Centos 7

**Install OpenLDAP using yum:**
```
$sudo yum install -y openldap openldap-clients openldap-servers
```
OpenLDAP would be installed in `/etc/openldap` directory. Please verify such directory was created after the install.
In the rest of the instructions, this directory would be used/assumed. If OpenLDAP was not installed at this location, please update the paths accordingly.

Set up an admin account and base:
  
```
$ cd /etc/openldap/slapd.d/cn=config
```
a). Edit `olcDatabase={2}hdb.ldif` with the following suffix:

olcSuffix: `dc=hcl,dc=com`
olcRootDN: cn=<ENTER YOUR LOGIN here - e.g. mikib>,dc=hcl,dc=com

Save file.

b). Create your ldap admin password:

At command prompt, issue the following commands to create and retrieve admin credential:
```
$ slappasswd
```
New password: '<ENTER YOUR PASSWORD HERE>`
Re-enter password: `<REENTER PASSWORD>`

<OUTPUT is a hash key> - COPY IT

c). Add the root credential to config file:

 Edit olcDatabase={2}hdb.ldif :
 
At the end of the file, add the following line

olcRootPW: `<the HASH KEY YOU COPIED FROM ABOVE>`

Save file.
 
d). Verify configuration file by running
```
$ slaptest -u
```
(ignore the CRC error)
 
e). Start ldap
```
$ service slapd start
```
 
f). Verify ldap query
```
$ ldapsearch -x -b "dc=hcl,dc=com"
```
 
You should see the results with the base "dc=hcl,dc=com"

## IMPORT BASE LDAPSCHEMA:

**Add BASEschema:**

Locate the file `base.ldif` (from the mtldif.zip package you unzipped), and run:
```
$ ldapadd -x -W -D &quot;cn=\&lt;user login you used\&gt;,dc=hcl,dc=com&quot; -f base.ldif b). Verify the structure we imported above:
$ ldapsearch -x -W -D &quot;cn=\&lt;user login you used\&gt;,dc=hcl,dc=com&quot; -b &quot;dc=hcl,dc=com&quot; &quot;(objectclass=\*)&quot;
```
**Import MTschema:**

In the `mtldif.zip` package locate the file `mt\_custom.schema`, e.g. `**/home/centos/mtldif/ldap**`
```
$ cp mt\_custom.schema /etc/openldap/schema/.
$ mkdir -p /tmp/ldap\_config
$ cd /tmp/ldap\_config
$ slaptest -f /home/centos/mtldif/ldap/mt.conf -F /tmp/ldap\_config
```
Running the above command will create a bunch of files in **/tmp/ldap\_config/cn\=config**

Copy the `ldiffiles` to the `OpenLDAPconfig` directory and change the ownership if needed:

```
$ cp /tmp/ldap\_config/cn\=config/cn\=schema/cn\*.ldif /etc/openldap/slapd.d/cn\=config/cn\=schema/
$ chown ldap:ldap /etc/openldap/slapd.d/cn\=config/cn\=schema/\*.ldif RESTART ldap:
```

**Restart LDAP**
```
$ service slapdstop
$ service slapdstart
```

## IMPORT MT LDIF files: base, orgs, andUSERS:

Navagate to the directory you unzipped mtldif.zip and run the following commands in the exact order:
```
$ldapadd-x-W-D&quot;cn=\&lt;userloginyouused\&gt;,dc=hcl,dc=com&quot;-fmt\_base.ldif
$ldapadd-x-W-D&quot;cn=\&lt;userloginyouused\&gt;,dc=hcl,dc=com&quot;-fmt\_orgs.ldif
$ ldapadd -x -W -D &quot;cn=\&lt;user login you used\&gt;,dc=hcl,dc=com&quot; -f mt\_users.ldif
$ ldapadd -x -W -D &quot;cn=\&lt;user login you used\&gt;,dc=hcl,dc=com&quot; -f mt\_users-generic.ldif
```
Verify the users were imported:

BROWSE the directory - using either a query or apache directory studio or whatever you normally use and make sure the users and organization descriptions are present 

Note: ALL users in the `mt\_users.ldif` have their passwords set as: password

<?tm 1541016643182 1 HCL Connections ?>

