# Submitting a sitemap for SEO {#submit_sitemap_for_SEO .task}

Submit a sitemap to a search engine provider.

The SitemapGenerator task that is configured in the wikis-config.xml file generates a sitemap that you can use for search engine optimization. To use the sitemap, you must submit the URL of the sitemap to the provider's website, using a format such as the following sample URL:

```
http://example.com:8080/wikis/sitemap/myserver 
```

This address returns the sitemapindex.xml file that contains all the sitemap URLs that will be accessed by the search engine provider's crawler.

The default location of the sitemap is

-   Linux™: /opt/IBM/Connections/data/wikis/upload/sitemap
-   Windows™: C:\\IBM\\Connections\\data\\wikis\\upload\\sitemap

To submit a sitemap, complete the following steps:

1.  Upload the sitemap to a search engine provider by following the instructions for that provider. For example, to submit a sitemap to Google, go to the [Submitting a sitemap to Google](http://support.google.com/sites/bin/answer.py?hl=en&answer=100283) webpage.

2.  Allow the search engine provider to have anonymous access to the sitemap. Providing this access means that you do not have to manually submit the sitemap again. To allow anonymous access, follow the instructions on the provider's website.

3.  Repeat these steps for each search engine provider to which you want to submit the sitemap.


**Parent topic:**[Search Engine Optimization \(SEO\) for Wikis](../admin/c_admin_wikis_SEO.md)

