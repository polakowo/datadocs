---
id: orchestration
title: Orchestration
sidebar_label: Orchestration
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/orchestration.md
---

## Hadoop YARN

- YARN (Yet Another Resource Negotiator) is responsible for allocating system resources to the various applications running in a Hadoop cluster and scheduling tasks to be executed on different cluster nodes.
- YARN sits between HDFS and the processing engines being used to run applications.
- Decoupling from MapReduce 2 enabled Hadoop clusters to run interactive querying, streaming data and real-time analytics.
- YARN offers scalability, resource utilization, compatibility, multi-tenancy, and high availability.
- Can dynamically allocate pools of resources to applications.
- [Introducing Apache Hadoop YARN](https://hortonworks.com/blog/introducing-apache-hadoop-yarn/)
- [Nomad vs. Yarn vs. Kubernetes vs. Borg vs. Mesos vs… you name it!](https://medium.com/@arseny.chernov/nomad-vs-yarn-vs-kubernetes-vs-borg-vs-mesos-vs-you-name-it-7f15a907ece2)

#### Components
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