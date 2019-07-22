---
id: sql-databases
title: SQL Databases
sidebar_label: SQL Databases
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/sql-databases.md
---

## Data modeling

- The relational data model allows to create a consistent, logical representation of information.
    - Consistency is achieved by including declared constraints (logical schema)

#### Keys

- SUPERKEY is a set of attributes whose values can be used to uniquely identify a tuple.
- CANDIDATE KEY is a minimal set of attributes necessary to identify a tuple.
    - Also called a MINIMAL SUPERKEY.
    - Usually one CANDIDATE KEY is chosen to be called the PRIMARY KEY.
    - Other CANDIDATE KEYS are called ALTERNATE KEYS.
- PRIMARY KEY ensures that the column(s) has no NULL values, and that every value is unique.
    - Must be unique for each record.
    - Must apply uniform rules for all records.
    - Must stand the test of time.
    - Must be read-only (to avoid typos and varying formats).
    - Physically, implemented as a unique index.
- SURROGATE KEY is a key which is not natural.
    - A natural key is a key that has contextual or business meaning (STORE, SALES).
    - For example, an increasing sequential integer or “counter” value.
    - Can be extremely useful for analytical purposes.
- FOREIGN KEY is a column in one table that refers to the PRIMARY KEY in other table.

### Normalization

- Normalization means organizing tables in a manner that reduces redundancy and dependency of data.
    - Redundant data wastes disk space and creates maintenance problems.
    - If data exists in more than one place, it must be changed in all locations.
- The process is progressive (a higher level cannot be achieved before the previous levels)
- Divides larger tables to smaller tables and links them using relationships.
    - The end result should feel natural.
- Objectives of normalization:
    - Free the database from unwanted insertions, updates & deletion dependencies.
    - Reduce the need for refactoring the database as new types of data are introduced.
    - Make the relational model more informative to users.
    - Make the database neutral to the query statistics (do not model queries beforehand!)

#### Normal Forms

<center><img width=400 src="/datadocs/assets/codds-law.jpg"/></center>
<center><a href="https://slideplayer.com/slide/6860017/" style="color: lightgrey">Credit</a></center>

- [First Normal Form (1NF)](https://www.techopedia.com/definition/25955/first-normal-form-1nf):
    - Make the columns atomic: cells have a single value.
    - Define the primary key: no repeating groups in individual tables.
    - Columns must contain values of the same type.
    - The order in which data is stored does not matter.
    - May still contain partial and/or transitive dependencies.
- [Second Normal Form (2NF)](https://www.techopedia.com/definition/21980/second-normal-form-2nf):
    - Have reached 1NF
    - Split up all data resulting in many-to-many relationships.
    - Create relationships between tables by use of foreign keys.
    - Is the identifier comprised of more than one attribute?
    - If so, are any attribute values dependent on just part of the key?
    - Remove partial dependencies: every non-key attribute must depend on the whole key.
    - May still contain transitive dependencies.
- [Third Normal Form (3NF)](https://www.techopedia.com/definition/22561/third-normal-form-3nf):
    - Have reached 2NF
    - Do any attribute values depend on an attribute that is not the key?
    - Remove transitive dependencies: non-prime attributes are independent of one another.
    - However, many small tables may degrade performance.
- [Boyce-Codd Normal Form (BCNF)](https://www.techopedia.com/definition/5642/boyce-codd-normal-form-bcnf):
    - Have reached 3NF
    - Remove non-trivial functional dependencies.
    - Happens if there are two or more overlapping composite candidate keys.
    - Sometimes referred to as 3.5NF
- In most practical applications, normalization achieves its best in 3NF.
- [Normal forms - Wikipedia](https://en.wikipedia.org/wiki/Database_normalization#Normal_forms)

#### Denormalization

- JOINS on the database allow for outstanding flexibility but are extremely slow.
- Adding redundant data improves read performance at the expense of write performance.

<center><img width=550 src="/datadocs/assets/denormalization.jpg"/></center>
<center><a href="https://www.slideserve.com/walter-clay/chapter-11-enterprise-resource-planning-systems" style="color: lightgrey">Credit</a></center>

- Requires more space on the system since there are more copies of the data.
    - Not really a limiting factor as storage has become less expensive.
- Denormalized data model is not the same as a data model that has not been normalized:
    - Denormalization should only take place after normalization.
- With denormalization we want to think about the queries beforehand.

### Dimensional modeling
- Dimensional modeling is primarily used to support OLAP and decision making while ER modeling is best fit for OLTP where results consist of detailed information of entities rather an aggregated view.
- Fact table consists of the measurements, metrics or facts of a business process (e.g. transactions)
    - Generally consist of numeric values and foreign keys to dimensional data.
    - A measure is a numeric attribute of a fact, representing the performance.
    - An attribute is a unique level within a dimension.
    - A hierarchy represents relationship between different attributes (Year → Quarter → Month → Day)
- Dimension is a structure that categorizes facts and measures in order to enable users to answer business questions (e.g. people, products, place and time)
    - Usually have a relatively small number of records compared to fact tables.
    - But each record may have a very large number of attributes.
- Work together to create an organized data model.
- [Deep Diving in the World of Data Warehousing](https://medium.com/@BluePi_In/deep-diving-in-the-world-of-data-warehousing-78c0d52f49a)

#### Star schema

<center><img width=500 src="/datadocs/assets/cubeschemaa_v2.gif"/></center>
<center><a href="http://publib.boulder.ibm.com/db2blox/82/en/cube/cube13.htm" style="color: lightgrey">Credit</a></center>

- The star schema separates the data into facts and dimensions as descriptive attributes of the facts.
    - Gets its name from the physical data model resembling a star shape.
- The star schema is the simplest style of data mart schema.
    - It is a special, simplified case of the snowflake schema.
- Star schemas are denormalized.
    - Star schemas tend to be more purpose-built for a particular view of the data.
- Pros:
    - Simplifies queries
    - Simplifies common business reporting logic (such as period-over-period and as-of reporting)
    - Faster read-only reporting applications
    - Faster aggregation
    - Used by all OLAP systems to build proprietary OLAP cubes efficiently.
- Cons:
    - Data integrity is not enforced well since it is in a highly de-normalized state.
    - Must be loaded in a highly controlled fashion.
    - Not as flexible as normalized data model.
    - Does not support many-to-many relationships between business entities.
- Most widely used to develop data warehouses and dimensional data marts.

#### Snowflake schema

<center><img width=500 src="/datadocs/assets/cubeschemaa3_v2.gif"/></center>
<center><a href="http://publib.boulder.ibm.com/db2blox/82/en/cube/cube13.htm" style="color: lightgrey">Credit</a></center>

- In the snowflake schema, the dimension tables are normalized into multiple related tables.
- Pros
    - Results in storage savings
    - Reduces the number of places where the data needs to be updated.
    - Some OLAP tools are optimized for snowflake schemas.
- Cons:
    - Adds complexity to source query joins.
    - Data loads must be highly controlled and managed to avoid update and insert anomalies.
- Use cases:
    - No frequent queries of some dimension data for needing it for information purposes.
    - A reporting or cube architecture that needs hierarchies or slicing feature. 
    - Having fact tables that have different level of granularity.

## MySQL

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