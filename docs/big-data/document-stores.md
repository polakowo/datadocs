---
id: document-stores
title: Document Stores
sidebar_label: Document Stores
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/document-stores.md
---

- Document stores are designed for storing, retrieving and managing semi-structured data.
- Store all information for a given object in a single instance in the database (= document)
- Documents are inherently a subclass of the key-value store.
    - The values in a key-value store are black boxes.
    - The values in a document store are transparent and organized.
    - This provides an ability to query based on the internal structure of the document.
- Documents are equivalent to the programming concept of an object.
    - Can be encoded with XML, YAML, JSON, BSON, and more.
    - Enable developers to use the same format they use in their application code.

<center><img width=500 src="/datadocs/assets/mongobeans_screenshot.png"/></center>
<center><a href="http://pingax.com/mongodb-schema-design/" style="color: lightgrey">Credit</a></center>

- Support CRUD operations:
    - Documents are addressed in the database via a (indexed) unique key.
    - Enable retrieving documents based on content, not only keys.
- Schema-free organization of data:
    - Documents are flexible, semistructured, and have a hierarchical nature.
    - Any sort of document can be stored, and those documents can change in form at any time.
    - No schema update is required and no database downtime is necessary.
    - Ability to add additional metadata outside of the content of the document.
- Enable flexible indexing, powerful ad hoc queries, and analytics over collections of documents.
- Uses cases: 
    - Where documents evolve over time.
    - For example, catalogs, user profiles, and content management systems.

## MongoDB

<center><img width=250 src="/datadocs/assets/mongodb-logo-rgb-j6w271g1xn.jpg"/></center>

- MongoDB is an open-source, NoSQL database that provides support for JSON-like storage systems.
- MongoDB is available under General Public license for free.
    - Also available under Commercial license from the manufacturer.
- Supports a flexible data model for storing data of any structure:
    - For example, hierarchical relationships, arrays, and other complex structures.
    - BSON format adds support for data types like date that aren’t supported in JSON.
- Provides high-performance data persistence.
- Indexes are created to improve the performance of searches.
    - Supports primary and secondary indexes for faster queries.
    - They support faster queries and can include keys from embedded documents and arrays.
- Ad hoc queries: 
    - Supports a rich query language to support CRUD operations (like SQL)
    - Supports field, range queries, regular expression searches.
    - Provides a framework for data aggregation modeled on the concept of MapReduce.
    - Supports query operations that perform a text search of string content.
    - Allows for geospatial indexing to efficiently execute spatial queries.
- Replica set (group of servers) provides automatic failover and data redundancy:
    - The primary replica interacts with the client and performs CRUD operations.
    - The secondary replicas maintain a copy of the data of the primary replica.
    - This is one of the major key features that make MongoDB production-ready.
- Uses the concept of sharding to scale horizontally:
    - Sharding distributes data across a cluster of machines.
    - Load balancing: Supports creating zones of data based on the shard key.
- Multiple clients can read and write the same data and it has locking feature to ensure concurrency.
- Uses internal memory for storing the (windowed) working set, enabling faster access of data.
- Supports multiple storage engines.
- Has BI connector for SQL tools.
- Atlas Data Lake allows users to query data, using the MongoDB Query Language, on AWS S3, no matter their format, including JSON, BSON, CSV, TSV, Parquet and Avro.
- [The database for modern applications](https://www.mongodb.com)
- [MongoDB Architecture Guide](https://www.mongodb.com/collateral/mongodb-architecture-guide)

### Data modeling

- Documents (i.e. objects) correspond to native data types in many programming languages.
- Documents are stored in collections:
    - Collections are analogous to tables in relational databases.
    - But they do not enforce any document structure.
- Data modeling should be done based data retrieval patterns.
    - For example, heavy query usage benefits from the use of indexes.
- A write operation is atomic on the level of a single document, even with embedded documents. 
    - Operation on multiple documents is not atomic though.
    - But latest version supports multi-document ACID transactions.
- Dynamic schema supports fluent polymorphism.
    - To make schema stricter, define validation rules (on a per-collection basis)
- Design your database in a way that the most common queries can be satisfied by querying a single collection, even when this means that you will have some redundancy in your database.
- [Data Modeling Introduction](https://docs.mongodb.com/manual/core/data-modeling-introduction/)
- [6 Rules of Thumb for MongoDB Schema Design: Part 1](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1)

#### Denormalization (embedding)

- Denormalization will make data reading efficient.
    - Combines all related data in a single document.
    - Allows to avoid application-level joins at the expense of more complex and expensive updates.
- The core design principle is "embedded" means "already there" as opposed to "fetching from somewhere else"
- Use cases:
    - “Contains” and one-to-many relationships between entities.
    - Data that is embedded does generally not require frequent changes.
    - The user could live with "duplication" in favor of faster reads.
    - Related data is frequently used in association with the parent.
- Pros:
    - Embedded documents and arrays reduce need for expensive joins.
    - Provides better performance for read operations.
    - Makes possible updating related data in a single atomic write operation.
- Cons:
    - May cause data inconsistency.
    - Documents must be smaller than 16MB.

```js
// Example: Denormalized documents

// persons
{
    _id: ObjectID("AAF1"),
    name: "Kate Monster",
    addresses: [
        { street: '123 Sesame St', city: 'Anytown', cc: 'USA' }, 
        { street: '123 Avenue Q', city: 'New York', cc: 'USA' }
    ]
}
```

#### Normalization (referencing)

- Normalization will provide an update efficient data representation. 
    - References store the relationships between data by including links or references. 
    - Applications can resolve these references to access the related data.
- To join collections, MongoDB has `$lookup` and Mongoose's `populate()` functionality.
    - But there is no single round trip to the database anymore to retrieve the data.
- Use cases:
    - When embedding would result in duplication of data.
    - Many-to-many relationships between entities.
    - Modeling large hierarchical data structures.
    - There is a clear separation of reads and writes.
    - Related data needs regular updating and be up-to-date.
    - The related data is always going to exceed the 16MB BSON limit.
- Pros:
    - Makes data compact, easy to store and easy to achieve consistency.
- Cons:
    - JOINs between tables are not as cheap as in RDBMS.
    - Hard to scale horizontally.
- [Mongoose populate vs object nesting](https://stackoverflow.com/questions/24096546/mongoose-populate-vs-object-nesting#answer-24096822)

```js
// Example: Normalized documents

// persons
{
    _id: ObjectID("AAF1"),
    name: "Kate Monster",
    tasks: [
        ObjectID("ADF9"), 
        ObjectID("AE02")
    ]
}
// tasks
[
    { _id: ObjectID("ADF9"), street: '123 Sesame St', city: 'Anytown', cc: 'USA' }, 
    { _id: ObjectID("AE02"), street: '123 Avenue Q', city: 'New York', cc: 'USA' }
]
```