# Long description for deployment-diagrams-connections-large.jpg {#deployment-diagrams-connections-large .concept}

This image represents a sample topology for an HCL Connections™ install. This topology shows a clustered deployment on two nodes, Node 1 and Node 2. All three systems that are displayed have WebSphere® Application Server \(WAS\) installed.

The image shows one cell, Cell A, containing three systems, System A, System B, and System C. Each system has WebSphere Application Server \(WAS\) installed. System A has the Deployment Manager installed. Systems B and C each have one node that is installed, Node 1 on System B and Node 2 on System C.

System B has four servers A, C, E and X installed on Node 1. System C also has four servers B, D, F, and Y installed on Node 2. Systems B and C both contain Activities, Blogs, Communities, and other applications. In System B, Server A has Activities installed, Server C has Blogs installed, and Server E has Communities installed, and Server X has other Connections applications installed. In System C, Server B has Activities installed, Server D has Blogs installed, Server F has Communities installed, and Server X has other applications installed.

The diagram also shows four clusters: an Activities cluster, a Blogs cluster, a Communities cluster, and an Other clusters extending between the different servers on Systems B and C. Outside of the Systems you see other deployment components listed. The deployment components that are listed are DBMS, TDI, LDAP Server, Network File Share, and HTTP Server.

