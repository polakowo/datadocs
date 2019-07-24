---
id: data-processing
title: Data Processing
sidebar_label: Data Processing
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-processing.md
---

## Hadoop MapReduce

<center><img width=250 src="/datadocs/assets/Apache-MapReduce-logo-Hadoop-Ecosystem-Edureka.jpg"/></center>

- MapReduce is a programming model and runtime for processing large data-sets (in clusters).
- Divides the data up into partitions that are MAPPED (transformed) and REDUCED (aggregated).
- Google published MapReduce paper in 2004 at OSDI.
- As the processing component, MapReduce is the heart of Apache Hadoop.
    - Typically the compute nodes and the storage nodes are the same.
    - MapReduce sits on top of YARN.
- MapReduce = functional programming meets distributed processing.
    - Computation as application of functions
    - Programmer specifies only “what” (declarative programming)
    - System determines “how”
- Ingredients:
    - Very large scale data: peta, exa bytes
    - Automatic parallelization and distribution
    - Resilient to failure
    - I/O scheduling
    - Status and monitoring
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
    - Algorithms that require large shared data with a lot of synchronization are not good fits (SVM)
- Drawbacks:
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
    - Shuffle is the process of moving map outputs to the reducers.
    - While map-outputs are being fetched they are merged and sorted.
- Partition:
    - Partitioner partitions the key space.
    - All values with the same key need to be sent to the same reducer.
    - Usually, system distributes the intermediate keys to reduce workers “randomly”.
- Reduce:
    - Reducer combines all intermediate values for a particular key.
    - Reduce phase can’t start until map phase is completely finished.
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

## Apache Spark

- Sits either on top of YARN or MESOS.

## Apache Tez

<center><img width=200 src="/datadocs/assets/ApacheTezLogo_lowres.png.jpeg"/></center>

- Apache Tez expresses complex computations in MapReduce programs as directed acyclic graphs (DAG), permitting dynamic performance optimizations.
- Improves the MapReduce paradigm by dramatically improving its speed.
- Integrates well with Pig, Hive and other engines (can be selected via checkbox)
- Builds upon YARN.
- [Apache Tez](https://hortonworks.com/apache/tez/#section_1)