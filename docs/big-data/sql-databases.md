---
id: sql-databases
title: SQL Databases
sidebar_label: SQL Databases
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/sql-databases.md
---

- [Database Design: SQL databases](database-design#sql-databases)
- To operate efficiently and accurately, RDBMS must use ACID transactions.
- The programming within a RDBMS is usually accomplished using stored procedures (SPs)
    - Those are sets of SQL statements which are stored as a group, reused and shared.
- Relational databases typically provide indexing.
    - The use of efficient indexes can dramatically improve query performance
    - Indices are usually implemented via B+ trees, R-trees, and bitmaps.

#### Column-oriented databases

- A columnar DBMS stores data tables by column rather than by row.
    - Stores each column in one or more contiguous blocks.
    - Basically a row-store with an index on every column.
- Most column oriented databases are relational.
    - Some relational databases can use columnar storage, such as PostgreSQL with cstore_fdw.
- Optimized for fast retrieval of columns of data, typically in OLAP applications.
- Pros:
    - High-speed searching, scanning, and aggregation capabilities.
    - Ability to scale out easily.
    - Drastically reduce the overall disk I/O operations.
    - Most columnar databases compress similar data to reduce storage.
- Cons:
    - Operations that retrieve the entire row are slower (but rare)
    - INSERTs must be separated into columns and compressed as they are stored.
- OLTP constraints can be mediated using in-memory data storage.

```sql
-- Example: Block in columnar storage

10:001,12:002,11:003,22:004;
Smith:001,Jones:002,Johnson:003,Jones:004;
goodreads.com:001,google.com:002,gamerassaultweekly.com:003
```

#### Object-oriented databases

<center><img width=100 src="/datadocs/assets/220px-Postgresql_elephant.svg.png"/></center>

- An object-relational database (ORD) is composed of both RDBMS and OODBMS.
- Supports sets and lists, arbitrary user-defined datatypes as well as nested objects.
    - Allows developers to build and innovate their own data types and methods.
- Supports object-oriented database model: objects, classes and inheritance.
    - Very similar to objects used in object-oriented programming.
- Supports relationships between objects to easily collect related records.

```sql
-- Example: Custom data types and methods

CREATE TABLE Customers (
    Id    Cust_Id     NOT NULL PRIMARY KEY,
    Name  PersonName  NOT NULL,
    DOB   DATE        NOT NULL
);
SELECT Formal(C.Id)
FROM Customers C
WHERE BirthDay(C.DOB) = TODAY;
```

- One of the most popular and advanced solutions is PostgreSQL.
- PostgreSQL is an enterprise-class open source object-relational database management system.
    - Not owned by any organization.
- Some most prominent features:
    - Supports both SQL for relational and JSON for non-relational queries.
    - Backed by an experienced community of developers who have made tremendous contribution.
    - Supports advanced data types and advance performance optimization.
    - The first database to implement multi-version concurrency control (MVCC)
    - Compliant with the ANSI SQL standard (160/179 functions as of 2018)
    - Completely ACID compliant (in contrast to MySQL)
    - Highly extensible with custom data types, functions, and even code.
    - Supports synchronous and asynchronous replication for high availability.
- More suited for complex queries, data warehousing and fast read-write speeds.
- [Performance Tuning Queries in PostgreSQL](https://www.geekytidbits.com/performance-tuning-postgres/)
- [SQLite vs MySQL vs PostgreSQL: A Comparison Of Relational Database Management Systems](https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems)

## Data modeling

### Relational model

- The relational data model allows to create a consistent, logical representation of information.
- The data is stored in relations (tables)
    - Each relation consists of tuples (rows, records) and attributes (columns, fields).
    - Tables that are not stored but computed on the fly are called views or queries.
- Consistency is achieved by including declared constraints (logical schema)
    - Constraints provide one method of implementing business rules in the database.
    - Constraints can apply to attributes, tuples or to an entire relation.
    - There are key, domain, and referential integrity constraints.
    - A domain describes the set of possible values for a given attribute.
- Relationships are a logical connection between different tables.
- Defines how the data are to be manipulated (relational calculus)

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