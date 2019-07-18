---
id: data-ingestion
title: Data Ingestion
sidebar_label: Data Ingestion
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-ingestion.md
---

## sqoop

<center><img width=250 src="/datadocs/assets/sqoop-intro-pic-e1530647597717.png"/></center>

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

## flume

- Transporting web logs at large scale.

## kafka

- Collect data from distributed system of computers and import into Hadoop.