---
id: data-engineering
title: Data Engineering
sidebar_label: Data Engineering
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-engineering.md
---

- Data engineering field is a superset of BI and data warehousing that brings more elements from SE.
- For data, the two primary staffing segments are data scientists and data engineers.
    - Data engineers are the experts on which data scientists depend in order to be able to work.
    - They are in charge of pulling, cleaning and loading the data into data stores.
    - Over the years though, terminology and roles have become harder to separate.
    - Data engineering is much closer to software engineering than it is to a data science.
- The tool set of a data engineer includes:
    - Hadoop, Spark, Python, Scala, Java, C++, SQL, AWS/Redshift, Azure
    - To stay marketable, keeping up to date is more important than ever.
    - [A Turbulent Year: The 2019 Data & AI Landscape](https://mattturck.com/data2019/)
    - [The Rise of the Data Engineer](https://www.freecodecamp.org/news/the-rise-of-the-data-engineer-91be18f1e603/)
- In smaller envirnoments:
    - Data engineers usually set up and operate platforms like Hadoop/Hive/HBase, Spark, and the like.
    - Use hosted services offered by Amazon or Databricks.
    - Get support from companies like Cloudera or Hortonworks.

## Evolution of data engineering

- [Data Engineering Introduction and Epochs](https://learn.panoply.io/hubfs/Data%20Engineering%20-%20Introduction%20and%20Epochs.pdf)
- Hadoop:
    - With Hadoop open-sourced in 2006, it became easier and cheaper to store large amount of data.
    - Hadoop (unlike traditional RDBMS databases) did not require the data to be structured.
    - Development of Map Reduce jobs in Java forced the emergence of Backend Engineers.
    - That's until Hive was open sourced in 2010.
- Data orchestration enginees:
    - Companies faced with challenge to operate complex data flows without any tools.
    - Spotify open-sourced Luigi in 2012.
    - Airbnb open-sourced Airflow in 2015 (inspired by a similar system at Facebook).
    - Based on the traction in the PyData ecosystem, most orchestration engines were built with Python.
    - Python has become the favorite programming language for Production Engineers.
- Machine learning:
    - With enormous growth in data, machine learning quickly gained traction.
    - Until the advent of Hadoop, ML models were usually trained on a single machine.
    - In the early days of Hadoop, ML models required some advanced software engineering knowledge (e.g. use of frameworks such as Mahout upon MapReduce)
    - Many Backend Engineers have become Machine Learning Engineers.
    - Advancements in sklearn and orchestration engines made production-ready workflows easier.
- Spark and real-time processing:
    - The Spark’s MLlib in 2014 democratized ML computation on Big Data.
    - Spark further offered a way for data engineers to easily process streaming data.
- Cloud development and serverless architecture:
    - AWS was officially launched in 2006.
    - Elastic MapReduce (2009) made it easier to dynamically spin up and scale Hadoop clusters.
    - The cloud made storage and compute essentially infinite.
    - Elasticity of the cloud made it much easier to handle high peak batch jobs. 
    - But it came at the cost of having to manage infrastructure and the scaling process through code.
    - Lambda function (2014) kicked off the serverless movement.
    - Data now could be easily ingested without managing infrastructure.

## Big data

#### Hardware

- CPU is the brains of a computer:
    - Directs other components as well as runs mathematical calculations.
    - Registers hold data that the CPU is working with at the moment (e.g. cumulative sum)
    - Registers avoid having to send data back and forth between memory (RAM) and the CPU.
    - 2.5 billion operations per second x 8 bytes per operation = 20 billion bytes per second.
    - Most of the time, CPU is sitting idle while waiting for input data from RAM.
- Memory takes 200x longer than the CPU:
    - Known to be "efficient, expensive, and ephemeral (volatile)"
    - Data stored in RAM gets erased once the computer shuts down.
    - RAM is relatively expensive.
- Magnetic disks can be 200x slower and SSDs can be 15x slower than RAM.
- Network transfer takes 20x longer than SSDs.
    - Transferring data across a network is the biggest bottleneck when working with big data.
    - Distributed systems try to minimize shuffling data back and forth between nodes.
- [Latency Numbers Every Programmer Should Know](http://people.eecs.berkeley.edu/~rcs/research/interactive_latency.html)
- Even if the entire dataset cannot fit into the RAM, it can still be processed chunk wise.
    - [Iterating through files chunk by chunk](https://pandas.pydata.org/pandas-docs/stable/user_guide/io.html#io-chunking)

#### The V's of big data

- Volume:
    - The sheer volume of data that is produced each day (petabytes, exabytes, zettabytes)
    - Cannot no longer be saved or analyzed using conventional data processing methods.
- Velocity:
    - Speed with which the data is generated, analyzed and reprocessed.
- Variety:
    - Diversity of data types and data sources.
    - 80% of the data in the world today is unstructured.
- Veracity:
    - “garbage in, garbage out”
    - For big data systems to be reliable and usable, the data has to be also accurate.
- Value:
    - Added value for companies.
    - It's a question of generating business value from their investments.