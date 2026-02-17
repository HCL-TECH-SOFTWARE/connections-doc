# Configuring per-host proxy access rules for OpenSocial gadgets {#bestpractices .reference}

Proxy access is configured on a per-gadget level. This configuration is distinct from the proxy configuration file in that it specifies which end points may be contacted rather than what tokens or headers may be sent. In general the proxy access is configured during gadget registration by setting the **Server access** setting to external \(outside the SSO domain\) or all server access. Beyond these two settings, an administrator may expand or restrict access further by specifying custom proxy or \(in cases where they wish for extra security\) may enumerate per-gadget-per-server \(and even per user\) custom proxy rules. Custom proxy rules are defined in a separate configuration file.

## Rule manager { .section}

The rule manager operates as a stack. If one rule allows the request and a second deny's the request, then the last rule to execute wins. In Connections the execution ordering is as follows:

1.  denyAll\(\): block all requests
2.  MasterRule\(\): consult the widget DB and allow or deny the request based on the gadget administrative data. Registering a gadget with "custom" causes a deny\(\) to be pushed onto the stack
3.  Any custom rules defined in proxy-policy.dynamic: Finally the proxy-policy.dynamic file is executed. This file contains additional allow/deny rules.

Thus, custom rules you define in the policy file might override any other access decision. In the case of gadgets with "custom" server access, the gadget has no implicit server access.

The "proxy-policy.dynamic" file is located in the under LotusConnections-config/opensocial-proxy-rules. Add rules as needed as described in this topic. Unlike other configuration files, an application or server restart is NOT needed to reload the file. File changes will be detected and acted upon with-in 10-15 seconds.

A rule consists of an Action, User, Target URL, and Component.

-   The Action represents the action to be taken by the proxy when processing this rule such as "Allow" and "Deny".
-   The User represents a current user, and can be an anonymous user or system user, for example, the viewer or owner of a gadget.
-   Target URL represents the target URL to access through the proxy.
-   The Component represents the gadget that sends out the request.

The rules are specified as JavaScript program source code. Each rule is specified as a JavaScript function invocation. Four functions are provided out-of-box:

-   allow - Used to specify an ALLOW rule. This function takes three parameters:

    -   Current® user's UID
    -   Widget's URL - URL of the widget/gadget component that sends the request
    -   Target URL - the URL that the widget/gadget wants to access.
    For example, allow\('user1', 'http://www\\.example.com/widget1\\.xml', 'http://www\\.google\\.com'\) specifies that if the current user is 'user1', then the widget 'http://www.example.com/widget1.xml' is allowed to access URL 'http://www.google.com'.

-   deny - Used to specify a DENY rule. This function shares the same parameters as allow function.
-   allowAll - A shortcut function to allow all requests.
-   denyAll - A shortcut function to deny all requests.

When using allow and deny functions, the username, widget URL and target URL are actually regular expressions so wild cards can be used. For example, if all user names that start with 'user' is allowed, then 'user.\*' can be entered as the first parameter. A guide of JavaScript regular expression pattern can be found at here. Since the rules are specified as JavaScript program source code, JavaScript code logic also can be used. You can use an if/else clause in a rule. For example, The following predefined variables also are provided:

-   user: login-id of current user
-   component : URL of the widget that sends the request
-   targetUrl : the URL to access

These predefined variables can be used in the JavaScript code. For example:

```
allow('user1', '.*', '.*ibm\.com'); // user1 is allowed to access all URLs that end with ibm.com
```

In another example of a gadget that draws from Connections data, you want to set a rule that only certain gadgets can communicate with the internet. To accomplish this you could set a global rule to prevent gadgets from connecting to secure.ibm.com and then make gadget- or user-specific rules to permit particular gadgets to do so. Or you can expose certain mail servers, but you might want extra protection so that only certain gadgets can make a request to those servers.

## Rule configuration example { .section}

Here is an example of rule configuration that uses a mix of allow and deny functions:

```
/*

* Pre-defined variables that can be used in the script.

* _user -> Current user's UID

* _component -> Gadget URL

* _targetUrl -> Target URL to access

*/


allowAll(); // this means allow('*', '*', '*')

allow('alex', 'http://myserver/gadget1.xml', 'www.ibm.com');

deny('alex', 'http://myserver/gadget1.xml', 'www.ibm.com/private');


deny('bob', 'http://myserver/gadget2.xml', '*');

deny('*', 'http://myserver/gadget3.xml', '*');


//denyAll(); // this means deny('*', '*', '*');


if (/\S+@\S+\.ibm\.com/i.test(_user)) {  // Use regular expression

    allow(_user, '*', '*.ibm.com');  //IBM users are allowed to access IBM sites

}
```

**Parent topic:**[Administering the Widget container](../admin/t_admin_common_widget_container.md)

