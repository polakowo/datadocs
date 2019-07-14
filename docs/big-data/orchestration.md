---
id: orchestration
title: Orchestration
sidebar_label: Orchestration
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/orchestration.md
---

### Apache Ambari

- Overview of the cluster and its services.

### YARN

- Manages resources on the cluster.
- Application master monitors worker tasks for errors and hanging.
    - Restarts are needed
    - Preferably on a different node
- What if the application master goes down?
    - YARN can try to restart it
- What if the resource manager goes down?
    - Can set up "high availability" (HA) using ZooKeeper to have a hot standby.

### MESOS

- Alternative to YARN.

### OOZIE

- Way of scheduling jobs on the cluster.

### ZooKeeper

- Technology for coordinating nodes on the cluster.
- Who is up, who is down, who is master.