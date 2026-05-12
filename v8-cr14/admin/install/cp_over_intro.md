# Overview of Component Pack architecture {#cp_over_intro .concept}

Component Pack for HCL Connections™ is both designed and deployed upon a different software stack from Connections. Therefore, it requires a separate hardware infrastructure.

Component Pack's architecture consists of three main components.

**Container runtime \(containerd\)**
With containers, everything required to make a piece of software run is packaged into isolated containers by containerd. Unlike VMs, containers do not bundle a full operating system—only libraries and settings required to make the software work are needed. This makes for efficient, lightweight, self-contained systems and guarantees that software will always run the same, regardless of where it’s deployed.

**Container orchestrator \(Kubernetes\)**
[Kubernetes](https://kubernetes.io/) is an open-source platform for automating the deployment, scaling, and operations of application containers across clusters of hosts, providing container-centric infrastructure.

**Package manager for Kubernetes \(Helm\)**
[Helm](https://v2.helm.sh/) helps you manage Kubernetes applications—Helm charts help you define, install, and upgrade even the most complex Kubernetes application.

The installation package relies on container technology and includes HCL proprietary components as well as the following open-source components:

-   MongoDB is an open-source database that uses a document-oriented model rather than a relational data model.
-   Valkey is an open-source \(BSD licensed\), in-memory data structure store, used as a database, cache, and message broker. Valkey Sentinel is used for high availability. Valkey is used by Orient Me.
-   OpenSearch is a community-driven, Apache 2.0-licensed open source search and analytics suite that makes it easy to ingest, search, visualize, and analyze data. It provides a distributed, multitenant-capable, full-text search engine with an HTTP web interface and schema-free JSON documents. It can be used for search, as an underlying storage mechanism for Orient Me.
-   HAProxy is an open-source load-balancing and proxying solution for TCP-based and HTTP-based applications.
-   The Traefik Ingress Controller manages incoming HTTP and HTTPS traffic for the cluster. It acts as the unified gateway for traffic routing and service discovery.  While it fully supports the standard Kubernetes Ingress resource, it also offers advanced features such as path stripping through Custom Resource Definitions (CRDs) like Middleware.

All the helm charts provided with Component Pack are built with Helm v3. For the supported Helm version, see [Kubernetes Runtime and Component Pack Middleware](cp_kubernetes_runtime.md).

**Parent topic:**[Installing or upgrading Component Pack for Connections](../install/cp_install_config_intro.md)

