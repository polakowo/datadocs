---
id: wide-column-stores
title: Wide Column Stores
sidebar_label: Wide Column Stores
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/wide-column-stores.md
---

- Wide column stores use tables, rows, and columns.
    - Basically a hybrid between a key-value store and RDBMS.
    - The names and format of the columns can vary from row to row.
    - They can be seen as two-dimensional key-value stores.
- Should not be confused with the column-oriented storage.
    - Cassandra is column family but not column-oriented (when column is stored separately on disk).
    - Hbase is column family as well as stores column families in column-oriented fashion.
- Often support the notion of column families (similar to RDBMS tables)

## Apache Cassandra

<center><img width=200 src="/datadocs/assets/2000px-Cassandra_logo.svg.png"/></center>

- Cassandra is a peer-to-peer, read/write anywhere architecture.
    - Any user can connect to any node in any data center and read/write the data they need.
    - With all writes being partitioned and replicated automatically throughout the cluster.
- Cassandra is designed to handle big data across multiple nodes with no single point of failure.
    - Provides scalability and high availability
    - Good choice for mission-critical data
- Developed by Facebook
    - Based on Google Bigtable (2006) and Amazon Dynamo (2007), but open-source.
    - Uses architecture of Dynamo and data model of BigTable.
    - [Cassandra: Daughter of Dynamo and BigTable](https://blog.insightdatascience.com/cassandra-daughter-of-dynamo-and-bigtable-1b57b16229b9)
- Cassandra is a partitioned row and column-family store.
    - Cassandra is schema-full, all the way (= fixed columns)
    - Rows are organized into tables with a required primary key.
    - A hash function is applied on the primary key to (evenly) distribute the data.

<center><img width=500 src="/datadocs/assets/ring-architecture-2.png"/></center>

- Main features:
    - Decentralized load balancing and scalability.
    - Data is automatically replicated to multiple nodes for fault-tolerance. 
    - There are no single points of failure because every node in the cluster is identical.
    - Read and write throughput both increase linearly as new machines are added.
    - Apache Cassandra is optimized for high write throughput.
    - Even when an entire data center goes down, the data is safe.
    - Tunable write and read consistency (choice between CP and AP)
    - Supports secondary indexes
- Uses its own query language CQL similar to SQL (took over Thrift).
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
    - Each node is responsible for the region between it and its predecessor on the ring. 
    - The region is a range of hash values.
- Handles inter-node communication through the Gossip protocol.
    - So all nodes quickly learn about all other nodes in the cluster.
- [Architecture in brief](https://docs.datastax.com/en/archived/cassandra/3.0/cassandra/architecture/archIntro.html)
- [Cassandra Architecture and Write Path Anatomy](https://www.jorgeacetozi.com/single-post/cassandra-architecture-and-write-path-anatomy)

#### Write path

- Client read or write requests can be sent to any node in the cluster.
    - That node acts as a coordinator (proxy) between the application and the cluster.
- The coordinator uses a partitioner to find the responsible replicas.
    - A partitioner is a hash function that determines which node receives the row.
- The coordinator sends the write requests.
- Cassandra can be configured to prefer consistency (CP) over availability (AP):
    - Consistency level controls the minimum number of nodes that must acknowledge the write.
    - A consistency level of ONE means that two of the three replicas can miss the write.

<center><img width=400 src="/datadocs/assets/arc_write-singleDCConOne.png"/></center>
<center><a href="https://docs.datastax.com/en/ddac/doc/datastax_enterprise/dbInternals/dbIntClientRequestsWrite.html" style="color: lightgrey">Credit</a></center>

- Success means data was written to the node's commit log and the memtable.
    - The commit log guarantees durability in case of a node restart or failure.
    - The memtable (append-only cache) guarantees fast writes.
    - After a limit, the memtable is flushed to SSTables on disk.
    - [How is data written?](https://docs.datastax.com/en/ddac/doc/datastax_enterprise/dbInternals/dbIntHowDataWritten.html)
- SSTables (Sorted String Tables, coming from BigTable) are immutable:
    - This means that all updates are kept and take a lot of space.
    - Can be compressed by using Compaction (just a MergeSort)
    - Similarly to BigTable, Cassandra uses timestamps for version control.
- The coordinator responds to the client after receiving write acknowledgements.

### Data modeling

- Requires a paradigm shift from thinking about queries in relational databases.
- Primary goals:
    - Spread data evenly around the cluster.
    - Minimize the number of partition reads.
    - Satisfy a query by reading a single partition.
- Apache Cassandra does not allow for JOINs between tables.
    - Denormalization is not just okay - it's a must for fast reads.
    - One table per query is a great strategy.
    - Data duplication is encouraged.
- Data modeling in Apache Cassandra is query focused:
    - That focus needs to be on the WHERE clause.
    - Ad-hoc queries are not a strength of Cassandra.
- In CQL, data is stored in tables containing rows of columns, similar to SQL definitions.
- Still, there are lots of differences between CQL and SQL.
    - Mainly due to efficiency reasons.
    - For example, JOINS, GROUP BY and subqueries are not supported.

#### Keys

- PRIMARY KEY identifies the location and order of stored data.
    - SIMPLE PRIMARY KEY is made up of a single column.
- The first element of the PRIMARY KEY is the PARTITION KEY.
    - Distributes rows across nodes using hash function (ideally evenly)
    - Each node is responsible for a range of partitions.
- COMPOSITE PARTITION KEY is a PARTITION KEY made up of more than one column.
    - Used when the data stored is too large for one partition.
    - This breaks data into chunks (or buckets)
    - Solves hotspotting issues.
- PRIMARY KEY may also include CLUSTERING COLUMNS.
    - Distributes rows across partitions.
    - Ensures that the row is unique.
    - Sorts rows within the partition and allows filtering on them.
    - Sorting is in order of appearance in PRIMARY KEY and ascending.
    - Retrieving data from a partition is then more efficient.
    - Grouping data in tables using clustering columns is the equivalent of JOINs.
    - [Clustering columns](https://docs.datastax.com/en/dse/5.1/cql/cql/cql_using/whereClustering.html)
- Each table is just a distributed multi-dimensional map indexed by a key.
- [Creating a table - DataStax](https://docs.datastax.com/en/archived/cql/3.3/cql/cql_using/useAboutCQL.html)

```sql
-- Example: Table creation in CQL

CREATE TABLE IF NOT EXISTS hello
(a int, b int, c int, d int, e int, PRIMARY KEY ((a, b), c, d));
-- (a, b) is a composite partition key
-- (c, d) is a composite clustering key
-- e is a normal column
```

```js
// So, a and b are used to distribute rows among nodes,
// then each partition is sorted by c and then d.
// To get the value of e, one has first to specify the values of a, b, c and d.
// This is similar to a map<(a, b), c, d>
{
    "key=(a1,b1)": {
        "c=c1": {
            "d=d1": ["e=e1", "e=e2", "e=e3"]
        }
    }
}
```

#### Queries

- Must know your queries and model the tables to your queries.
- By using the WHERE statement we know which node to go to.
- It is recommended that partitions are queried one at a time for performance implications.
    - `SELECT *` is highly discouraged, but possible with `ALLOW FILTERING` configuration.
    - [ALLOW FILTERING explained](https://www.datastax.com/dev/blog/allow-filtering-explained-2)
- Failure to specify a correct WHERE clause will result in an error.
    - For example, we have to use all clustering columns in order.
    - [A deep look at the CQL WHERE clause](https://www.datastax.com/dev/blog/a-deep-look-to-the-cql-where-clause)
    

```sql
-- Example: Using WHERE clause in a wrong way

SELECT * FROM hello

-- You must restrict all partition key columns (to find the hash value)
-- With only two operators: = and IN
-- Incorrect
WHERE a = a1
WHERE a = a1 AND b > b1

-- You must specify every successive clustering key up until the key you're looking for
-- With only two operators: = and IN
-- Only the last level can use range operators
-- Incorrect
WHERE a = a1 AND b = b1 AND d > d1
WHERE a = a1 AND b = b1 AND c > c1 AND d > d1

-- You cannot filter normal columns
WHERE a = a1 AND b = b1 AND c = c1 AND d = d1 AND e = e1

-- Support those queries with additional tables designed as such
```