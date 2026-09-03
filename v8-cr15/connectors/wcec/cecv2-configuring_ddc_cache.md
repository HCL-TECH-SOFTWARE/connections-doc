# Configuring DDC cache for HCL Connections content in CEC

This topic describes how to configure Digital Data Connector (DDC) caching for HCL Connections content displayed through Connections Engagement Center (CEC) components on CEC (WebEngine) pages.

When displaying HCL Connections content (such as blogs, wikis, or forums) on CEC (WebEngine) pages using CEC components, the content is cached by the DDC framework to improve performance and reduce load on backend systems. By default, this cache keeps content for a long duration and is also refreshed when users log out and log back in.

As a result, newly added or updated Connections content might not appear immediately on WebEngine pages. The configuration described in this topic can be used to tune cache behavior to balance content freshness and performance for your specific use cases.

## DDC caches for social rendering

The DDC framework uses two caches for social rendering:

| Cache | Description |
|-------|-------------|
| **BeanListCache** | Caches the raw data beans fetched from HCL Connections APIs. |
| **ListRenderingCache** | Caches the rendered HTML markup generated from the bean data. |

Both caches are configured through `CacheManagerService.properties`. By default, neither cache has a defined lifetime, so they inherit `cacheglobal.lifetime=-1`, which makes them long-lived. In addition to optional time-based expiration, cache entries can also be invalidated on user login through the `INVALIDATE_ON_LOGIN` trigger.

!!! note
    A cache miss in `ListRenderingCache` falls through to `BeanListCache`. If you set a lifetime on `BeanListCache` but not on `ListRenderingCache`, the rendering cache may still serve stale markup even after the bean cache expires. Consider setting lifetime on both caches.
## Configuring cache lifetime

To enable time-based cache expiration, configure the `lifetime` property (in seconds) for one or both caches.

### Using Helm values

Add the following to your `values.yaml` file:

```yaml
configuration:
  webEngine:
    propertiesFilesOverrides:
      CacheManagerService.properties:
        cacheinstance.com.ibm.workplace.wcm.pzn.plr.BeanListCache.lifetime: "60"
        cacheinstance.com.ibm.workplace.wcm.pzn.plr.ListRenderingCache.lifetime: "60"
```

After updating the values, perform a Helm upgrade to apply the changes.

### Available properties

The following properties can be configured for each cache:

| Property | Description |
|----------|-------------|
| `enabled` | Enables or disables the cache. Default: `true`. |
| `size` | Maximum number of entries in the cache. |
| `lifetime` | Cache entry lifetime in **seconds**. Default: `-1` (never expires). |
| `shared` | Whether cache entries are shared between users. |

**Example:**

```yaml
CacheManagerService.properties:
  cacheinstance.com.ibm.workplace.wcm.pzn.plr.BeanListCache.enabled: "true"
  cacheinstance.com.ibm.workplace.wcm.pzn.plr.BeanListCache.lifetime: "60"
  cacheinstance.com.ibm.workplace.wcm.pzn.plr.ListRenderingCache.enabled: "true"
  cacheinstance.com.ibm.workplace.wcm.pzn.plr.ListRenderingCache.lifetime: "60"
```

## Recommendations

| Environment | Recommended `lifetime` | Notes |
|-------------|------------------------|-------|
| **Development/Testing** | `60` (1 minute) | Allows quick verification of content changes without excessive API calls. |
| **Production** | `600` - `3600` (10-60 minutes) | Balance between content freshness and performance. Tune based on observed Connections API throughput. |

!!! tip
    The following example configuration has been tested and shown to update Connections content on CEC (WebEngine) pages within about 60 seconds after a page refresh:
    ```yaml
    CacheManagerService.properties:
      cacheinstance.com.ibm.workplace.wcm.pzn.plr.BeanListCache.lifetime: "60"
      cacheinstance.com.ibm.workplace.wcm.pzn.plr.ListRenderingCache.lifetime: "60"
    ```
    
    With this setting, updated Connections content (e.g., blog entries) appears on CEC (WebEngine) pages within 60 seconds after a page refresh.

!!! warning
    Setting a very low cache lifetime or disabling caching entirely (`enabled: "false"`) increases the frequency of API calls to HCL Connections, which may impact performance. Do not disable caching in production without understanding the impact on Connections API throughput.
## Cache invalidation behavior

- **On user login**: Per-user cache entries are automatically invalidated when users log in, so login events act as an additional cache refresh mechanism for per-user entries.
- **Shared entries**: If cache entries are flagged as `shared`, they are not invalidated on user login and rely solely on the configured `lifetime` for expiration.

For more information on DDC caching, refer to [Digital Data Connector caches](https://help.hcl-software.com/digital-experience/9.5/latest/extend_dx/ddc/ddc_cache_tuning/plrf_caches/){target="_blank"}.
