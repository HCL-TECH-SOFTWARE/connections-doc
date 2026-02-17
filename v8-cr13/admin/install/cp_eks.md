# Installing Component Pack using EKS

This document outlines the steps for EKS deployment. For details on the overall Component Pack deployment, including the [installation and upgrade](cp_install_upgrade_container.md) procedure, refer to [Installing or upgrading Component Pack for Connections](cp_install_config_intro.md).

## Order of installation

To install Component Pack using EKS, perfom the following steps chronologically. Note that this document elaborates only on the steps that are unique to the EKS approach (steps 3, 4, 5, and 22 in the following list). The rest of the steps in this list can be found in [Steps to install or upgrade to Component Pack 8 CR3](cp_install_services_tasks.md).

1.  Install or upgrade HCL Connections
2.  [Set up NFS](cp_install_services_tasks.md#section_e4p_jrp_tnb)
3.  [Create public keypair in AWS](cp_eks.md#aws-keypair)
4.  [Create Jumpserver/ComponentPack Node using CloudFormation Stack](cp_eks.md#node-cdf-stack)
5.  [Configure Jumpserver/ComponentPack Node for EKS nodes](cp_eks.md#cp-eks-nodes)
6.  [Apply Pod security restrictions at the namespace level](cp_install_services_tasks.md#psa_namespace)
7.  [Add Harbor Helm repository](cp_install_services_tasks.md#harbor_repo)
8.  [Set up Helm charts](cp_install_services_tasks.md#setup_helm)
9.  [Set up persistent volumes and persistent volume claims on NFS](cp_install_services_tasks.md#pv_pvc)
10. [Run bootstrap](cp_install_services_tasks.md#bootstrap)
11. [Set up connections-env chart](cp_install_services_tasks.md#cnx_env)
12. [Build MongoDB 7 image](cp_install_services_tasks.md#inst_mongo7) 
13. [Install infrastructure charts](cp_install_services_tasks.md#infra_chart)
14. [Set up Customizer](cp_install_services_tasks.md#section_n3c_xhj_dvb)
15. [Install OpenSearch](cp_install_services_tasks.md#os_chart)
16. [Set up community ingress](cp_install_services_tasks.md#comm_ingress)
17. [Set up Orient Me for OpenSearch](cp_install_services_tasks.md#orientme_os)
18. [Set up Metrics for OpenSearch](cp_install_services_tasks.md#metrics_os)
19. [Set up Microsoft Teams integration](cp_install_services_tasks.md#teams_integ)
20. [Install community creation wizard and templates \(Tailored Experience\) chart](cp_install_services_tasks.md#comm_tailored)
21. [Configure the LotusConnections-config.xml](cp_install_services_tasks.md#lotusxml)
22. [Configure huddo-board-minio PVC](cp_openshift.md#set-up-activities-plus)
23. [Set up Activities Plus](cp_install_services_tasks.md#activities_plus)
24. [Set up Connections add-in for Microsoft Outlook](cp_install_services_tasks.md#ms_outlook_addin)

## Create public keypair in AWS {#aws-keypair .section}

In AWS, import the public key then paste the ssh-key.

## Create Jumpserver/ComponentPack Node using CloudFormation Stack {#node-cdf-stack .section}

1.  In the AWS Console, select the CloudFormation service.

2.  Create Stack with new standard resources and upload the template file, eks.yaml. You can rename it to "eks-master.yaml".

    Wait for the stack to complete before proceeding to the next step.

    For the contents of the template file, refer to [What's in the EKS template file?](#template-eks).

3.  Ensure that Connections and the Jumpserver/Component Pack Nodes network are connected and can reach each other.

If your cluster is in two different CIDR ranges or VPCs, ensure the following:

-   HCL Connections has been deployed and is accessible via HTTP.

-   Your EKS cluster should accept inbound TCP traffic from the Component Pack load balancer, for example HAProxy.

-   Your Connections server frontend should accept inbound TCP traffic from the OpenShift cluster.

-   Your EKS cluster should be able to mount to the persistent volume folders set up in the NFS master.

-   Helm is installed to run `helm upgrade` commands to deploy charts.

-   [kubectl](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/usage-oc-kubectl.html#the-kubectl-binary) and python3 are installed on EKS to run [config_blue_metrics.py](https://github.com/HCL-TECH-SOFTWARE/connections-automation/blob/main/roles/hcl/component-pack-harbor/files/config_blue_metrics.py).

## Configure Jumpserver/ComponentPack Node for EKS nodes {#cp-eks-nodes .section}

1.  Get SSH to Jumpserver EC2 instance:

    ```
	$ ssh <user>@jump2eks.internal.example.com
    ```

2.  Install python3:

    ```
    $ sudo yum install -y python3
    ```

3.  Install Helm:

    ```
    $ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
    $ chmod +x get_helm.sh
    $ ./get_helm.sh
    $ rm ./get_helm.sh
    ```

4.  Install kubectl:

    ```
    $ curl -LO https://dl.k8s.io/release/v1.24.1/bin/linux/amd64/kubectl
    $ sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
    $ sudo ln -s /usr/local/bin/kubectl /usr/bin/
    $ rm ./kubectl*
    ```

5.  Install awscli:

    ```
    $ curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    $ sudo yum install -y unzip
    $ unzip awscliv2.zip
    $ sudo ./aws/install
    $ ./aws/install -i /usr/local/aws-cli -b /usr/local/bin
    $ rm -rf ./aws*
    ```

6.  Install containerd:

    ```
    $ sudo yum install -y wget
    $ wget https://github.com/containerd/containerd/releases/download/v1.6.9/containerd-1.6.9-linux-amd64.tar.gz
    $ sudo tar -zvxf containerd-1.6.9-linux-amd64.tar.gz -C /usr/local
    $ rm ./containerd-1.6.9-linux-amd64.tar.gz
    ```

7.  Configure AWS:

    ```
    $ su - <user>
    $ aws configure
    ```

    Then input `aws_access_key_id`, `aws_secret_access_key`, and `default region`.

8.  Configure kubectl:

    ```
    $ aws eks --region ap-south-1 update-kubeconfig --name <eks_cluster_name>
    $ curl -o aws-auth-cm.yaml https://s3.us-west-2.amazonaws.com/amazon-eks/cloudformation/2020-10-29/aws-auth-cm.yaml
    $ chmod +x aws-auth-cm.yaml

    # Go to AWS Console then select IAM Roles.
    # Search for your EKS stack rolename  defined in your eks-master-template and copy the ARN, i.e (eks-stack-NodeInstaceRole).
    # Open aws-auth-cm.yaml file and append the ARN name in line with ARN of instance role (not instance profile).
    # Save the file and exit.

    $ kubectl apply -f ./aws-auth-cm.yaml
    $ rm aws-auth-cm.yaml
    - To verify execute command
    $ kubectl get nodes -o wide
    ```

## What's in the EKS template file? {#template-eks .section}

The following are the contents of the template .yaml file used for the CloudFormation Stack in [Create Jumpserver/ComponentPack Node using CloudFormation Stack](#node-cdf-stack).

---
AWSTemplateFormatVersion: '2010-09-09'

Description: Amazon EKS Cluster and Node Group

Parameters:

  User:

    Description: User name

    Type: String

    Default: mmonteros

  ClusterId:

    Description: Cluster Id.

    Type: String

    Default: 'cf2'

  AWSAccessKeyId:

    Type: String

    Default: XXXXXXXXXXXXXXXXXXXX

    Description: Account AWS_ACCESS_KEY_ID.

    NoEcho: true

  AWSSecretAccessKey:

    Type: String

    Default: XXXXXXXXXXXXXXXXXXXX

    Description: Account AWS_SECRET_ACCESS_KEY.

    NoEcho: true

  EKSIAMRoleName:

    Type: String

    Default: eks-role

    Description: The name of the IAM role for the EKS service to assume.

  EKSClusterName:

    Type: String

    Default: eks-cluster

    Description: The desired name of your AWS EKS Cluster.

  VpcBlock:

    Type: String

    Default: 10.0.0.0/22

    Description: Choose a CIDR range for your VPC. Each worker node, pod, and load balancer that you deploy is assigned an IP address from this block. The default value provides enough IP addresses for most implementations, but if it doesn't, then you can change it.

  PublicSubnet01Block:

    Type: String

    Default: 10.0.0.0/24

    Description: Specify a CIDR block for public subnet 1. The default value provides enough IP addresses for most implementations, but if it doesn't, then you can change it.

  PublicSubnet02Block:

    Type: String

    Default: 10.0.1.0/24

    Description: Specify a CIDR block for public subnet 2. The default value provides enough IP addresses for most implementations, but if it doesn't, then you can change it.

  PrivateSubnet01Block:

    Type: String

    Default: 10.0.2.0/24

    Description: Specify a CIDR block for private subnet 1. The default value provides enough IP addresses for most implementations, but if it doesn't, then you can change it.

  PrivateSubnet02Block:

    Type: String

    Default: 10.0.3.0/24

    Description: Specify a CIDR block for private subnet 2. The default value provides enough IP addresses for most implementations, but if it doesn't, then you can change it.

  BootstrapArguments:

    Type: String

    Default: ""

    Description: "Arguments to pass to the bootstrap script. "

  KeyName:

    Type: "AWS::EC2::KeyPair::KeyName"

    Default: mmonteros

    Description: The EC2 Key Pair to allow SSH access to the instances

  NodeAutoScalingGroupDesiredCapacity:

    Type: Number

    Default: 3

    Description: Desired capacity of Node Group ASG.

  NodeAutoScalingGroupMaxSize:

    Type: Number

    Default: 4

    Description: Maximum size of Node Group ASG. Set to at least 1 greater than NodeAutoScalingGroupDesiredCapacity.

  NodeAutoScalingGroupMinSize:

    Type: Number

    Default: 1

    Description: Minimum size of Node Group ASG.

  NodeGroupName:

    Type: String

    Default: eks-nodes

    Description: Unique identifier for the Node Group.

  NodeImageId:

    Type: String

    Default: ""

    Description: (Optional) Specify your own custom image ID. This value overrides any AWS Systems Manager Parameter Store value specified above.

  NodeImageIdSSMParam:

    Type: "AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>"

    Default: /aws/service/eks/optimized-ami/1.24/amazon-linux-2-gpu/recommended/image_id

    Description: AWS Systems Manager Parameter Store parameter of the AMI ID for the worker node instances.

  NodeInstanceType:

    Type: String

    Default: m5a.4xlarge

    AllowedValues:

      - m1.small
      - m1.medium
      - m1.large
      - m1.xlarge
      - m2.xlarge
      - m2.2xlarge
      - m2.4xlarge
      - m3.medium
      - m3.large
      - m3.xlarge
      - m3.2xlarge
      - m4.large
      - m4.xlarge
      - m4.2xlarge
      - m4.4xlarge
      - m4.10xlarge
      - m4.16xlarge
      - m5.large
      - m5.xlarge
      - m5.2xlarge
      - m5.4xlarge
      - m5.8xlarge
      - m5.12xlarge
      - m5.16xlarge
      - m5.24xlarge
      - m5.metal
      - m5a.large
      - m5a.xlarge
      - m5a.2xlarge
      - m5a.4xlarge
      - m5a.8xlarge
      - m5a.12xlarge
      - m5a.16xlarge
      - m5a.24xlarge
      - m5ad.large
      - m5ad.xlarge
      - m5ad.2xlarge
      - m5ad.4xlarge
      - m5ad.12xlarge
      - m5ad.24xlarge
      - m5d.large
      - m5d.xlarge
      - m5d.2xlarge
      - m5d.4xlarge
      - m5d.8xlarge
      - m5d.12xlarge
      - m5d.16xlarge
      - m5d.24xlarge
      - m5d.metal
      - t1.micro
      - t2.nano
      - t2.micro
      - t2.small
      - t2.medium
      - t2.large
      - t2.xlarge
      - t2.2xlarge
      - t3.nano
      - t3.micro
      - t3.small
      - t3.medium
      - t3.large
      - t3.xlarge
      - t3.2xlarge
      - t3a.nano
      - t3a.micro
      - t3a.small
      - t3a.medium
      - t3a.large
      - t3a.xlarge
      - t3a.2xlarge

    ConstraintDescription: Must be a valid EC2 instance type

    Description: EC2 instance type for the node instances

  NodeVolumeSize:

    Type: Number

    Default: 50

    Description: Node volume size

/#/#/# us-east-2 (Ohio) Region peering ###

  /# VPCIdForPeering:

    # Type: String

    # Default: vpc-02798bf7685b2fdb2

    # Description: Destination (other region) VPC Id for VPC peering

  /# VPCPeeringRegion:

    # Type: String

    # Default: us-east-2

    # Description: Destination (other region) VPC peering region

  /# VPCPeeringCIDRBlock01:

    # Type: String

    # Default: 172.26.20.0/24

    # Description: Destination (other region) VPC CidrBlock - 1

  /# VPCPeeringCIDRBlock02:

    # Type: String

    # Default: 172.27.0.0/16

    # Description: Destination (other region) VPC CidrBlock - 2

/#/#/# ap-south-1 (Mumbai) Region peering ###

  VPCIdForPeering:

    Type: String

    Default: vpc-0262a32b3958fa6e6

    Description: Destination (same region) VPC Id for VPC peering

  VPCPeeringRegion:

    Type: String

    Default: ap-south-1

    Description: Destination (same region) VPC peering region

  VPCPeeringCIDRBlock01:

    Type: String

    Default: 10.254.0.0/16

    Description: Destination (same region) VPC CidrBlock - 1

  VPCPeeringCIDRBlock02:

    Type: String

    Default: 10.255.255.0/24

    Description: Destination (same region) VPC CidrBlock - 2

  HostedZoneId:

    Type: String

    Default: Z01006642BLCW3SWF09H8

    Description: Hosted Zone ID for 'internal.example.com' domain

Mappings:

  AuthorizedKeys:

    pubkey:

      your_username: ‘ssh-rsa YOUR_PUBLIC_KEY_HERE’

Metadata:

  AWS::CloudFormation::Interface:

    ParameterGroups:

      - Label:

          default: "User Configuration"

        Parameters:

          - User
          - ClusterId
          - AWSAccessKeyId
          - AWSSecretAccessKey

      - Label:

          default: "Worker Network Configuration"

        Parameters:

          - VpcBlock
          - PublicSubnet01Block
          - PublicSubnet02Block
          - PrivateSubnet01Block
          - PrivateSubnet02Block

      - Label:

          default: Worker Node Configuration

        Parameters:

          - NodeGroupName
          - NodeAutoScalingGroupMinSize
          - NodeAutoScalingGroupDesiredCapacity
          - NodeAutoScalingGroupMaxSize
          - NodeInstanceType
          - NodeImageIdSSMParam
          - NodeImageId
          - NodeVolumeSize
          - KeyName
          - BootstrapArguments

      - Label:

          default: VPC Peering Configuration

        Parameters:

          - VPCIdForPeering
          - VPCPeeringRegion
          - VPCPeeringCIDRBlock01
          - VPCPeeringCIDRBlock02

      - Label:

          default: Route53 Configuration

        Parameters:

          - HostedZoneId

Conditions:

  HasNodeImageId: !Not

    - "Fn::Equals":

        - Ref: NodeImageId

        - ""

Resources:

  EKSIAMRole:

  #Kubernetes clusters managed by Amazon EKS make calls to other AWS services on your behalf

  #to manage the resources that you use with the service

    Type: 'AWS::IAM::Role'

    Properties:

      AssumeRolePolicyDocument:

        Version: 2012-10-17

        Statement:

          - Effect: Allow

            Principal:

              Service:

                - eks.amazonaws.com

              AWS:

                - "*"

            Action:

              - 'sts:AssumeRole'

      RoleName: !Ref EKSIAMRoleName

      ManagedPolicyArns:

        - arn:aws:iam::aws:policy/AmazonEKSClusterPolicy

        - arn:aws:iam::aws:policy/AmazonEKSServicePolicy

      Policies:

        - PolicyName: rootPolicy1

          PolicyDocument:

            Version: "2012-10-17"

            Statement:

              - Effect: Allow

                Action:

                  - eks:DescribeNodegroup
                  - eks:ListNodegroups
                  - eks:DescribeCluster
                  - eks:ListClusters
                  - eks:AccessKubernetesApi
                  - ssm:GetParameter
                  - eks:ListUpdates
                  - eks:ListFargateProfiles

                Resource: '*'

      Path: /

  VPC:

  #Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources

  #into a virtual network that you've defined.

    Type: AWS::EC2::VPC

    Properties:

      CidrBlock:  !Ref VpcBlock

      EnableDnsSupport: true

      EnableDnsHostnames: true

      Tags:

      - Key: Name

        Value: !Sub '${AWS::StackName}-VPC'

      - Key: AWSAccountId

        Value: !Ref "AWS::AccountId"

      - Key: Area

        Value: dev

  VPCPeeringConnection:

    Type: 'AWS::EC2::VPCPeeringConnection'

    DependsOn: VPC

    Properties:

      VpcId: !Ref VPC

      PeerVpcId: !Ref VPCIdForPeering

      PeerRegion: !Ref VPCPeeringRegion

      Tags:

        - Key: Name

          Value: !Sub '${AWS::StackName}'

        - Key: !Sub '${AWS::StackName}-peering'

          Value: owned

        - Key: AWSAccountId

          Value: !Ref "AWS::AccountId"

        - Key: Area

          Value: dev

  #This VPC has two public and two private subnets. One public and one private subnet

  #are deployed to the same Availability Zone. The other public and private subnets

  #are deployed to a second Availability Zone in the same Region.

  #This option allows you to deploy your nodes to private subnets and allows Kubernetes to

  #deploy load balancers to the public subnets that can load balance traffic to pods

  #running on nodes in the private subnets.

  #The subnets are tagged so that Kubernetes is able to deploy load balancers to them.

  PublicSubnet01:

    Type: AWS::EC2::Subnet

    Metadata:

      Comment: Subnet 01

    Properties:

      AvailabilityZone:

        Fn::Select:

        - '0'
        - Fn::GetAZs:

            Ref: AWS::Region

      CidrBlock:

        Ref: PublicSubnet01Block

      VpcId:

        Ref: VPC

      Tags:

      - Key: Name

        Value: !Sub "${AWS::StackName}-PublicSubnet01"

      - Key: "kubernetes.io/role/elb"

        Value: 1

  #If the subnet role tags are not explicitly added, the Kubernetes service controller

  #examines the route table of your cluster VPC subnets to determine if the subnet is

  #private or public. We recommend that you do not rely on this behavior, and instead

  #explicitly add the private or public role tags

  PublicSubnet02:

    Type: AWS::EC2::Subnet

    Metadata:

      Comment: Subnet 02

    Properties:

      AvailabilityZone:

        Fn::Select:

        - '1'
        - Fn::GetAZs:

            Ref: AWS::Region

      CidrBlock:

        Ref: PublicSubnet02Block

      VpcId:

        Ref: VPC

      Tags:

      - Key: Name

        Value: !Sub "${AWS::StackName}-PublicSubnet02"

      - Key: "kubernetes.io/role/elb"

        Value: 1

  PrivateSubnet01:

    Type: AWS::EC2::Subnet

    Metadata:

      Comment: Subnet 03

    Properties:

      AvailabilityZone:

        Fn::Select:

        - '0'
        - Fn::GetAZs:

            Ref: AWS::Region

      CidrBlock:

        Ref: PrivateSubnet01Block

      VpcId:

        Ref: VPC

      Tags:

      - Key: Name

        Value: !Sub "${AWS::StackName}-PrivateSubnet01"

      - Key: "kubernetes.io/role/internal-elb"

        Value: 1

  PrivateSubnet02:

    Type: AWS::EC2::Subnet

    Metadata:

      Comment: Private Subnet 02

    Properties:

      AvailabilityZone:

        Fn::Select:

        - '1'
        - Fn::GetAZs:

            Ref: AWS::Region

      CidrBlock:

        Ref: PrivateSubnet02Block

      VpcId:

        Ref: VPC

      Tags:

      - Key: Name

        Value: !Sub "${AWS::StackName}-PrivateSubnet02"

      - Key: "kubernetes.io/role/internal-elb"

        Value: 1

  InternetGateway:

    Type: "AWS::EC2::InternetGateway"

  VPCGatewayAttachment:

    Type: "AWS::EC2::VPCGatewayAttachment"

    Properties:

      InternetGatewayId: !Ref InternetGateway

      VpcId: !Ref VPC

  PublicRouteTable:

    Type: AWS::EC2::RouteTable

    Properties:

      VpcId: !Ref VPC

      Tags:
      - Key: Name

        Value: Public Subnets

      - Key: Network

        Value: Public

      - Key: AWSAccountId

        Value: !Ref "AWS::AccountId"

      - Key: Area

        Value: dev

  PrivateRouteTable01:

    Type: AWS::EC2::RouteTable

    Properties:

      VpcId: !Ref VPC

      Tags:

      - Key: Name

        Value: Private Subnet AZ1

      - Key: Network

        Value: Private01

      - Key: AWSAccountId

        Value: !Ref "AWS::AccountId"

      - Key: Area

        Value: dev

  PrivateRouteTable02:

    Type: AWS::EC2::RouteTable

    Properties:

      VpcId: !Ref VPC

      Tags:

      - Key: Name

        Value: Private Subnet AZ2

      - Key: Network

        Value: Private02

      - Key: AWSAccountId

        Value: !Ref "AWS::AccountId"

      - Key: Area

        Value: dev

  PublicRoute:

    DependsOn: VPCGatewayAttachment

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PublicRouteTable

      DestinationCidrBlock: 0.0.0.0/0

      GatewayId: !Ref InternetGateway

  PrivateRoute01:

    DependsOn:

    - VPCGatewayAttachment
    - NatGateway01

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PrivateRouteTable01

      DestinationCidrBlock: 0.0.0.0/0

      NatGatewayId: !Ref NatGateway01

  PrivateRoute02:

    DependsOn:

    - VPCGatewayAttachment
    - NatGateway02

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PrivateRouteTable02

      DestinationCidrBlock: 0.0.0.0/0

      NatGatewayId: !Ref NatGateway02

  VPCPeering01Route01:

    DependsOn:

    - VPCGatewayAttachment
    - VPCPeeringConnection
    - PublicRouteTable

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PublicRouteTable

      DestinationCidrBlock:

        Ref: VPCPeeringCIDRBlock01

      VpcPeeringConnectionId: !Ref VPCPeeringConnection

  VPCPeering01Route02:

    DependsOn:

    - VPCGatewayAttachment
    - VPCPeeringConnection
    - PublicRouteTable

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PublicRouteTable

      DestinationCidrBlock:

        Ref: VPCPeeringCIDRBlock02

      VpcPeeringConnectionId: !Ref VPCPeeringConnection

  VPCPeering02Route01:

    DependsOn:

    - VPCGatewayAttachment
    - VPCPeeringConnection
    - PublicRouteTable

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PrivateRouteTable01

      DestinationCidrBlock:

        Ref: VPCPeeringCIDRBlock01

      VpcPeeringConnectionId: !Ref VPCPeeringConnection

  VPCPeering02Route02:

    DependsOn:

    - VPCGatewayAttachment
    - VPCPeeringConnection
    - PublicRouteTable

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PrivateRouteTable01

      DestinationCidrBlock:

        Ref: VPCPeeringCIDRBlock02

      VpcPeeringConnectionId: !Ref VPCPeeringConnection

  VPCPeering03Route01:

    DependsOn:

    - VPCGatewayAttachment
    - VPCPeeringConnection
    - PublicRouteTable

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PrivateRouteTable02

      DestinationCidrBlock:

        Ref: VPCPeeringCIDRBlock01

      VpcPeeringConnectionId: !Ref VPCPeeringConnection

  VPCPeering03Route02:

    DependsOn:

    - VPCGatewayAttachment
    - VPCPeeringConnection
    - PublicRouteTable

    Type: AWS::EC2::Route

    Properties:

      RouteTableId: !Ref PrivateRouteTable02

      DestinationCidrBlock:

        Ref: VPCPeeringCIDRBlock02

      VpcPeeringConnectionId: !Ref VPCPeeringConnection

  NatGateway01:

  #Pods can communicate outbound to the internet through a NAT gateway

  #that is deployed in each Availability Zone

    DependsOn:

    - NatGatewayEIP1
    - PublicSubnet01
    - VPCGatewayAttachment

    Type: AWS::EC2::NatGateway

    Properties:

      AllocationId: !GetAtt 'NatGatewayEIP1.AllocationId'

      SubnetId: !Ref PublicSubnet01

      Tags:

      - Key: Name

        Value: !Sub '${AWS::StackName}-NatGatewayAZ1'

      - Key: AWSAccountId

        Value: !Ref "AWS::AccountId"

      - Key: Area

        Value: dev

  NatGateway02:

    DependsOn:

    - NatGatewayEIP2
    - PublicSubnet02
    - VPCGatewayAttachment

    Type: AWS::EC2::NatGateway

    Properties:

      AllocationId: !GetAtt 'NatGatewayEIP2.AllocationId'

      SubnetId: !Ref PublicSubnet02

      Tags:

      - Key: Name

        Value: !Sub '${AWS::StackName}-NatGatewayAZ2'

      - Key: AWSAccountId

        Value: !Ref "AWS::AccountId"

      - Key: Area

        Value: dev

  NatGatewayEIP1:

    DependsOn:

    - VPCGatewayAttachment

    Type: 'AWS::EC2::EIP'

    Properties:

      Domain: vpc


  NatGatewayEIP2:

    DependsOn:

    - VPCGatewayAttachment

    Type: 'AWS::EC2::EIP'

    Properties:

      Domain: vpc

  PublicSubnet01RouteTableAssociation:

    Type: AWS::EC2::SubnetRouteTableAssociation

    Properties:

      SubnetId: !Ref PublicSubnet01

      RouteTableId: !Ref PublicRouteTable

  PublicSubnet02RouteTableAssociation:

    Type: AWS::EC2::SubnetRouteTableAssociation

    Properties:

      SubnetId: !Ref PublicSubnet02

      RouteTableId: !Ref PublicRouteTable

  PrivateSubnet01RouteTableAssociation:

    Type: AWS::EC2::SubnetRouteTableAssociation

    Properties:

      SubnetId: !Ref PrivateSubnet01

      RouteTableId: !Ref PrivateRouteTable01

  PrivateSubnet02RouteTableAssociation:

    Type: AWS::EC2::SubnetRouteTableAssociation

    Properties:

      SubnetId: !Ref PrivateSubnet02

      RouteTableId: !Ref PrivateRouteTable02

  ControlPlaneSecurityGroup:

  #A security group is deployed that denies all inbound traffic and allows all outbound traffic.

    Type: AWS::EC2::SecurityGroup

    Properties:

      GroupDescription: Cluster communication with worker nodes

      VpcId: !Ref VPC

  EKSCluster:

    Type: AWS::EKS::Cluster

    Properties:

      Name: !Ref EKSClusterName

      RoleArn:

        "Fn::GetAtt": ["EKSIAMRole", "Arn"]

      ResourcesVpcConfig:

        SecurityGroupIds:

        - !Ref ControlPlaneSecurityGroup

        SubnetIds:

        - !Ref PublicSubnet01
        - !Ref PublicSubnet02
        - !Ref PrivateSubnet01
        - !Ref PrivateSubnet02

      Version: 1.24

    DependsOn: [EKSIAMRole, PublicSubnet01, PublicSubnet02, PrivateSubnet01, PrivateSubnet02, ControlPlaneSecurityGroup]

  NodeInstanceRole:

    Type: "AWS::IAM::Role"

    Properties:

      AssumeRolePolicyDocument:

        Version: "2012-10-17"

        Statement:

          - Effect: Allow

            Principal:

              Service:

                - ec2.amazonaws.com

              AWS:

                - "*"

            Action:

              - "sts:AssumeRole"

      ManagedPolicyArns:

        - "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
        - "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
        - "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"

      Policies:

        - PolicyName: rootPolicy2

          PolicyDocument:

            Version: "2012-10-17"

            Statement:

              - Effect: Allow

                Action:

                  - eks:DescribeNodegroup
                  - eks:ListNodegroups
                  - eks:DescribeCluster
                  - eks:ListClusters
                  - eks:AccessKubernetesApi
                  - ssm:GetParameter
                  - eks:ListUpdates
                  - eks:ListFargateProfiles
                  - route53:GetHostedZone
                  - route53:AssociateVPCWithHostedZone
                  - ec2:DescribeVpcs
                  - iam:ListAccountAliases

                Resource: '*'

      Path: /

  NodeInstanceProfile:

    Type: "AWS::IAM::InstanceProfile"

    Properties:

      Path: /

      Roles:

        - Ref: NodeInstanceRole

  NodeSecurityGroup:

    Type: "AWS::EC2::SecurityGroup"

    Properties:

      GroupDescription: Security group for all nodes in the cluster

      Tags:

        - Key: !Sub kubernetes.io/cluster/${EKSClusterName}

          Value: owned

      VpcId: !Ref VPC

      SecurityGroupIngress:

      - IpProtocol: tcp

        FromPort: 22

        ToPort: 22

        CidrIp: 0.0.0.0/0

    DependsOn: EKSCluster

  NodeSecurityGroupIngress:

    Type: "AWS::EC2::SecurityGroupIngress"

    DependsOn: NodeSecurityGroup

    Properties:

      Description: Allow node to communicate with each other

      FromPort: 0

      GroupId: !Ref NodeSecurityGroup

      IpProtocol: "-1"

      SourceSecurityGroupId: !Ref NodeSecurityGroup

      ToPort: 65535

  ClusterControlPlaneSecurityGroupIngress:

    Type: "AWS::EC2::SecurityGroupIngress"

    DependsOn: NodeSecurityGroup

    Properties:

      Description: Allow pods to communicate with the cluster API Server

      FromPort: 443

      GroupId: !Join [ ",", [ !Ref ControlPlaneSecurityGroup ] ]

      IpProtocol: tcp

      SourceSecurityGroupId: !Ref NodeSecurityGroup

      ToPort: 443

  ControlPlaneEgressToNodeSecurityGroup:

    Type: "AWS::EC2::SecurityGroupEgress"

    DependsOn: NodeSecurityGroup

    Properties:

      Description: Allow the cluster control plane to communicate with worker Kubelet and pods

      DestinationSecurityGroupId: !Ref NodeSecurityGroup

      FromPort: 1025

      GroupId: !Join [ ",", [ !Ref ControlPlaneSecurityGroup ] ]

      IpProtocol: tcp

      ToPort: 65535

  ControlPlaneEgressToNodeSecurityGroupOn443:

    Type: "AWS::EC2::SecurityGroupEgress"

    DependsOn: NodeSecurityGroup

    Properties:

      Description: Allow the cluster control plane to communicate with pods running extension API servers on port 443

      DestinationSecurityGroupId: !Ref NodeSecurityGroup

      FromPort: 443

      GroupId: !Join [ ",", [ !Ref ControlPlaneSecurityGroup ] ]

      IpProtocol: tcp

      ToPort: 443

  NodeSecurityGroupFromControlPlaneIngress:

    Type: "AWS::EC2::SecurityGroupIngress"

    DependsOn: NodeSecurityGroup

    Properties:

      Description: Allow worker Kubelets and pods to receive communication from the cluster control plane

      FromPort: 1025

      GroupId: !Ref NodeSecurityGroup

      IpProtocol: tcp

      SourceSecurityGroupId: !Join [ ",", [ !Ref ControlPlaneSecurityGroup ] ]

      ToPort: 65535

  NodeSecurityGroupFromControlPlaneOn443Ingress:

    Type: "AWS::EC2::SecurityGroupIngress"

    DependsOn: NodeSecurityGroup

    Properties:

      Description: Allow pods running extension API servers on port 443 to receive communication from cluster control plane

      FromPort: 443

      GroupId: !Ref NodeSecurityGroup

      IpProtocol: tcp

      SourceSecurityGroupId: !Join [ ",", [ !Ref ControlPlaneSecurityGroup ] ]

      ToPort: 443

  NodeLaunchConfig:

    Type: "AWS::AutoScaling::LaunchConfiguration"

    Properties:

      AssociatePublicIpAddress: "false"

      BlockDeviceMappings:

        - DeviceName: /dev/xvda

          Ebs:

            DeleteOnTermination: true

            VolumeSize: !Ref NodeVolumeSize

            VolumeType: gp2

      IamInstanceProfile: !Ref NodeInstanceProfile

      ImageId: !If

        - HasNodeImageId
        - Ref: NodeImageId
        - Ref: NodeImageIdSSMParam

      InstanceType: !Ref NodeInstanceType

      KeyName: !Ref KeyName

      SecurityGroups:

        - Ref: NodeSecurityGroup

      UserData:

        'Fn::Base64': !Sub

          - |

            #!/bin/bash

            set -o xtrace

            /etc/eks/bootstrap.sh ${EKSClusterName} ${BootstrapArguments}


            sudo groupadd <your_group>

            sudo adduser ${User}

            sudo usermod -a -G <your_group>${User}

            mkdir /home/${User}/.ssh

            sudo echo ${AuthorizedKey} >> /home/${User}/.ssh/authorized_keys

            echo "${User} ALL=(ALL) NOPASSWD: ALL" >>  /etc/sudoers

            sudo chmod -R 777 /var/run/docker.sock

            su ${User} -c 'sudo yum-config-manager --save --setopt=docker-ce-stable.skip_if_unavailable=true'

            sudo yum update -y

            sudo amazon-linux-extras install docker

            sudo usermod -a -G docker ${User}

            sudo usermod -a -G docker ec2-user


            /opt/aws/bin/cfn-signal --exit-code $? \

                    --stack  ${AWS::StackName} \

                    --resource NodeGroup  \

                    --region ${AWS::Region}

          - {

            AuthorizedKey: !FindInMap [AuthorizedKeys, pubkey, !Ref User]

            }

    DependsOn:

    - EKSCluster
    - NodeInstanceProfile

  NodeGroup:

    Type: "AWS::AutoScaling::AutoScalingGroup"

    Properties:

      DesiredCapacity: !Ref NodeAutoScalingGroupDesiredCapacity

      LaunchConfigurationName: !Ref NodeLaunchConfig

      MaxSize: !Ref NodeAutoScalingGroupMaxSize

      MinSize: !Ref NodeAutoScalingGroupMinSize

      Tags:

        - Key: Name

          PropagateAtLaunch: "true"

          Value: !Sub ${EKSClusterName}-${NodeGroupName}-Node

        - Key: !Sub kubernetes.io/cluster/${EKSClusterName}

          PropagateAtLaunch: "true"

          Value: owned

      VPCZoneIdentifier: [ !Ref PrivateSubnet01, !Ref PrivateSubnet02 ]

    UpdatePolicy:

      AutoScalingRollingUpdate:

        MaxBatchSize: "1"

        MinInstancesInService: !Ref NodeAutoScalingGroupDesiredCapacity

        PauseTime: PT5M

    DependsOn: EKSCluster

Outputs:

  SubnetIds:

    Description: Subnets IDs in the VPC

    Value: !Join [ ",", [ !Ref PublicSubnet01, !Ref PublicSubnet02, !Ref PrivateSubnet01, !Ref PrivateSubnet02 ] ]

  SecurityGroups:

    Description: Security group for the cluster control plane communication with worker nodes

    Value: !Join [ ",", [ !Ref ControlPlaneSecurityGroup ] ]

  VpcId:

    Description: The VPC Id

    Value: !Ref VPC

  NodeInstanceRole:

    Description: The node instance role

    Value: !GetAtt NodeInstanceRole.Arn

  NodeSecurityGroup:

    Description: The security group for the node group

    Value: !Ref NodeSecurityGroup
