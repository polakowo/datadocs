---
id: hadoop
title: Hadoop Ecosystem
sidebar_label: Hadoop Ecosystem
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/hadoop.md
---

<center><img width=250 src="/datadocs/assets/664px-Hadoop_logo.svg.png"/></center>

- Hadoop is an open-source platform for distributed storage and processing of very large datasets.
- Although Hadoop is best known for MapReduce and its distributed filesystem (HDFS), the term is also used for a family of related projects that fall under the umbrella of infrastructure for distributed computing and large-scale data processing.
    - Most of the core projects are hosted by the Apache Software Foundation.
    - As the Hadoop ecosystem grows, more projects are appearing, not necessarily hosted at Apache, which provide complementary services to Hadoop.
- The Hadoop framework itself is mostly written in the Java programming language.
    - Hadoop requires Java Runtime Environment (JRE)
- Hadoop can be deployed in a traditional onsite datacenter as well as in the cloud (fully-managed)
- A number of companies offer commercial implementations or support for Hadoop.

#### Components

- The term Hadoop is often used for both base modules and sub-modules and also the ecosystem.
- The base Apache Hadoop framework is composed of the following modules:
    - Hadoop Common: contains libraries and utilities needed by other Hadoop modules.
    - Hadoop Distributed File System (HDFS): a distributed file-system that stores data on commodity machines, providing very high aggregate bandwidth across the cluster.
    - Hadoop YARN (introduced in 2012): a platform responsible for managing computing resources in clusters and using them for scheduling users' applications.
    - Hadoop MapReduce: an implementation of the MapReduce programming model for large-scale data processing.
- [The Hadoop Ecosystem Table](https://hadoopecosystemtable.github.io)

<center><img width=700 src="/datadocs/assets/HadoopStack.png"/></center>
<center><a href="http://blog.newtechways.com/2017/10/apache-hadoop-ecosystem.html" style="color: lightgrey">Credit</a></center>

#### Pros

- Enables businesses to easily access new data sources and tap into different types of data.
- Uses a cluster of commodity hardware (cheap machines) to store data.
- Automatically replicates the data that is stored for data durability.
- The tools for data processing are often on the same servers where the data is located (high speed)
- Fault tolerance is provided by erasure coding and data replication.
- Provides high throughput (the number of jobs done per unit time)
- The source code can be modified to suit a specific business requirement.
- Nodes can be added to Hadoop cluster on the fly making it horizontally scalable.
- Most of the emerging technology (Spark, Flink) is compatible with Hadoop.
- Developers can code using many languages.

#### Cons

- Cannot efficiently perform in small data environments.
- Java has been heavily exploited by cybercriminals and implicated in numerous security breaches.
- The data is read from the disk and to the disk which makes read/write operations very expensive.
- At the core, Hadoop has a batch processing engine which is not efficient in stream processing.
- For security, Hadoop uses Kerberos authentication which is hard to manage.
- Security measures are disabled by default due to sheer complexity.
- Developers (even companies as big as Facebook) have always bemoaned the complexity of Hadoop.

#### Future of Hadoop

- Finding Hadoop to be too slow for interactive BI queries resulted in disappointed businesses.
- Hadoop can too complicated and requires a level of configuration and programming knowledge.
- Thus, many companies abandoned their on-premise Hadoop installation in favor of the cloud.
- Cloud vendors are building market share with more simple offerings.
    - More vendor lock-in, less configurability, for more simplicity.
    - The complicated set-up already taken care of.
- But the demand for on-premise Hadoop solution is unlikely to diminish any time soon.
- There is future for a hybrid, containerized platform that resides on top of Kubernetes and can store data in any S3-compatbile object store.
- [Hadoop’s star dims in the era of cloud object data storage and stream computing](https://siliconangle.com/2018/07/09/hadoops-star-dims-era-cloud-object-data-storage-stream-computing/)
- [Is Hadoop Officially Dead?](https://www.datanami.com/2018/10/18/is-hadoop-officially-dead/)
- [BREAKING OUT OF THE HADOOP COCOON](https://www.nextplatform.com/2019/04/08/breaking-out-of-the-hadoop-cocoon/)
- [Will Kubernetes Sink the Hadoop Ship?](https://thenewstack.io/will-kubernetes-sink-the-hadoop-ship/)





