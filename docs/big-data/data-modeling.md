---
id: database-design
title: Database Design
sidebar_label: Database Design
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/database-design.md
---

## Data modeling

- Data model is an abstraction that organizes elements of data and how they will relate to each other.
- Data modeling helps in the visual representation of data and enforces business rules, regulatory compliances, and government policies on the data.
    - The process of creating data models for information systems.
    - An important skill for anyone involved in the process of using and analyzing data.
    - More about how to structure data to be used by different stakeholders.
    - Do not join four tables just to send one email.
- Advantages:
    - Helps common understanding of business data elements and requirements.
    - Provides foundation for designing a database.
    - Facilitates avoidance of data redundancy and data & business transaction inconsistency.
    - Facilitates data re-use and sharing.
    - Decreases development and maintenance time and cost.
    - Confirms a logical process model and helps impact analysis.
- Data model provides a clear picture of the data organization:
    - Simple queries might become complicated if data modeling isn't well thought out.
    - Begin prior to building out application, business logic, and analytical models.
- Data modeling is an iterative process:
    - Data engineers continually reorganize, restructure, and optimize data models to fit the needs.
    - The process is iterative as new requirements and data are introduced.
- [Conceptual, logical and physical data model](https://en.wikipedia.org/wiki/Logical_schema#Conceptual,_logical_and_physical_data_model)
- [Data Modeling vs. Database Design (1996, but it's gold)](http://www.dwelleart.com/aisintl/case/library/R-Theory_vs_ER/r-theory_vs_er.html)

<center><img width=550 src="/datadocs/assets/data-modeling.png"/></center>
<center><a href="https://www.sap.com/hana" style="color: lightgrey">Credit</a></center>

<center><img width=350 src="/datadocs/assets/data-modeling-features.png"/></center>
<center><a href="https://www.1keydata.com/datawarehousing/data-modeling-levels.html" style="color: lightgrey">Credit</a></center>

#### Conceptional schema

- The data requirements are initially recorded as a conceptual data model which is essentially a set of technology independent specifications about the data and is used to discuss initial requirements with the business stakeholders.
- Defines WHAT the system should contain.
    - High-level, static business structures and concepts
- Conceptual ERD models reflect information gathered from business requirements.
- Typically created by Data Architects, Business Analysts and stakeholders with ERD or other UML.
- [Learn more about Conceptual Modeling](https://www.sciencedirect.com/topics/computer-science/conceptual-modeling)

#### Logical schema

- The conceptual model is then translated into a logical data model, which documents structures of the data that can be implemented in databases.
    - One conceptual data model may require multiple logical data models.
    - Conceptional and logical schemas are sometimes implemented as one and the same.
- Logical Data Models (LDMs) define HOW the system should be implemented regardless of the DBMS.
    - Entity types, data attributes and relationships between entities
    - Has to aid business analysis, not the database creation.
- Typically created by Data Architects and Business Analysts with ERD or other UML.

#### Physical schema

- The last step in data modeling is transforming the logical data model to a physical data model that organizes the data into tables, and accounts for access, performance and storage details.
- Physical Data Models (PDMs) define HOW the system should be implemented using a specific DBMS system.
    - The internal schema database design
- The target implementation technology may be a RDBMS, an XML document, or a NoSQL database.
- Can use DDL statements to deploy the database server.
- Typically created by DBA and developers.

## Databases

- Database is a set of related data and the way it is organized.
- Database Management System (DBMS) is a software for storage, retrieval, and updating of data.
- Database is often used to refer to both the database and the DBMS.

#### OLAP vs OLTP

- Online Analytical Processing (OLAP):
    - OLTP queries are read heavy and focus primarily on analytics.
- Online Transactional Processing (OLTP):
    - Databases optimized for these workloads allow for less complex queries in large volume.
    - The types of queries for these databases are read, insert, update, and delete.

#### CAP Theorem

- States that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees:
    - Consistency (C, ACID guarantees): All read requests should receive the latest value (or error)
    - Availability (A, BASE philosophy): All requests should return successfully.
    - Partition tolerance (P): The system can tolerate arbitrary number of communication failures.
- Since no distributed system is safe from network failures, partition tolerance is mandatory.
    - Consistency: Return an error if particular version cannot be guaranteed to be up to date.
    - Availability: Always process the query and return the most recent available version.
- When there are no network partitions, every system can behave like CA. 
> All systems are, in fact, CAP, but tunes how much C and A are provided during P.

<center><img width=450 src="/datadocs/assets/56858813-35362180-699e-11e9-8e9d-a7be8b2b83e4.png"/></center>
<center><a href="https://blog.grio.com/tag/nosql" style="color: lightgrey">Credit</a></center>

#### PACELC

- Extended model which considers normal operation and latency.
- Availability comes at the expense of latency.
- PA/EL: Give up consistency at all times for availability and lower latency.
    - Dynamo, Cassandra (tuneable), Riak, web cache
- PA/EC: Give up consistency when partition occurs, otherwise provide consistency.
    - BigTable, Hbase, VoltDB/H-Store
- PC/EL: Give up availability when partition occurs, otherwise provide latency.
    - MongoDB
- PC/EC: Refuse to give up consistency, pay the cost in availability and latency.
    - Yahoo! PNUTS

### SQL databases

- Data is placed in tables and data schema is carefully designed before the database is built.
- Relational database management system (RDBMS) is used to maintain relational databases. 
    - Invented by E. F. Codd in 1970.
    - Oracle (banking), Teradata, MySQL, PostgreSQL, SQLite (simplex tasks, development)
- Structured Query Language (SQL) is the language for querying and maintaining relational databases.
    - Virtually every RDBMS uses SQL.
- Use cases:
    - You need ACID compliancy.
    - Your data is structured and unchanging.
    - Large-scale web organizations such as Google and Amazon employ relational databases as adjuncts where high-grade data consistency is necessary.
    - [SQL Vs NoSQL: The Differences Explained](https://blog.panoply.io/sql-or-nosql-that-is-the-question)

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
- Not designed to handle unstructured and hierarchical data.
- The atomicity of the operations plays a crucial part in the database’s performance.
    - ACID transactions slow down the process of reading and writing data.
- Have a predefined (not flexible) schema.

#### Scaling up relational databases

- Denormalization: Add redundant copies of data or by grouping data to get faster reads.
- Caching layers (memcached): Distributed memory cache sitting on top of the database.
- Sharding: Split up the database into range partitions.
- Materialized views: Materialize views to serve the services in the format they expect and faster.
- Removing stored procedures: Remove expensive logic.

### NoSQL databases

- To deal with big data, companies require high scalability, high speed, and continuous availability.
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
    - Developers do not need to convert in-memory structure to relational structure.
- [RDBMs and NoSQL types and use cases](http://www.cbs1.com.my/WebLITE/Applications/news/uploaded/docs/IBM_POWER8%20Linux%20-%20OpenDB%20V1.0.pdf)

<center><img width=700 src="/datadocs/assets/nosql-databases.png"/></center>
<center><a href="http://www.cbs1.com.my/WebLITE/Applications/news/uploaded/docs/IBM_POWER8%20Linux%20-%20OpenDB%20V1.0.pdf" style="color: lightgrey">Credit</a></center>

#### Pros

- Huge volumes of structured, semi-structured, and unstructured data.
- Ability to scale horizontally on commodity hardware.
    - Efficient, scale-out architecture instead of expensive, monolithic architecture.
- High availability and location independence.
    - For example, if users are distributed geographically.
- High throughput and low latency.
    - Fast reads and writes
- Ability to handle change over time (schema agnostic nature)
- Agile sprints, quick iteration, and frequent code pushes.
    - There are no complicated connections.
    - Executing code next to the data.

#### Cons

- There are only few NoSQL databases that offer some form of ACID transactions.
- Limited support for JOINS as this will result in a full table scan.
- Not designed for aggregations and analytics.
- Queries need to be known in advance (e.g. to specify partition keys)