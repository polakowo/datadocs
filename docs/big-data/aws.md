---
id: aws
title: Amazon Web Services
sidebar_label: Amazon Web Services
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/aws.md
---

<img width=150 src="/datadocs/assets/1200px-Amazon_Web_Services_Logo.svg.png"/>

- [AWS This Week](https://acloud.guru/aws-this-week) is quick online coverage of breaking news and current headlines from AWS.

## Infrastructure

- Each region is a distinct location designed to provide high availability to a specific geography. 
    - Each region comprises at least two AZ's.
- An availability zone (AZ) is one or more discrete data centers.
    - Each with redundant power, networking and connectivity, housed in separate facilities.
- Edge locations are endpoints for AWS that are used for caching content (CloudFront).
    - The number of edge locations >> the number of AZ's >> the number of regions.
- A Virtual Private Cloud (VPC) is a virtual network dedicated to a single AWS account. 
    - It is logically isolated from other virtual networks in the AWS cloud, providing compute resources with security and robust networking functionality.

#### CloudFront

- A Content Delivery Network (CDN) is a system of distributed servers (network) that deliver webpages and other web content to a user based on the geographic locations of the user, the origin of the webpage, and a content delivery server.
    - Origin is the origin of all the files that the CDN will distribute.
    - Distribution is the name of the CDN that consists of a collection of edge locations.
    - Web distributions are typically used for websites.
    - RTMP is used for media streaming.
- Amazon CloudFront is a fast content delivery network (CDN) service.
    - Can deliver an entire website, including dynamic, static, streaming, and interactive content using a global network of edge locations.
    - Requests for the content are automatically routed to the nearest edge location, so the content is delivered with the best possible performance.
- Edge locations:
    - They are not just read-only, one can write to them too.
    - Objects are cached based on the TTL (time to live)
    - You can clear cached objects (i.e. invalidate them), but you will be charged.

## IAM

<img width=70 src="/datadocs/assets/aws-iam.svg"/>

- IAM allows to manage users and their level of access to the AWS console.
- IAM is universal and is not region-specific at this time.
- Identity access management (IAM) offers the following features:
    - Centralized control of the AWS account
    - Shared access to the account
    - Fine-grained access control to AWS resources
    - Identity federations (Facebook, Linkedin, etc.)
    - Multi-factor authentication
    - Provides temporary access for users/devices and services when necessary.
    - Allows to set up own password rotation policy.
- The "root account" is simply the account created with the AWS account.
- Users:
    - End users such as employees of an organization.
    - New users have no permissions by default.
    - To access the AWS management console, new users use the account and password combination. 
    - To access the AWS programmatically, they use the access key & secret access key combination.
    - Credentials can be viewed only once, thus save them in a secure location.
    - Set up multi-factor authentication (MFA) to the root account (easy with Google Authenticator)
    - Using SAML (Security Assertion Markup Language 2.0), you can give your federated users single sign-on (SSO) access to the AWS Management Console.
- Groups:
    - Groups are collections of users.
    - Each user inherits the permissions of the group.
- Policies:
    - A policy is a JSON document that provides formal statement of one or more permissions.
    - For example, allow user to access of all AWS services except the IAM service (power user)
    - Configure users and policy documents only once, as these are applied globally.
- Roles:
    - Give permissions to AWS services to use other AWS services.
- Tips:
    - Enact a strong password policy: user passwords must be changed every 45 days, with each password containing a combination of capital letters, lower case letters, numbers, and special symbols.

## S3

<img width=150 src="/datadocs/assets/AmazonS3.png"/>

- S3 provides developers and IT teams with secure, durable, highly-scalable object storage.
- Amazon Simple Storage Service (S3) is easy to use, with a simple web services interface to store and retrieve any amount of data from anywhere on the web.
- Just a safe place to store flat files of any size (from 0 Bytes):
    - Key is the name of the object.
    - Value is the data, and is made up of a sequence of bytes.
    - Version ID is used for versioning.
    - Metadata is the structured description of the object.
- It is an object-oriented storage:
    - Allows uploading files (HTTP 200 status code for success)
    - Not suitable to install an operating system or databases on (you need block-based storage then)
- The data is spread across multiple devices and facilities.
- Files are stored in buckets (i.e. folders)
    - S3 is a universal namespace, that is, the bucket names must be unique globally. The URL of the bucket depends on the region though, for example `https://s3-eu-west-1.amazonaws.com/somebucket`
    - By default, all newly created buckets are private.
    - One can set up access control using Bucket Policies or Access Control Lists.
    - One can configure to create access logs that log all requests made to this bucket.
    - One has 100 S3 buckets per account by default.
- S3 puts the limit of 3500 PUTs per second.
- Charges:
    - Storage
    - Requests
    - Storage management pricing
    - Data transfer pricing
    - Transfer acceleration
    - Cross-region replication
- Tips:
    - "Your proposed upload exceeds the maximum allowed object size": design the application to use the Multipart Upload API for all objects.
    - Read the [S3 FAQs](https://aws.amazon.com/s3/faqs/)

#### Features

- Data consistency:
    - Read after write consistency for newly created files (available immediately)
    - Eventual consistency for overwrite PUT's and DELETE's (can take some time to propagate)
- Guarantees:
    - Built for 99.99% availability.
    - Guarantees 99.9999999999% (11 9's) durability.
- Encryption:
    - Encryption in transit is achieved by SSL/TLS (HTTPS)
    - Encryption at rest is achieved (server side) by S3 Managed Keys (SSE-S3), AWS Key Management Service (SSE-KMS), or Server Side Encryption With Customer Provided Keys (SSE-C).
    - One can also encrypt the file on client side and upload it.
- Versioning:
    - Stores all versions of an object (including all writes and even deletes)
    - Great as a backup tool.
    - Once enabled, versioning cannot be disabled, only suspended.
    - Integrates with Lifecycle rules (to expire old objects)
    - Versioning's MFA Delete capability provides additional layer of security.
    - Newly uploaded versions are automatically made private.
- Lifecycle management:
    - Automates moving objects between the different storage tiers (e.g. archive after 30 days)
    - Can be used in conjunction with versioning.
    - Can be applied to current and previous versions.
- Cross-region replication:
    - Replicates changes from any source bucket to one or more destination buckets.
    - Versioning must be enabled on all buckets.
    - Regions must be different for all buckets.
    - Destination buckets will have the same permissions as the source after setup.
    - Files at the time of setup are not replicated automatically, only subsequent updates.
    - Deleting versions or delete markers are not replicated (for security)
- Transfer acceleration:
    - Enables fast, easy, and secure transfers of files over long distances. 
    - As the data arrives at an edge location, data is routed to S3 over an optimized network path.
    - Takes advantage of Amazon CloudFront's globally distributed edge locations. 
    - [Amazon S3 Transfer Acceleration - Speed Comparison](https://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html)

#### Storage classes

- S3 Standard: 
    - Stored redundantly across multiple devices in multiple facilities, and is designed to sustain the loss of 2 facilities concurrently.
- S3 IA (Infrequently Accessed): 
    - For data that is accessed less frequently, but requires rapid access when needed. 
    - Lower fee than S3, but you are charged a retrieval fee.
    - There can be cost implications if you use it frequently or use it for short lived storage.
    - The availability is 99.99%
- S3 OneZone-IA: 
    - Only stored in one availability zone.
    - The availability is 99.50%
- S3 Intelligent Tiering: 
    - Designed to optimize costs by automatically moving data to the most cost-effective access tier, without performance impact or operational overhead. Uses machine learning.
- S3 Glacier: 
    - Designed for long-term data archival. 
    - Glacier is cheaper, but has a long retrieval time (configurable from minutes to hours)
    - You can reliably store any amount of data at costs that are competitive with or cheaper than on-premises solutions.
- S3 Glacier Deep Archive: 
    - Amazon S3's lowest-cost storage class where a retrieval time of 12 hours is acceptable.
- RRS (Reduced Redundancy Storage):
    - RRS has effectively been deprecated.
- [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)

### Data transfer

#### Storage Gateway

- AWS Storage Gateway is a service that connects an on-premises software appliance with cloud-based storage to provide seamless and secure integration between an organization's on-premises IT environment and AWS's storage infrastructure.
- At its heart it is a way of using AWS S3 managed storage to supplement on-premise storage. 
    - It is a physical or virtual appliance that can be used to cache S3 locally.
    - Available for download as a virtual machine (VM) image that install on a host in the datacenter.
    - Support either VMware ESXi or Microsoft Hyper-V.
    - It can also be used within a VPC in a similar way.
- File Gateway (NFS & SMB):
    - Flat files are stored as objects in S3 bucket, accessed through a NFS mount point.
    - Ownership, permissions, and timestamps are durably stored in S3 in the metadata.
- Volume Gateway (iSCSI):
    - The volume interface presents applications with disk volumes using the iSCSI block protocol.
    - Data is asynchronously backed up as point-in-time snapshots and stored as Amazon EBS snapshots.
    - Snapshots are incremental backups that capture only changed blocks (and compressed)
    - Stored Volumes: Entire dataset is stored on site and is asynchronously backed up to S3.
    - Cached Volumes: Entire dataset is stored on S3 and the most frequently accessed data is cached on site.
- Gateway Virtual Tape Library (VTL):
    - A durable, cost-effective solution to archive tape data.
    - Stores data on virtual tape cartridges that are created on tape gateway.
    - Supported by NetBackup, Backup Exec, Veeam.

#### Snowball

- Snowball is a petabyte-scale data transport solution.
    - Uses secure appliances to transfer large amounts of data and out of AWS. 
    - Addresses challenges such as high network costs, long transfer times, and security concerns. 
    - Transferring data with Snowball can be as little as one-fifth the cost of high speed internet.
    - Comes in either a 50TB or 80TB size. 
    - Uses multiple layers of security including tamper-resistant enclosures, 256-bit encryption, and an industry-standard Trusted Platform Module (TPM) designed to ensure both security and full chain-of-custody of data. 
    - Once the data transfer job has been processed and verified, AWS performs a software erase.

<img width=200 src="/datadocs/assets/az.0.0.jpg"/>
<center><a href="https://www.theverge.com/2015/10/7/9471381/amazon-snowball-data-transfer-device" class="credit">Credit</a></center>

- AWS Snowball Edge is a 100TB data transfer device with on-board storage and compute capabilities. 
    - Can be used to move large amounts of data into and out of AWS, as a temporary storage tier for large local datasets, and to support local workloads in remote or offline locations.
    - Connects to existing applications and infrastructure.
    - Can cluster together to form a local storage tier and process data on-premises, helping ensure your applications continue to run even when they are not able to access to cloud.
- AWS Snowmobile is an Exabyte-scale data transfer service. 
    - One can transfer up to 100PB per Snowmobile, a 45-foot long ruggedized shipping container. 
    - For video libraries, image repositories, or even a complete data center migration.
- [When to use Snowball](https://aws.amazon.com/snowball/faqs/#When_to_use_Snowball)

<img width=300 src="/datadocs/assets/maxresdefault copy.jpg"/>
<center><a href="https://www.youtube.com/watch?v=b7f2V7ecgh8" class="credit">Credit</a></center>

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

## CloudWatch

<img width=100 src="/datadocs/assets/cloudwatch.png"/>

- Amazon CloudWatch is a monitoring service for AWS resources and applications.
    - CloudWatch can monitor most of the AWS.
- Dashboards:
    - Creates dashboards to see what is happing in the AWS environment.
    - Can be global or regional.
- Alarms:
    - Set alarms to notify you when particular thresholds have been hit.
- Events:
    - Helps you to respond to state changes in AWS resources.
- Logs:
    - Helps you to aggregate, monitor and store logs.
- Watching compute instances:
    - Host level checks metrics include CPU, network, disk and status check.
    - Standard monitoring = 5 minutes (default)
    - Detailed monitoring = 1 minute (additional costs may apply)
    - Allows creating performance alarms that trigger notifications.
- Compared to AWS CloudTrail:
    - CloudTrail monitors AWS Management Console actions and API calls.
    - CloudTrail records users who called AWS services, their IP addresses, and timestamps.
    - CloudWatch is used for monitoring performance, while CloudTrail is used for auditing.

## Databases

### RDS (OLTP)

<img width=100 src="/datadocs/assets/BM-AWS-RDS-post-icon.png"/>

- Amazon Relational Database Service (Amazon RDS) makes it easy to set up, operate, and scale a relational database in the cloud.
- Can be optimized for memory, performance or I/O
    - Use IOPS for OLTP in production environment.
    - To increase the number of IOPS available to a MySQL database on the root volume of an EC2 instance, add (at minimum) 4 additional EBS SSD volumes and create a RAID 10 using these volumes.
- Supports six familiar database engines: SQL Server, MySQL Server, PostgreSQL, Aurora, MariaDB.
- Microsoft SQL Server database engine can have the maximum size of 16TB.
- MySQL installations default to port number 3306.
    - The RDS instance port number is automatically applied to the RDS DB Security Group.
- RDS runs on virtual machines.
    - You cannot RDP or SSH into an RDS instance however.
    - Patching of the RDS operating system and DB is Amazon's responsibility.
    - RDS is not server-less (with exception of Aurora)
- Encryption:
    - Encryption at rest is done using the AWS KMS service.
    - RDS's storage, automated backups, read replicas, and snapshots are encrypted as well.

#### Multi-AZ

- Allows you to have an exact copy of your production database in another AZ.
- Writes to the production database are automatically synchronized to the standby database.
- In case of planned database maintenance, instance failure, or an AZ failure, Amazon RDS will automatically failover to the standby without any administrative intervention.
- You can force a failover from one AZ to another by rebooting the RDS instance.
- Used primarily for disaster recovery (DR), not for improving performance.
- Available for all databases except Aurora (it is completely fault-tolerant by default)
- RDS Reserved instances are also available for Multi-AZ deployments.

#### Read replica

- Allows you to have a read-only copy of your production database.
- This is achieved by using asynchronous replication.
    - There is no charge associated with data transfer.
- Used primarily for very read-heavy database workloads.
- Must have automatic backups turned on.
- Up to 5 read replicas can be created.
    - Can be created from another read replicas (but watch out for latency)
    - Can be created from a Multi-AZ database.
    - Can be created in another region.
- Has its own DNS endpoint.
- Can be Multi-AZ.
- Can be promoted to be its own database.

#### Backups

- Automated backups: 
    - Recover the database to any point in time within a "retention period".
    - The retention period can be within one and 35 days.
    - Takes a full daily snapshot and also stores transaction logs throughout the day.
    - Recovery: Chooses the most recent backup and then applies transaction logs.
    - With new RDS DB instances, automated backups are enabled by default.
    - The backup data is stored in S3 and the storage is free (= the size of DB)
    - Backups are taken within a specified time window.
- Database snapshots:
    - Done manually (i.e. user initiated)
    - They are stored even after you delete the original RDS instance, unlike automated backups.
    - One can take a final snapshot before deleting the RDB.
- The restored version of the database with be a new RDS instance with a new DNS endpoint.
    - `original.us-east-1.rds.amazonaws.com` to `restored.us-east-1.rds.amazonaws.com`
- During a database snapshot or backup, I/O may be briefly suspended while the backup process initializes (typically under a few seconds), and you may experience a brief period of elevated latency.
- In RDS, changes to the backup window take effect immediately.

### Aurora (Serverless, OLTP)

<img width=100 src="/datadocs/assets/BM-AWS-RDS-post-icon.png"/>

- Amazon Aurora is a MySQL-compatible relational database management system (RDBMS) that combines the speed and availability of high-end commercial databases with the simplicity and cost-effectiveness of open source databases.
- Up to five times better performance than MySQL at a price point one tenth that of a commercial RDBMS.
- Built from scratch by Amazon.
- Starts with 10GB and auto-scales in 10GB increments to 64TB.
- Computes resources can scale up to 34vCPUs and 244GB of memory.
- Maintains a total of 6 copies of data: 2 copies in each AZ with minimum of 3 AZ's.
    - Thus, Aurora is available only in regions with minimum of 3 AZ's.
    - Designed to transparently handle the loss of up to two copies of data without affecting write availability and up to three copies without affecting read availability.
- Aurora storage is self-healing:
    - Data blocks and disks are continuously scanned for errors and repaired automatically.
- Two types of replicas available:
    - Aurora replicas with automatic failover (currently 15)
    - MySQL read replicas (currently 5)
- Backups:
    - Automatic backups are always enabled.
    - Backups do not impact database performance.
    - You can take snapshots, also without impacting database performance.
    - You can share Aurora snapshots with other AWS accounts.
- A MySQL database can be migrated to Aurora by creating an Aurora replica and then promoting it, or creating a snapshot and then restoring from it.

### DynamoDB (NoSQL)

<img width=100 src="/datadocs/assets/220px-DynamoDB.png"/>

- Amazon DynamoDB is a fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale. 
- It is a fully managed database and supports both document and key-value data models.
- Great fit for mobile, web, gaming, ad-tech, IoT, and many other applications.
- Stored on SSD storage.
- Spread across 3 geographically distinct data centers.
- Eventual consistent reads:
    - The response might not reflect the results of a recently completed write operation.
    - If you repeat your read request after a short time, the response should return the latest data.
- Strongly consistent reads:
    - DynamoDB returns a response with the most up-to-date data.
    - For example, for a financial algorithm of life critical systems or a booking system.
    - A strongly consistent read might not be available if there is a network delay or outage.

### Redshift (DWH)

<img width=100 src="/datadocs/assets/aws-redshift-logo.svg"/>

- Data warehouses:
    - Used for business intelligence (tools such as SAP NetWeaver)
    - Used to pull in very large and complex datasets.
    - Usually used by management to do queries on data (such as current performance)
- Amazon's data warehouse solution is called Redshift.
- Redshift is a fast and powerful, fully managed, petabyte-scale data warehouse service.
- Can be configured as follows:
    - Single node (160GB)
    - Multi-node: Leader node that manages client connections and receives queries, and compute node that stores data and performs queries and computations. Up to 128 compute nodes are permitted.
- Employs multiple compression techniques.
    - When loading data into Redshift, it automatically samples the data and select the most appropriate compression scheme.
- Massively Parallel Processing (MPP):
    - Automatically distributes data and query load across all nodes.
    - Redshift makes it easy to add nodes and enables you to maintain fast query performance.
- Doesn't require indexes or materialized views, and so uses less space.
- Backups:
    - Enabled by default with a 1 day retention period.
    - Maximum retention period is 35 days.
    - Always attempts to maintain at least three copies of data (the original and replica on the compute nodes and a backup in S3)
    - Can asynchronously replicate snapshots to S3 in another region for disaster recovery.
- Priced as follows:
    - Compute node hours (1 unit per node per hour), but not charged for leader node hours.
    - Data transfer (only within a VPC, not outside it)
    - Backups
- Encryption:
    - Encrypted in transit using SSL.
    - Encrypted at rest using AES-256 encryption.
    - By default Redshift takes care of key management.
    - But you can manage your keys using HSM or AWS KMS.
- Availability:
    - Currently available in one AZ.
    - Can restore snapshots to new AZ in the event of an outage.

### ElastiCache

<img width=100 src="/datadocs/assets/elasticache-logo.png"/>

- ElastiCache is a web service to deploy, operate, and scale in-memory cache in the cloud.
- Improves performance of web applications by allowing to retrieve information from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases.
- Supports two open-source in-memory caching engines: Memcached and Redis.
    - For a simple cache to offload DB, use Memcached.
    - For a cache with more advanced capabilities (Multi-AZ, backups), use Redis.

## Routing

### DNS

- The Domain Name Systems (DNS) is the phonebook of the Internet.
    - Converts a hostname (`www.example.com`) into a computer-friendly IP address (`192.168.1.1`)
- The DNS recursor is a server designed to receive queries from client machines.
    - Makes a series of requests until it reaches the authoritative DNS nameserver.
    - Cached either locally inside the querying computer or remotely in the DNS infrastructure.
    - Examples include Google DNS, OpenDNS, and providers like Comcast.
- Root nameserver responds to the resolver with the address of a TLD server (such as `.com` or `.net`)
- Top Level Domain (TLD) nameserver stores the information for its domains.
    - The TLD server responds with the IP address of the domain’s nameserver (`example.com`)
    - The top-level domain (TLD) names (e.g. `.com`) are controlled by the Internet Assigned Numbers Authority (IANA) in a root zone database, which is essentially a database of all available TLD names.
    - The database can be viewed under [https://www.iana.org/domains/root/db](https://www.iana.org/domains/root/db)
- Authoritative nameserver is a server that actually holds, and is responsible for, DNS resource records.
    - This is the server at the bottom of the DNS lookup chain.
    - Can satisfy queries from its own data without needing to query another source.
    - But requires an additional nameserver for serving queries for a subdomain (`blog.cloudflare.com`)
- A registrar is an authority that can assign domain names under one or multiple TLD's.
    - This domains are registered with InterNIC, a service of ICANN, which enforces uniqueness of domain names across the Internet.
    - Each domain name becomes registered in a central database known as the WhoIS database.
    - For example, Amazon, `GoDaddy.com`

<img width=500 src="/datadocs/assets/1354-1.jpg"/>
<center><a href="http://www.itgeared.com/articles/1354-domain-name-system-dns-tutorial-overview/" class="credit">Credit</a></center>

#### Records

- The State of Authority Record (SOA) stores information about:
    - The name of the server that supplied the data for the zone.
    - The administrator of the zone.
    - The current version of the data file.
    - The default number of seconds for the TTL file on resource records.
    - When any record in the zone is updated, the SOA record serial number is incremented.
- The Name Server (NS) record is used for recursively resolving the required domain name.
    - Used to redirect the resolver to the DNS server hosting the next level domain.
- The A record maps a name to one or more IP addresses.
    - The "A" stands for address.
    - Use an A record if you manage which IP addresses are assigned to a particular machine, or if the IP are fixed (this is the most common case).
- The Canonical Name (CNAME) record maps a name to another name.
    - Use a CNAME record if you want to alias one name to another name, and you don’t need other records (such as MX records for emails) for the same name.
    - Can be used to map two domain names to the same IP address.
    - Should only be used when there are no other records on that name.
- The ALIAS record maps a name to another name, but can coexist with other records on that name.
    - Use an ALIAS record if you’re trying to alias the root domain (apex zone), or if you need other records for the same name.
    - Given the choice, always choose an ALIAS record over a CNAME.
- The MX record is used for emails.
- The PTR record is used to lookup the domain name of an IP address (also called reversed A record)
- The duration that the DNS record is cached (on Resolving Server or user PC) is TTL in seconds.
    - The default is 48 hours, that is, a DNS change may need 48 hours to fully propagate.

### Route 53

<img width=100 src="/datadocs/assets/1*Ezs2-Kqjlo7mPczPv_q_gA.png"/>

- Route 53 is Amazon's DNS Service.
- Route 53 is named so because the DNS port is 53.
- You can buy domain names directly with AWS.
    - Can take up to 3 days to register.
    - There is a default limit of 50 domain names. However, this limit can be increased by contacting the AWS support.
- Health checks:
    - You can set health checks on individual record sets.
    - If a record set fails a health check, it will be removed until it passes the check.
    - You can also set up SNS notifications to be notified about any failed health checks.

#### Routing policies

- Simple routing:
    - One record with multiple IP addresses.
    - If multiple values are specified, Route 53 returns them in random order.
    - For example, the user can be redirected to Ohio and the next time to Sydney (after TTL expires)
    - Cannot be associated with health checks.
- Weighted routing:
    - Allows you to split your traffic based on different weights assigned.
    - For example, you can set 10% of traffic to go to US-EAST-1 and 90% to EU-WEST-1.
- Latency-based routing:
    - Routes traffic based on the lowest network latency for the end user.
    - To use it, create a latency RRset for the AWS resource in each region it is hosted.
    - Use VPN clients (such as NordVPN) to test the service.
- Failover routing:
    - Used when you want to create an active/passive setup.
    - For example, when your primary server is in US-EAST-1 and secondary in EU-WEST-1.
    - Route 53 will monitor the health of the primary server using a health check.
- Geolocation routing:
    - Routes traffic based on the geolocation of the end user.
    - For example, route all queries from Europe to a fleet of EC2 instances in EU-WEST-1. These servers may have the local language of European customers and all price are displayed in Euros.
    - Not to be confused with latency-based routing.
- Geoproximity routing (traffic flow only):
    - Routes traffic based on the geolocation of the end user and the resource.
    - You can also specify to route more traffic or less to a given resource by specifying a value (bias)
    - A bias expands or shrinks the size of the geographic region from which traffic is routed.
    - To use it, you must use Route 53 traffic flow.
- Multivalue Answer routing:
    - Lets configure Route 53 to return multiple IP addresses in response to DNS queries.
    - Compared to simple routing, allows health checks and returns only values for healthy resources.
    - The choice of which to use is left to the requesting service effectively creating a form or randomization.

## VPC

<img width=150 src="/datadocs/assets/0*0q474CHdkubW1ZA-.jpg"/>

- Amazon Virtual Private Cloud (Amazon VPC) lets you provision a logically isolated section of the AWS where you can launch AWS resources in a virtual network that you define.
    - Think of VPC as a logical datacenter on AWS.
- You have complete control over your network environment, including selection of your IP address range, creation of subnets, and configuration of route tables and network gateways.
    - For example, create a public-facing subnet (`10.0.1.0/24`) for web servers and private-facing subnet (`10.0.2.0/24`) for databases.
- Allows creation of a hardware VPN connection between private datacenters and Amazon VPC.
- Consists of Virtual Private Gateways (VPG's), route tables, ACL's, and security groups.
- Classless Inter-Domain Routing (CIDR) blocks:
    - Some private IP address ranges include `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`
    - To translate an IP address with prefix (`192.64.0.0/14`), convert the prefix into the bitmask (14 bits from left is `11111111.11111100.00000000.00000000`), then into the decimal subnet mask (`255.252.0.0`), then into the wildcard (remaining `0.3.255.255`), and finally add the prefix to the IP address (the first available host is `192.64.0.1`, the last `192.67.255.254`)
    - [AN INTERACTIVE IP ADDRESS AND CIDR RANGE VISUALIZER](http://cidr.xyz)
    - The largest prefix Amazon allows is 16, the smallest is 28.
    - Amazon always reserves 5 IP addresses within each subnet for own use.
- Default VPC:
    - User friendly, allowing to immediately deploy instances.
    - Your default VPC includes a subnet per AZ, an internet gateway (each default subnet is a public subnet), a route table with the route to the internet gateway, a default NACL that allows everything, and a default security group that also allows everything. Each EC2 instance created under a subnet of this VPC has both a private and public IP address.
    - If you do delete the default VPC, it will remove any network objects associated with it. But you can recover it now.
- VPC Peering:
    - Connect one VPC with another via a direct network route using private IP addresses.
    - Instances behave as they are on the same private network.
    - You can peer VPC's with VPC's in another regions or even AWS accounts.
    - Peering is a star configuration: 1 central VPC peers with 4 others. No transitive peering! In case A->B, B->C, you must explicitly establish a connection between A and C.

#### Concepts

- Inside a region, we have our VPC. On the outside of the VPC, we have two ways to connecting to it: Internet Gateway and Virtual Private Gateway. The traffic from an Internet gateway is routed to the appropriate subnet using the routes in the routing table. The rules of the network ACL associated with the subnet control which traffic is allowed to the subnet. The rules of the security group associated with an instance control which traffic is allowed to the instance.
- A virtual private cloud (VPC) is a virtual network dedicated to your AWS account.
- A subnet is a range of IP addresses in your VPC.
    - To protect the AWS resources in each subnet, you can use multiple layers of security, including security groups and ACL.
    - Subnets cannot span multiple AZ's.
- A route table contains a set of rules (routes) that are used to determine where network traffic is directed.
    - The route table entries enable instances in the subnet to communicate with other instances in the VPC (also in other subnets), and to communicate directly over the Internet.
    - Every time we create a subnet, it will be automatically associated with the main route table.
    - Thus, create a separate, custom route table for any public subnets.
- An internet gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet. 
    - It therefore imposes no availability risks or bandwidth constraints on your network traffic.
    - A subnet that's associated with a route table that has a route to an Internet gateway is known as a public subnet.
    - You can only attach one internet gateway per VPC.
- Network ACLs act as a firewall for associated subnets:
    - Think of Homeland Security.
    - Operates at the subnet level.
    - Supports allow rules and deny rules.
    - Is stateless: Return traffic must be explicitly allowed by rules.
    - Automatically applies to all instances in the subnets it's associated with (therefore, an additional layer of defense if the security group rules are too permissive)
- Security groups act as a firewall for associated Amazon EC2 instances:
    - Think of local law enforcement.
    - Operates at the instance level.
    - Supports allow rules only.
    - Is stateful: Return traffic is automatically allowed, regardless of any rules.
    - By default, security groups do not have access to each other.

<img width=500 src="/datadocs/assets/security-diagram.png"/>
<center><a href="https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html" class="credit">Credit</a></center>

#### Create VPC with public/private subnets

- Create a new VPC (`10.0.0.0/16`). When you create a custom VPC, a default route table, a default ACL, and a default VPC security group are created. It won't create any subnets, nor it will create an internet gateway.
- Create two subnets under this VPC. Assign custom IP address ranges in each subnet: `10.0.1.0/24` for public and `10.0.2.0/24` for private. Select the AZ for each one (Keep in mind: An AZ in one AWS account can be different from the same AZ in a different AWS account, since they are randomized). For the public one, turn on "Auto-assign IPv4".
- Create an internet gateway and attach it to the VPC.
- Configure route tables between subnets. Since the created subnets are associated with the main route table by default, create a new route table and add the `0.0.0.0/0` route to the internet gateway created earlier. Associate then the public subnet `10.0.1.0/24` with this table.
- Go over to the AWS resources, and create them under the corresponding subnets.
- Specify the appropriate security groups for your resources for them to communicate.

<img width=600 src="/datadocs/assets/internet-gateway-diagram.png"/>
<center><a href="https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html" class="credit">Credit</a></center>

### NAT

<img width=100 src="/datadocs/assets/27_vpc-nat-gateway.aac10e8c0d.svg"/>

- You can use a network address translation (NAT) gateway to enable instances in a private subnet to connect to the internet or other AWS services, but prevent the internet from initiating a connection with those instances.
    - For example, this can be used to do software updates in private subnets.
- NAT instances (outdated):
    - A NAT instance is acting as a bridge between subnets and the internet gateway.
    - To set it up, create a NAT instance, and in the route table of the subnet where your EC2 instance is located, enter a route to this NAT instance to direct the internet traffic through this instance.
    - Must be in a public subnet and source/destination checks must be disabled.
    - The amount of traffic that this instance can support depends on its size.
    - A massive bottleneck: A single VM, which can be easily overwhelmed. You can create HA using Autoscaling Groups, multiple subnets in different AZ's, and a script to automate failover.
    - When the instance is removed, the corresponding route is marked as "blackhole"
    - Behind the security group.
- NAT Gateways (preferred):
    - Redundant in the AZ and thus highly available.
    - Starts at 5Gbps and scales currently to 45Gbps.
    - There is no need to patch operation system.
    - Not associated with any security groups.
    - Automatically assigned a public IP address.
    - Remember to update your route tables.
    - Uses ephemeral ports 1024-65535.

### NACL

<img width=100 src="/datadocs/assets/41_network-access-control-list.d577137fe9.svg"/>

- NACL's have separate inbound and outbound rules, and each rule can either allow or deny traffic.
- Your VPC automatically comes with a default network ACL that allows everything.
- When creating a new NACL, all inbound and outbound rules are denied by default.
- Each subnet in the VPC must be associated with a network ACL.
    - If you don't explicitly associate a subnet with a NACL, the subnet is automatically associated with the default NACL.
    - You can associate a NACL with multiple subnets.
    - However, a subnet can only be associated with a single NACL at a time.
    - When you associate a subnet with a new NACL, starting with the lowest numbered rule.
- Amazon recommends that you use increments of 100 for each rule (and of 1 for IPv4 and IPv6)
    - The rules are evaluated in numerical order, from the lowest to the highest.
    - For example, if you allow port 80 in the rule "100" and disable it in the rule "200", the port will still be open. That's also why everything under the rule "*" is denied at the end.

### ELB

- Do not have pre-defined IPv4 addresses; you can resolve to them using a DNS name.

### ELB

### ELB

### ELB

### ELB