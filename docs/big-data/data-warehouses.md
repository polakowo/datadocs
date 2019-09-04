---
id: data-warehouses
title: Data Warehouses
sidebar_label: Data Warehouses
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-warehouses.md
---

- A data warehouse (DWH) is a centralized database system that retrieves and consolidates data from multiple applications and sources into one location for BI and other analytical activities.
    - Subject-oriented, integrated, non-volatile, and time-variant
- Use case: Queries that need to incorporate data from multiple data sources across the organization.
- SQL databases are not sufficient on their own:
    - Retailer has a nation-wide presence → Scale?
    - Acquired smaller retailers, brick & mortar shops, online store → Single database? Complexity?
    - Has support call center & social media accounts → Tabular data?
    - Customers, Inventory Staff and Delivery staff expect the system to be fast & stable → Performance
    - HR, Marketing & Sales Reports want a lot information but have not decided yet on everything they need → Clear Requirements?
- Data is available:
    - In an understandable & performant dimensional model.
    - With conformed dimensions or separate data marts.
    - For users to report and visualize by interacting directly with the model or, in most cases, through a BI application.
- [Deep Diving in the World of Data Warehousing](https://medium.com/@BluePi_In/deep-diving-in-the-world-of-data-warehousing-78c0d52f49a)

#### Pros

- Enhanced business intelligence:
    - Solves the problem of analyzing separate data and converting it into actions.
    - Allows for decision making based on complete information.
    - Makes it easier for business users to analyze and report on data relevant to their initiatives.
- Timely access to data: 
    - Easy and fast access to data from a single interface
- Increased query and system performance: 
    - Allows for storing large amounts of data and rapidly querying it.
- Enhanced quality and consistency: 
    - Data from multiple sources is standardized and consistent.

## Components

- Data sources: Different types, skill sets, upgrades, locations (high heterogeneity)
- ETL: Usually a "grid" of machines with different schedules and pipeline complexities.
- DWH: Different resource needs and workloads (scalability & elasticity)
- BI apps and visualizations: Hybrid environment of tools for interaction, reporting and visualizations.

#### OLTP and OLAP systems

- OLTP systems provide source data to data warehouses, whereas OLAP systems help to analyze it.

<center><img width=700 src="/datadocs/assets/OLTP-vs.-OLAP.png"/></center>
<center><a href="https://diffzi.com/oltp-vs-olap/" style="color: lightgrey">Credit</a></center>

- OLTP (On-line Transaction Processing):
    - Examples: Track inventory, financial transactions, shipment of customer orders.
    - Characterized by a large number of short on-line transactions. 
    - Very fast query processing (mostly CRUD operations).
    - Maintains data integrity (ACID transactions) in multi-access environments.
    - The number of transactions per second is an effectiveness measure.
    - In OLTP database there is detailed and current business data.
    - History data is usually archived.
    - The schema used to store transactional data is the entity model (usually 3NF)
- OLAP (On-line Analytical Processing):
    - Examples: Split customers into market segments for market optimization.
    - Characterized by relatively low volume of transactions. 
    - Queries are often very complex and involve aggregations (mostly SELECT operations) 
    - Response time is an effectiveness measure. 
    - OLAP applications are widely used for data mining. 
    - The historical data is aggregated and stored in multi-dimensional schemas (usually star schema). 
- [Transactional vs. Analytical Databases: How Does OLTP Differ from OLAP](https://datawarehouseinfo.com/how-does-oltp-differ-from-olap-database/)
- Using the same database for both OLAP and OLTP:
    - Slow analytical queries and a schema that is hard to understand.
    - Might be OK for small datasets.

#### ETL process

- ETL is a type of data integration that refers to the three steps (extract, transform, load) used to blend data from multiple sources and (often) to build a data warehouse.
- A core component of an organization’s data integration toolbox.
- Extraction:
    - The data is extracted from multiple and different types of sources into the staging area.
    - Common types of sources include relational databases, XML, JSON and flat files.
    - Staging area allows for data validation (unwanted/duplicated data, data type check)
    - Extraction should not affect performance of the source systems.
- Transformation:
    - The data is cleansed, mapped and transformed into a proper format.
    - Occurs by using rules or lookup tables or by combining the data with other data.
    - Produces diagnostic metadata.
    - [Transformation types](https://en.wikipedia.org/wiki/Extract,_transform,_load#Transform)
- Loading:
    - The data is structured and loaded into the target DWH.
    - The load process should be optimized for performance.
    - Recover mechanisms should be configured to restart from the point of failure.
- For example, an ETL server does SELECT on the source DB servers, stores the results in CSV files, and does INSERT/COPY to the destination server.
    - You will need a lot of storage in the middle for that.

#### Data marts

- A data mart is a subset of a DWH oriented to a specific business line.
- Intended for analysis on a specific business section or unit (e.g. sales department)
- Use case: Queries that do not require enterprise-wide data.

## Architectures

- Various views on how data warehouses should be designed from the organization's perspective.
- Two data warehouse pioneers: Bill Inmon and Ralph Kimball.
- [Data Warehousing concepts: Kimball vs. Inmon vs. Hybrid vs. Vault](https://drazda.blogspot.com/2013/04/data-warehousing-concepts-kimball-vs.html)

#### Independent data marts

- Each department has independent ETL processes and dimensional models.
    - These separate & smaller dimensional models are called "Data Marts"
    - Different fact tables for the same events, no conformed dimensions.
- Uncoordinated efforts can lead to inconsistent views.
    - Independent data marts are highly discouraged.

#### Kimball's Bus Architecture

- The DWH is the combination of the organization’s individual data marts (bottom-up design)
- Data is organized by business processes and used by different departments.
- Data is not kept at the aggregated level, but rather at the atomic level.
- Results in conformed (same) dimensions shared across different departments. 
    - Conformed dimensions deliver consistent descriptive attributes.
    - Does not allow for individual department specific data modeling requirements.

<center><img width=500 src="/datadocs/assets/1*cEgTofMPw7HArKReNrwbug.png"/></center>
<center><a href="https://medium.com/@amritha_fernando/types-of-data-warehousing-architecture-9a656443b510" style="color: lightgrey">Credit</a></center>

#### Inmon's Corporate Information Factory (CIF)

- Builds upon the centralized corporate data repository (top-down design)
    - The repository is usually 3NF normalized.
    - It's a single integrated source of truth for data marts.
    - Ensures data integrity and consistency across the organization.
- Dimensional data marts are then created from the DWH based on department needs.
    - 2 ETL processes: Source systems → 3NF database → Departmental data marts.
- Data marts are now coordinated through the same ETL processes (unlike independent data marts)
- Data marts are dimensionally modeled and aggregated (unlike Kimball's dimensional models)

<center><img width=500 src="/datadocs/assets/1*eeiD15Xwc_2Ul2DA5u_-Gw.png"/></center>
<center><a href="https://medium.com/@amritha_fernando/types-of-data-warehousing-architecture-9a656443b510" style="color: lightgrey">Credit</a></center>

#### Hybrid Kimball & Inmon

- The DWH is built using the Inmon model and on top of the integrated data warehouse, the business process oriented data marts are built using the star schema for reporting.

## Dimensional modeling

- Dimensional modeling is primarily used to support OLAP and decision making while ER modeling is best fit for OLTP where results consist of detailed information of entities rather an aggregated view.
- Pros of dimensional modeling:
    - Easier to understand and more intuitive to a business user.
    - More denormalized and optimized for data querying.
    - Scalable and easily accommodate unexpected new data.
- Uses the concepts of facts (measures) and dimensions (context).
- Fact tables record business events.
    - For example: Store sales
    - Each row (= event) contains the measurement data (facts) associated with that event.
    - Facts are typically numeric columns that can be aggregated.
    - They can be additive (sales per unit), non additive, and semi additive.
    - Grain of the table is the level of detail (daily or monthly sales?)
    - Two types of columns: facts and foreign keys to dimension tables.
    - The primary key is usually a composite key that is made up of foreign keys.
- Dimension tables describe the events in fact tables.
    - For example: People, products, place and time
    - Usually have a relatively small number of records compared to fact tables.
    - But each record may have a very large number of columns.
    - Dimensions are typically discrete columns for filtering.
- Work together to create an organized data model.
- [Dimensional Schemas](http://publib.boulder.ibm.com/db2blox/82/en/cube/cube13.htm)
- [Design method](https://en.wikipedia.org/wiki/Dimensional_modeling#Design_method)

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
    - Simplifies queries and common business reporting logic.
    - Faster aggregation and read-only reporting applications.
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

## OLAP cubes

<center><img width=250 src="/datadocs/assets/IntroOLAP_01.png"/></center>
<center><a href="https://devnet.logianalytics.com/rdPage.aspx?rdReport=Article&dnDocID=1053" style="color: lightgrey">Credit</a></center>

- OLAP cube is a multi-dimensional table.
    - Also called a hypercube if the number of dimensions is greater than 3.
- Each cell of the cube holds a number that represents some measure.
    - The measure (from fact table) is categorized by dimensions (from dimension tables) of the cube.
    - For example, summarize financial data by product, time period, and by city.
    - Should store the finest grain of data (atomic data)
- Data cubes can be easily built from the star schema.
- Often the final step in the deployment of a dimensional DW/BI system.
- Pros:
    - A very convenient way for slicing, dicing and drilling down.
    - Improves query performance.
    - Easy to communicate to business users.

### Operations

#### Query optimization

- Each operation on the cube will potentially go through the facts table (suboptimal)
- Materializing all dimension combinations is usually enough to answer all forthcoming queries.
- The `CUBE` operator computes `GROUPING SETS` on every subset of the dimensions.
    - The statement will create \\(2^N\\) subtotal combinations for \\(N\\) dimensions.
- Make sure that the original data doesn't have any None's.

```sql
SELECT c1, c2, aggregate_function(c3)
FROM table_name
GROUP BY CUBE(c1, c2);

-- (c1, c2)
-- (c1)
-- (c2)
-- ()
```

#### Slice

- Reduce \\(N\\) dimensions to \\(N-1\\) dimensions by restricting one dimension to a single value.

```sql
SELECT c2, c3
FROM table_name
WHERE c1 = 1;
```

#### Dice

- Compute a sub-cube by restricting some dimensions, same dimensionality, less values.

```sql
SELECT c1, c2, c3
FROM table_name
WHERE c1 IN (1, 2) AND c2 IN (2, 3);
```

#### Roll-up

- Aggregate or combine values and reduces number of rows or columns.
    - For example, street → city → province → country
- Query optimization:
    - Most efficient operations in OLAP are COUNT, MAX, MIN, and SUM.
    - The `ROLLUP` operator creates progressively higher-level subtotals.
    - Moves from right to left through the list of grouping dimensions.

```sql
SELECT c1, c2, aggregate_function(c3)
FROM table_name
GROUP BY ROLLUP(c1, c2);

-- (c1,c2)
-- (c1)
-- ()
```

#### Drill-down

- The reverse operation of roll up.
    - For example, country → province → city → street

#### Pivot

- Rotate the whole cube, giving another perspective on the data.
    - For example, replace products with time periods to see data across time for a single product.

```sql
SELECT 'TotalSalary' AS TotalSalaryByDept, [30], [45]
FROM (SELECT dept_id, salary FROM employees) AS SourceTable
PIVOT (SUM(salary) FOR dept_id IN ([30], [45])) AS PivotTable;
```

### Types

#### MOLAP

- Pre-aggregate the OLAP cubes and save them on a special purpose non-relational database.
- Pros:
    - Fast query performance due to indexing and storage optimizations.
    - Smaller on-disk size due to compression.
    - Very compact for low dimension datasets.
- Cons:
    - The processing step can be quite lengthy, especially on large data volumes.
    - Database explosion if high number of dimensions or sparse multidimensional data.

#### ROLAP

- Compute the OLAP cubes on the fly from the existing relational databases.
- The source database must still be carefully designed for ROLAP use (e.g. columnar storage)
- Pros:
    - Have the ability to ask any question.
    - More scalable in handling large data volumes and many dimensions.
    - Load times are generally much shorter than for MOLAP.
    - The data can be accessed by any SQL reporting tool.
- Cons:
    - Slower query performance as opposed to MOLAP.
    - The load task must be managed by custom ETL code.
    - Relies on the source databases for querying and caching.

#### HOLAP

- Divide data between relational and specialized storage.
- Benefits from greater scalability of ROLAP and faster computation of MOLAP.

## Amazon Redshift

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


### Architecture

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

### Data modeling

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