---
id: aws-storage
title: Storage
sidebar_label: Storage
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws-storage.md
---

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

### Features

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

### Storage classes

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