# Enabling and securing Cache Service traffic to Homepage {#cp_config_om_cache_service_traffic .concept}

HCL Connections™ requires some additional configuration to know how to securely communicate with the Cache Service for the Homepage.

!!! note
    Starting with v8 CR13, the Redis cache service has been replaced by Valkey. The term 'Cache Service' is used as a unified term to describe the caching infrastructure in the environment, including the role previously fulfilled by Redis.

Component Pack provides the following Cache Service features to support Homepage:

-  High Availability \(HA\)
-  HAProxy integration
-  Valkey security with authentication
-  `configureCacheService.sh` script for updating Connections and Cache Service (Valkey) integration configuration if needed.

## Valkey High Availability \(HA\) through Valkey Sentinel

Using the Valkey Sentinel capabilities, the Component Pack runs a Valkey Sentinel cluster \(1 primary Valkey server, 2 secondary Valkey servers, and 3 Sentinels\) that can automatically withstand certain types of failures without human intervention. Sentinel capabilities include:

-   **Monitoring**. Sentinel continuously checks whether the primary and secondary Valkey servers are operating as expected.
-   **Automatic failover**. If the primary is not operating as expected, Sentinel initiates a failover process in which a secondary is promoted to primary, the remaining secondary servers are reconfigured to use the new primary, and applications using the Valkey server are informed of the new connection address.

## HAProxy Integration

Component Pack supports HAProxy to provide a route from Connections to the Valkey cluster running within the Component Pack. HAProxy acts as the external entry point for traffic from Connections to the Valkey cluster. When configuring Connections to communicate with the Component Pack, the required HAProxy port is set during the bootstrap installation task.

## Valkey Security with Authentication

Component Pack supports Valkey security through Valkey authentication. Valkey clients must authenticate using the Valkey password set during deployment. When configuring Connections, you must provide this Valkey password.

## configureCacheService.sh script

By default, Valkey is configured automatically as part of the bootstrap installation task.  The `configureCacheService.sh` script can be used, if needed, to update the Connections and Valkey integration configuration after deployment.

## The Valkey topology works as follows:![Valkey topology for Homepage](Valkey_topology.png)

!!! note
    
    While the Component Pack uses HAProxy within the Kubernetes cluster to manage Valkey communications, as shown in the diagram above, you can optionally deploy an external load balancer outside the Kubernetes cluster to load-balance the initial network traffic directed to the Component Pack.

Follow these steps to configure and secure the Valkey traffic flowing between Connections and Component Pack.

-   **[Manually configuring Cache Service traffic to Homepage](../install/cp_config_om_cache_service_enable.md)**  
Configure Cache Service traffic between the HCL Connections applications and the Homepage.
-   **[Securing Cache Service traffic to Homepage \(Linux\)](../install/cp_config_om_cache_service_secure_linux.md)**  
Follow these steps to secure the traffic flowing between the HCL Connections applications and the Homepage.
-   **[Securing Cache Service traffic to Homepage \(Windows\)](../install/cp_config_om_cache_service_secure_windows.md)**  
If your deployment runs HCL Connections on Windows, secure Valkey traffic by creating a tunnel between Connections on Windows and the Homepage \(running on Linux\). This is an optional, but recommended, step.
-   **[Verifying Cache Service server traffic](../install/cp_config_om_cache_service_verify.md)**  
Confirm that traffic is flowing properly from HCL Connections to the Homepage.

**Parent topic:** [Configuring the Orient Me component for Homepage](../install/cp_config_om_intro.md)

