---
id: query-engines
title: Query Engines
sidebar_label: Query Engines
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/query-engines.md
---

## Apache Hive
<img width=150 src="/datadocs/assets/Apache_Hive_logo.svg.png"/>

- Apache Hive is a data warehouse system built on top of Apache Hadoop that facilitates easy data summarization, ad-hoc queries, and the analysis of large datasets stored in various databases and file systems that integrate with Hadoop.
- Data warehouse refers to a system used for reporting and data analysis.
- Hive was initially developed at Facebook.
- Offers a simple way to apply structure to unstructured data to perform SQL-like queries.
    - Takes unstructured data and applies a schema to it when the data is read.
    - Data remains untouched.
- Hive maintains a "metastore" (HCatalog) that stores information such as data location and schema.
    - Once a a Hive table is created, columns, rows, data types, etc., are stored in the metastore.
    - Other tools such as Spark, Pig and Tableau can then access the data in the metastore.
    - Hive enables data serialization/deserialization and increases flexibility in schema.
- Hive looks like traditional database code with SQL access but has to adhere to the rules of Hadoop framework.

<img width=400 src="/datadocs/assets/image1.png"/>
<center><a href="https://mapr.com/products/apache-hive/" style="color: lightgrey">Credit</a></center>

- Hive features an SQL-like programming interface called HiveQL:
    - Pretty much MySQL with extensions (for example views)
    - HiveQL automatically translates SQL-like queries into batch MapReduce jobs.
    - In addition, HiveQL supported custom MapReduce scripts to plug into queries.
    - It is possible to have full ACID properties in HiveQL.
    - Only basic support for indexes.
    - HiveQL does not provide support for OLTP and view materialization
- Hive has many user-defined functions (UDFs) that offer effective ways of solving problems.
    - Hive can take ownership of the data with `LOAD DATA` command or a managed table.
    - Partitioning is a huge optimization if queries are only on certain partitions (e.g. country)
- Faster execution of HiveQL or SQL on top of Hadoop:
    - Spark SQL can be used with the Hive metastore.
    - HiveQL can run on the Spark execution engine.
    - Apache Drill provides the ability to leverage the metadata in the Hive metastore for querying.
    - Hive can run on Tez, allowing queries to run significantly faster.
    - Impala leverages HiveQL and metastore to bring interactive SQL to Hadoop.
- Provides ease of use and compatibility with existing business applications through JDBC/ODBC.
- Users are able to connect with Hive using a command-line tool and a JDBC driver.

<img width=600 src="/datadocs/assets/4.jpg"/>
<center><a href="http://www.bigintellects.com/2018/08/hive-tutorial-hive-architecture-and.html" style="color: lightgrey">Credit</a></center>

- Limitations:
    - Hive is best suited for batch jobs, rather than working with web log data and append-only data.
    - High latency: No fit for online transaction processing (OLTP) systems.
- Among highlights in release 3.0 in 2018 were support for ACID operations. Work also began on materialized views and automatic query rewriting capabilities familiar to traditional data warehouse users.
- [How to Process Data with Apache Hive](https://hortonworks.com/tutorial/how-to-process-data-with-apache-hive/)

```sql
-- Example: Find the most popular movie

CREATE VIEW IF NOT EXISTS topMovieIDs AS
SELECT movieID, count(movieID) as ratingCount
FROM ratings
GROUP BY movieID
ORDER BY ratingCount DESC;

SELECT n.title, ratingCount
FROM topMovieIDs t JOIN names n ON t.movieID = n.movieID;
```


## Apache Pig
<center><img width=150 src="/datadocs/assets/pig-image.png"/></center>

- Pig is an abstraction built on top of MapReduce for rapid iteration and easy development.
    - Can be run in local mode for small datasets.
    - Can be run on top of TEZ (up to 10x faster)
- Pig consists of two components:
    - Pig Latin, which is a language.
    - A runtime environment, for running Pig Latin programs.
- Data transformations are explicitly encoded as data flow sequences, making them easy to write, understand, and maintain.
- Both, logical and physical plans are created to execute the Pig script.
- Pig is highly-extensible with user-defined functions (UDFs)

```pig
-- Example: Find old 5-star movies

-- Load relations
ratings = LOAD '/user/maria_dev/ml-100k/u.data' AS (userID:int, movieID:int, rating:int, ratingTime:int);
metadata = LOAD '/user/maria_dev/ml-100k/u.item' USING PigStorage('|') AS (movieID:int, movieTitle:chararray, releaseDate:chararray, videoRelease:chararray, imdbLink:chararray);

-- Get the average rating of each movie, filter, and order by the release date
nameLookup = FOREACH metadata GENERATE movieID, movieTitle, ToUnixTime(ToDate(releaseDate, 'dd-MMM-yyyy')) AS releaseTime;
ratingsByMovie = GROUP ratings BY movieID;
avgRatings = FOREACH ratingsByMovie GENERATE group AS movieID, AVG(ratings.rating) AS avgRating;
fiveStarMovies = FILTER avgRatings BY avgRating > 4.0;
fiveStarsWithData = JOIN fiveStarMovies BY movieID, nameLookup BY movieID;
oldestFiveStarMovies = ORDER fiveStarsWithData BY nameLookup::releaseTime;
DUMP oldestFiveStarMovies;
```

#### Compared to Hive
- Main focus of Pig is on bringing data into Apache Hadoop and getting it into the form for querying.
- Both Pig and Hive are feature complete.
- Hive is used more by researchers and programmers.