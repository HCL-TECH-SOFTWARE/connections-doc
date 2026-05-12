# Enabling TLS 1.3 on NGINX with SSL {#t_secure_tls_v13_enable .concept}

If your Connections deployment is using a NGINX server as a proxy (typical when used with a Connections Component Pack deployment), then verify the requirements to support TLS 1.3 via NGINX.

## Procedure {#section_yyb_25x_bpb .section}

1.  Confirm that TLS 1.3 is supported with the following command. TLSv1.3 should be listed in the output. If TLSv1.3 is not supported, then download and install the latest version of OpenSSL 1.1.1.

     ``openssl ciphers -v | awk '{print $2}' | sort | uniq``
     
       SSLv3

       TLSv1

       TLSv1.2

       **TLSv1.3**
       
2.  Confirm that NGNIX is built with OpenSSL 1.1.1 with the following command. Built with OpenSSL 1.1.1 should be listed in the output. If OpenSSL 1.1.1 is not listed, then download the installed NGINX version source code and compile with OpenSSL 1.1.1.
   
    ``nginx -V``
    
       nginx version: nginx/**version**

       built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC)

       **built with OpenSSL 1.1.1k**  **date**

    Perform the steps below to build and compile NGINX:   

    1.  Update and Install Dependencies for NGINX
    2.  Download NGINX Source Code and Configure
    3.  Compile the NGINX source code
  
        !!! note

            These are the basic steps for building and compiling NGINX, there are a number of good references available for different operating systems. 


3.  Configure Connections to use TLS 1.3 with NGNIX in the ``/etc/nginx/conf.d/customizer.conf`` by setting the following for the server:

    ``ssl_protocols TLSv1.3;``   
    ``proxy_ssl_protocols TLSv1.3;``
    

**Parent topic:** [Configuring HCL Connection to Use TLS 1.3 ](../secure/t_secure_tls_v13_overview.md)

