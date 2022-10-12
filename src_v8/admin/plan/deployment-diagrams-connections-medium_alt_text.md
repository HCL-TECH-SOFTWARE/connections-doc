# Long description for deployment-diagrams-connections-medium.jpg {#deployment-diagrams-connections-medium .concept}

This image represents a sample topology for an HCL Connections™ install. This topology shows a clustered deployment on one node, called Node 1. The three systems that are displayed have WebSphere® Application Server \(WAS\) installed. This topology includes three systems, with two of the systems connected by three clusters.

The image shows one cell, Cell A, containing three systems, System A, System B, and System C. Each system has WebSphere Application Server \(WAS\) installed. System A has the deployment manager installed. Systems B and C each have one node installed, Node 1. Systems B and C also have three servers installed on Node 1. System B has servers A, C, and E installed. System C has servers B, D, and F installed. Systems B and C both contain Activities, Communities, and other applications. In System B, Server A has Activities installed, Server C has Communities installed, and Server E has other Connections applications installed. In System C, Server B has Activities installed, Server D has Communities installed, and Server F has other Connections applications installed.

The diagram also shows three clusters, Cluster A, Cluster B, and Cluster C, going between the different servers on Systems B and C. The servers and clusters are all installed on Node 1. Outside of the Systems you see other deployment components listed. The deployment components that are listed are DBMS, TDI, LDAP Server, Network File Share, and HTTP Server.

