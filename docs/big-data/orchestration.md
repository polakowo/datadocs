---
id: orchestration
title: Orchestration
sidebar_label: Orchestration
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/orchestration.md
---

## Hadoop YARN

- YARN (Yet Another Resource Negotiator) is responsible for allocating system resources to various applications running on a Hadoop cluster and scheduling tasks to be executed on its nodes.
    - YARN is a compute layer on top of HDFS, introduced in Hadoop 2.
- YARN sits between HDFS and the processing engines being used to run applications.
    - Decoupling from MapReduce 2 enabled Hadoop clusters to run interactive querying, streaming data and real-time analytics.
    - Also enabled development of MapReduce alternatives (Spark, Tez) on top of YARN.
- YARN offers scalability, resource utilization, compatibility, multi-tenancy, and high availability.
    - Can dynamically allocate pools of resources to applications.
    - Data locality: Tries to run tasks on the same nodes which hold the relevant HDFS blocks.
- [Introducing Apache Hadoop YARN](https://hortonworks.com/blog/introducing-apache-hadoop-yarn/)
- [Nomad vs. Yarn vs. Kubernetes vs. Borg vs. Mesos vs… you name it!](https://medium.com/@arseny.chernov/nomad-vs-yarn-vs-kubernetes-vs-borg-vs-mesos-vs-you-name-it-7f15a907ece2)

### Components

- YARN decentralizes execution and monitoring of processing jobs.

<img width=700 src="/datadocs/assets/yarn.png"/>
<center><a href="https://www.youtube.com/watch?v=1vg_W-MMZpA" style="color: lightgrey">Credit</a></center>

- Client:
    - Submits an application.
    - Contacts ResourceManager/ApplicationMaster to monitor application’s status.
- Global ResourceManager:
    - Consists of Scheduler and ApplicationsManager.
    - The Scheduler allocates resources to the various running applications according to constraints such as queue capacities and user limits.
    - The ApplicationsManager maintains a collection of submitted applications.
    - For each application, launches the ApplicationMaster.
- Per-application ApplicationMaster:
    - Negotiates resources with the Scheduler.
    - Works with the NodeManagers to execute and monitor the containers and their resource consumption.
    - Once the application is complete, deregisters with the ResourceManager and shuts down.
- Per-node slave NodeManager:
    - Launches the applications’ containers.
    - Monitors their resource usage.
    - Kills a container based on directions from the ResourceManager.
- Per-application Container running on a NodeManager:
    - A collection of physical resources such as RAM, CPU cores and disk on a single node.

## Mesos

<img width=250 src="/datadocs/assets/1200px-Apache_Mesos_Logo.svg.png"/>

- [Apache Mesos](http://mesos.apache.org) is an open-source project to manage computer clusters.
- Abstracts CPU, memory, storage, and other compute resources away from machines (physical or virtual), enabling fault-tolerant and elastic distributed systems to easily be built and run effectively.
- Mesos is comparable to Google's Borg scheduler.
- Built using the same principles as the Linux kernel but for distributed apps.
- Focuses on resource management and decouples scheduling by allowing pluggable frameworks.
    - Two-level architecture enables "application-aware" scheduling.
> Mesos' ability to manage each workload the way it wants to be treated has led many companies to use Mesos as a single unified platform to run a combination of micro-services and data services together.
- Main tasks:
    - Abstracts data center resources into a single pool to simplify resource allocation.
    - Colocates diverse workloads on the same infrastructure.
    - Automates day-two operations for application-specific tasks.
    - Runs new applications and technologies without modifying the cluster manager.
    - Elastically scales the application and the underlying infrastructure.
- Main features:
    - Can easily scale to 10,000s of nodes.
    - Fault-tolerant replicated master and agents using Zookeeper. Highly available.
    - Native support for launching containers with Docker and AppC images.
    - Support for running cloud native and legacy applications in the same cluster.
    - HTTP APIs for developing new distributed applications, operating the cluster, and monitoring.
    - Offers a built-in Web UI for viewing cluster state.
- Can allocate resources not just for big data:
    - Java apps, stateless Docker containers, batch jobs, real-time analytics, and more.
- Mesos was quickly adopted by Twitter, Apple(Siri), Yelp, Uber, Netflix.
- [Mesos Architecture](http://mesos.apache.org/documentation/latest/architecture/)

#### Compared to Hadoop YARN

- YARN is still better if the data resides on HDFS.
- Mesos is a container management system:
    - Solves a more general problem than YARN.
- Apache Spark and Apache Storm can both natively run on top of Mesos.
    - Spark on Mesos is limited to one executor per slave though.
- YARN is a monolithic scheduler, while Mesos is a two-tiered system:
    - Makes offers of resources to your application ("framework")
    - Your framework decides whether to accept or reject them.
    - You also decide on your own scheduling algorithm.
- YARN is optimized for long, analytical jobs like in Hadoop.
    - Mesos built to handle that as well as to handle long and short lives processes.
- Hadoop YARN may be integrated with Mesos using Myriad to intermix computing resources.
    - So that spare capacities on Hadoop get used, to safe money.

#### Compared to Kubernetes

> Kubernetes and Mesos are a match made in heaven.
- Mesos is a distributed system kernel that makes a cluster look like one giant computer system.
    - Abstracts underlying hardware away and just exposes the resources.
    - Contains primitives for writing distributed applications (Spark was built for Messos)
    - Yet Kubernetes is one (amongst others) frameworks that can be run on Mesos.
- Kubernetes can provide the scheduling logic and Mesos can take care of running jobs.
    - Kubernetes enables the Pod (group of co-located containers) abstraction, along with Pod labels for service discovery, load-balancing, and replication control. 
    - Mesos provides the fine-grained resource allocations for pods across nodes in a cluster.
- Mesos is being adapted to add a lot of the Kubernetes concepts.
- [Docker vs. Kubernetes vs. Apache Mesos](https://d2iq.com/blog/docker-vs-kubernetes-vs-apache-mesos)
