---
id: aws-databases
title: Databases
sidebar_label: Databases
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws-databases.md
---

## SQL databases

### RDS

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

### Aurora

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

## NoSQL databases

### DynamoDB

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

### ElastiCache

<img width=100 src="/datadocs/assets/elasticache-logo.png"/>

- ElastiCache is a web service to deploy, operate, and scale in-memory cache in the cloud.
- Improves performance of web applications by allowing to retrieve information from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases.
- Supports two open-source in-memory caching engines: Memcached and Redis.
    - For a simple cache to offload DB, use Memcached.
    - For a cache with more advanced capabilities (Multi-AZ, backups), use Redis.

## Data warehouses

### Redshift

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