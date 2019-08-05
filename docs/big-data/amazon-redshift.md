---
id: amazon-redshift
title: Amazon Redshift
sidebar_label: Amazon Redshift
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/amazon-redshift.md
---

<center><img width=250 src="/datadocs/assets/aws-redshift-connector.png"/></center>

- Amazon Redshift is a fully managed, column-oriented, petabyte-scale data warehouse in the cloud.
    - Can build a central data warehouse unifying data from many sources.
    - Can run big, complex analytic queries against that data with SQL.
    - Can report and pass on the results to dashboards or other apps.
- Behind the scenes, Redshift stores relational data in column format.
    - Based on industry-standard PostgreSQL.
    - Supports high compression and in-memory operations.
    - Columnar storage reduces the number of disk I/O requests and the amount of data.
- Integrates with various data loading and ETL tools and BI reporting, data mining, and analytics tools.
    - Also provides its own Query Editor.
    - Accessible, like any relational database, via JDBC/ODBC.
- Designed to crunch data, i.e. running “big” or “heavy” queries against large datasets.
- Can ingest huge structured, semi-structured and unstructured datasets (via S3 or DynamoDB)
    - It's a database, so it can store raw data AND the results of transformations.
- Can run analytic queries against data stored Amazon S3 data lake.
    - Redshift Spectrum: Run queries against data in Amazon S3 without moving it.
    - Can query open file formats, such as CSV, JSON, Parquet, and more.
    - [Amazon Redshift Spectrum - No Loading Required](https://aws.amazon.com/blogs/big-data/amazon-redshift-spectrum-extends-data-warehousing-out-to-exabytes-no-loading-required/)
- Massively parallel processing (MPP) architecture distributes and parallelizes queries.
    - Based on ParAccel's MPP technology.
    - Distributes the rows of a table to the compute nodes for parallel processing.
    - Parallelizes execution of one query on multiple CPUs/machines.
    - Other examples include Teradata Aster, Oracle ExaData and Azure SQL.

<center><img width=700 src="/datadocs/assets/mpp2.jpg"/></center>
<center><a href="https://techxplicit.com/2016/09/26/first-encounter-with-massively-parallel-processing-aws-redshift/" style="color: lightgrey">Credit</a></center>

- Other performance features:
     - Incorporates a query optimizer that is MPP-aware.
     - Caches the results of complex queries in memory to reduce query execution time.
     - [Performance Features](https://docs.aws.amazon.com/redshift/latest/dg/c_challenges_achieving_high_performance_queries.html)
     - [Top 14 Performance Tuning Techniques for Amazon Redshift](https://www.intermix.io/blog/top-14-performance-tuning-techniques-for-amazon-redshift/)
- Two node types available:
    - Dense Compute (DC): fast CPUs, large amounts of RAM, and solid-state disks (SSDs).
    - Dense Storage (DS): cost-effective, lots of storage, a very low price point.
    - Can scale out easily by changing the number or type of nodes.
- Redshift is a fully managed service on AWS.
    - Redshift automatically provisions the infrastructure with just a few clicks.
    - Most administrative tasks are automated, such as backups and replication.
    - Ensures fault tolerance of the cluster.
- Can use SSL to secure data in transit and run within Amazon VPC.
- Has a price-point that is unheard of in the world of data warehousing ($935/TB annually)
    - Offers On-Demand pricing with no up-front costs.

#### Compared to Amazon RDS

- RDS is Amazon's relational databases as a service offering.
    - Supports engines such as Amazon Aurora, Oracle, PostgreSQL, MySQL, and many others.
- RDS meant to be used as the main or a supporting data store and transactional (OLTP) database.
- Both services can be used together very effectively: RDS as a source, Redshift as a target.
- Amazon RDS is primarily used by end customers, while Redshift by internal users (data scientists)


## Architecture

- The core component is a cluster, which is composed of one or more compute nodes.
- Leader node coordinates the compute nodes and handles external communication.
    - Client interacts only with the leader node, but compute nodes remain transparent.
    - Develops execution plans to carry out database operations.
    - Optimizes query execution.
    - Distributes SQL statements to the compute nodes (only if they have relevant partition)
- Compute nodes (EC2 instances) execute the compiled code and send intermediate results back.
    - Each compute node has its own dedicated CPU, memory, and disk storage.
    - One can increase the number of nodes (scale out) or upgrade the node type (scale up)
- Each compute node is logically partitioned into slices:
    - Each slice is allocated 1 CPU, a portion of the node's memory and disk space.
    - A cluster with \\(N\\) slices can process \\(N\\) partitions simultaneously.
    - For example, 4 compute nodes x 8 slices = maximum 32 partitions.
    - One can optionally specify one column as the distribution key.

## Data modeling

- A `COPY` command is the most efficient way to load a table.
    - Leverages MPP to read from multiple data files or streams simultaneously.
- On contrary, the `INSERT` command inserts record by record and can be slow.
- For better load performance, split data into multiple files:
    - The number of files should be a multiple of the number of slices in the cluster.
    - The files should be roughly the same size (1MB-1GB)
    - Specify a common prefix or a manifest file.

```js
// Example: venue.txt split into files

venue.txt.1
venue.txt.2
venue.txt.3
venue.txt.4
```

- By default, Redshift (blindly) distributes the workload uniformly among the nodes in the cluster.
- For better execution performance, set distribution keys on tables:
    - To minimize data movement during query execution.
    - To ensure that every row is collocated for every join that the table participates in.
- Distribution styles:
    - `EVEN`: Appropriate for load balancing and when a table does not participate in joins.
    - `ALL`: A copy of the entire table is distributed to every node (broadcasting). For small tables.
    - `KEY`: The rows are distributed according to the values in one column. The leader node collocates the rows on the slices according to the values in the joining columns so that matching values from the common columns are physically stored together. For large tables.
    - `AUTO`: Automatic assignment based on the size of the table data.
- Sorting enables efficient handling of range-restricted predicates.
    - Define one or more of its columns as sort keys.
    - Allows exploitation of the way that the data is sorted.
    - Useful for columns that are frequently used in `ORDER BY` like dates.

```sql
-- Example: 2x speed improvement using distribution and sort keys

create table activity (
  id         integer     primary key,
  created_at date        sortkey distkey,
  device     varchar(30)
);
```

- Defining constraints:
    - Uniqueness, primary key, and foreign key constraints are not enforced.
    - But declare constraints anyway when you know that they are valid.
    - Redshift enforces `NOT NULL` column constraints.
- One can apply a compression type, or encoding, to the columns in a table.
    - Reduces the amount of disk I/O and therefore improves query performance.
    - Use the `COPY` command to apply compression automatically.
- [Designing Tables](https://docs.aws.amazon.com/redshift/latest/dg/t_Creating_tables.html)