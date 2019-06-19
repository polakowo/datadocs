---
id: eda
title: Exploratory Data Analysis
sidebar_label: Exploratory Data Analysis
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/machine-learning/eda.md
---

- EDA encompasses initial data analysis (IDA), which focuses more narrowly on checking assumptions required for model fitting and hypothesis testing, and handling missing values and making transformations of variables as needed.
- Steps before doing EDA:
    - Get domain knowledge (search for similar competitions, Google variable names)
    - Check if the data is intuitive and correct
    - Understand how the data was generated (important for CV)
- Do EDA first. Do not immediately dig into modelling.
    - Get comfortable with the task
    - Build an intuition about the data
    - Visualization -> idea: Find "magic" features and patterns which lead to questions
    - Idea -> visualization: Validate hypotheses
- Never make a conclusion based on one single plot.
- Find an explanation for all extraordinary things you observe.

#### Anonymized data:

- Guess the type of the columns (which is requirement for modelling):
    - Integer features (with a large number of unique values) are likely to be counts.
    - When the number of unique values is comparably low, the column might be categorical.
    - Hashes are likely to be categorical features or text.
- Guess the meaning of the columns
- Find relations between columns:
    - For example, calculate how many times one feature is greater than the other. This way we can calculate the differences between consecutive values to make tree-based models more efficient.
    - Plot one feature against another to find relationships.
- Find feature groups:
    - Compute some statistics on features and plot them against column index. The columns are sometimes placed next to each other, so they are probably grouped together.
    - Also observe the blocks in a clustered correlation matrix.

## Univariate analysis

#### Histogram and density plot:
- A histogram groups values into bins of equal value range.
- Histograms are best suited for looking at the distribution of numerical variables.
- The shape of the histogram may contain clues about the underlying distribution type.
    - Knowing the distribution becomes important for ML methods that assume a particular type (most often Gaussian).
- Histograms may be misleading when the number of bins is too low.
- Unusual peaks may indicate missing values.
- Kernel density plots can be considered a smoothed version of the histogram.
- Choice of number and width of bins techniques can heavily influence the appearance of a histogram, and choice of bandwidth can heavily influence the appearance of a kernel density estimate.

#### Box plot:
- A box plot is a visual representation of numerical data through their quartiles (a five-number summary).
- They can indicate the degree of dispersion (spread) and skewness in the data, and show outliers.
- They take up less space and hence are useful for comparing distributions.
    - For a classification task, compare distributions for different classes.
- Box plot suffers under "normality" view:
    - Box plot may produce the same results for symmetric peaks and a uniform distribution.
    - Always use in conjunction with a histogram.

#### Bar plot:
- The bar plots are usually used for categorical features and counts.
- The bar plot is a graphical representation of the frequency table.
- Useful for plotting multiple features side by side.

## Multivariate analysis

#### Scatter plot:
- The scatter plot displays values of two numerical variables as Cartesian coordinates in 2D space.
- We can incorporate a third (categorical) variable by using colors or size of the points.
    - Numeric values can be displayed by a color map.
- Feature versus feature:
    - Features are uncorrelated when the ellipse-like shape is aligned with the axes.
    - Color the points by target value for convenience.
    - To check whether the data distribution of train and test is the same, color by target and use another color for test.
    - If a lot of values overlap, try jittering (adding Gaussian noise to the features before drawing scatter plot)
    - If an unusual pattern is visible, test for feature interactions.
- Feature versus row index:
    - Observe how the feature is distributed over the dataset.
    - Horizontal lines indicate a lot or repeated values such as missing values.
    - If no vertical lines or boxes are visible, the dataset is properly shuffled.
    - If some pattern is visible, try to color by a category.
    - Smoothing can help to discover the pattern.
- Can be used in conjunction with histograms on both sides (`jointplot`)

#### Scatterplot matrix:
- The diagonal contains the histograms while the scatter plots for each pair of variables fill the rest of the matrix.
- Helps draw quick conclusions about the data.

#### Correlation matrix:
- Generate new features based on feature groups (visible as blocks in the correlation matrix)
- Reorder columns and rows for better interpretation.
    - [Biclustering algorithms for sorting corrplots](http://scikit-learn.org/stable/auto_examples/bicluster/plot_spectral_biclustering.html)

#### Dimensionality reduction:
- Create a t-SNE representation of the (normalized) data.
- Observe whether points are concentrated in a few areas of the lower dimensional feature space.
- Color by target to approximate the separation.
