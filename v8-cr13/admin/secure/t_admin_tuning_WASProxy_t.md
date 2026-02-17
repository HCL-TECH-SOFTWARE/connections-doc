# Tuning the WAS proxy server for long poll {#tuning_WASProxy_t .task}

The proxy server must be tuned to allow for the high number of connections in the long poll test scenario.

Make sure you have completed the steps in [Setting up a WAS proxy server for long polling](t_admin_setting_up_WASProxy_t.md).

If the WebSphere Application Server \(WAS\) proxy server is used without additional configuration, it is possible that for the requests that get passed to the HTTP Server \(IHS\) server, that the browser URL is changed to that of the IHS server and does not remain that of the proxy server. To prevent this issue and other issues from occurring, you must set some custom properties within the WAS proxy server settings. You must also configure the WAS proxy Java™ Virtual Machine \(JVM\) settings to allow for enough memory to work the high connections required for long poll testing.

1.  Stop the proxy server via the Deployment Manager \(DM\) console.

2.  Set custom properties.

    1.  On your DM console, navigate to **Server Types** \> **WebSphere proxy servers** \> **proxy server name** \> **\(Expandable\) HTTP Proxy Server Settings** \> **Proxy settings** \> **Custom properties**.

    2.  Click **New...**.

    3.  In the fields provided, enter `true` for the cache.query.string property.

    4.  Click **Apply** and save the configuration file if prompted.

    5.  Repeat this procedure for the http.forwarded.as.was.managed and http.routing.sendReverseProxyNameInHost properties.

    6.  Stop, synchronize, and restart your proxy nodes.

3.  Configure WAS proxy JVM Settings.

    1.  On your DM console, navigate to **Server Types** \> **WebSphere proxy servers** \> **proxy server name** \> **\(Expandable\) Java and Process Management** \> **Process definition** \> **Java Virtual Machine**.

    2.  Set the following values:

        Verbose garbage collection
        :   `true`

        Initial heap size
        :   `6144MB`

        Maximum heap size
        :   `6144MB`

        Generic JVM arguments
        :   -   `-Xms6144M -Xmx6144M -Xgcpolicy:balanced -Dsun.nio.MaxDirectMemorySize=1572864000`
-   `-DAIONewWindowsCancelPath=1`
    3.  Click **Apply** and save the configuration file if prompted.

    4.  Stop, synchronize, and restart your proxy nodes.

4.  Disable automatic restart.

    1.  On your DM console, navigate to **Server Types** \> **WebSphere proxy servers** \> **proxy server name** \> **\(Expandable\) Java and Process Management** \> **Monitoring policy**.

    2.  Remove the check from the **Automatic restart** check box.

    3.  Synchronize your proxy node.

5.  Set the WAS proxy thread pool values.

    1.  On your DM console, navigate to **Server Types** \> **WebSphere proxy servers** \> **proxy server name** \> **Thread pools**.

    2.  Click WebContainer and change the values of the minimum size and maximum size to `100`. Click **Apply** and save the configuration.

    3.  Click Proxy and change the values of the minimum size and maximum size to `100`. Click **Apply** and save the configuration.

    4.  Stop, synchronize, and restart your proxy nodes.

