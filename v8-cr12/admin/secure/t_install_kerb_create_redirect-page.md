# Creating a redirect page for users without SPNEGO support {#t_install_kerb_create_redirect-page .task}

Create an HTML page to redirect users whose web browsers do not support SPNEGO.

If users navigate to a SPNEGO-protected web page but their browsers do not support SPNEGO, redirect them to an HTML page that is not protected by SPNEGO.

To create an HTML page to redirect users to, complete the following steps:

1.  Create an HTML page with HTML such as that shown in the following example:

    ```bash
    <!DOCTYPE HTML PUBLIC "-//W3C/DTD HTML 4.0 Transitional//EN">
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html">
    <!--
    Notes:
    	- This file should be served from an unprotected website. Alternatively, 
     it can be loaded from the WebSphere Application Server file system.
    	- Any imbedded graphics/javascript/css must be loaded from an unprotected 
     website.
    	- This file is loaded after WebSphere Application Server is 
     initialized. If changes to this file are necessary, restart WebSphere Application Server.
    	- This file is returned whenever the SPNEGO TAI receives an NTLM 
     token for any application in the cell. In other words, this file is 
     generic for all applications. However, by using the  document.location Javascipt , we can get the original URL, and redirect to that 
     original URL with the "?noSPNEGO" text added - thus forcing the standard 
     application userid/password challenge.
    -->
    <html>
    <head>
    <script language="javascript">
    	var origUrl=""+document.location;
       	    if (origUrl.indexOf("noSPNEGO")<0) {
    		    if (origUrl.indexOf('?')>=0) origUrl+="&noSPNEGO";
    			else origUrl+="?noSPNEGO";
    	}
    	function redirTimer() {
    		self.setTimeout("self.location.href=origUrl;",0);
    	}
    </script>
    
    <script language="javascript">    
        var titleNode = document.createElement('title');    
        titleNode.innerHTML = 'Redirect to';   
        var origUrlText = document.createTextNode(origUrl);   
        titleNode.appendChild(origUrlText); 
        document.getElementsByTagName('head')[0].appendChild(titleNode);
    </script>
    </head>
    <body onLoad="redirTimer()"/>
    </html>
    ```

2.  Save the file as, for example, NoSpnegoRedirect.html on a publicly-accessible directory on your web server. For example, IHS\_server/htdocs/NoSpnegoRedirect.html.


**Parent topic:** [Enabling single sign-on for the Windows desktop](../secure/t_install_kerb_setup_spnego.md)

**Previous topic:** [Creating a service principal name and keytab file](../secure/t_install_kerb_create_service_account.md)

**Next topic:** [Configuring SPNEGO \(and Kerberos optionally\) on WebSphere Application Server](../secure/t_install_kerb_add_spnego_tai_to_was.md)

