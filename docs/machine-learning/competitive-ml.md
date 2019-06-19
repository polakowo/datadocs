---
id: competitive-ml
title: Competitive Machine Learning
sidebar_label: Competitive Machine Learning
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/machine-learning/competitive-ml.md
---

## Goal definition
- To learn more about an interesting problem: 
    - You may want the competition to have a wide discussion on the forums. 
    - For example, if you are interested in data science with application to medicine, try to predict [lung cancer in the Data Science Bowl 2017](https://www.kaggle.com/c/data-science-bowl-2017) or [seizures in long-term human intracranial EEG recordings]((https://www.kaggle.com/c/melbourne-university-seizure-prediction)).
- To get acquainted with new software tools: 
    - You may want the competition to have required tutorials. 
    - For example, if you want to learn a neural networks library, choose any of the competitions with images like the [The Nature Conservancy Fisheries Monitoring Competition](https://www.kaggle.com/c/the-nature-conservancy-fisheries-monitoring) or [Planet: Understanding the Amazon from Space](https://www.kaggle.com/c/planet-understanding-the-amazon-from-space).
- To hunt for a medal: 
    - Check how many submissions do participants have. 
    - If the points that people have over hundred submissions, it can be a clear sign of inconsistency of local validation and leaderboard scores. 
    - On the other hand, if there are people with few submissions in the top, that usually means there should be a non-trivial approach to this competition or it's discovered only by few people. 
    - If leaderboard mostly consists of teams with only one participant, you'll probably have enough chances if you gather a good team.

#### Research papers:
- Read scientific articles on the topic of the competition.
- This can get you ideas about ML-related things (for example, how to optimize AUC).
- Way to get familiar with problem domain (especially useful for feature generation).

#### Past solutions:
- http://ndres.me/kaggle-past-solutions/
- https://www.kaggle.com/wiki/PastSolutions
- http://www.chioka.in/kaggle-competition-solutions/
- https://github.com/ShuaiW/kaggle-classification/

## Pipeline
- Never join a competition at its very beginning:
    - It happens that a competition starts and someone finds a bug in the data.
- Understand the problem:
    - Type of problem?
    - How BIG is data (what computational resources do you need)?
    - What is the metric is being testing on? Find a similar competition.
- Start with a quick EDA:
    - Check the data for leakages (and discrepancies between train and test).
    - Plot features versus the target variable and time (if available).
    - Consider univariate predictability metrics (IV, R, AUC).
    - Binning numerical features and correlation matrices.
- Build a simple (or even primitive) baseline:
    - Often you can find baseline solutions provided by organizers or in kernels.
    - Start rather with RF than with GBMs.
    - At least Random Forest works quite fast and requires almost no tuning of hyperparameters.
- Decide on the correct cross-validation scheme:
    - *People have won just by selecting the right way to validate.*
    - Is time important? Time-based validation.
    - New entities in test? Stratified validation.
    - Otherwise random K-fold strategy.
    - Check if validation is stable (i.e. correlates with public LB score).
- Debug the full pipeline:
    - From loading data to writing a submission file.
- After trying the problem individually, explore the public kernels and forums:
    - Other participants have different approaches resulting in diversity.
- Proceed from simple to complex:
    - Add features in bulks (create many features at once).
- Perform hyperparameter tuning:
    - When tuning parameters, first try to make the model to overfit.
- Perform ensembling:
    - Proceed with ensembling only after feature engineering is done.
- Select the best on LB and the best submission locally (or the most diverse one).

### Working with ideas
- Organize ideas in some structure: 
    - What things could work here? What approaches you may want to take? 
- After you're done, read forums and highlight interesting posts and topics.
- Sort ideas into priority order. Most important and promising needs to be implemented first.
- Or you may want to organize these ideas into topics. 
    - Ideas about feature generation, validation, metric optimization.
- Now pick up an idea and implement it.
- Try to understand the reasons why something works or not. 
    - Is there some hidden data structure we didn't notice before? The ability to analyze the work and derive conclusions will get you on the right track to reveal hidden data patterns and leaks.

### Data loading
- Pay attention to optimal usage of computational resources to save a lot of time later.
- Running an experiment often requires a lot of kernel restarts which leads to reloading data: 
    - Do basic preprocessing and convert *csv* files into *hdf5* (`pandas`) or *npy* (`numpy`) for faster loading.
- Do not forget that by default data is stored in 64-bit format: 
    - Most of times you can safely downcast it to 32 bits. This will result in a 2-fold memory saving.
- Large datasets can be processed in chunks with `pandas`.
- Handling big categories:
    - Split the dataset by a category and unload to separate files.
    - Allows performing feature engineering on each category separately.

### Feature engineering
- The type of problem defines the type of feature engineering:
    - Image classification: Scaling, resizing, smoothing, data augmentation ([Previous Data Science Bowls](https://www.kaggle.com/c/data-science-bowl-2018))
    - Sound classification: Fourier transform, MFCC, spectograms, scaling ([TensorFlow Speech Recognition Challenge](https://www.kaggle.com/c/tensorflow-speech-recognition-challenge))
    - Text classification: N-grams, TF-IDF, SVD, text preprocessing, hashing ([StumbleUpon Evergreen Classification Challenge](https://www.kaggle.com/c/stumbleupon/data))
    - Time series: Lags, smoothing, derivatives, outlier removal ([Walmart Recruiting - Store Sales Forecasting](https://www.kaggle.com/c/walmart-recruiting-store-sales-forecasting))
    - Categorical features: Encodings ([Amazon.com - Employee Access Challenge](https://www.kaggle.com/c/amazon-employee-access-challenge/data))
    - Numeric features: Scaling, binning, outlier removal, dimensionality reduction, univariate transformations ([Africa Soil Property Prediction](https://www.kaggle.com/c/afsis-soil-properties))
    - Feature interactions: Multiplication, division ([Homesite Quote Conversion](https://www.kaggle.com/c/homesite-quote-conversion))
    - Recommenders: Transactional history, item popularity, frequency of purchase ([Acquire Valued Shoppers Challenge](https://www.kaggle.com/c/acquire-valued-shoppers-challenge/leaderboard))
- This process can be automated using selection with cross validation.
    - As long as your CV strategy is consistent, time and scalability are the only factors here.
- Feature selection techniques:
    - Forward: Start from the null model, add one feature at a time and check the CV accuracy.
    - Backward: Start from the full model and remove variables one by one.
    - Mixed: Use a mix of above techniques.
    - Use permutations.
    - Use feature importances from RFs and GBMs.
    - Apply some statistical tests.

### Modeling
- For tabular datasets GBMs work best, while for unstructured data DL work better.
- The type of problem defines the type of modeling:
    - Image classification: CNNs
    - Sound classification: CNNs (CRNN), LSTMs
    - Text classification: Linear models, RNNs, Transformers, Factorization machines
    - Time series: Autoregressive models, LSTMs
    - Categorical features: GBMs, Linear models, NNs, Factorization machines
    - Numeric features: GBMs, Linear models, NNs, SVMs
    - Interactions: GBMs, Linear models, NNs
    - Recommenders: GBMs, Collaborative filtering, NNs, Factorization machines

### Evaluation
- Extensive evaluation is not always needed: 
    - Even for medium-sized datasets like 100,000 rows you can validate your models with a simple holdout strategy. 
- Switch to CV only when it is really required:
    - For example, when you've already hit some limits and can move forward only with some marginal improvements.
- Faster evaluation:
    - Start with fastest models like LightGBM.
    - Use early stopping to reduce the run time.
    - Switch to tuning the models and ensembling only when you are satisfied with feature engineering.
    - Rent a larger server if you're uncomfortable with your computational resources.

### Ensembling
- Save predictions on internal validation and test sets.
    - From all the models trained before, make sure you save their predictions.
    - *Sometimes team collaboration is just sending csv files.*
- Different ways to combine from averaging to stacking:
    - Small data requires simpler ensembling techniques.
    - Average a few low-correlated predictions with good scores.
- The stacking process requires its own feature engineering.
- Most of the times ensembling leads only to a marginal score improvement.

## Code organization
- Set up a separate environment for each competition.
- If your code is hard to read, you will definitely have problems sooner or later:
    - Keep important code clean.
    - Use good variable and function names.
- Keep your research reproducible:
    - Fix all random seeds.
    - Write down exactly how any of the features were generated.
    - Store the code under a version control system like git.
    - You may also create a notebook for each submission so they can be compared later.
- Reuse code as much as possible:
    - Especially important to use the same code for train and test stages. For example, features should be prepared and transformed by the same code in order to guarantee that they're produced in a consistent manner. 
    - Move reusable code into separate functions or even separate modules.
    - We are provided with training and test CSV files (*train.csv* and *test.csv*). Split the training set to training and holdout sets, and save those to disk as CSV files with the same structure as input files (*train.csv* and *valid.csv*). Then it only takes you to switch the paths to either experiment or produce a submission.
    - Use a custom library with frequent operations already implemented.
        - [Far0n's framework for Kaggle competitions "kaggletils"](https://github.com/Far0n/kaggletils)
- Long execution history leads to lots of globally-defined variables:
    - Restart the notebook from time to time.
- Don't pay too much attention to the code quality when experimenting:
    - It's okay to have ugly code unless you don't use it for submission.
    - Try focusing entirely on data and google domain-specific knowledge.
- Split EDA and model training into separate notebooks.
- Use macros for frequent code.
    - [28 Jupyter Notebook tips, tricks and shortcuts](https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/)

## Collaboration
- Advantages:
    - Collaboration makes more fun.
    - You learn more by sharing knowledge with other participants.
    - You score better because you cover more ground and solutions are more diverse.
- Start collaborating after getting some experience (2-3 competitions)
- Start with people around your rank.
- Make solutions uncorrelated:
    - Do not overdiscuss things.
    - Collaborate with people who have different backgrounds.
