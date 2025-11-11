# API Modernization {#dev_intro .concept}

HCL Connections introduced a new generation of APIs as part of its API Modernization Initiative, aimed at improving developer experience, interoperability, and ease of integration with modern frameworks and tools.

In addition to the existing ATOM APIs, a new set of JSON-based APIs is now available through the HCL API Gateway. These APIs are OpenAPI 3.0–compliant, enabling developers to explore, test, and integrate endpoints using contemporary REST practices. For details, see the ***Test API Endpoints*** section in the [Installing HCL API Gateway for Component Pack](../install/installing_hcl_api_gateway_for_component_pack.md) documentation.

!!! important
    
    The Swagger UI served by the HCL API Gateway provides the authoritative, interactive reference for all endpoints, including parameters, request and response schemas, and examples. Do not duplicate endpoint details here. Use the Gateway’s OpenAPI/Swagger interface as the authoritative reference for all endpoint details.

New APIs will be released with each quarterly Connections update.

## Key improvements

The modernized APIs offer several key enhancements over the legacy ATOM endpoints:

- Interactive API Testing: Explore endpoints in real time using the Swagger UI to execute calls and view responses directly.
- Consistent Structure: Each API follows standardized resource naming and HTTP verb usage for intuitive implementation.
- Secure Authentication: Supports the same authentication methods as existing Connections APIs, including OAuth and Basic Authentication.
- Future Expansion: Additional APIs for other Connections components will be introduced in upcoming quarterly releases.

## Blogs and Moderation APIs

The first delivery introduces the Blogs and Blog Moderation APIs, which modernize the way developers interact with blog-related data in Connections. These APIs replace legacy ATOM endpoints with lightweight, RESTful operations that return structured JSON responses.

The new APIs support a wide range of use cases, including creating, updating, and managing blog content and community-driven ideation spaces. Each API follows a consistent resource-based design and is fully documented in an interactive Swagger UI environment, allowing developers to test requests directly from their browser.

### Blogs API features and capabilities

The Blogs API provides comprehensive functionality for managing blog content within HCL Connections, including:

|Feature|Description|Example Operations|
|--|--|--|
|Blogs|Represents an entire blog, the top-level container for posts.|Create, retrieve, update, and delete blogs.|
|Posts|Represents individual blog posts within a specific blog.|Create, retrieve post lists, edit, and delete posts|
|Comments|User comments associated with a specific post.|Add, list, or delete comments on blog posts.|
|Media|File and image attachments within blogs.|Upload, list, or delete media files.|
|Likes|User “likes” or recommendations on posts.|Add, retrieve, or remove likes.|
|Tags|Keywords used to categorize and filter blog posts.|Add, remove tags, or retrieve all tags and their usage count.|
|Ideation Blogs|Special blogs for collecting and managing ideas within communities.|Create, retrieve, update, and delete ideation blogs and ideas.|
|Ideation Posts|Individual ideas submitted within ideation blogs.|Submit, retrieve, update, and delete ideas.|

<!--For detailed endpoint information and example workflows, refer to the [Swagger UI](https://preview.hclconnections.net/connections/api/v2/explorer#/Blogs/getBlogById) provided by the HCL API Gateway.-->

!!! important
    
    For detailed endpoint information and example workflows, access the Swagger UI hosted by your HCL API Gateway deployment. After you install the Gateway as part of the Component Pack, open the Gateway explorer at `https://<gateway-host>/api/v2/explorer` (replace `<gateway-host>` with your Gateway host name, such as your company domain) to test endpoints and view request/response schemas. The Gateway's Swagger UI is the authoritative, interactive reference for all endpoint details.

**Parent topics:** [Developing](dev_intro.md)