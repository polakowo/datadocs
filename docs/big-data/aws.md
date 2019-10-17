---
id: aws
title: Amazon Web Services
sidebar_label: Amazon Web Services
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/aws.md
---

<img width=150 src="/datadocs/assets/1200px-Amazon_Web_Services_Logo.svg.png"/>

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

<img width=200 src="/datadocs/assets/What-is-IAM-in-AWS-and-How-to-Create-user-in-IAM.png"/>

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

<img width=200 src="/datadocs/assets/az.0.0.jpg"/>
<center><a href="https://www.theverge.com/2015/10/7/9471381/amazon-snowball-data-transfer-device" class="credit">Credit</a></center>

- Snowball is a petabyte-scale data transport solution.
    - Uses secure appliances to transfer large amounts of data and out of AWS. 
    - Addresses challenges such as high network costs, long transfer times, and security concerns. 
    - Transferring data with Snowball can be as little as one-fifth the cost of high speed internet.
    - Comes in either a 50TB or 80TB size. 
    - Uses multiple layers of security including tamper-resistant enclosures, 256-bit encryption, and an industry-standard Trusted Platform Module (TPM) designed to ensure both security and full chain-of-custody of data. 
    - Once the data transfer job has been processed and verified, AWS performs a software erase.
- AWS Snowball Edge is a 100TB data transfer device with on-board storage and compute capabilities. 
    - Can be used to move large amounts of data into and out of AWS, as a temporary storage tier for large local datasets, and to support local workloads in remote or offline locations.
    - Connects to existing applications and infrastructure.
    - Can cluster together to form a local storage tier and process data on-premises, helping ensure your applications continue to run even when they are not able to access to cloud.

<img width=250 src="/datadocs/assets/amazon-snowmobile-truck-aws-3.jpg"/>
<center><a href="https://twistedsifter.com/2017/05/amazon-aws-data-transfer-cloud-truck-snowmobile/" class="credit">Credit</a></center>

- AWS Snowmobile is an Exabyte-scale data transfer service. 
    - One can transfer up to 100PB per Snowmobile, a 45-foot long ruggedized shipping container. 
    - For video libraries, image repositories, or even a complete data center migration.
- [When to use Snowball](https://aws.amazon.com/snowball/faqs/#When_to_use_Snowball)

## EC2

<img width=100 src="/datadocs/assets/icon-aws-amazon-ec2.svg"/>

- Amazon Elastic Compute Cloud (EC2) is a web service that provides resizable compute capacity.
- Reduces the time required to obtain and boot new server instances (from days) to minutes.
    - A huge side-effect of both of these: it’s way easier to innovate.
- Allows quickly scaling capacity, both up and down, as requirements change.
- Pay as you go, pay for what you use, and pay even less for reserved instances.
- Instance termination:
    - Termination protection is turned off by default.
    - The default action is for the root EBS volume to be deleted when the instance is terminated.
- Security groups:
    - All inbound traffic is blocked by default.
    - All outbound traffic is allowed by default.
    - Changes to security groups take effect immediately.
    - Any number of EC2 instances can be within a security group.
    - Any number of security groups can be attached to an EC2 instance.
    - Security groups are stateful: If creating an inbound rule allowing traffic in, that traffic is automatically allowed back out again.
    - IP addresses cannot be blocked using security groups, instead use Network Access Control Lists.
    - Rules can only be allowed by not denied.

#### Pricing

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

#### Instance types

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
