# Landing page configuration {#id_name .reference}

If you want to redirect all requests for the server root \(**https://<your\_server\>/**\) to Connections Engagement Center, you may use the following template for addition / modification of your httpd.conf file. **Please adjust this template according to your specific needs.**

```

LoadModule rewrite_module modules/mod_rewrite.so
#SSL Rewrite
RewriteEngine On
RewriteRule ^\/$ https://HOSTNAME/icec/main [NE,L,R]
RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [L]
<IfModule mod_ibm_ssl.c>
	Listen 0.0.0.0:443
	<VirtualHost  *:443>
		ServerName  HOSTNAME
		RewriteEngine On
		RewriteRule ^\/$ https://HOSTNAME/icec/main [NE,L,R]
		...
	</VirtualHost>
</IfModule>


```

After editing, please restart your IHS service.

**Parent topic:**[Configuring](../../connectors/icec/cec-inst-configuring.md)

