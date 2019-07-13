---
id: data-storage
title: Data Storage
sidebar_label: Data Storage
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-storage.md
---

## HDFS

- The Hadoop Distributed File System (HDFS) is a distributed file system designed to run on commodity hardware (GNU/Linux).
- Takes as its design guides elements from Google File System (GFS).

<img width=700 src="/datadocs/assets/data_management-hdfs_architecture.png"/>
<center><a href="https://searchdatamanagement.techtarget.com/definition/Hadoop-Distributed-File-System-HDFS" style="color: lightgrey">Credit</a></center>

- HDFS is highly fault tolerant, avaialbe, reliable and scalable.
- Accommodation of large data sets:
    - A typical file in HDFS is gigabytes to terabytes in size.
    - It stores each file as a sequence of blocks (typically 64MB)
    - A file once created, written, and closed need not be changed.
    - HDFS uses client side caching to improve performance.
- Fast recovery from hardware failures:
    - HDFS has been built to detect faults and automatically recover quickly.
- Data replication:
    - The blocks of a file are replicated for fault tolerance (configurable by the replication factor)
    - The data is pipelined from one DataNode to the next.
    - This redundancy offers higher availability and data locality for efficient processing.
    - Files in HDFS are write-once and have strictly one writer at any time.
    - Large Hadoop clusters are arranged in racks (network traffic within desirable)
- Access to streaming data:
    - HDFS is intended more for batch processing versus interactive use.
    - The emphasis is on high throughput of data access rather than low latency of data access.
- Portability:
    - HDFS is designed to be portable across multiple hardware platforms.
    - Built using the Java language.
    - Hadoop supports shell-like commands to interact with HDFS directly.
    - Provides a commandline interface called FS shell which is similar to bash.

```bash
# Create a directory named /foodir
bin/hadoop dfs -mkdir /foodir
```
- HDFS is partly POSIX-compliant.
- HDFS is at the core of many open-source data lakes.
- With Apache Hadoop 2.0 (2013), YARN resource manager was added, and MapReduce and HDFS were effectively decoupled.
- With Apache Hadoop 3.0 (2017), HDFS supports additional NameNodes, erasure coding facilities and greater data compression.
- [HDFS Architecture Guide](https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html)

#### NameNode and DataNodes

- HDFS has a master/slave architecture.
    - Clients contact NameNode for file metadata or file modifications and perform actual file I/O directly with the DataNodes.
- NameNode:
    - A master server that manages the file system namespace and regulates access to files by clients.
    - Also determines the mapping of blocks to DataNodes.
    - User data never flows through the NameNode.
    - Usually a dedicated machine that runs only the NameNode software.
- DataNodes:
    - Manage storage attached to the nodes that they run on.
    - Perform block creation, deletion, and replication upon instruction from the NameNode.
    - Also responsible for serving read and write requests from clients.
    - Usually one per node.
- Example of replication operation: 
    - When a client is writing data to an HDFS file, its data is first written to a local cache. When the local file accumulates a full block of user data, the client retrieves a list of DataNodes from the NameNode. The client then flushes the data block to the first DataNode. The first DataNode starts receiving the data in small portions (4 KB), writes each portion to its local repository and transfers that portion to the second DataNode in the list. And so on.

#### Compared to cloud storage (S3)

- Cost: S3 is 5x cheaper than HDFS.
- Elasticity: S3 supports elasticity and pay-as-you-go pricing model, HDFS does not.
- SLA (Availability and Durability): S3’s availability and durability is far superior to HDFS’.
- Data locality: On a per node basis, HDFS can yield 6x higher read throughput than S3.
- Performance per Dollar: Given that the S3 is 10x cheaper than HDFS, S3 is almost 2x better compared to HDFS on performance per dollar.
- Compute: Separation of compute and storage also allow for different Spark applications.
- [HDFS vs. Cloud Storage: Pros, cons and migration tips](https://cloud.google.com/blog/products/storage-data-transfer/hdfs-vs-cloud-storage-pros-cons-and-migration-tips)
- [Top 5 Reasons for Choosing S3 over HDFS](https://databricks.com/blog/2017/05/31/top-5-reasons-for-choosing-s3-over-hdfs.html)

## Databases

#### CAP Theorem

### HBase

- Exposing data to transactional platform.
- Very fast way to expose results of Spark to other systems.

### MySQL

### Cassandra

### MongoDB