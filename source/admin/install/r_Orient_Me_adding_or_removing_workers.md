# Adding or removing worker nodes {#r_Orient_Me_adding_or_removing_workers .reference}

Follow these steps to add or remove worker nodes for your Component Pack deployment.

## About worker nodes { .section}

There are currently two types of supported worker nodes, generic and infrastructure. Generic worker nodes are mandatory, and are deployed, and labeled, during the installation of IBM Cloud Private using the flag --worker\_list. Infrastructure worker nodes are dedicated nodes for Elasticsearch to run on, and are deployed, and labeled, during the installation of IBM Cloud Private using the optional flag --infra\_worker\_list. This flag is optional because you can choose not to install Elasticsearch \(for example if you use Starter Stack to install just the Orient Me home page\). In that scenario you don't need dedicated worker nodes.

Component Pack services are configured with Kubernetes "node affinity". All service rules are set to "preference" rather than a hard requirement. This means that, although the Elasticsearch pods will do its best to run on the dedicated infrastructure nodes, if one or more of those nodes are unavailable, then it is possible for an Elasticsearch pod to run on a generic worker node. The same applies for all other services. If they cannot find a generic worker node to run on, they may run on the infrastructure worker.

**Note:** Component Pack employs Pod Anti-Affinity and Node Affinity across all its microservices for resiliency.

Pod Anti Affinity:

-   Allows you to constrain which nodes your pod is eligible to be scheduled based on labels on pods that are already running on the node rather than based on labels on nodes.
-   For Component Pack services. K8s will make every effort not to have pods from the same microservice co-exist on the same node.

Node affinity:

-   Allows you to constrain which nodes your pod is eligible to be scheduled on, based on labels on the node
-   Node Affinity is set to preferred rather than required : specifies preferences that the scheduler will try to enforce but will not guarantee
-   Solr and Zookeeper are set together for pod anti-affinity. This means that K8s will attempt to deploy Solr pods away from zookeeper pods, so on a six-worker cluster, we can expect to see one pod deployed per node across Solr and Zookeeper, regardless of whether that node is labeled as 'generic' or 'infrastructure.'
-   Redis and Redis Sentinel are set together for pod anti-affinity. This means that K8s will attempt to deploy Redis pods away from Redis Sentinel pods, so on a six-worker cluster, we can expect to see one pod deployed per node across Redis and Redis-sentinel, regardless of whether that node is labeled as 'generic' or 'infrastructure'.

## Adding a new worker node { .section}

It is possible to add worker nodes after the installation of IBM Cloud Private has already been done. A scenario where this may be required is if you have a system without Elasticsearch installed \(and therefore have no dedicated Elasticsearch infrastructure nodes\), and you wish to now install the Elasticsearch service. You can pass the --add\_infra\_worker argument into the IBM Cloud Private installer in order to add the new infrastructure worker. You can also use the --add\_worker argument to add a generic worker.

**Note:** You can only add one worker at a time with these flags.

Make sure the worker node you are adding has been included in the worker list. For example, when adding a generic worker node:

```

sudo bash /opt/deployCfC/deployCfC.sh \
--boot=bootserver.example.com \
--master_list=bootserver.example.com \
--worker_list=workerserver1.example.com,workerserver2.example.com,workerserver3.example.com \
--proxy_list=proxyserver1.example.com \
--add_worker=workerserver3.example.com

```

For example, when adding an infrastructure worker:

```

sudo bash /opt/deployCfC/deployCfC.sh \
--boot=bootserver.example.com \
--master_list=bootserver.example.com \
--worker_list=workerserver1.example.com,workerserver2.example.com,workerserver3.example.com \
--infra_worker_list=infraworkerserver1.example.com \
--proxy_list=proxyserver1.example.com \
--add_infra_worker=infraworkerserver1.example.com

```

## Removing a worker node { .section}

You can remove a generic or infrastructure worker by passing the --remove\_worker or --remove\_infra\_worker flag to the IBM Cloud Private installer.

**Note:** You can only remove one worker at a time with these flags.

Make sure the worker you are removing has been included in the worker list. For example, when removing a generic worker:

```
sudo bash /opt/deployCfC/deployCfC.sh \
--boot=bootserver.example.com \
--master_list=bootserver.example.com \
--worker_list=workerserver1.example.com,workerserver2.example.com,workerserver3.example.com \
--proxy_list=proxyserver1.example.com \
--remove_worker=workerserver3.example.com

```

For example, when removing an infrastructure worker:

```

sudo bash /opt/deployCfC/deployCfC.sh \
--boot=bootserver.example.com \
--master_list=bootserver.example.com \
--worker_list=workerserver1.example.com,workerserver2.example.com,workerserver3.example.com \
--infra_worker_list=infraworkerserver1.example.com \
--proxy_list=proxyserver1.example.com \
--remove_infra_worker=infraworkerserver1.example.com

```

## Checking worker labels { .section}

You can check the worker node labels by running the following command:

```
sudo /usr/local/bin/kubectl get nodes --show-labels

```

This example shows a deployment with three generic worker nodes and three infrastructure worker nodes:

```

[root@pink01 hybridcloud]# sudo /usr/local/bin/kubectl get nodes --show-labels
NAME            STATUS    AGE        VERSION                                LABELS
X.XX.XXX.XXX    Ready    7m        cfc-1.6.1.17+f04cb2d1cde1c7-dirty    beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/hostname=X.XX.XXX.XXX,role=master
X.XX.XXX.XXX    Ready    7m        cfc-1.6.1.17+f04cb2d1cde1c7-dirty    beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/hostname=X.XX.XXX.XXX,proxy=true,type=generic
X.XX.XXX.XXX    Ready    7m        cfc-1.6.1.17+f04cb2d1cde1c7-dirty    beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/hostname=X.XX.XXX.XXX,proxy=true,type=generic
X.XX.XXX.XXX    Ready    7m        cfc-1.6.1.17+f04cb2d1cde1c7-dirty    beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/hostname=X.XX.XXX.XXX,proxy=true,type=generic
X.XX.XXX.XXX    Ready    7m        cfc-1.6.1.17+f04cb2d1cde1c7-dirty    beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/hostname=X.XX.XXX.XXX,type=infrastructure
X.XX.XXX.XXX    Ready    7m        cfc-1.6.1.17+f04cb2d1cde1c7-dirty    beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/hostname=X.XX.XXX.XXX,type=infrastructure
X.XX.XXX.XXX    Ready    7m        cfc-1.6.1.17+f04cb2d1cde1c7-dirty    beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/hostname=X.XX.XXX.XXX,type=infrastructure

```

