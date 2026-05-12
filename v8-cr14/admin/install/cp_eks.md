# Installing Component Pack using EKS

This document provides a complete guide for deploying Component Pack on Amazon EKS (Elastic Kubernetes Service), including EKS cluster creation and Component Pack installation. For details on the overall Component Pack deployment, including the [installation and upgrade procedure](cp_install_upgrade_container.md), refer to [Installing or upgrading Component Pack for Connections](cp_install_config_intro.md).

## Prerequisites

Before you begin, ensure that you have the following:

-   HCL Connections has been deployed and is accessible via HTTP.
-   An AWS account with permissions to create and manage EKS clusters, EC2 instances, VPCs, security groups, and IAM roles.
-   A jump server (bastion host) with access to both your HCL Connections environment and EKS environment. You will install the required tools (AWS CLI, kubectl, eksctl, Helm, python3) on this server; installation instructions are provided later in this document.
-   NFS storage configured for persistent volumes. Refer to [Set up NFS](cp_install_services_tasks.md#section_e4p_jrp_tnb) for instructions.
-   An SSH key pair created in AWS for EC2 instance access.
-   Access to the [Harbor repository](https://hclcr.io/harbor/projects/15/repositories) with valid credentials.
-   Network planning and connectivity:
    -   VPC and subnet strategy (this guide assumes deployment in the same VPC as HCL Connections, but separate VPC deployment with VPC peering is also supported).
    -   Network connectivity established between:
        -   HCL Connections servers and the jump server
        -   Jump server and EKS cluster
        -   HCL Connections servers and EKS worker nodes
    -   Security groups configured to allow bidirectional TCP traffic between HCL Connections instances, the jump server, and EKS worker nodes.
    -   DNS resolution or host file entries configured so that required internal host names resolve correctly from the jump server and worker nodes.

!!! note
    This guide walks you through creating the EKS cluster and installing required tools on your jump server. You are responsible for creating the jump server itself.

## Create public keypair in AWS {#aws-keypair .section}

Generate or use an existing SSH key pair. In the AWS Console, go to **EC2 → Key Pairs** and import your public key. Note the key pair name — you'll use it in the CloudFormation stack parameter `KeyName`.

## Create EKS Cluster using CloudFormation Stack {#node-cdf-stack .section}

1.  In the AWS Console, select the CloudFormation service.

2.  Create a stack with new standard resources and upload the template file, for example `eks-master.yaml`.

    An example CloudFormation template is provided below in [What's in the EKS template file?](#template-eks). You can use this as a starting point and customize it for your environment.

    Wait for the stack to complete before proceeding to the next step.

    Review the parameter values carefully before you create the stack. At minimum, confirm the following values for your environment:

    -   `EKSClusterName`
    -   `EKSIAMRoleName`
    -   `KeyName`
    -   `VpcId`, subnet IDs, and security group IDs
    -   Worker node instance type, disk size, and capacity settings

## Configure Jump Server for EKS Management {#cp-eks-nodes .section}

1.  Connect to the jump server EC2 instance via SSH:

    ```
    ssh <user>@jump2eks.internal.example.com
    ```

2.  Install the required CLI tools on the jump server. Follow the AWS documentation for the latest installation instructions:

    -   **AWS CLI, kubectl, and eksctl** – See [Setting up to use Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/setting-up.html) and [Getting started with Amazon EKS – eksctl](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html).

    After you complete the AWS setup steps you should be able to run `aws --version`, `kubectl version --client`, and `eksctl version` without errors.

3.  Install the additional tools that are not covered by the AWS documentation:

    Install python3:

    ```
    sudo yum install -y python3
    ```

    Install Helm:

    ```
    curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
    chmod +x get_helm.sh
    ./get_helm.sh
    rm ./get_helm.sh
    ```

4.  Configure AWS credentials:

    ```
    aws configure
    ```

    Enter your `aws_access_key_id`, `aws_secret_access_key`, default region (for example `ap-south-1`), and default output format (for example `json`).

    Verify your identity:

    ```
    aws sts get-caller-identity
    ```

5.  Update your kubeconfig to connect to the EKS cluster:

    ```
    aws eks --region <your_region> update-kubeconfig --name <eks_cluster_name>
    ```

    Verify that the worker nodes are visible and in the `Ready` state:

    ```
    kubectl get nodes -o wide
    ```

## What's in the EKS template file? {#template-eks .section}

The following is an example CloudFormation template that you can use to create your EKS cluster. This template deploys the EKS cluster and managed node group into an existing VPC and subnets — it does not create new networking resources or a jump server. 

!!! important "Template Uses Existing Infrastructure"

    This CloudFormation template is designed to use **existing VPC, subnets, and security groups**. It does not create new networking resources. The template assumes that:
    
    - You have an existing VPC with public and private subnets
    - You have existing security groups for your HCL Connections instances (both external-facing and internal instances)
    - The EKS cluster will be deployed in the same VPC as your HCL Connections deployment
    
    **If you want to deploy the EKS cluster in a separate VPC**, you will need to:
    
    1. Modify the CloudFormation template to create new VPC and subnet resources, or use a separate template to create the VPC infrastructure first
    2. Set up VPC peering between the HCL Connections VPC and the EKS VPC
    3. Update route tables in both VPCs to enable cross-VPC communication
    4. Ensure security groups allow traffic between the peered VPCs
    
    For VPC peering configuration details, refer to the [AWS VPC Peering documentation](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html).

!!! note

  Review and update the parameter values before you deploy the stack, especially `KubernetesVersion`, `EKSClusterName`, `EKSIAMRoleName`, `KeyName`, `VpcId`, subnet IDs, security group IDs, node scaling settings, instance type, and volume size. Use values from your own AWS account, and make sure that the Kubernetes version you specify is supported by Amazon EKS in your target region.

```yaml
AWSTemplateFormatVersion: '2010-09-09'

Description: Amazon EKS Cluster and Node Group (Existing VPC and Subnets)

Parameters:
  KubernetesVersion:
    Type: String
    Default: "1.35"
    Description: Kubernetes version to use for the EKS cluster and node group.
  EKSIAMRoleName:
    Type: String
    Default: cnx-eks-role-1-35
    Description: The name of the IAM role for the EKS service to assume.
  EKSClusterName:
    Type: String
    Default: cnx-eks-cluster
    Description: The desired name of your AWS EKS Cluster.
  VpcId:
    Description: The ID of your existing VPC where the EKS cluster will be deployed.
    Default: vpc-0EXAMPLE1234abcde
    Type: String
  PublicSubnet01Id:
    Description: The ID of the first existing public subnet.
    Default: subnet-0EXAMPLE1111aaaaa
    Type: String
  PublicSubnet02Id:
    Description: The ID of the second existing public subnet.
    Default: subnet-0EXAMPLE2222bbbbb
    Type: String
  PrivateSubnet01Id:
    Description: The ID of the first existing private subnet.
    Default: subnet-0EXAMPLE3333ccccc
    Type: String
  PrivateSubnet02Id:
    Description: The ID of the second existing private subnet.
    Default: subnet-0EXAMPLE4444ddddd
    Type: String
  KeyName:
    Type: "AWS::EC2::KeyPair::KeyName"
    Default: my-ec2-keypair
    Description: The EC2 Key Pair to allow SSH access to the worker nodes
  NodeAutoScalingGroupDesiredCapacity:
    Type: Number
    Default: 2
    Description: Desired capacity of Node Group.
  NodeAutoScalingGroupMaxSize:
    Type: Number
    Default: 3
    Description: Maximum size of Node Group. Set to at least 1 greater than NodeAutoScalingGroupDesiredCapacity.
  NodeAutoScalingGroupMinSize:
    Type: Number
    Default: 1
    Description: Minimum size of Node Group.
  NodeGroupName:
    Type: String
    Default: cnx-eks-nodes-1-35
    Description: Unique identifier for the Node Group.
  NodeInstanceType:
    Type: String
    Default: m5a.4xlarge
    AllowedValues:
      - m5a.large
      - m5a.xlarge
      - m5a.2xlarge
      - m5a.4xlarge
      - m5a.8xlarge
      - m5a.12xlarge
      - m5a.16xlarge
      - m5a.24xlarge
    ConstraintDescription: Must be a valid EC2 instance type
    Description: EC2 instance type for the node instances
  NodeVolumeSize:
    Type: Number
    Default: 100
    Description: Node volume size (GiB)
  ExternalInstanceSecurityGroupId:
    Type: String
    Default: sg-0EXAMPLEexternal01
    Description: Security group for public web EC2 instance (allows EKS nodes to reach it and vice versa)
  InternalInstanceSecurityGroupId:
    Type: String
    Default: sg-0EXAMPLEinternal01
    Description: Security group for internal EC2 instances (allows EKS nodes to reach them and vice versa)

Metadata:
  AWS::CloudFormation::Interface:
    ParameterGroups:
      - Label:
          default: "Existing Network Configuration"
        Parameters:
          - VpcId
          - PublicSubnet01Id
          - PublicSubnet02Id
          - PrivateSubnet01Id
          - PrivateSubnet02Id
      - Label:
          default: "Worker Node Configuration"
        Parameters:
          - NodeGroupName
          - NodeAutoScalingGroupMinSize
          - NodeAutoScalingGroupDesiredCapacity
          - NodeAutoScalingGroupMaxSize
          - NodeInstanceType
          - NodeVolumeSize
          - KeyName

Resources:
  NodeLaunchTemplate:
    Type: AWS::EC2::LaunchTemplate
    Properties:
      LaunchTemplateName: !Sub '${EKSClusterName}-nodes-lt'
      LaunchTemplateData:
        KeyName: !Ref KeyName
        SecurityGroupIds:
          - !Ref NodeSecurityGroup
        BlockDeviceMappings:
          - DeviceName: /dev/xvda
            Ebs:
              VolumeSize: !Ref NodeVolumeSize
              VolumeType: gp3
              DeleteOnTermination: true
        UserData:
          Fn::Base64: |
            MIME-Version: 1.0
            Content-Type: multipart/mixed; boundary="==BOUNDARY=="

            --==BOUNDARY==
            Content-Type: text/x-shellscript; charset="us-ascii"

            #!/bin/bash
            set -xe

            # Install NFS client utilities (Amazon Linux / EKS AMIs)
            yum install -y nfs-utils

            # Optional: ensure RPC support is up (harmless if already enabled)
            systemctl enable --now rpcbind || true

            --==BOUNDARY==--

  EKSIAMRole:
    Type: 'AWS::IAM::Role'
    Properties:
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              Service:
                - eks.amazonaws.com
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
      Path: '/'

  ControlPlaneSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Cluster communication with worker nodes
      VpcId: !Ref VpcId

  EKSCluster:
    Type: AWS::EKS::Cluster
    Properties:
      Name: !Ref EKSClusterName
      RoleArn:
        Fn::GetAtt: [EKSIAMRole, Arn]
      ResourcesVpcConfig:
        SecurityGroupIds:
          - !Ref ControlPlaneSecurityGroup
        SubnetIds:
          - !Ref PublicSubnet01Id
          - !Ref PublicSubnet02Id
          - !Ref PrivateSubnet01Id
          - !Ref PrivateSubnet02Id
      Version: !Ref KubernetesVersion
    DependsOn:
      - EKSIAMRole
      - ControlPlaneSecurityGroup

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
      Path: '/'

  NodeSecurityGroup:
    Type: "AWS::EC2::SecurityGroup"
    Properties:
      GroupDescription: Security group for all nodes in the cluster
      Tags:
        - Key: !Sub kubernetes.io/cluster/${EKSClusterName}
          Value: owned
      VpcId: !Ref VpcId
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
      Description: Allow nodes to communicate with each other
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
      GroupId: !Ref ControlPlaneSecurityGroup
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
      GroupId: !Ref ControlPlaneSecurityGroup
      IpProtocol: tcp
      ToPort: 65535

  ControlPlaneEgressToNodeSecurityGroupOn443:
    Type: "AWS::EC2::SecurityGroupEgress"
    DependsOn: NodeSecurityGroup
    Properties:
      Description: Allow the cluster control plane to communicate with pods running extension API servers on port 443
      DestinationSecurityGroupId: !Ref NodeSecurityGroup
      FromPort: 443
      GroupId: !Ref ControlPlaneSecurityGroup
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
      SourceSecurityGroupId: !Ref ControlPlaneSecurityGroup
      ToPort: 65535

  NodeSecurityGroupFromControlPlaneOn443Ingress:
    Type: "AWS::EC2::SecurityGroupIngress"
    DependsOn: NodeSecurityGroup
    Properties:
      Description: Allow pods running extension API servers on port 443 to receive communication from cluster control plane
      FromPort: 443
      GroupId: !Ref NodeSecurityGroup
      IpProtocol: tcp
      SourceSecurityGroupId: !Ref ControlPlaneSecurityGroup
      ToPort: 443

  NodeSecurityGroupFromExternalInstancesIngress:
    Type: "AWS::EC2::SecurityGroupIngress"
    Properties:
      Description: Allow EKS worker nodes to receive traffic from external EC2 instances
      FromPort: 0
      ToPort: 65535
      IpProtocol: tcp
      GroupId: !Ref NodeSecurityGroup
      SourceSecurityGroupId: !Ref ExternalInstanceSecurityGroupId

  NodeSecurityGroupFromInternalInstancesIngress:
    Type: "AWS::EC2::SecurityGroupIngress"
    Properties:
      Description: Allow EKS worker nodes to receive traffic from internal EC2 instances
      FromPort: 0
      ToPort: 65535
      IpProtocol: tcp
      GroupId: !Ref NodeSecurityGroup
      SourceSecurityGroupId: !Ref InternalInstanceSecurityGroupId

  ExternalInstancesFromNodeSecurityGroupIngress:
    Type: "AWS::EC2::SecurityGroupIngress"
    Properties:
      Description: Allow external EC2 instances to receive traffic from EKS worker nodes
      FromPort: 0
      ToPort: 65535
      IpProtocol: tcp
      GroupId: !Ref ExternalInstanceSecurityGroupId
      SourceSecurityGroupId: !Ref NodeSecurityGroup

  InternalInstancesFromNodeSecurityGroupIngress:
    Type: "AWS::EC2::SecurityGroupIngress"
    Properties:
      Description: Allow internal EC2 instances to receive traffic from EKS worker nodes
      FromPort: 0
      ToPort: 65535
      IpProtocol: tcp
      GroupId: !Ref InternalInstanceSecurityGroupId
      SourceSecurityGroupId: !Ref NodeSecurityGroup

  EKSManagedNodeGroup:
    Type: AWS::EKS::Nodegroup
    Properties:
      ClusterName: !Ref EKSClusterName
      NodegroupName: !Ref NodeGroupName
      ScalingConfig:
        MinSize: !Ref NodeAutoScalingGroupMinSize
        MaxSize: !Ref NodeAutoScalingGroupMaxSize
        DesiredSize: !Ref NodeAutoScalingGroupDesiredCapacity
      Subnets:
        - !Ref PrivateSubnet01Id
        - !Ref PrivateSubnet02Id
      InstanceTypes:
        - !Ref NodeInstanceType
      NodeRole: !GetAtt NodeInstanceRole.Arn
      LaunchTemplate:
        Id: !Ref NodeLaunchTemplate
        Version: !GetAtt NodeLaunchTemplate.LatestVersionNumber
    DependsOn:
      - EKSCluster
      - NodeInstanceRole
      - ControlPlaneSecurityGroup
      - NodeLaunchTemplate

Outputs:
  SubnetIds:
    Description: Subnets IDs used by the EKS cluster
    Value: !Join [ ",", [ !Ref PublicSubnet01Id, !Ref PublicSubnet02Id, !Ref PrivateSubnet01Id, !Ref PrivateSubnet02Id ] ]
  SecurityGroups:
    Description: Security group for the cluster control plane communication with worker nodes
    Value: !Ref ControlPlaneSecurityGroup
  VpcId:
    Description: The VPC Id used by the EKS cluster
    Value: !Ref VpcId
  NodeInstanceRoleArn:
    Description: The node instance role ARN
    Value: !GetAtt NodeInstanceRole.Arn
  NodeSecurityGroupId:
    Description: The security group for the node group
    Value: !Ref NodeSecurityGroup

```

**Parent Topic**: [Installing or upgrading Component Pack](cp_install_config_intro.md)
