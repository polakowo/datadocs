---
id: data-science
title: Data Science
sidebar_label: Data Science
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/machine-learning/data-science.md
---

> **Some tips on learning Data Science:**  
Follow guided learning, stay curious, watch the market and the industry, find the key players in education and product development, get to know their interests, follow that interests and try to draw a roadmap that you can use for your learning activities.

## Terms comparison

- [Data Science vs Machine Learning vs Data Analytics vs Business Analytics](https://365datascience.com/data-science-vs-ml-vs-data-analytics/)

#### Data

- Data is raw, unorganized facts that need to be processed.
- [Data, Information, Knowledge, and Wisdom](https://otec.uoregon.edu/data-wisdom.htm)

#### Big Data

- Extremely large data sets that may be analysed computationally to reveal patterns, trends, and associations, especially relating to human behaviour and interactions.
- Focussed around creating large data pipelines rather than creating value out of the data.

#### Data mining

- Most widely used in the late 90's and early 00's when a business consolidated all of its data into DWH. 
- Focused on:
    - Discovering previously unknown trends, anomalies and correlations.
    - Searching through enormous quantities of data without having any idea what to look for.
    - Identifying correlations simply through brute force analysis.
- Text data mining:
    - The process of deriving valuable, unstructured data from a text.

#### Data analysis

- Analysis is about separating a dataset into easy-to-digest chunks and studying them individually and examine how they relate to each other.
- Done on the past data to answer questions "Why?" and "How?" 
- Analysis looks backwards over time, providing marketers with a historical view of what happened.

#### Data analytics

- Data analytics is a broader term and includes data analysis as necessary subcomponent.
- Analytics is the application of logical and computational reasoning to the component parts obtained in the analysis.
    - For example, running through various data sets looking for meaningful correlations between them.
- Typically, analytics look forward to model the future or predict a result.
    - For example, discover useful patterns/findings, uncover hidden patterns, market trends and customers preferences to provide useful information that can help a company to produce future decisions.
- Types:
    - Qualitative: intuition + analysis
    - Quantitative: formulas + algorithms
- Activities that belong ONLY to data analytics include digital signal processing.

#### Predictive Analytics

- Creating a quantitative model that allows an outcome to be predicted.
- The predictive model determines what signals in the data can be used to make an accurate prediction. 

#### Business analytics

- Some business activities are subjective or experience-driven:
    - Business case studies: Past-oriented
    - Qualitative analysis: Future-oriented
- Some business activities are data-driven (and belong to data analytics):
    - Preliminary data report: Past-oriented, the first step of any data analysis.
    - Reporting with visuals: Past-oriented
    - Creating dashboards: Past-oriented
    - Sales forecasting: Future-oriented
- Activities that belong ONLY to business analytics include subjective activities.

#### Business intelligence

<img width=150 src="/datadocs/assets/Clean-BI.png"/>
<center><a href="https://bics.com/infographic-business-intelligence/" class="credit">Credit</a></center>

- The process of analyzing, understanding and reporting historical business data.
- Aims to explain past events using business data.
    - "What happened? When did it happen? Why it happened?"
- BI is the preliminary step of predictive analytics.
- Takes care of BA activities "Reporting with visuals" and "Creating dashboards"
- Requires data skills + business knowledge & intuition.
- The job of a BI analyst always involves the creation of:
    - Observations: the active acquisition of information from a primary source.
    - Quantifications: the process of representing observations as numbers.
    - Measures: the accumulation of observations to show some information.
    - Metrics: measures + business meaning
    - KPIs = metrics + business objectives
    - BI dashboards: an overview of the KPIs
- Used in business for:
    - Price optimizations, inventory management, etc.

#### Traditional methods

- A set of methods that are derived mainly from statistics and are adapted for business.
- Belong to the field of predictive analytics but do not aim at explaining past.
- Some examples include regression analysis, cluster analysis, and factor analysis.
- Used in business for:
    - Basic customer data, UX, forecasting future performance, etc.

#### Artificial intelligence

- Simulating human knowledge and decision making with computers.

#### Machine learning

> We, as humans, have only managed to reach AI through machine learning.

- The ability to learn and improve from experience without being explicitly programmed.
    - An attempt to replace explicit programming with automatic discovery of parameters.
    - Cannot be implemented without data.
- About creating and implementing algorithms to:
    - Make predictions
    - Analyze patterns
    - Give recommendations
- An ML algorithm is like a trial-and-error process, but each trial is at least as good as the previous one.
- Each algorithm requires data, model, objective function, and optimization algorithm.
- Use machine learning to come up with predictions where analytical answers are not possible. 
    - Think of analytical answers as if/then type of computer programs, where all the input conditions are already known, and only a few parameters change.
- Used in business for:
    - Fraud detection, client retention, etc.
- This is only one of the tools used by a data scientist.

#### Data science

> The less charitable description of "data scientist" is "programmer who gets to work on the most interesting projects". Your functions would be helping the companies engineer things better.

- Data Science is the scientific approach to knowledge extraction from data.
- A combination of mathematics, statistics, programming, the context of the problem being solved, ingenious ways of capturing data that may not be being captured right now plus the ability to look at things 'differently' (like this [Why UPS Trucks Don't Turn Left](https://bigthink.com/robby-berman/the-science-behind-why-ups-trucks-avoid-making-left-turns)) and of course the significant and necessary activity of cleansing, preparing and aligning the data.
- You observe a system, create an hypothesis, test it and update your knowledge through it.
- Requires lots of expertise in handling data and knowledge of a few programming languages.
- Use everything to your advantage: 
    - Analytical solutions, partitioning data, hacking mindset, automation by programming, reporting, deriving conclusions, making decisions, taking actions, and telling stories about your data.
- Activities that belong ONLY to data science include optimization of drilling operations.

## Typical workflow

- Find a compelling narrative behind the idea:
    - [Business Model Canvas](https://en.wikipedia.org/wiki/Business_Model_Canvas)
- Prepare the data:
    - Collect manually, download, scrape from websites or access data through public API’s.
    - Get as much data as possible in a reasonable time.
    - One can spin up a simple AWS EC2 instance for this.
    - Do not be selective about inclusion of exclusion of data to avoid bias.
    - Selection should be based upon what the data says - not what you want it to say.
- Choose the right tools:
    - One can use user-friendly graphical tools like Orange, Rapid Miner or Knime.
    - Or write the analysis on your own with such languages as Python or R.
- Pre-process the data:
    - Class labeling, data cleansing, dealing with missing values, balancing datasets, etc.
- Prove the theory:
    - Models are implementations of the theory.
- Build a minimum viable product (MVP):
    - Should have just enough features to satisfy early customers.
    - Should provide feedback for future development.
- Automate the system:
    - Also set up a system for logging, monitoring and measuring all meaningful data.
    - [Best Log Management Tools](https://stackify.com/best-log-management-tools/)
- Reiterate and expand:
    - Get rid of weaknesses, optimize the overall performance, and add new functions.
    - Implementing new features will also allow you to offer new services or products.
- Present the product:
    - Visualize data, and incorporate trends and significance into a narrative.
- [A Layman’s Guide to Data Science. Part 2](https://medium.com/sciforce/a-laymans-guide-to-data-science-part-2-how-to-build-a-data-project-58237a78860e)