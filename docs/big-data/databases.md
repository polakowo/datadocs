---
id: databases
title: Databases
sidebar_label: Databases
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/databases.md
---

- Database is a set of related data and the way it is organized.
- Database Management System (DBMS) is a software for storage, retrieval, and updating of data.
- Database is often used to refer to both the database and the DBMS.

#### OLAP vs OLTP

- Online Analytical Processing (OLAP):
    - OLTP queries are read heavy and focus primarily on analytics.
- Online Transactional Processing (OLTP):
    - Databases optimized for these workloads allow for less complex queries in large volume.
    - The types of queries for these databases are read, insert, update, and delete.

## SQL databases

- Data is placed in tables and data schema is carefully designed before the database is built.
- Relational database management system (RDBMS) is used to maintain relational databases. 
    - Invented by E. F. Codd in 1970.
    - Oracle (banking), Teradata, MySQL, PostgreSQL, SQLite (simplex tasks, development)
- Structured Query Language (SQL) is the language for querying and maintaining relational databases.
    - Virtually every RDBMS uses SQL.
- Use cases:
    - You need ACID compliancy.
    - Your data is structured and unchanging.
    - [SQL Vs NoSQL: The Differences Explained](https://blog.panoply.io/sql-or-nosql-that-is-the-question)
- Large-scale web organizations such as Google and Amazon employ relational databases as adjuncts where high-grade data consistency is necessary.

#### ACID transactions

- Atomicity: The whole transaction is processed or nothing is processed.
    - For example, debit and credit operations cannot occur partially.
- Consistency: Any data written to the database must be valid according to all defined rules.
    - For example, a column of type integer does not accept boolean values.
- Isolation: Transactions are processed independently and securely, order does not matter.
    - But complete isolation uses more system resources and transactions blocking each other.
- Durability: Committed transactions remain committed even in case of system failure.
    - For example, a flight seat remains booked even after a crash.

#### Pros

- Small to medium sized data volumes.
- Complex query intensive environment:
    - Support for JOINS, aggregations and analytics.
    - Support for secondary indexes to help with quick searching.
- ACID transactions guarantee accuracy, completeness, and data integrity.
    - Stable enough in high load and for complex transactional applications.
- Easier to change to business requirements.
    - Modeling the data, not modeling queries.
    - Have better support, product suites and add-ons to manage these databases.
- No need to do queries first, run them based on the schemas and ERD.

#### Cons

- Not suited for large amounts of data as they cannot scale horizontally.
    - Not highly available because of a single point of failure.
    - Usually don't provide high throughput and fast reads.
- Not designed to handle unstructured and hierarchical data.
- ACID transactions slow down the process of reading and writing data.
    - The atomicity of the operations plays a crucial part in the database’s performance.
- Have a predefined (not flexible) schema.

#### Scaling up relational databases

- Denormalization: Add redundant copies of data or by grouping data to get faster reads.
- Caching layers (memcached): Distributed memory cache sitting on top of the database.
- Sharding: Split up the database into range partitions.
- Materialized views: Materialize views to serve the services in the format they expect and faster.
- Removing stored procedures: Remove expensive logic.

### MySQL

<center><img width=200 src="/datadocs/assets/1200px-MySQL.svg.png"/></center>

- MySQL is the most popular Open Source RDBMS.
    - The logical model includes objects such as databases, tables, views, rows, and columns.
    - The database structures are organized into physical files optimized for speed.
- It is developed, distributed, and supported by Oracle.
    - MySQL is Open Source and part of LAMP (Linux, Apache, MySQL, PHP/Perl/Python) environment.
    - It has a huge community, extensive testing and quite a bit of stability.
- Given that the server hardware is optimal, MySQL runs very fast. 
- Supports sharding and can be replicated across multiple nodes for more scalability and availability.
- MySQL is faster, more reliable and cheaper because of its unique storage engine architecture.
    - Written in C and C++
    - Tested with a broad range of different compilers.
    - Uses multi-layered server design with independent modules.
    - Designed to be fully multithreaded using kernel threads, to easily use multiple CPUs.
    - Uses a very fast thread-based memory allocation system.
- MySQL is a relatively simple database system.
- Understands standards based SQL (Structured Query Language).
    - SQL is the most common standardized language used to access databases. 
    - The SQL standard has been evolving since 1986.
- Consists of a solid data security layer that protects sensitive data from intruders.
- Follows a client/server architecture consisting of a database server and arbitrarily many clients.
    - MySQL Server is a multithreaded SQL server.
    - It can also be provided as an embedded multithreaded library.
- The default file size limit is about 4GB, but can be increased to a theoretical limit of 8TB.
- Supports a large number of platforms, client programs and libraries, administrative tools and APIs.
    - Supports JDBC and JDBC
    - Provides transactional and nontransactional storage engines.
    - Designed to make it relatively easy to add other storage engines.
- Other features:
    - Roll-backs, commit and crash recovery
    - Triggers, stored procedures and views
- [The Main Features of MySQL](https://dev.mysql.com/doc/refman/8.0/en/features.html)

## NoSQL databases

- To deal with big data, companies require more agile, flexible, and scalable tools.
- NoSQL databases are non-relational databases that can accomodate a wide variety of data models.
    - Key-value, document, columnar and graph formats
- NoSQL stands for "not only SQL"
- Especially useful for working with large sets of distributed data.
    - Often in distributed systems or the cloud.
    - Large-scale web organizations use NoSQL databases to focus on narrow operational goals.
    - Built for big data and have become popular with Hadoop.
- Geared toward managing varied and frequently updated data.
- Built for specific data models and have flexible schemas for building modern applications.
- NoSQL databases have become very popular among application developers.
- [RDBMs and NoSQL types and use cases](http://www.cbs1.com.my/WebLITE/Applications/news/uploaded/docs/IBM_POWER8%20Linux%20-%20OpenDB%20V1.0.pdf)

<center><img width=700 src="/datadocs/assets/nosql-databases.png"/></center>
<center><a href="http://www.cbs1.com.my/WebLITE/Applications/news/uploaded/docs/IBM_POWER8%20Linux%20-%20OpenDB%20V1.0.pdf" style="color: lightgrey">Credit</a></center>

#### Pros

- Huge volumes of structured, semi-structured, and unstructured data.
- Efficient, scale-out architecture instead of expensive, monolithic architecture.
    - Ability to scale horizontally on commodity hardware.
    - High availability, high throughput and low latency.
    - For example, if users are distributed geographically.
- Ability to handle change over time (schema agnostic nature)
- Agile sprints, quick iteration, and frequent code pushes.
    - There are no complicated connections.
    - Executing code next to the data.

#### Cons

- There are only few NoSQL databases that offer some form of ACID transactions.
- Limited support for JOINS as this will result in a full table scan.
- Not designed for aggregations and analytics.
- Queries need to be known in advance (e.g. to specify partition keys)

### Apache HBase

- Exposing data to transactional platform.
- Very fast way to expose results of Spark to other systems.

### Apache Cassandra

- The Apache Cassandra database provides scalability and high availability without compromising performance.
- Linear scalability and proven fault-tolerance on commodity hardware or cloud infrastructure.
    - Good choice for mission-critical data.
- Uses its own query language CQL.
- Apache Cassandra is optimized for writes.
- Good use cases for Apache Cassandra:
    - Transaction logging (retail, health care)
    - Internet of Things (IoT)
    - Time series data
    - Any workload that is heavy on writes to the database.
    - Uber uses Apache Cassandra for their entire backend.
    - Netflix uses Apache Cassandra to serve all their videos to customers.

### MongoDB

### Redis

### Neo4j