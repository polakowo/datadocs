---
id: deployment-to-cloud
title: Deployment to Cloud
sidebar_label: Deployment to Cloud
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/machine-learning/deployment-to-cloud.md
---

- Cloud services like Amazon’s SageMaker can be used for all parts of the ML workflow.
- Cloud services like Google’s Cloud ML Engine are meant to be used primarily for modeling and deployment.
- [Machine Learning with Amazon SageMaker](https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-mlconcepts.html)
- [Machine learning workflow](https://cloud.google.com/ml-engine/docs/ml-solutions-overview)
- [What is Azure Machine Learning service?](https://docs.microsoft.com/en-us/azure/machine-learning/service/overview-what-is-azure-ml)

## Amazon SageMaker

<center><img width=120 src="/datadocs/assets/IconOnly-1.png"/></center>

- Compared to plug-and-play API services, SageMaker is a platform tailor-made for ML workflows.
    - Covers the entire ML workflow to label and prepare data, choose an algorithm, train the model, tune and optimize it for deployment, make predictions, and take action.
- Habitual environment:
    - Offers Python and Jupyter notebook environments.
- Provides common ML algorithms, along with other tools, to simplify and accelerate the ML workflow.
    - Has option to integrate any other frameworks and libraries.
    - One can use Apache Spark to pre-process the data.
    - One can package any ML algorithm into a Docker container and plug it in.
    - [Amazon SageMaker Examples](https://github.com/awslabs/amazon-sagemaker-examples)
- “Zero-configuration” workflow for training:
    - No special configuration is required to start training some model remotely in the cloud.
- Out-of-the-box support for multi-node training.
- Straightforward deployment of trained models to production.
- A developer can track and trigger alarms for changes in performance via Amazon CloudWatch.

#### Common workflow

- Collect and prepare the training data.
    - Use data labeling and Jupyter notebooks to prepare the data.
- Data (also results, checkpoints, logs, etc.) must be stored in S3 object storage.
    - There is no practical limit to the size of the data set.
    - But it takes around 20 minutes to download 100Gb worth of images to a training instance.
    - Thus, do all the preliminary trials and polish the model elsewhere.
    - Also make sure to pick the same region as for the SageMaker instances.
- Configure and launch training using SageMaker SDK.
    - SageMaker spins up one or several “training instances”, copies all the necessary scripts and data from S3 there, runs the training, and uploads the model back to S3.
- Test the trained model (typically using a batch transform job)
- Deploy the trained model to a production-ready cluster.
- Serve predictions (via HTTP API)
- Scale and manage the production environment.