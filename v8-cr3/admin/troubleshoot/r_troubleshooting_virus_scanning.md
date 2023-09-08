# Troubleshooting virus scanning {#r_troubleshooting_virus_scanning .reference}

Find out some of the common causes for scanning-related error messages.

## Virus scanner messages { .section}

You might see some of the following messages in the SystemOut.log file when you use the virus scanner:

-   This error is generated if the file that is being uploaded is bigger than the maximum size allowed on the scanner:

    ```
    [9/15/10 16:24:12:188 EDT] 00000063 GenericPersis I 
     com.ibm.sn.av.icap.net.GenericPersistentClient askServerPersistent 
     CLFAQ0012I: ICAP Headers: ICAP/1.0 200 OK
    ISTag: "78903A5CACDAB539F74FEF95A812239D"
    Date: Wed Sep 15 20:17:25 2010 GMT
    Service: Symantec Scan Engine/5.1.7.33
    Service-ID: Respmod AV Scan
    X-Infection-Found: Type=1; Resolution=2; Threat=File policy violation 
     File Size Blocked;
    X-Violations-Found: 1
    	no.file
    	File policy violation File Size Blocked
    	-1
    	0
    X-Outer-Container-Is-Mime: 0
    Encapsulated: res-hdr=0, res-body=83
    ```

-   This error is generated if a file upload times out before the scanner finishes extracting it:

    ```
    [9/15/10 16:28:06:063 EDT] 000000ba GenericPersis I 
     com.ibm.sn.av.icap.net.GenericPersistentClient askServerPersistent 
     CLFAQ0012I: ICAP Headers: ICAP/1.0 200 OK
    ISTag: "E7A38AFAE1C53F592855CD024058C2AD"
    Date: Wed Sep 15 20:21:19 2010 GMT
    Service: Symantec Scan Engine/5.1.7.33
    Service-ID: Respmod AV Scan
    X-Infection-Found: Type=2; Resolution=2; Threat=Container extract time 
     violation;
    X-Violations-Found: 1
    	no.file
    	Container extract time violation - scan incomplete.
    	-9
    	0
    X-Outer-Container-Is-Mime: 0
    Encapsulated: res-hdr=0, res-body=83
    ```

-   This error is generated if the scanner finds a virus, which is named in the "Threat=" string:

    ```
    9/15/10 16:30:38:923 EDT] 000000b8 GenericPersis I 
     com.ibm.sn.av.icap.net.GenericPersistentClient askServerPersistent 
     CLFAQ0012I: ICAP Headers: ICAP/1.0 200 OK
    ISTag: "4C65DD9AED9BF620ED7F72DF6B36BE66"
    Date: Wed Sep 15 20:23:52 2010 GMT
    Service: Symantec Scan Engine/5.1.7.33
    Service-ID: Respmod AV Scan
    X-Infection-Found: Type=0; Resolution=2; Threat=EICAR Test String;
    X-Violations-Found: 1
    	no.file
    	EICAR Test String
    	11101
    	2
    X-Outer-Container-Is-Mime: 0
    Encapsulated: res-hdr=0, res-body=83
    ```


Your virus detection product must include the headers X-Infection-Found and X-Violations-Found.

**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

**Related information**  


[Enabling virus scanning](../secure/t_admin_common_virus_scanning.md)

