---
id: data-processing
title: Data Processing
sidebar_label: Data Processing
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-processing.md
---

## Batch processing

### MapReduce

- Process the data across the entire cluster.
- YARN and MapReduce were split for other applications to be able to use them.

### TEZ

- Uses directed acyclic graph to optimize queries.
- Used in conjunction with Hive to accelerate it.

### Spark

- Sits either on top of YARN or MESOS.

## Streaming

### STORM

- Processing streaming data.