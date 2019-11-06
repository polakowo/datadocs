---
id: aws-storage
title: Storage
sidebar_label: Storage
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws-storage.md
---

- For frequently has multiple reads and writes use EBS or EFS.
- Use S3 is for object storage, not applications.
- Glacier is for data archiving.
- [AWS Storage Types - S3, EFS, & EBS](https://help.acloud.guru/hc/en-us/articles/115002011194)
- [Amazon S3 vs Amazon EBS vs Amazon EFS](https://tutorialsdojo.com/aws-cheat-sheet-amazon-s3-vs-ebs-vs-efs/)

## S3

<img width=100 src="/datadocs/assets/6_amazon-s3.9252c96dc6.svg"/>

- Amazon Simple Storage Service (S3) is easy to use, with a simple web services interface to store and retrieve any amount of data from anywhere on the web.
- S3 provides developers and IT teams with secure, durable, highly-scalable object storage.
- A safe place to store flat files of any size (from 0 Bytes to 5 TB)
- It is an object-oriented storage:
    - Allows uploading files (HTTP 200 status code for success)
    - Not suitable to install an operating system or databases on (you will need a block-based storage)
- Object properties:
    - Key is the name of the object.
    - Value is the data, and is made up of a sequence of bytes.
    - Version ID is used for versioning.
    - Metadata is the structured description of the object.
- Objects are stored in buckets (i.e. folders)
    - S3 is a universal namespace, that is, the bucket names must be unique globally. The URL of the bucket depends on the region though, for example `https://s3-eu-west-1.amazonaws.com/somebucket`
    - By default, all newly created buckets are private.
    - One can set up access control using Bucket Policies or Access Control Lists.
    - One can configure to create access logs that log all requests made to this bucket.
    - One has 100 S3 buckets per account by default.
- Charges:
    - Storage
    - Requests
    - Storage management pricing
    - Data transfer pricing
    - Transfer acceleration
    - Cross-region replication
- Limitations:
    - S3 puts the limit of 3500 PUTs per second.
    - The largest object that can be uploaded in a single PUT is 5GB.
    - If you are using the multipart upload API, then the limit is 5TB.
- [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)
- [Amazon S3 Cheat Sheet](https://tutorialsdojo.com/aws-cheat-sheet-amazon-s3/)

### Features

- Data consistency:
    - Read after write consistency for newly created files (available immediately)
    - Eventual consistency for overwrite PUT's and DELETE's (can take some time to propagate)
- Guarantees:
    - Built for 99.99% availability.
    - Guarantees 99.9999999999% (11 9's) durability.
    - The data is automatically spread across multiple devices and facilities.
- Versioning:
    - Stores all versions of an object (including all writes and even deletes)
    - Great as a backup tool.
    - With versioning, you can easily recover from both unintended user actions and application failures.
    - Once enabled, versioning cannot be disabled, only suspended (preserves earlier versions)
    - Integrates with Lifecycle rules (to expire old objects)
    - Versioning's MFA Delete capability provides additional layer of security.
    - Newly uploaded versions are automatically made private.
    - To restore an accidentally deleted object, simply remove the delete marker.
    - [Using Versioning](https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html)

<img width=500 src="/datadocs/assets/c-users-chandr1-appdata-local-temp-snaghtml4e67c.png"/>
<center><a href="https://cloudaffaire.com/versioning-in-s3/" class="credit">Credit</a></center>

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

<img width=500 src="/datadocs/assets/transfer-acceleration.png"/>
<center><a href="https://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html" class="credit">Credit</a></center>

- Multipart Upload API:
    - For cases when your proposed upload exceeds the maximum allowed object size (>100MB)
    - Quick recovery from any network issues.
    - Begin an upload before you know the final object size.
    - Improved throughput - You can upload parts in parallel to improve throughput.
    - Pause and resume object uploads.
- A notification feature enables you to receive notifications when certain events happen in a bucket.
    - The following destinations are supported: SNS topic, SQS queue, and Lambda.
- S3 Select:
    - With Amazon S3 Select, you can use simple structured query language (SQL) statements to filter the contents of Amazon S3 objects and retrieve just the subset of data that you need. 
    - You can thus reduce the amount of data that Amazon S3 transfers.
    - Works on objects stored in CSV, JSON, or Apache Parquet format.

#### Lifecycle management

- Automates moving objects between the different storage tiers (e.g. archive after 30 days)
- Can be used in conjunction with versioning.
- Can be applied to current and previous versions.
- Two types of actions:
    - Transition actions: In which you define when objects transition to another storage class.
    - Expiration actions: In which you specify when the objects expire.
- Setting up a lifecycle rule:
    - A prefix to specify which objects in the bucket are subject to the policy.
    - A relative or absolute time specifier and a time period for transitioning objects to Glacier.
    - An object age at which the object will be deleted from S3.
- Life-cycle management and Infrequent Access storage is available for both S3 and EFS. A restriction however is that 'Using Amazon EFS with Microsoft Windows is not supported'. File Gateway does not support iSCSI in the client side.
- [Object Lifecycle Management](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html)

<img width=550 src="/datadocs/assets/2018-11-12_21-01-50-8e238b3286aa6c7c72f18b468ce19ead.png"/>
<center><a href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-amazon-practice-exams/" class="credit">Credit</a></center>

### Security

- All objects are private by default. You must open access to each object explicitly.
- Use Signed URLs to grant time-limited permission to download the object.
- Public S3 buckets should never be used unless you are using the bucket to host a public website.
- There are two ways of securing S3, using either Access Control Lists (Permissions) or by using bucket Policies.
- By using Versioning and enabling MFA (Multi-Factor Authentication) Delete, you can secure and recover your S3 objects from accidental deletion or overwrite. 

<img width=700 src="/datadocs/assets/bucket_policies_defense_s3.43e6c93a095f2f55b33b30276f4782ab9ec79f47.png"/>
<center><a href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-amazon-practice-exams/" class="credit">Credit</a></center>

#### Encryption

- Encryption in transit is achieved by SSL/TLS (HTTPS)
- [Protecting Data Using Encryption](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingEncryption.html)
- Server-side encryption is the encryption of data at its S3 destination.
    - Use Server Side Encryption (SSE)-S3, Server Side Encryption With Customer Provided Keys (SSE-C), AWS Key Management Service (SSE-KMS) or a client library such as Amazon S3 Encryption Client.
    - Amazon S3 manages both the encryption (as it writes to disks) and decryption (when reading)
- Client-side encryption is the act of encrypting data before sending it to Amazon S3.
    - Use an AWS KMS-managed customer master key or a client-side master key (never sent to AWS)
    - [Protecting Data Using Client-Side Encryption](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingClientSideEncryption.html)

<img width=600 src="/datadocs/assets/s3_sse_customer_key_2.png"/>
<center><a href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-amazon-practice-exams/" class="credit">Credit</a></center>

### Storage classes

- S3 Standard: 
    - Low latency and high throughput performance.
    - Designed for 99.99% availability over a given year.
- S3 Intelligent-Tiering: 
    - Same low latency and high throughput performance of S3 Standard.
    - Small monthly monitoring and auto-tiering fee.
    - Automatically moves objects between two access tiers based on changing access patterns.
    - Designed for 99.90% availability over a given year.
- S3 Standard-IA: 
    - Same low latency and high throughput performance of S3 Standard.
    - For data that is accessed less frequently, but requires rapid access when needed. 
    - Lower fee than S3, but you are charged a retrieval fee.
    - There can be cost implications if you use it frequently or use it for short lived storage.
    - Designed for 99.90% availability over a given year.
- S3 One Zone-IA: 
    - Same low latency and high throughput performance of S3 Standard.
    - Only stored in one availability zone (= a security threat)
    - Designed for 99.50% availability over a given year.
    - The S3 One Zone-IA storage class is set at the object level and can exist in the same bucket as S3 Standard and S3 Standard-IA, allowing you to use S3 Lifecycle Policies to automatically transition objects between storage classes without any application changes.
- S3 Glacier: 
    - Low-cost design is ideal for long-term archive.
    - Configurable retrieval times, from minutes to hours.
    - Designed for 99.99% availability over a given year.
    - Amazon Glacier encrypts your data at rest by default and supports secure data transit with SSL.
    - Expedited: Expedited retrievals allow you to quickly (1-5 mins) access data when occasional urgent requests for a subset of archives are required. Provisioned Capacity ensures that retrieval capacity for expedited retrievals is available when needed.
    - Standard: Standard retrievals allow you to access any of your archives within several hours.
    - Bulk: Bulk retrievals typically complete within 5–12 hours.
- S3 Glacier Deep Archive: 
    - Lowest cost storage class designed for long-term retention of data (7-10 years)
    - Ideal alternative to magnetic tape libraries.
    - Retrieval time within 12 hours.
    - Designed for 99.99% availability over a given year.
- RRS (Reduced Redundancy Storage):
    - RRS has effectively been deprecated.
- All are designed for durability of 99.999999999% (11 9's) of objects.
    - RRS is the only S3 Class that does not offer this.
- [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)

## EBS

<img width=100 src="/datadocs/assets/0_amazon-ebs.6610da80ab.svg"/>

- Amazon Elastic Block Store (EBS) provides persistent block storage volumes in the cloud.
- Volumes exist on EBS:
    - Think of EBS as of a virtual hard disk.
    - Persist independently from the running life of an EC2 instance.
    - Replicated within its AZ to protect from component failure.
    - Can only be attached to one EC2 instance at a time.
    - You can attach it to any EC2 instance in the same AZ (since it is replicated here)
    - Support live configuration changes while in production: you can modify the volume type, volume size, and IOPS capacity without service interruptions.
    - Offer 99.999% SLA.
    - [Amazon EBS Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumes.html)
- Snapshots exist on S3:
    - Think of snapshots as of a photograph of the disk.
    - Snapshots are point-in-time copies of volumes.
    - Snapshots are incremental: only the blocks that changed since last snapshots are moved to S3.
    - The first snapshot may take some time.
    - Created with command `aws ec2 create-snapshot`
    - To take a snapshot of a root device, you should stop the EC2 instance first. But you can also make a snapshot while the instance is running (may be slow)
    - One can perform actions on an existing EBS snapshot using AWS APIs, CLI, and AWS Console.
    - One cannot delete a snapshot that is used as the root device of a registered AMI.
    - EBS snapshots occur asynchronously so the volume can be used as normal.
    - Have a copy of the data which is stored redundantly in multiple AZs.
    - [Creating Amazon EBS Snapshots](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-creating-snapshot.html)
- Data migration:
    - Volumes are always in the same AZ as the EC2 instance.
    - To move an EC2 volume from one AZ to another, take a snapshot, create an AMI from that snapshot, and then use the AMI to launch a new EC2 instance in a new AZ.
<img width=600 src="/datadocs/assets/EBS_Backed_AMI_Creation.png"/><center><a href="https://www.bogotobogo.com/DevOps/AWS/aws_snapshot_ami_creation_image_clone_instance.php" class="credit">Credit</a></center>
    - To move an EC2 volume from one region to another, take a snapshot, create an AMI from that snapshot, [copy that AMI to another region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html), and then use the copied AMI to launch a new EC2 instance in the new region.
    - AWS does not copy launch permissions, user-defined tags, or Amazon S3 bucket permissions.

<img width=350 src="/datadocs/assets/ami_copy.png"/><center>
<a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html" class="credit">Credit</a></center>
    
- Encryption:
    - The use of encryption at rest is default requirement for many industry compliance certifications. 
    - EBS volumes can be encrypted, but they are not encrypted by default.
    - Existing EBS volumes cannot be encrypted.
    - Snapshots of encrypted volumes are encrypted automatically.
    - Volumes restored from encrypted snapshots are encrypted automatically.
    - You can share snapshots (on AWS or publicly), but only if they are unencrypted.
    - You can now encrypt root device volumes upon creation of the EC2 instance.
    - You can create an encrypted snapshot from an unencrypted snapshot: To encrypt an unencrypted root device volume, create a snapshot of it, encrypt that snapshot, create an AMI from that snapshot, and use that AMI to launch a new encrypted EC2 instance.
    - It is better to use KMS API instead to automatically encrypt the data before saving it to disk.
    - Amazon EBS encryption uses 256-bit Advanced Encryption Standard algorithms (AES-256)
- Termination:
    - The default action is for the root EBS volume to be deleted when the instance is terminated.
    - The default action for additional volumes is to be persisted.
- Additional volumes:
    - Additional volumes can be detached without stopping the instance.
    - You can add multiple volumes to an EC2 instance and then create your own RAID 5/RAID 10/RAID 0 configurations using those volumes.
    - You cannot attach an EBS volume to more than one EC2 instance at the same time.
- RAID configuration:
    - RAID 0 uses striping, i.e., data is split across all the drives.
    - RAID 0 is a more suitable option for providing faster read and write operations.
    - This means RAID 0 offers no fault tolerance; if any of the constituent drives fails, the RAID unit fails.
    - RAID 1 offers redundancy through mirroring, i.e., data is written identically to two drives.
    - [The snapshot process for RAID 1 is different](https://aws.amazon.com/premiumsupport/knowledge-center/snapshot-ebs-raid-array/): Stop all I/O activity before creating a snapshot.

<img width=200 src="/datadocs/assets/RAID-on-EBS-Volumes.jpg"/><center>
<a href="https://cloudacademy.com/blog/amazon-aws-raid-0-configuration-on-ebs-volumes/" class="credit">Credit</a></center>

- Boosting performance:
    - Ensure that your EC2 instances are types that can be optimized for use with EBS. This ensures that network traffic cannot contend with traffic between your instance and your EBS volumes.
    - Schedule snapshots for periods of low use. This only applies to HDD based EBS volumes. When you create a snapshot of a Throughput Optimized HDD (`st1`) or Cold HDD (`sc1`) volume, performance may drop as far as the volume's baseline value while the snapshot is in progress.
    - One of the easiest options is to drive more I/O throughput is by striping using RAID 0.
    - [RAID Configuration on Linux](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/raid-config.html)
    - [Amazon EBS Volume Performance on Linux Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSPerformance.html)
- Amazon Data Lifecycle Manager:
    - Amazon DLM provides a complete backup solution for EBS volumes at no additional cost.
    - Automates the creation, retention, and deletion of EBS snapshots.
    - [Automating the Amazon EBS Snapshot Lifecycle](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/snapshot-lifecycle.html)
- [Amazon EBS features](https://aws.amazon.com/ebs/features/)
- [Amazon EBS Cheat Sheet](https://www.udemy.com/course/aws-certified-solutions-architect-associate-amazon-practice-exams/learn/quiz/4394970/result/223783288#overview)

#### Types

- SSD-backed volumes:
    - SSD >> General purpose SSD (GP2): For most workloads (16,000 IOPS, $0.1)
    - [SSD >> Provisioned IOPS SSD (IO1)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumeTypes.html#EBSVolumeTypes_piops): For databases (64,000 IOPS, $.125)
- HDD-backed volumes:
    - Magnetic >> Throughput Optimized HDD (ST1): For big data, DWH, logs (500 IOPS, $0.045)
    - Magnetic >> Cold HDD (SC1): Cheap, for file servers (250 IOPS, $0.025)
    - Magnetic >> EBS Magnetic: Extra cheap, for infrequently accessed workloads (40-200 IOPS)
- EBS volumes can be changed on the fly (including the size and storage type)
- Of all the EBS types, both current and of the previous generation, HDD based volumes will always be less expensive than SSD types.
- [I/O Characteristics and Monitoring](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-io-characteristics.html)
    - SSD volumes deliver consistent performance whether an I/O operation is random or sequential.
    - HDD volumes deliver optimal performance only when I/O operations are large and sequential.

## EFS

<img width=100 src="/datadocs/assets/1_amazon-efs.79f9dd37c4.svg"/>

- Amazon Elastic File System (EFS) is a file storage service for EC2 instances.
- Easy to use, and provides a simple interface for creating and configuring file systems.
- Storage capacity is elastic, that is, it is growing and shrinking automatically.
    - Can scale up to petabytes.
- Supports the NFSv4 protocol.
    - Can support thousands of concurrent NFS connections.
- Only pay for what you use (no pre-provisioning required)
- Data is stored across multiple AZ's within a region.
- Read after write consistency.
- [Amazon Elastic File System](https://aws.amazon.com/efs/)
- [Amazon EFS Cheat Sheet](https://tutorialsdojo.com/aws-cheat-sheet-amazon-efs/)

<img width=400 src="/datadocs/assets/2019-02-13_00-55-39-826ea8db5a1179c5f79d02b3b6cf1f2c.png"/><center>
<a href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-amazon-practice-exams/" class="credit">Credit</a></center>

### Storage Gateway

<img width=100 src="/datadocs/assets/12_aws-storage-gateway.a48fc5052e.svg"/>

- AWS Storage Gateway is a service that connects an on-premises software appliance with cloud-based storage to provide seamless and secure integration between an organization's on-premises IT environment and AWS's storage infrastructure.
- At its heart it is a way of using AWS S3 managed storage to supplement on-premise storage. 
    - You can think of a file gateway as a file system mount on S3.
    - It is a physical or virtual appliance that can be used to cache S3 locally.
- Available for download as a virtual machine (VM) image that install on a host in the datacenter.
    - Supports either VMware ESXi or Microsoft Hyper-V.
    - It can also be used within a VPC in a similar way.
- All data transferred between any type of gateway appliance and AWS storage is encrypted using SSL.
- All data stored by AWS Storage Gateway in S3 is encrypted server-side with SSE-S3.

#### Types

- File Gateway (NFS & SMB):
    - Enables you to store and retrieve objects in Amazon S3 using file protocols, such as NFS.
    - Ownership, permissions, and timestamps are durably stored in S3 in the metadata.
    - Using File Gateway is the recommended way to use S3 with shared document pools.

<img width=700 src="/datadocs/assets/file-gateway-concepts-diagram.png"/><center>
<a href="https://docs.aws.amazon.com/storagegateway/latest/userguide/StorageGatewayConcepts.html" class="credit">Credit</a></center>

- Volume Gateway (iSCSI):
    - Provides block storage to your applications using the iSCSI block protocol.
    - Data is asynchronously backed up as point-in-time snapshots and stored as Amazon EBS snapshots.
    - Snapshots are incremental backups that capture only changed blocks (and compressed)
    - Stored Volumes: Entire dataset is stored on site and is asynchronously backed up to S3.
    - Cached Volumes: Entire dataset is stored on S3 and the most frequently accessed data is cached on site.

<img width=600 src="/datadocs/assets/aws-storage-gateway-stored-diagram.png"/><center>
<a href="https://docs.aws.amazon.com/storagegateway/latest/userguide/StorageGatewayConcepts.html" class="credit">Credit</a></center>

- Gateway Virtual Tape Library (VTL):
    - A durable, cost-effective solution to archive tape data.
    - Stores data on virtual tape cartridges that are created on tape gateway.
    - Supported by NetBackup, Backup Exec, Veeam.

### Data transport

#### Snowball

<img width=100 src="/datadocs/assets/10_aws-snowball.5a526539e7.svg"/>

- Snowball is a petabyte-scale data transport solution.
- Uses secure appliances to transfer large amounts of data and out of AWS. 
- Addresses challenges such as high network costs, long transfer times, and security concerns. 
- Transferring data with Snowball can be as little as one-fifth the cost of high speed internet.
- Uses multiple layers of security including tamper-resistant enclosures, 256-bit encryption, and an industry-standard Trusted Platform Module (TPM) designed to ensure both security and full chain-of-custody of data. 
- Once the data transfer job has been processed and verified, AWS performs a software erase.
- Comes in either a 50TB or 80TB size.
    - Only has 72TB of usable capacity.
- [AWS Snowball Cheat Sheet](https://tutorialsdojo.com/aws-cheat-sheet-aws-snowball/)

#### Snowball Edge

<img width=200 src="/datadocs/assets/az.0.0.jpg"/>
<center><a href="https://www.theverge.com/2015/10/7/9471381/amazon-snowball-data-transfer-device" class="credit">Credit</a></center>

- AWS Snowball Edge is a data transfer device with on-board storage and compute capabilities. 
- Can be used to move large amounts of data into and out of AWS, as a temporary storage tier for large local datasets, and to support local workloads in remote or offline locations.
- Connects to existing applications and infrastructure.
- Can cluster together to form a local storage tier and process data on-premises, helping ensure your applications continue to run even when they are not able to access to cloud.
- Can transfer up to 100TB.
    - Only has 83TB of usable capacity.
- [AWS Snowball Device Differences](https://docs.aws.amazon.com/snowball/latest/ug/device-differences.html)
- [AWS Snowball Edge Cheat Sheet](https://tutorialsdojo.com/aws-cheat-sheet-aws-snowball-edge/)

#### Snowmobile

- AWS Snowmobile is an Exabyte-scale data transfer service. 
- One can transfer up to 100PB per Snowmobile, a 45-foot long ruggedized shipping container. 
- For video libraries, image repositories, or even a complete data center migration.
- [When to use Snowball](https://aws.amazon.com/snowball/faqs/#When_to_use_Snowball)

<img width=300 src="/datadocs/assets/maxresdefault copy.jpg"/>
<center><a href="https://www.youtube.com/watch?v=b7f2V7ecgh8" class="credit">Credit</a></center>