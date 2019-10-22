---
id: aws-compute
title: Compute
sidebar_label: Compute
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws-compute.md
---

## EC2

<img width=100 src="/datadocs/assets/icon-aws-amazon-ec2.svg"/>

- Amazon Elastic Compute Cloud (EC2) is a web service that provides resizable compute capacity.
- Reduces the time required to obtain and boot new server instances (from days) to minutes.
    - A huge side-effect of both of these: it’s way easier to innovate.
- Allows quickly scaling capacity, both up and down, as requirements change.
- Pay as you go, pay for what you use, and pay even less for reserved instances.
- Termination protection is turned off by default.
- Individual instances are provisioned in a AZ's.
    - The region cannot be changed for a running instance, only the AZ.
- Credentials:
    - Roles are more secure and easier to manage than via `aws configure` on EC2.
    - Roles can be assigned to EC2 instances after its created.
    - Roles are universal (global) and take effect immediately.
- Bootstrap scripts:
    - Run when the EC2 instance first boots.
    - Can be a powerful way of automating software installs and updates.

```bash
# Example: Bootstrap script for a simple Apache server

#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>Hello, World!</h1></html>" > index.html
```

- Metadata can be assigned using tags.
    - Tagging is a key part of managing an environment.
- Accessing instance metadata from within:
    - Instance metadata and user data can be retrieved from within via a special URL.
    - Get metadata by running `curl http://169.256.169.254/latest/meta-data/`
    - Get user data by running `curl http://169.256.169.254/latest/user-data/`
    - For example, EC2 can access its public IP address and write it to a database.

### Pricing

- On demand:
    - Fixed rate by hour (or by second) with no up-front payment or commitment.
    - For applications with short term, spiky, or unpredictable workloads that cannot be interrupted.
    - For applications that are tested for the first time.
- Reserved:
    - Capacity reservation with significant discounts, one or three years contracts.
    - For applications with steady state and predictable usage.
    - For applications that require reserved capacity.
    - Users can do up-front payments to reduce their total computing costs even further.
    - Standard Reserved Instances: The higher the upfront payment and the longer the contract, the greater the discount (up to 75% off)
    - Convertible Reserved Instances: Attributes can be changed dynamically as long as the new instances is of equal or greater value (up to 54% off)
    - Scheduled Reserved Instances: “I just need extra on Black Friday, but that’s it”
- Spot instances:
    - Have a huge isolated workload? Snag a spot instance when the price is super cheap at 4AM on a Tuesday, run your stuff, then shut it all down.
    - Whenever the price goes up, these instances will be terminated.
    - Not charged for a partial hour of usage if terminated (except if terminated manually)
    - For applications that have flexible start and end times.
    - For applications that are only feasible at very low computing prices.
    - For users with urgent computing needs for large amounts of additional capacity.
- Dedicated hosts:
    - Physical EC2 server dedicated for own use.
    - Allows to use existing server-bound software licenses like VMWare and Oracle.
    - For regulatory requirements that may not support multi-tenant virtualization.
    - For licensing that does not support multi-tenant virtualization or cloud deployment (Oracle)
    - Can be purchased on-demand.
    - Can be purchased as a reservation for up to 70% off the on-demand price.

### Instance types

<img width=250 src="/datadocs/assets/mr-mcpxz.png"/>
<center><a href="https://www.udemy.com/course/aws-certified-solutions-architect-associate" class="credit">Credit</a></center>

- Fight Dr. McPXZ in Australia
- FIGHT:
    - F (Field programmable gate array): Genomic research, financial analysis, big data
    - I (IOPS): NoSQL, data warehouses
    - G (Graphics intense): Video encoding, 3D application streaming
    - H (High disk throughput): MapReduce, HDFS
    - T (Cheap general purpose, T2 Micro): Web servers, small databases
- DR:
    - D (Dense storage): File servers, data warehouses, Hadoop
    - R (RAM optimized): Memory intensive applications or databases
- MC:
    - M (Main choice for general purpose applications): application servers
    - C (Compute optimized): CPU intensive applications or databases
- PXZ:
    - P (Graphics, GPUs): Machine learning, Bitcoin mining
    - X (Extreme memory): SAP HANA, Apache Spark
    - Z (Extreme memory and CPU): Electronic design automation, high per-core licensing costs
- AU:
    - A (Arm-based workloads): Scale-out workloads such as web servers
    - U (Bare metal): Bare metal capabilities

### Storage

