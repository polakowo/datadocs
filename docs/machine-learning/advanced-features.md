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
- Explicit group is not needed
- More flexible but harder to implement:
    - (optional) Mean encode all variables to create a homogeneous feature space.
    - Calculate \\(N\\) nearest neighbors with some distance metric (e.g., Bray-Curtis).
    <center><img width=200 src="/datadocs/assets/knn3.png"/></center>
    <center><a href="https://www.analyticsvidhya.com/blog/2018/03/introduction-k-neighbours-algorithm-clustering/" style="color: lightgrey">Credit</a></center>
    - Calculate various statistics based on the nearest \\(K\\) neighbors.
    - Examples:
        - Mean target of nearest 5, 10, 15, 500, 2000 neighbors
        - Mean distance to 10 closest neighbors (with target 0/1)
- For pairs of text features calculate:
    - The number of matching words
    - Cosine distance between their TF-IDF vectors
    - Distance between their average word2vec vectors
    - Levenshtein distance

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
- Can provide additional diversity which is good for ensembles.
- It is a lossy transformation which efficiency depends on the task and the number of latent factors.
- The same transformation tricks as for linear models should be used.
- The same parameters should be used throughout the dataset as it's a trainable transformation.
- [Overview of Matrix Decomposition methods (sklearn)](http://scikit-learn.org/stable/modules/decomposition.html)

#### PCA

- PCA (Principal Component Analysis) performs a linear mapping of the data to a lower-dimensional space in such a way that the variance of the data in the low-dimensional representation is maximized. It does so by calculating the eigenvectors from the covariance matrix.
- Can drop the least important feature while still retaining the most valuable parts.
- In practice, we would choose the number of principal components such that we can explain 90% of the initial data dispersion (via the `explained_variance_ratio`)
- Each of the new features or components created after PCA are all independent of one another.
- Mainly applied to dense data.
- Limitations:
    - PCA is a linear algorithm (not able to interpret complex polynomial relationships between features).
    - Visualization and interpretation difficulties.
    - Strongly focused on variance which may not correlate with predictive power.

#### SVD

- SVD (Singular Value Decomposition) is a factorization of a matrix.
- Same advantages and limitations as for PCA but faster.
- `TruncatedSVD` can be applied to sparse matrices.

#### NMF

- NMF (Nonnegative Matrix Factorization) is a state of the art feature extraction algorithm.
- Automatically extracts sparse and meaningful features from a set of nonnegative data vectors (counts-like data).
- NMF decomposes a data matrix \\(V\\) into the product of two lower rank matrices \\(W\\) and \\(H\\) so that \\(V\approx{W*H}\\).

<center><img width=550 src="/datadocs/assets/holdout.png"/></center>
<center><a href="http://alexhwilliams.info/itsneuronalblog/2018/02/26/crossval/" style="color: lightgrey">Credit</a></center>

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

#### t-SNE

- t-SNE (t-Distributed Stochastic Neighbor Embedding) is a tool to visualize high-dimensional data.
- Unlike PCA, is not a linear projection but allows to capture a non-linear structure.

<center><img width=250 src="/datadocs/assets/PCASwiss.png"/></center>
<center><a href="https://www.biostars.org/p/295174/" style="color: lightgrey">Credit</a></center>

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
