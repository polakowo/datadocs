---
id: data-ingestion
title: Data Ingestion
sidebar_label: Data Ingestion
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-ingestion.md
---

## Bulk data

### Apache Sqoop

<center><img width=200 src="/datadocs/assets/sqoop-intro-pic-e1530647597717.png"/></center>

- Apache Sqoop is designed for transferring bulk data between Hadoop (HDFS, Hive, HBase) and RDBMS.
- In sqoop HDFS is the destination for importing data.
    - Can import the result returned from an SQL query in HDFS.
    - Data can be loaded directly into Hive for data analysis and also dump data into HBase.
- Kicks off MapReduce jobs to handle import and export.
- Sqoop is mainly used for parallel data transfers.
    - Provides fault tolerance by using YARN framework in parallel import and export the data.
- Offers the facility of the incremental load (loading parts of table whenever it is updated)
- Can compress huge datasets using snappy method.
- Apache Sqoop is connector based architecture.
    - Sqoop offers many connectors, covering almost the entire circumference of RDBMS.
    - For few databases Sqoop provides bulk connector which has faster performance.
- Apache Sqoop load is not driven by events.
- Limitations:
    - Scoop is atomic, meaning it cannot be paused and resumed.
    - Slow because it still uses MapReduce in backend processing.
    - Failures need special handling in case of partial import or export.

```bash
# Import table from MySQL to Hive
sqoop import --connect jdbc:mysql://localhost/movielens --driver com.mysql.jdbc.Driver --table movies --hive-import
# Export table from Hive back to MySQL
sqoop export --connect jdbc:mysql://localhost/movielens --driver com.mysql.jdbc.Driver --table movies --export-dir /apps/hive/warehouse/movies --input-fields-terminated-by '\0001'
```

## Streaming data

### Apache Kafka

<center><img width=200 src="/datadocs/assets/kafka-logo-wide.png"/></center>

- [Apache Kafka](https://kafka.apache.org) is a distributed streaming platform.
    - Kafka was developed in 2010 at LinkedIn.
    - Not just for Hadoop.
- Key features:
    - Publish and subscribe to streams of records.
    - Store streams of records on a Kafka cluster in a fault-tolerant way.
    - Process streams of records as they occur.
- A fast, scalable, fault-tolerant, publish-subscribe messaging system.
    - Can deliver in-order, persistent, scalable messaging.
    - Capable of supporting message throughput of thousands of messages per second.
    - Can handle these messages with very low latency of the range of milliseconds.
    - Resistant to node failures within a cluster.
    - Kafka's performance is effectively constant with respect to data size.
- APIs:
    - Producer API: allows an application to publish a stream of records to one or more topics.
    - Consumer API: allows an application to subscribe to one or more topics and process them.
    - Stream API: allows effectively transforming the input streams to output streams.
    - Connector API: allows connecting topics to existing applications or data systems.

```bash
# Create a topic
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test
# Send some messages
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
# Start a consumer
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```

- Use cases:
    - High throughput, built-in partitioning, replication, and fault-tolerance makes it a good solution for large scale message processing applications.
    - To track website activity (page views, searches, or other actions users may take)
    - To produce centralized feeds of operational data from distributed applications.
    - To collect physical log files off servers and put them in a central place.
    - To aggregate, enrich, or otherwise transform topics into new topics for further consumption.
    - [Use cases](https://kafka.apache.org/uses)

#### Architecture

- Runs as a cluster on one or more servers that can span multiple data centers.
    - Stores streams of records in categories called topics.
    - Persists all published records — whether or not they have been consumed — using a configurable retention period (for example, discard data after 2 days to free up space)
- Producers publish data to the topics of their choice. 
- Consumers subscribe to one or more topics and process them.
    - Consumer instances can be in separate processes or on separate machines.
    - Consumers must label themselves with a consumer group name.
    - A topic is delivered to one consumer instance within each subscribing consumer group.
    - For example, records are load-balanced over the consumers in the same group.

<img width=400 src="/datadocs/assets/consumer-groups.png"/>
<center><a href="https://kafka.apache.org/intro" style="color: lightgrey">Credit</a></center>

- A topic is a category or feed name to which records are published.
    - A topic can have zero, one, or many consumers.
    - Each record consists of a key, a value, and a timestamp.
- Each topic maintains a log (or multiple logs — one for each partition) 
    - The log is simply a data structure: time-ordered, append-only sequence of data inserts.
    - The data inside of the log can be anything.
- An offset is the position of a consumer in the log:
    - The offset is controlled by the consumer.
    - Consumer can consume records in any order it likes.
- A partition acts as the unit of parallelism and must fit on the servers that host it.
    - The partitioning is controlled by the producer.
    - The partitions of the log are distributed over the servers.
    - Each consumer has a "fair share" of partitions at any point in time.
    - Each partition is replicated across a configurable number of servers for fault tolerance.
- Limitations:
    - No record IDs: records are addressed by their offset in the log.
    - No tracking of the consumers who have consumed what records.

### Apache Flume

- Transporting web logs at large scale.