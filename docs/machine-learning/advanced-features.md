---
id: advanced-features
title: Advanced Features
sidebar_label: Advanced Features
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/machine-learning/advanced-features.md
---

## Group-based features

- Some datasets such as transactional data have multiple rows for an instance.
- Treat data points as dependent on each other.
- Group by a categorical feature and calculate various statistics such as sum and mean (e.g., mean encoding).
- To group by a numeric feature apply binning. Binning can be applied on both categorical and numerical data to make the model more robust and prevent overfitting, however, it has a cost to the performance.
- For aggregating categorical features either: 
    - Select the label with the highest frequency
    - Make a pivot table
    - Apply `groupby` operation after one-hot-transforming the feature.

## Distance-based features

- Perform a `groupby` operation on instance neighborhoods (not only geodesic).
- More flexible but harder to implement:
    - (optional) Mean encode all variables to create a homogeneous feature space.
    - Calculate \\(N\\) nearest neighbors with some distance metric (e.g., Bray-Curtis).
    - Calculate various statistics based on the nearest \\(K\\) neighbors.
    - Examples:
        - Mean target of nearest 5, 10, 15, 500, 2000 neighbors
        - Mean distance to 10 closest neighbors (with target 0/1)
- For pairs of text features calculate:
    - The number of matching words
    - Cosine distance between their TF-IDF vectors
    - Distance between their average word2vec vectors
    - Levenshtein distance

### k-NN

- K-nearest neighbors is a non-parametric method used for classification and regression.
    - Although k-NN belongs to the family of ML algorithms, it does not learn anything.
- k-NN is a type of instance-based learning, or lazy learning, where the function is only approximated locally and all computation is deferred until classification.
- The algorithm searches for \\(k\\)-nearest training samples using a distance metric.
    - Regression: takes the average of the values.
    - Classification: classified by a plurality vote.
    - Larger values of \\(k\\) reduce noise but also make class boundaries less distinct.

<center><img width=200 src="/datadocs/assets/knn3.png"/></center>
    <center><a href="https://www.analyticsvidhya.com/blog/2018/03/introduction-k-neighbours-algorithm-clustering/" class="credit">Credit</a></center>

#### Pros

- Very simple to understand and equally easy to implement.
- A non-parametric algorithm which means there are no assumptions to be met.
- Given that it is a memory-based approach, it immediately adapts as new training data is collected.
    - Allows the algorithm to respond quickly to changes in the input during real-time use.
- Works for multi-class problems without any extra efforts.
- Can be used both for classification and regression problems.
- Gives the user flexibility to choose the distance metric.

#### Cons

- Its speed declines with the increase in the size of the dataset.
- Suffers under curse of dimensionality: works only well for a small number of input variables.
    - For high-dimensional data, dimension reduction is usually performed.
- Requires features to be scaled for certain distance criteria (e.g. Euclidean, Manhattan)
- Doesn’t perform well on imbalanced data: a more frequent class tends to dominate the prediction.
- The accuracy can be severely degraded by the presence of noisy or irrelevant features.
    - Select and scale features to improve classification.
- Has no capability of dealing with missing values.

### K-means

- A very simple algorithm used in market segmentation, computer vision, and astronomy.
- Performs division of objects into clusters that are “similar” inside and “dissimilar” outside.
- k-means clustering aims to partition \\(n\\) observations into \\(k\\) clusters:
    - Select the number of clusters \\(k\\) that you think is the optimal number.
    - Initialize \\(k\\) points as “centroids” randomly within the data space.
    - Attribute each observation to its closest centroid.
    - Update the centroids to the center of all the attributed set of observations.
    - Repeat the previous steps a fixed number of times or until all of the centroids are stable.
- One method for choosing a "good" \\(k\\) is Elbow method:
    - The centroid distance - the average distance between data points and cluster centroids - typically reaches some "elbow"; it stops decreasing at a sharp rate.

<center><img width=300 src="/datadocs/assets/the-optimal-number-of-clusters.png"/></center>
    <center><a href="https://www.datanovia.com/en/lessons/determining-the-optimal-number-of-clusters-3-must-know-methods/" class="credit">Credit</a></center>

