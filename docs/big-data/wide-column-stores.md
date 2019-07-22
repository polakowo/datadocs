---
id: wide-column-stores
title: Wide Column Stores
sidebar_label: Wide Column Stores
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/wide-column-stores.md
---

## Data modeling

## Apache Cassandra

- Cassandra is designed to handle big data across multiple nodes with no single point of failure.
    - Provides scalability and high availability
    - Good choice for mission-critical data
- Cassandra is a partitioned row store database.
    - Rows are organized into tables with a required primary key.
    - The primary key determines which node the data is stored on.
- Can choose between consistency (CP) and availability (AP)
    - Has tunable write and read consistency for both read and write operations.
- Developed by Facebook
    - Based on Google Bigtable (2006) and Amazon Dynamo (2007), but open-source.
- Main features:
    - Decentralized load balancing and scalability.
    - Data is automatically replicated to multiple nodes for fault-tolerance. 
    - There are no single points of failure because every node in the cluster is identical.
    - Read and write throughput both increase linearly as new machines are added.
    - Apache Cassandra is optimized for high write throughput.
    - Even when an entire data center goes down, the data is safe.
    - Choice between synchronous or asynchronous replication for each update.
- Uses its own query language CQL.
    - CQL uses a similar syntax to SQL and works with table data.
- Good use cases for Apache Cassandra:
    - Transaction logging (retail, health care)
    - Internet of Things (IoT)
    - Time series data
    - Any workload that is heavy on writes to the database.
- Cassandra is in use at Comcast, eBay, GitHub, GoDaddy, Hulu, Instagram, Netflix, Reddit.
    - Apple uses Cassandra with over 75,000 nodes for storing over 10PB of data.

#### Architecture

- Decentralized peer-to-peer architecture (no master assignment)
    - Employs a peer-to-peer distributed system across homogeneous nodes.
    - The data is distributed among all nodes in the cluster.
- A cluster contains one or more datacenters.
- Datacenter is a virtual or physical collection of related nodes.
    - Replication is set by datacenter.
- Node is where the data is stored.
    - Each node in the cluster is responsible for a range of data based on the hash value.

<center><img width=450 src="/datadocs/assets/Page2_Im1.png"/></center>
<center><a href="https://docs.datastax.com/en/archived/cassandra/3.0/cassandra/architecture/archDataDistributeHashing.html" style="color: lightgrey">Credit</a></center>

- Handles inter-node communication through the Gossip protocol.
    - So all nodes quickly learn about all other nodes in the cluster.
- Client read or write requests can be sent to any node in the cluster.
    - That node acts as a coordinator (proxy) between the application and the cluster.
- All writes are automatically partitioned and replicated throughout the cluster.
    - A partitioner is a hash function that determines which node receives the row.
- [Architecture in brief](https://docs.datastax.com/en/archived/cassandra/3.0/cassandra/architecture/archIntro.html)
- [Cassandra Architecture and Write Path Anatomy](https://www.jorgeacetozi.com/single-post/cassandra-architecture-and-write-path-anatomy)