- [AWS Storage Types - S3, EFS, & EBS](https://help.acloud.guru/hc/en-us/articles/115002011194)

#### EBS

- Amazon Elastic Block Store (EBS) provides persistent block storage volumes in the cloud.
- Each EBS volume is replicated within its AZ to protect from component failure.
- EBS types:
    - SSD >> General purpose SSD (GP2): For most workloads (16,000 IOPS)
    - SSD >> Provisioned IOPS SSD (IO1): For databases (64,000 IOPS)
    - Magnetic >> Throughput Optimized HDD (ST1): For big data, DWH, logs (500 IOPS)
    - Magnetic >> Cold HDD (SC1): Cheap, for file servers (250 IOPS)
    - Magnetic >> EBS Magnetic: Extra cheap, for infrequently accessed workloads (40-200 IOPS)
    - EBS volumes can be changed on the fly (including the size and storage type)
- Volumes exist on EBS:
    - Think of EBS as of a virtual hard disk.
- Snapshots exist on S3:
    - Created with command `aws ec2 create-snapshot`
    - Think of snapshots as of a photograph of the disk.
    - Snapshots are point-in-time copies of volumes.
    - Snapshots are incremental: only the blocks that changed since last snapshots are moved to S3.
    - The first snapshot may take some time.
    - To take a snapshot of a root device, you should stop the EC2 instance first. But you can also make a snapshot while the instance is running.
    - One can perform actions on an existing EBS snapshot using AWS APIs, CLI, and AWS Console.
    - One cannot delete a snapshot that is used as the root device of a registered AMI.
- Data migration:
    - Volumes are always in the same AZ as the EC2 instance.
    - To move an EC2 volume from one AZ to another, take a snapshot, create an AMI from that snapshot, and then use the AMI to launch a new EC2 instance in a new AZ.
    - To move an EC2 volume from one region to another, take a snapshot, create an AMI from that snapshot, copy that AMI to another region, and then use the copied AMI to launch a new EC2 instance in the new region.
- Encryption:
    - The use of encryption at rest is default requirement for many industry compliance certifications. 
    - Using AWS managed keys to provide EBS encryption at rest is relatively painless and reliable.
    - Snapshots of encrypted volumes are encrypted automatically.
    - Volumes restored from encrypted snapshots are encrypted automatically.
    - You can share snapshots (on AWS or publicly), but only if they are unencrypted.
    - You can now encrypt root device volumes upon creation of the EC2 instance.
    - To encrypt an unencrypted root device volume, create a snapshot of it, encrypt that snapshot, create an AMI from that snapshot, and use that AMI to launch a new encrypted EC2 instance.
- Termination:
    - The default action is for the root EBS volume to be deleted when the instance is terminated.
    - The default action for additional volumes is to be persisted.
- Additional volumes:
    - Additional volumes can be detached without stopping the instance.
    - You can add multiple volumes to an EC2 instance and then create your own RAID 5/RAID 10/RAID 0 configurations using those volumes.
    - You cannot attach an EBS volume to more than one EC2 instance at the same time.

#### Instance stores

- Storage backed by Amazon EBS:
    - The root device is an Amazon EBS volume created from an Amazon EBS snapshot.
    - EBS backed instances can be stopped since they get a new host when starting again.
    - Can be rebooted without data loss.
- Storage backed by instance store:
    - Sometimes called ephemeral storage ("persistent" for the life of the instance, non-billable)
    - The root device is an instance store backed volume created from a template stored on S3.
    - The instance store is ideal for temporary storage.
    - Cannot be stopped: If the underlying host fails, the data will be lost.
    - But can be rebooted without data loss.

#### Images

- Amazon Machine Images (AMI) are configurations of EC2 instances:
- AMI's can be created from both volumes and snapshots.
- Created upon various characteristics:
    - Region
    - Operating system
    - Architecture (32-bit or 64-bit)
    - Launch permissions
    - Storage for the root device (root device volume)

#### EFS

- Amazon Elastic File System (EFS) is a file storage service for EC2 instances.
- Easy to use, and provides a simple interface for creating and configuring file systems.
- Storage capacity is elastic, that is, it is growing and shrinking automatically.
    - Can scale up to petabytes.
- Supports the NFSv4 protocol.
    - Can support thousands of concurrent NFS connections.
- Only pay for what you use (no pre-provisioning required)
- Data is stored across multiple AZ's within a region.
- Read after write consistency. 

### Placement groups

- Clustered placement group:
    - Grouping of instances within a single AZ.
    - Keeps compute resources within one network hop of each other on high speed rack switches.
    - For applications that require low latency, high network throughput, or both.
    - AWS recommends homogeneous instances with this group.
- Spread placement group:
    - Grouping of instances that are each placed on distinct hardware.
    - For applications that have critical instances that should be kept separate from each other.
    - Can be located in different AZ's of one region.
    - Allows to isolate the impact of hardware failure within application.
    - Allows to have a maximum of 7 running instances per AZ.
- Partitioned placement group:
    - Same as spread placement group but allows multiple instances (e.g. Hadoop cluster)
    - Divides each group into logical segments called partitions.
    - Each partition has its own set of racks.
    - Each rack has its own network and power sources.
    - No two partitions within a placement group share the same racks. 
    - Allows to isolate the impact of hardware failure within application.
- Only certain instances can be launched within each group.
- The specified name must be unique within the AWS account.
- Placement groups can't be merged.
- An existing instance can't be moved into a placement group.
    - Create an AMI from the existing instance, and then launch a new instance from the AMI into the placement group.

### Security groups

- For a new security group nothing is allowed in by default.
    - All inbound traffic is blocked by default.
    - All outbound traffic is allowed by default.
    - For the default security group everything is allowed though.
- Changes to security groups take effect immediately.
- Any number of EC2 instances can be within a security group.
- Any number of security groups can be attached to an EC2 instance.
- Security groups are STATEFUL: 
    - If creating an inbound rule allowing traffic in, that traffic is automatically allowed back out again.
    - IP addresses cannot be blocked using security groups.
    - Rules can only be allowed but not denied.
- Access control lists (ACL's) are STATELESS: 
    - One has to specify inbound and outbound rules.
    - IP addresses can be blocked using ACL's.