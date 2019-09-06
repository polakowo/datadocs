---
id: data-engineering
title: Data Engineering
sidebar_label: Data Engineering
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/data-engineering.md
---

- Companies today need to be able to reliably store, process and query its huge inflows. 
- As a result, the data infrastructure needs to be distributed, scalable (petabytes) and reliable.
- Data engineering thinks about the end-to-end process as “data pipelines“.

#### Data engineers

- Data engineers are highly specialized software engineers who create and maintain robust big data pipelines. 
- Together with data scientists who analyze the data, they form the basis of the data teams.
    - Data engineers are the experts on which data scientists depend in order to be able to work.
    - They are in charge of pulling, cleaning and loading the data into data stores.
    - Over the years though, terminology and roles have become harder to separate.
    - Data engineering is much closer to software engineering than it is to a data science.
- Data engineers are one of the most in-demand job roles at today’s leading companies.
- The tool set of a data engineer includes:
    - Hadoop, Spark, Python, Scala, Java, C++, SQL, AWS/Redshift, Azure
    - To stay marketable, keeping up to date is more important than ever.
    - [A Turbulent Year: The 2019 Data & AI Landscape](https://mattturck.com/data2019/)
    - [The Rise of the Data Engineer](https://www.freecodecamp.org/news/the-rise-of-the-data-engineer-91be18f1e603/)
- In smaller environments:
    - Data engineers usually set up and operate platforms like Hadoop/Hive/HBase, Spark, and the like.
    - Use hosted services offered by Amazon or Databricks.
    - Get support from companies like Cloudera or Hortonworks.

#### Evolution of data engineering

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

<img width=300 src="/datadocs/assets/Big-data-1024x722.png"/>
<center><a href="https://www.actify.com/industry-topics/10-big-data-use-cases-manufacturing/" style="color: lightgrey">Credit</a></center>

- Handling and analyzing very large amounts of data is an urgent problem in many business areas. 
- The trend towards "Big Data" is caused by a host of developments:
    - The creation and storage of large data sets becomes feasible and economically viable.
    - Technical advances for example in multi-core systems and cloud computing make it possible.
    - Such amounts of data are now are created in many areas of life (e.g. sensor data)

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

## Designing systems

#### Thinking about requirements

- Always approach the problem from the standpoint of your end user.
- Start with the end user's needs and **work backwards** towards where the data is coming from.
    - Sometimes you need to meet in the middle.
- What sort of access patterns do you anticipate from your end users?
    - Analytical queries that span large time ranges?
    - Huge amounts of small transactions for very specific rows of data?
- What availability do these users demand?
    - How quickly does a response need to be?
    - Milliseconds? HBase, Cassandra.
- What consistency do these users demand?
- Just how big is your big data?
    - Do you really need a cluster?
- Timeliness:
    - Can queries be based on day-old data? Minute-old? Scheduled jobs.
    - Or must they be (near) real-time? Spark Streaming, Storm or Flink with Kafka or Flume.
- How much internal infrastructure and expertise is available?
    - Do systems you already know fit the bill?
    - Should you use proprietary solutions or the cloud technology?
    - Think carefully, since moving it will be difficult later on.
    - If relaxing a "requirement" saves money and time - at least ask the manager.
- Does your organization have existing components you can use?
    - What's the least amount of infrastructure you need to build?
    - Don't build a new DWH if you already have one.
    - Rebuilding existing solution may have a negative business value.
- What about data retention?
    - Do you need to keep the data around forever, for example, for auditing?
    - Or do you need to purge it often, for example, for privacy?
- What about security?
    - Make sure you're in compliance with any regulations in the countries you'll operate in.


#### Example

- A system to track and display the top 10 best-selling items on an e-commerce website.
- What are the requirements? Work backwards!
- There are millions of end users, generating thousands of queries per second.
    - Page latency is important so it must be fast. 
    - Some distributed NoSQL solution would fit here (such as Apache Cassandra)
    - Access patten is simple: *"Give me the current top N sellers in category X"*
    - Hourly updates are probably good enough.
    - Consistency is not important.
    - Must be highly available (customers don't like broken websites)

<center><img width=100 src="/datadocs/assets/2000px-Cassandra_logo.svg.png"/></center>

- How does the data get into Cassandra?
    - Apache Spark can talk to Cassandra. 
    - And Spark can add things up over windows.

<center><img width=100 src="/datadocs/assets/1200px-Apache_Spark_Logo.svg.png"/></center>

- How does the data get into Spark?
    - Kafka or Flume - either work.
    - Flume is purpose-built for HDFS, which may or may not need.
    - But Flume is also purpose-built for log ingestion.
    - There may be already a [Log4j](https://logging.apache.org/log4j/2.x/) interceptor on the servers that process purchases available.

<center><img width=100 src="/datadocs/assets/1*PECy2wFJ-oyHaEXnbiYE_g.png"/></center>

- Maybe you already have an existing purchase database.
    - Instead of streaming, hourly batch jobs may also do the trick.
- Purchase data is sensitive - get a security review.
    - Blasting around raw logs that include PII is a bad idea.
    - Strip out data you don't need at the source.
    - Some database or publisher may be involved where PII is scrubbed.
- Security considerations may even force you into a totally different design.
    