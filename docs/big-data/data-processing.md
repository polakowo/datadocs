---
id: data-processing
title: Data Processing
sidebar_label: Data Processing
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-processing.md
---

## Functional programming

- The PySpark API is written with functional programming principles in mind.
- The PySpark API uses the py4j library to make calls directly to the JVM.
- In distributed systems, functions should not have any side effects on variables outside of their scope.
    - A pure function is a function where the return value is only determined by its input values.
- Lazy evaluation: Spark builds DAGs
    - Waits to streamline and combine all operations into a single stage.
    - RDDs are fault-tolerant datasets distributed across a cluster.
    - To get Spark to actually run the map step, you need to use an "action", such as `collect`.
- Spark is not changing the original data set: Spark is merely making a copy.
- Imperative programming: How? Python
- Declarative programming: What? SQL
    - Declarative systems are usually an abstract layer of imperative systems.
- [The Lambda Calculus for Absolute Dummies (like myself)](http://palmstroem.blogspot.com/2012/05/lambda-calculus-for-absolute-dummies.html)

## Hadoop MapReduce

<center><img width=250 src="/datadocs/assets/Apache-MapReduce-logo-Hadoop-Ecosystem-Edureka.jpg"/></center>

- MapReduce is a programming model and runtime for processing large data-sets (in clusters).
- Divides the data up into partitions that are MAPPED (transformed) and REDUCED (aggregated).
    - In the map step, each data is analyzed and converted into a (key, value) pair. Then these key-value pairs are shuffled across the cluster so that all keys are on the same machine. In the reduce step, the values with the same keys are combined together.
- Google published MapReduce paper in 2004 at OSDI.
- As the processing component, MapReduce is the heart of Apache Hadoop.
    - Typically the compute nodes and the storage nodes are the same.
    - MapReduce sits on top of YARN.
- MapReduce = functional programming meets distributed processing.
    - Computation as application of functions
    - Programmer specifies only “what” (declarative programming)
    - System determines “how”
- MapReduce is resilient to failures.
- The execution framework:
    - Scheduling: assigns workers to map and reduce tasks.
    - Data distribution: moves processes to data.
    - Synchronization: gathers, sorts, and shuffles intermediate data.
    - Errors and faults: detects worker failures and restarts.
- MapReduce is natively Java.
    - Streaming allows interfacing to other languages such as Python.
- Use cases:
    - One-iteration algorithms are perfect fits (Naive Bayes, kNN)
    - Multi-iteration algorithms may be slow (K-Means)
    - Algorithms that require large shared data with lots of synchronization are not good fits (SVM)
- Drawbacks:
    - MapReduce writes intermediate results to disk.
    - Too low level: Manual programming of per record manipulation.
    - Nothing new: Map and reduce are classical Lisp or higher order functions.
    - Low per node performance: Due to replication, data transfer, shuffle, and a lot of I/O to DFS.
    - Not designed for incremental/streaming tasks.

### Stages

- The MapReduce framework operates exclusively on key/value pairs.

<center><img width=600 src="/datadocs/assets/mapreduce.png"/></center>

- Map:
    - Mapper maps input key/value pairs to a set of intermediate key/value pairs.
    - Master program divides up tasks based on location of data (same machine or at least same rack)
    - Runs in parallel.
- Combine (optional):
    - Can save network time by pre-aggregating at mapper.
    - For associative operations like sum, count, max.
    - Decreases size of intermediate data.
- Shuffle and sort:
    - Different mappers may have output the same key.
    - Reduce phase can’t start until map phase is completely finished.
    - Shuffle is the process of moving map outputs to the reducers.
    - While map-outputs are being fetched, they are merged and sorted.
- Partition:
    - Partitioner partitions the key space.
    - All values with the same key need to be sent to the same reducer.
    - Usually, system distributes the intermediate keys to reduce workers “randomly”.
- Reduce:
    - Reducer combines all intermediate values for a particular key.
    - If some workers are slow (Straggler problem), start redundant workers and take the fastest one.
    - Runs in parallel.
- [MapReduce Tutorial](https://hadoop.apache.org/docs/r1.2.1/mapred_tutorial.html)
```py
# Example: Break down movie ratings by rating score
from mrjob.job import MRJob
from mrjob.step import MRStep

class RatingsBreakdown(MRJob):
    def steps(self):
        return [
            MRStep(mapper=self.mapper_get_ratings,
                   reducer=self.reducer_count_ratings)
        ]

    def mapper_get_ratings(self, _, line):
        (userID, movieID, rating, timestamp) = line.split('\t')
        yield rating, 1

    def reducer_count_ratings(self, key, values):
        yield key, sum(values)

if __name__ == '__main__':
    RatingsBreakdown.run()
```

## Apache Tez

<center><img width=200 src="/datadocs/assets/ApacheTezLogo_lowres.png.jpeg"/></center>

- Apache Tez expresses complex computations in MapReduce programs as directed acyclic graphs (DAG), permitting dynamic performance optimizations.
- Improves the MapReduce paradigm by dramatically improving its speed.
- Apache Tez can only perform interactive processing.
- Integrates well with Pig, Hive and other engines (can be selected via checkbox)
- [Apache Tez: Overview](https://hortonworks.com/apache/tez/#section_1)

## Apache Spark

<center><img width=200 src="/datadocs/assets/1200px-Apache_Spark_Logo.svg.png"/></center>

- Apache Spark is an open-source distributed general-purpose cluster-computing framework.
    - Originally developed at the University of California and donated the Apache Software Foundation.
    - Provides an interface for programming clusters with implicit data parallelism and fault tolerance.
    - Can perform batch, stream, interactive and graph processing.
- Runs applications on Hadoop up to 100 times faster in memory and 10x faster on disk.
    - Offers real-time computation and low latency because of in-memory computation.
    - Makes accessing stored data quickly by keeping data in servers' RAM.
    - Achieves high performance using DAGScheduler, query optimizer, and physical execution engine.
    - Simple programming layer provides powerful caching and disk persistence capabilities.
- Spark is a polyglot:
    - Supports Scala, Python, R, and SQL programming languages.
    - Runs on Hadoop, Apache Mesos, Kubernetes, standalone, or in the cloud.
    - Can access data in HDFS, Cassandra, HBase, Hive, and other data sources.
    - Spark on cloud offers faster time to deployment, better availability, more frequent feature updates, more elasticity, more geographic coverage, and lower costs linked to actual utilization.
- Limitations:
    - Spark is near real-time processing of live data: it operates on micro-batches of records. Native streaming tools such as Storm, Apex, or Flink are more suitable for low-latency applications. Flink and Apex can also be used for batch computation.
    - Currently, Spark only supports ML algorithms that scale linearly with the input data size.
    - Does not have its own file management system.
    - Requires lots of RAM to run in-memory and thus is expensive.
- Not a good fit for small datasets, there are other tools which are preferred:
    - AWK - a command line tool for manipulating text files.
    - R - a programming language and software environment for statistical computing.
    - PyData Stack, which includes pandas, matplotlib, numpy, and scikit-learn among other libraries.
    - Use pandas by chunking and filtering the data, and writing out the relevant parts to disk.
    - Use libraries such as SQLAlchemy, to leverage pandas and SQL simultaneously.

#### Components

- Spark Core is the base engine for large-scale parallel and distributed data processing.
    - Provides distributed task dispatching, scheduling, and basic I/O functionalities.
    - Centered on the RDD abstraction.
    - Other libraries are built on top of this engine.

```py
# Example: RDD API

text_file = sc.textFile("hdfs://...")
counts = text_file.flatMap(lambda line: line.split("\s+")) \
                  .map(lambda word: (word, 1)) \
                  .reduceByKey(lambda a, b: a + b)
counts.saveAsTextFile("hdfs://...")
```

- Spark SQL blurs the lines between RDDs and relational tables.
    - Provides a programming abstraction called DataFrames.
    - Provides SQL language support, with command-line interfaces and ODBC/JDBC connections.
    - Supports the open source Hive project, and its SQL-like HiveQL query syntax.
    - Includes a cost-based optimizer, columnar storage, and code generation to make queries fast.

```py
# Example: DataFrame API

df = text_file.map(lambda r: Row(r)).toDF(["line"])
text_file.select(explode(split(col("line"), "\s+"))
         .alias("word"))
         .groupBy("word")
         .count()
```

- Spark MLlib is used to perform machine learning algorithms. 
    - These include statistics, classification and regression, collaborative filtering techniques, cluster analysis methods, dimensionality reduction techniques, feature extraction and transformation functions, and optimization algorithms.
    - 9 times as fast as the disk-based implementation used by Apache Mahout.
    - Scales better than Vowpal Wabbit.

```py
# Example: MLlib API

df = sqlContext.createDataFrame(data, ["label", "features"])
lr = LogisticRegression(maxIter=10)
model = lr.fit(df)
model.transform(df).show()
```

- Spark Streaming supports scalable and fault-tolerant processing of streaming data.
    - Ingests data in mini-batches and performs RDD transformations on those mini-batches of data.
    - Thus, code written for batch analytics can be used in streaming analytics.
    - Can integrate with established sources of data streams like Flume and Kafka.
- GraphX is the Spark API for graphs and graph-parallel computation. 
    - Includes a number of widely understood graph algorithms, including PageRank.
    - RDDs are immutable and thus GraphX is unsuitable for graphs that need to be updated.
    - GraphX can be viewed as being the Spark in-memory version of Apache Giraph.

#### Compared to MapReduce

- The Hadoop ecosystem is a slightly older technology than the Spark ecosystem.
- MapReduce is slower than Spark because it writes data out to disk during intermediate steps.
- While Spark is great for iterative algorithms, Hadoop MapReduce is good at batch processing.
- Many big companies, such as Facebook and LinkedIn, are still running on Hadoop.
    - Migrating legacy code from Hadoop to Spark might not be worth the cost.
- Spark runs up to 100 times faster than Hadoop MapReduce for large-scale data processing.
> "Spark is beautiful. With Hadoop, it would take us six-seven months to develop a machine learning model. Now, we can do about four models a day.” 

### Architecture

- Apache Spark Framework uses a master–slave architecture.
- Master node:
    - Driver: Schedules the job execution and negotiates with the cluster manager.
    - SparkContext: Represents the connection to the Spark cluster.
    - DAGScheduler: Computes a DAG of stages for each job and submits them to TaskScheduler.
    - TaskScheduler: Sends tasks to the cluster, runs them, and retries if there are failures.
    - SchedulerBackend: Allows plugging in different implementations (Mesos, YARN, Standalone)
- Cluster manager:
    - Either Spark’s own standalone cluster manager, Mesos, YARN or Kubernetes.
- Slave node (Executor):
    - Executor is a distributed agent responsible for the execution of tasks.
    - Stores the computation results data in memory, on disk or off-heap.
    - Interacts with the storage systems.
- [Cluster Mode Overview](https://spark.apache.org/docs/latest/cluster-overview.html)
- [Apache Spark: core concepts, architecture and internals](http://datastrophic.io/core-concepts-architecture-and-internals-of-apache-spark/)

<center><img width=800 src="/datadocs/assets/Spark-Overview--1-.png"/></center>
<center><a href="http://datastrophic.io/core-concepts-architecture-and-internals-of-apache-spark/" style="color: lightgrey">Credit</a></center>

#### DAG

- MapReduce forces a particular linear dataflow structure on distributed programs.
    - Each MapReduce operation is independent and Hadoop has no idea which one comes next.
- The limitations of MapReduce in Hadoop became a key point to introduce DAG in Spark.
    - Spark forms a DAG of consecutive computation stages.
    - Allows the execution plan to be optimized, e.g. to minimize shuffling data around.
- DAG (Directed Acyclic Graph) is a finite directed graph with no directed cycles.
    - A set of vertices and edges, where vertices represent RDDs and edges represent transformations.
- When an action is called on RDD at a high level, DAG is created and submitted to the DAGScheduler.
    - DAGScheduler is the scheduling layer that implements stage-oriented scheduling.
    - Transforms a logical execution plan (GAD) into a physical execution plan (stages of tasks)
    - The narrow transformations will be grouped (pipelined) together into a single stage.
- There are two transformations that can be applied onto RDDs:
    - Narrow transformations: Stages combine tasks which don’t require shuffling/repartitioning of the data (e.g., map, filter). The stages that are not interdependent may be executed in parallel.
    - Wide transformations: Require shuffling and result in stage boundaries.
- The DAGScheduler will then submit the stages to the TaskScheduler.

<center><img width=600 src="/datadocs/assets/GoYQB.png"/></center>
<center><a href="https://stackoverflow.com/questions/25836316/how-dag-works-under-the-covers-in-rdd" style="color: lightgrey">Credit</a></center>

#### RDD

- The RDD APIs have been on Spark since the 1.0 release.
- RDD is a read-only multiset of data items distributed over a cluster of machines.
    - Resilient: Fault tolerant and transformations can be repeated in the event of data loss.
    - Distributed: Distributed data among the multiple nodes in a cluster.
    - Dataset: Collection of partitioned data with values.
- Distributed collection:
    - RDD uses MapReduce operations which are widely adopted for processing.
- Immutable:
    - RDDs composed of a collection of records which are partitioned.
    - A partition is a basic unit of parallelism in an RDD.
    - Each partition is one logical division of data which is immutable.
    - Immutability helps to achieve consistency in computations.

<center><img width=250 src="/datadocs/assets/IEcsA.png"/></center>
<center><a href="https://stackoverflow.com/questions/34433027/what-is-rdd-in-spark" style="color: lightgrey">Credit</a></center>

- Fault tolerant:
    - Fault-tolerance is achieved by keeping track of the "lineage" of each RDD: each RDD maintains a pointer to one or more parents and metadata about the relationship.
    - Rather than doing data replication, computations can be reconstructed in case of data loss.
    - This saves effort in data management and replication and thus achieves faster computation.
- Lazy evaluations:
    - The transformations are only computed when an action requires a result to be returned.
- Support two types of operations: 
    - Transformations: Create a new dataset from an existing one.
    - Actions: Return a value to the driver program after running a computation on the dataset.
    - They apply to the whole dataset not on a single element.
    - The original RDD remains unchanged throughout.
- Can easily and efficiently process data which is structured as well as unstructured data.
- Can be created by parallelizing a collection or referencing a dataset in an external storage system.
- Remain in memory, greatly increasing the performance of the cluster.
    - Only spilling to disk when required by memory limitations.
    - Supports persisting in memory or on disk, or replicating across multiple nodes.
- Cons:
    - Does not support compile-time safety for both syntax and analysis errors.
    - RDDs don’t infer the schema of the ingested data.
    - Cannot take advantage of the catalyst optimizer and Tungsten execution engine.

#### DataFrame (Untyped API)

- Spark introduced DataFrames in Spark 1.3 release.
- A DataFrame is organized into named columns.
    - It is conceptually equivalent to a table in a relational database.
- DataFrame is a distributed collection of Row objects:
    - DataFrame is simply a type alias of Dataset[Row].
    - Row is a generic untyped JVM object.
- Hive compatibility:
    - One can run unmodified Hive queries on existing Hive warehouses.
    - Reuses Hive frontend and MetaStore and gives full compatibility.
- Along with Dataframe, Spark also introduced Catalyst optimizer.
    - Catalyst contains a general library for representing trees and applying rules to manipulate them.
    - Supports both rule-based and cost-based optimization.
- Tungsten:
    - Tungsten provides a physical execution backend which explicitly manages memory and dynamically generates bytecode for expression evaluation.
- Pros:
    - Expression-based operations and UDFs
    - Logical plans and optimizer
    - Fast/efficient internal representation
- Cons:
    - Does not support compile-time safety for analysis errors (only syntax errors)
    - Cannot recover domain object (e.g. Person) once transformed into DataFrame (Row)

#### Dataset (Typed API)

- Spark introduced Dataset in Spark 1.6 release.
- Provides best of both RDD and DataFrame.
    - An extension to DataFrames that provides a type-safe, object-oriented programming interface.
    - Allows to work with both structured and unstructured data.
- Datasets are dictated by a case class defined in Scala or a class in Java.
- Allows to easily convert existing RDDs and DataFrames into Datasets without boilerplate code.
- Since Python and R have no compile-time type-safety, they support only DataFrames.
- Pros:
    - Best of both worlds: type safe + fast
- Cons:
    - Slower than DataFrames
    - Not as good for interactive analysis, especially Python
    - Requires type casting to string

<center><img width=600 src="/datadocs/assets/Unified-Apache-Spark-2.0-API-1.png"/></center>
<center><a href="https://databricks.com/blog/2016/07/14/a-tale-of-three-apache-spark-apis-rdds-dataframes-and-datasets.html" style="color: lightgrey">Credit</a></center>

- Both DataFrames and Datasets internally do final execution on RDDs.
- Since Spark 2.0, DataFrame and Datasets APIs are unified into a single Datasets API.
- [A Tale of Three Apache Spark APIs: RDDs, DataFrames, and Datasets](https://databricks.com/blog/2016/07/14/a-tale-of-three-apache-spark-apis-rdds-dataframes-and-datasets.html)
