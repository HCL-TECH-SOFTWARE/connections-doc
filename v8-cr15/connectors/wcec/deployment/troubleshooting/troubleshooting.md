# Troubleshooting

If you encounter issues during deployment or operation of HCL Connections Engagement Center (WebEngine), refer to the following resources for troubleshooting guidance:

## Common issues and solutions

### Pod startup issues

The following are common issues that may occur during the startup of the WebEngine pod. Use the provided steps to diagnose and resolve these issues.

#### Crashloopbackoff

If the WebEngine pod crashes with `CrashLoopBackOff`, it is typically (99% of cases) a configuration error in the `server.xml` or Helm values.

To resolve:

1. Check pod logs:
   ```bash
   kubectl logs -n connections <pod-name> --previous
   ```

2. Verify configuration files:
   ```bash
   kubectl exec -it -n connections <pod-name> -- cat /opt/openliberty/wlp/usr/servers/defaultServer/server.xml
   ```

3. Common causes:
   - Invalid LDAP configuration
   - Incorrect database connection settings
   - Missing or invalid LTPA keys
   - SSL/TLS certificate issues

#### Pending state

Perform the following steps if the pod remains in `Pending` state:

1. Check PersistentVolumes and PersistentVolumeClaims:
   ```bash
   kubectl get pv,pvc -n connections
   ```

2. Verify NFS connectivity and `/etc/exports` configuration contains folder entries specific for CEC

3. Check node resources:
   ```bash
   kubectl describe node <node-name>
   ```

#### Imagepullbackoff

Perform the following steps if the pod shows `ImagePullBackOff`:

1. Verify image pull secrets:
   ```bash
   kubectl get secrets -n connections
   ```

2. Check Harbor/registry credentials are correct

3. Verify network connectivity to the container registry

### Authentication issues

The following are common authentication issues that may occur when accessing CEC (WebEngine). Use the provided steps to diagnose and resolve these issues.

#### SSO not working

Perform the following steps if Single Sign-On between Connections and CEC is not working:

1. Verify LTPA keys are shared correctly:
   ```bash
   kubectl get secret <ltpa-secret-name> -n connections -o yaml
   ```

2. Ensure the LTPA key password matches between Connections WAS and CEC

3. Check that both applications use the same LDAP realm name

4. Verify cookie domains are configured correctly

#### Users cannot login

Perform the following steps if users cannot log in to CEC (WebEngine):

1. Check LDAP connectivity from the WebEngine pod:
   ```bash
   kubectl exec -it -n connections <pod-name> -- ldapsearch -x -H ldap://<ldap-host>:389 -b "dc=example,dc=com"
   ```

2. Verify `bindDN` and `bindPassword` in `server.xml`

3. Check Open Liberty logs for authentication errors:
   ```bash
   kubectl logs -n connections <pod-name> | grep -i "authentication\|ldap\|login"
   ```

### Database connectivity issues

The following are common database connectivity issues that may occur when CEC (WebEngine) is unable to connect to the database. Use the provided steps to diagnose and resolve these issues.

#### Connection refused

Perform the following steps if the WebEngine pod cannot connect to the database:

1. Verify database service is accessible:
   ```bash
   kubectl exec -it -n connections <pod-name> -- nc -zv <db-host> <db-port>
   ```

2. Check database credentials in configuration

3. Verify database user has required permissions

#### Schema errors

perform the following steps if you encounter schema-related errors:

1. Ensure database schema is properly initialized

2. Check that the database user has access to the required schemas

### Network issues

The following are common network issues that may occur when CEC (WebEngine) is unable to communicate with other components. Use the provided steps to diagnose and resolve these issues.

#### Bad gateway

Perform the following steps if you encounter a `502 Bad Gateway` error when accessing CEC (WebEngine):

1. Check if the WebEngine pod is running:
   ```bash
   kubectl get pods -n connections | grep web-engine
   ```

2. Verify Ingress configuration:
   ```bash
   kubectl describe ingress -n connections
   ```

3. Check service endpoints:
   ```bash
   kubectl get endpoints -n connections
   ```

#### Connection timeout

Perform the following steps if you encounter connection timeouts when accessing CEC (WebEngine):

1. Verify network policies allow traffic

2. Check firewall rules between components

3. Verify DNS resolution within the cluster

## Enabling trace logging

Enable trace logging in Open Liberty to capture detailed information for troubleshooting. This can help identify issues related to configuration, authentication, and connectivity.

To enable detailed trace logging for troubleshooting:

1. Edit the `server.xml` to add trace specification:
   ```xml
   <logging traceSpecification="*=info:com.ibm.portal.*=all:com.hcl.*=all" 
            traceFileName="trace.log" 
            maxFileSize="50" 
            maxFiles="10"/>
   ```

2. Restart the WebEngine pod

3. Collect trace logs:
   ```bash
   kubectl cp connections/<pod-name>:/opt/openliberty/wlp/usr/servers/defaultServer/logs/trace.log ./trace.log
   ```

## Collecting diagnostic information

Collecting diagnostic information is essential for effective troubleshooting. When opening a support case, provide the following information to help the support team diagnose the issue

1. **Pod logs:**
   ```bash
   kubectl logs -n connections <pod-name> > webengine-logs.txt
   ```

2. **Pod description:**
   ```bash
   kubectl describe pod -n connections <pod-name> > pod-describe.txt
   ```

3. **Helm values (sanitized):**
   ```bash
   helm get values <release-name> -n connections > helm-values.txt
   ```

4. **Events:**
   ```bash
   kubectl get events -n connections --sort-by='.lastTimestamp' > events.txt
   ```

## Additional resources

- [**Troubleshooting**](https://help.hcl-software.com/connections/latest/admin/troubleshoot/admin_troubleshoot_comp_pack.html)
