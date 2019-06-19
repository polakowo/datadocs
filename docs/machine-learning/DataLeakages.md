---
id: data-leakages
title: Data Leakages
sidebar_label: Data Leakages
---

- Data leakage is an unexpected information in the data that adds ground truths into the test data.
- Data leaks are result of unintentional errors and accidents.
- In competitions, top models will use the leaky data rather than be good general model of the underlying problem.
- Reversing an anonymization and obfuscation can result in a privacy breach that you did not expect.
- You may be creating overly optimistic models that are practically useless and cannot be used in production.

## Time series
- Data leaks can occur in time series datasets where creating training and test sets can be difficult.
- Split should be done on time (train/public/private):
    - In real world we don't have information on future events.
- Even when split by time, features may contain information about future:
    - For example, fundamental indicators in stock market prediction tasks.
- There is only one way to eliminate the possibility of data leaks:
    - Remove all features except IDs (e.g. timestamp) from the test set.
    - Participants can then create the features based on past and join them themselves.

## Metadata
- Analog observations like sound and images where samples are stored in separate files that have a size and a timestamp.
- We can access some meta-information such as file creation date, image resolution, etc.
- A good practice from organizers is to to erase the metadata, resize the pictures and change the create date.

## Row IDs
- Row IDs are unique identifiers of every row usually added for convenience.
- They are generated either automatically or manually (e.g. hashing) and are not intended for disclosure.
- They may contain traces of information connected to target variable.
- A good practice is to leave them out entirely.

## Row order
- Rows may be shuffled by target variable.
- Rows next to each other may have the same label.
- A good practice is to randomly shuffle the data.

## Pairwise tasks
- Data leaks can occur in graph problems where random sampling methods can be difficult to construct.
- There may be a some non-random subsampling which is cause of data leakage.
- Usually organizers sample mostly hard-to-distinguish tasks, which causes imbalance of item frequencies.
    - Two items having a similar sets of neighbors results in a higher possibility of being the duplicates.
    - Similarities of vector representations in the connectivity matrix can expose this data leakage.

<center><img width=300 src="/datadocs/assets/1200px-Cluster-2.svg.png"/></center>
<center><a href="https://en.wikipedia.org/wiki/Cluster_analysis" target="_blank" style="color: lightgrey">Credit</a></center>

## Distance-based tasks
- Using distances we may find a good approximation for the true coordinates.
    - For example, write down a system of \\(N\\) equations knowing \\(N\\) distances to unveil the coordinates of unknown points.
