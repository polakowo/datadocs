---
id: amazon-redshift
title: Amazon Redshift
sidebar_label: Amazon Redshift
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/amazon-redshift.md
---

<center><img width=700 src="/datadocs/assets/redshift-etl.png"/></center>
<center><a href="https://youtu.be/JQEAYabMr20" style="color: lightgrey">Credit</a></center>

- Data sources can be a jungle of databases, EC2 machines and flat files.
- ETL machines are a class of products that do calls.
    - Issue commands to the sources to copy data to the staging area.
    - Issue commands to Redshift to pick up the data.
    - EC2 usually do not store any data.
- S3 staging bucket transform the data before insertion into DWH.
    - S3 offers a very reliable, scalable and worry-free storage solution.
    - Only offers storage not processing power.
- The data in Redshift can be directly fed into BI apps.
    - But most of the times, pre-aggregations (to OLAP cubes) are required.
    - The data can be pre-aggregated and materialized into in-memory storage or elsewhere.

#### Ingesting at scale

- Use the `COPY` command for bulk insertion from an S3 staging area to Redshift.
    - The `INSERT` command inserts record by record and might be very slow.
- If the file is large, break it up into multiple files.
    - Either using a common prefix or a manifest file.
    - Each Redshift slice will act as a separate worker.
- Better to ingest from the same region.
- Automatic compression optimization:
    - The optimal compression strategy for each column type is different.
    - Redshift gives the user control over the compression.
    - The `COPY` command make automatic best-effort compression decisions.
- One can also specify the delimiter to be used.
- It is also possible to ingest directly using ssh from EC2 machines.

## Amazon Redshift

- Amazon Redshift is a cloud-managed, column-oriented, MPP database.
- Best suited for storing OLAP workloads and summing over a long history.
- Internally, it's PostgreSQL extended with columnar storage.
- Accessible, like any relational database, via JDBC/ODBC.

#### MPP

- Most relational databases run each query on maximum one CPU per machine.
    - Acceptable for OLTP, mostly updates and few rows retrieval.
- Massively Parallel Processing (MPP) database parallelize the execution of one query on multiple CPUs/machines.
- A table is partitioned and partitions are processed in parallel. 
- Other examples include Teradata Aster, Oracle ExaData and Azure SQL.

#### Architecture

- LeaderNode:
    - Coordinates compute nodes
    - Handles external communication
    - Optimizes query execution
- The total number of nodes in a Redshift cluster is equal to the number of EC2 instances.
- ComputeNodes:
    - Each having it's own configuration (CPU#, memory, disk size)
    - Scale up: get more powerful nodes
    - Scale out: get more nodes
- NodeSlices:
    - Each compute node is logically divided into a number of slices.
    - Each slice is at least 1 CPU with dedicated storage and memory.
    - A cluster with \\(N\\) slices can process \\(N\\) partitions simultaneously.
    - The total number of slices in a cluster is the unit of parallelism.
    - For example, 4 nodes x 8 slices = 32 partitions.

#### Optimizing table design

- When a table is partitioned up into many pieces and distributed across slices on different machines, this is done blindly.
- Choose a more clever strategy if the frequent access pattern of the table is known.
- Distribution style:
    - EVEN: Round-robin over all slices to achieve load-balancing. Partitions a table on slices such that each slice would have an almost equal number of records. Done to achieve load balancing. Good if the table won't be joined. Slow because records will have to be shuffled for putting together the JOIN result.
    - ALL: Small tables could be replicated on all slices to speed up joins. Replicates a (small) table on all slices (also known as broadcasting). Speeds up the JOIN operation, which is then done in parallel without shuffling. Used frequently for dimension tables. 
    - AUTO: Allows Redshift to determine distribution style. Leaves the decision to Redshift. Small enough tables are broadcasted, while large tables are distributed evenly.
    - KEY: Rows having similar values are placed in the same slice. This can lead to a skewed distribution if some values are more frequent than others. However, very useful if the dimension table is too large to be broadcasted. If two tables are distributed on the joining keys, Redshift collocates the rows from both tables. Specified with `DISTKEY`.
- Sorting key:
    - Upon loading, rows are sorted before being distributed to slices.
    - Useful for columns that are frequently used in `ORDER BY` like dates.