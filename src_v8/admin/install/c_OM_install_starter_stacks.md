# Installing Component Pack services {#c_OM_install_starter_stacks .concept}

When installing HCL Connections™ Component Pack services, you can choose to install all services, or to install custom set of services \(a Starter Stack\).

Starter Stack is a new feature available in release 6.0.0.4 and higher. When you run the default installation, all of the available services are deployed. Starter Stack allows you to select only the services you want to deploy. If you choose to deploy using Starter Stack, follow the steps in [Installing individual components with Starter Stack](t_OM_install_Starter_Stack.md). Otherwise, follow the steps in [Installing all service components](t_install_Orient_Me_images.md).

This table lists available Starter Stacks, what components they deploy, and any required persistent volume storage.

|Starter Stack|Components|Required PVs|
|-------------|----------|------------|
|customizer|-   Appregistry-client
-   Appregistry-service
-   Haproxy
-   Mongo
-   Mw-proxy
-   Redis
-   Redis-sentinel

|-   Mongo
-   Customizer

|
|elasticsearch|Elasticsearch|Elasticsearch|
|orientme|-   Appregistry-client
-   Appregistry-service
-   Community-suggestions
-   Haproxy
-   Itm-services
-   Mail-service
-   Middleware-graphql
-   Mongo
-   Orient-analysis-service
-   Orient-indexing-service
-   Orient-retrieval-service
-   Orient-web-client
-   People-datamigration
-   People-idmapping
-   People-relationship
-   People-scoring
-   Redis
-   Redis-sentinel
-   Solr
-   Userprefs-service
-   Zookeeper

|-   Mongo
-   Solr
-   Zookeeper

|

