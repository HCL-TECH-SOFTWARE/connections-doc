# Troubleshooting Help {#t_troubleshooting_product_help .task}

Find out how to resolve problems accessing the product help.

If the following error message is displayed when you click the Help link in the product, correct the problem using the the following procedure:

```
Error 500: org.apache.jasper.JasperException: java.security.AccessControlException: Access denied 
 (java.lang.RuntimePermission.setContextClassLoader)
```

1.  Log into the WebSphere® Application Server Integrated Solutions Console as an administrator.

2.  Expand **Security**, and then click **Global security**.

3.  In the Java™ 2 security section, if the **Use Java 2 security to restrict application access to local resources** option is selected, then deselect it.

4.  Click **Apply**, and then click **OK**.


**Parent topic:**[Troubleshooting tips](../troubleshoot/ts_c_ts_tips_overview.md)