- Inherently, K-means is NP-hard: 
    - K-Means finds a solution in \\(O(n^{dk+1})\\) in time.
    - There are some heuristics to deal with this, such as [MiniBatch K-means](http://scikit-learn.org/stable/auto_examples/cluster/plot_mini_batch_kmeans.html)
- Other limitations:
    - The parameter \\(k\\) is known to be hard to choose.
    - Cannot be used with arbitrary distance functions or on non-numerical data.
- [Unsupervised Learning: PCA and Clustering](https://medium.com/open-machine-learning-course/open-machine-learning-course-topic-7-unsupervised-learning-pca-and-clustering-db7879568417)

## Bumper features

- For a multi-classification problem, create one-versus-all tasks and use them as features.
- *Is it true that the target class number is greater than 1, 2, etc.?*

## Feature interactions

- Construct combinations of features in order to incorporate the knowledge into a model.
- For categorical features:
    - Concatenate them by using a delimiter.
    - Or vectorize into a real-valued representation and then apply the operation.
- There are \\(N^2*M\\) possible interactions for \\(N\\) features and \\(M\\) operations:
    - Reduce them by feature selection (e.g., with RF) or matrix factorization.
- Such approach can be generalized for higher orders.
- Due to the fact that number of features grows rapidly with order, they are often constructed semi-manually.
- Extract interactions via decision trees by using indices of the leafs (`model.apply`).
    - Two factors that are split in succession might indicate an interaction.
    - [Facebook Research's paper about extracting categorical features from trees](https://research.fb.com/publications/practical-lessons-from-predicting-clicks-on-ads-at-facebook/)
    - [Example: Feature transformations with ensembles of trees (sklearn)](http://scikit-learn.org/stable/auto_examples/ensemble/plot_feature_transformation.html)

## Matrix factorization

- Matrix factorization is a generic approach for dimensionality reduction and feature extraction.
- Useful as a dimensionality reduction technique:
    - Dimensionality reduction helps in filtering out not important features.
    - For example, for higher dimensions, clustering algorithms have a difficult time figuring out which features are the most important, resulting in noisier clusters.
- Can provide additional diversity which is good for ensembles.
- It is a lossy transformation which efficiency depends on the task and the number of latent factors.
- The same transformation tricks as for linear models should be used.
- The same parameters should be used throughout the dataset as it's a trainable transformation.
- [Overview of Matrix Decomposition methods (sklearn)](http://scikit-learn.org/stable/modules/decomposition.html)

### PCA

- PCA (Principal Component Analysis) performs a linear mapping of the data to a lower-dimensional space in such a way that the variance of the data in the low-dimensional representation is maximized. 
    - Features with low variance contribute less to the separation of objects. 
    - For example, a constant feature means it doesn't have any distinguishing information.
- Works by calculating the eigenvectors from the covariance matrix.
- Creates components in the order of causing the most to least variance.
    - In practice, we would create as many components as possible and from them, choose the top \\(N\\) principal components that can explain 80-90% of the initial data dispersion (via the `explained_variance_ratio`)
    - We can then examine the makeup of each PCA component based on the weightings of the original features that are included in that component.
    - [Analyze US census data for population segmentation using Amazon SageMaker](https://aws.amazon.com/blogs/machine-learning/analyze-us-census-data-for-population-segmentation-using-amazon-sagemaker/)
    <center><img width=400 src="/datadocs/assets/census-sagemaker-2.gif"/></center>
    <center><a href="https://aws.amazon.com/blogs/machine-learning/analyze-us-census-data-for-population-segmentation-using-amazon-sagemaker/" class="credit">Credit</a></center>
- Helps decorrelating correlated features.
    - Can drop the least important feature while still retaining the most valuable parts.
- Each of the new features or components created after PCA are all independent of one another.
- Mainly applied to dense data.
- Limitations:
    - PCA is a linear algorithm (not able to interpret complex polynomial relationships between features).
    - Visualization and interpretation difficulties.
    - Strongly focused on variance which may not correlate with predictive power.

### SVD

- SVD (Singular Value Decomposition) is a factorization of a matrix.
- Same advantages and limitations as for PCA but faster.
- `TruncatedSVD` can be applied to sparse matrices.

### NMF

- NMF (Nonnegative Matrix Factorization) is a state of the art feature extraction algorithm.
- Automatically extracts sparse and meaningful features from a set of nonnegative data vectors (counts-like data).
- NMF decomposes a data matrix \\(V\\) into the product of two lower rank matrices \\(W\\) and \\(H\\) so that \\(V\approx{W*H}\\).

<center><img width=550 src="/datadocs/assets/holdout.png"/></center>
<center><a href="http://alexhwilliams.info/itsneuronalblog/2018/02/26/crossval/" class="credit">Credit</a></center>

- Primarily used for recommender systems and text mining.
- Provides an additive basis to represent the data.
- Results are easier to interpret than SVD.
- Transforms data in a way best-suited for tree-based models.
- NMF typically benefits from normalization.
- Limitations:
    - As opposed to the unconstrained problem which can be solved efficiently using the SVD, NMF is NP-hard. 
        - Fortunately there are heuristic approximations.
    - There is no guarantee to be a single unique decomposition.
    - It’s hard to know how to choose the factorisation rank \\(r\\). 
        - Some approaches include trial and error.

### t-SNE

- t-SNE (t-Distributed Stochastic Neighbor Embedding) is a tool to visualize high-dimensional data.
- Unlike PCA, is not a linear projection but allows to capture a non-linear structure.

<center><img width=250 src="/datadocs/assets/PCASwiss.png"/></center>
<center><a href="https://www.biostars.org/p/295174/" class="credit">Credit</a></center>

- Projects points from high to low-dimensional space by preserving the relative distance between them.
    - Neighbor embedding is a search for a new and less-dimensional data representation that preserves neighborship of examples.
- Optimizes the embeddings directly using gradient descent.
- The principal components can be used as features.
- Mainly a data exploration and visualization technique.
- Apply t-SNE to concatenation of train and test and split projection back.
- Limitations:
    - Computationally expensive and can take several hours on million-sample datasets :
        - It is common to do dimensionality reduction before projection.
        - Use stand-alone implementation `tsne` for faster speed.
    - Sometimes it works well for visualization but not for dimensionality reduction.
    - Results strongly depend on hyperparameters (perplexity): 
        - Good practice is to use several projections with different perplexities (5-100).
        - [Example: tSNE with different perplexities (sklearn)](http://scikit-learn.org/stable/auto_examples/manifold/plot_t_sne_perplexity.html#sphx-glr-auto-examples-manifold-plot-t-sne-perplexity-py)
    - Due to stochastic nature, tSNE may provide different projects for the same configuration.
    - PCA it is a mathematical technique, but t-SNE is a probabilistic one.
    - There is the risk of getting stuck in local minima.
- [Multicore t-SNE implementation](https://github.com/DmitryUlyanov/Multicore-TSNE)
- [Comparison of Manifold Learning methods (sklearn)](http://scikit-learn.org/stable/auto_examples/manifold/plot_compare_methods.html)
- [How to Use t-SNE Effectively (distill.pub blog)](https://distill.pub/2016/misread-tsne/)