6.  Increase the Transmission Control Protocol \(TCP\) transport values for the WAS proxy to allow for increased connections.

    1.  On your DM console, navigate to **Server Types** \> **WebSphere proxy servers** \> **proxy server name** \> **Ports**.

    2.  Adjacent to PROXY\_HTTP\_ADDRESS, click **View associated transports**.

    3.  In the **Transport Chain** section, click the name of the setting, which in this case is PROXY\_HTTP\_ADDRESS.

    4.  Click **TCP inbound channel \(TCP \#\)**, where \# is an arbitrary value.

    5.  Change the value of **Maximum open connections** to `50000`.

    6.  Click **Apply** and save the configuration if prompted.

    7.  Repeat this procedure for the PROXY\_HTTPS\_ADDRESS,WC\_defaulthost, and WC\_defaulthost\_secure port list values.

    8.  Stop, synchronize, and restart your proxy nodes.

7.  Set the WAS proxy logging.

    1.  On your DM console, navigate to **Server Types** \> **WebSphere proxy servers** \> **proxy server name** \> **Logging and tracing**.

    2.  Select **JVM logs**.

    3.  For **System.out** and **System.err**, make sure that the **Log File Rotation** check box is checked, set **Maximum Size** to `20MB`, and set **Maximum Number of Historical Log Files. Number in range 1 through 200.** value to `50`.

        !!! note 
            
            You can use any values for the size of the log files, but make sure to specify a log size that is large enough to prevent the logs cycling over older logs. Also, make sure that your proxy server has enough hard disk space to allow for the theoretical maximum required size for your values. For example, multiply your maximum log file size by your historical logs value to determine the maximum required space, and then check your proxy server to ensure that enough space exists on the disk.

    4.  Click **Apply** and save the configuration if prompted.

    5.  Stop, synchronize, and restart your proxy nodes.


Read the information in this section for additional tuning information. These steps are not mandatory, and are provided for reference only.

A proxy server with 64 GB RAM and 24 logical cores was tested and found to be limited to < 60000 users, both FileSync and Notification Center. CPU capacity and memory were not gating factors. CPU levels were approximately 20-30% under the highest load. Some tuning observations that might be useful for driving a high number of concurrent users are provided in the following list:

-   A proxy server creates a connection to a PUSH application server to process a push request. This connection is persistent. It lasts for 90 seconds and then gets recreated, and utilizes a unique port on the proxmuly server. The number of ports on any Linux™ server is finite and can be configured to a maximum of approximately 64000. This means that the absolute theoretical maximum is approximately 64000 concurrent connections to the proxy, which equates to approximately 64000 NC/FS push notification users per proxy server. This is reduced somewhat because Transmission Control Protocol \(TCP\) connections remain unusable for a period of time after they are disconnected. So at any given time, there are a number of ports that are in this CLOSE\_WAIT state and are unavailable to be used in fresh connections.
-   There was a thread pool growth observed in the various application servers. If the proxy-related thread pools, default and proxy, were allowed to grow unbounded, they seem to grow when WAS could not create more connections to the appropriate JVMs. This failed silently. To get around this, the number of TCP connections on the WC\_adminhost, WC\_adminhost\_secure, WC\_defaulthost, and WC\_defaulthost\_secure ports for Push, Files, and News JVMs was increased to 50000.

    To view the relevant ports on the JVM and increase the TCP connections to 50000 for each JVM, for each JVM, under **Communication**, click **Ports** \> **Details** and edit the required ports.

-   The ulimit setting for open files on every machine was increased to 500000. The following updates were added to /etc/security/limits.conf and a reboot was performed when finished:

    ```
    @* soft nofile 500000
    @* hard nofile 500000
    @root soft nofile 500000
    @root hard nofile 500000
    
    ```

-   The following Linux kernel settings were applied to various machines in the deployment. It is unclear whether these make any appreciable difference:
    -   Connections machines:

        ```bash
        net.core.somaxconn = 8192
        net.ipv4.tcp_max_orphans = 200000
        net.ipv4.tcp_max_syn_backlog = 8192
        net.core.netdev_max_backlog = 262144
        net.ipv4.ip_local_port_range = 1024 65535
        net.ipv4.tcp_fin_timeout = 5
        net.ipv4.tcp_tw_recycle = 1
        net.ipv4.tcp_tw_reuse = 1
        # Discourage Linux from swapping idle processes to disk (default = 60)
        vm.swappiness = 10
        # Increase Linux autotuning TCP buffer limits
        # Set max to 16MB for 1GE and 32M (33554432) or 54M (56623104) for 10GE
        # Don't set tcp_mem itself! Let the kernel scale it based on RAM.
        net.core.rmem_max = 16777216
        net.core.wmem_max = 16777216
        net.core.rmem_default = 16777216
        net.core.wmem_default = 16777216
        net.core.optmem_max = 40960
        net.ipv4.tcp_rmem = 4096 87380 16777216
        net.ipv4.tcp_wmem = 4096 65536 16777216
        # Make room for more TIME_WAIT sockets due to more clients,
        # and allow them to be reused if we run out of sockets
        # Also increase the max packet backlog
        net.core.netdev_max_backlog = 50000
        net.ipv4.tcp_max_syn_backlog = 30000
        net.ipv4.tcp_max_tw_buckets = 2000000
        net.ipv4.tcp_tw_reuse = 1
        net.ipv4.tcp_fin_timeout = 10
        # Disable TCP slow start on idle connections
        net.ipv4.tcp_slow_start_after_idle = 0
        # If your servers talk UDP, also up these limits
        net.ipv4.udp_rmem_min = 8192
        net.ipv4.udp_wmem_min = 8192
        # Disable source routing and redirects
        net.ipv4.conf.all.send_redirects = 0
        net.ipv4.conf.all.accept_redirects = 0
        net.ipv4.conf.all.accept_source_route = 0
        # Log packets with impossible addresses for security
        net.ipv4.conf.all.log_martians = 1
        ```

    -   Client machines

        ```bash
        net.core.rmem_max = 16777216
        net.core.wmem_max = 16777216
        net.core.rmem_default = 16777216
        net.core.wmem_default = 16777216
        net.core.optmem_max = 40960
        net.ipv4.tcp_rmem = 1024 4096 16384
        net.ipv4.tcp_wmem = 1024 4096 16384
        ```

-   The proxy JVM heap was increased to 16 GB. It is unclear whether this made any appreciable difference.
-   For WAS tuning, the authentication cache was set to 300000. This was done because failures were observed that coincided with messages relating to the growth and subsequent overflow of this cache.

**Parent topic:** [Setting up and configuring a WAS proxy server for long poll testing](../secure/t_admin_config_was_proxy.md)

