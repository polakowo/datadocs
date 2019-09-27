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

- [Amazon SageMaker](https://aws.amazon.com/sagemaker/) is a fully-managed, end-to-end machine learning service.
- Compared to plug-and-play API services, SageMaker is a platform tailor-made for ML workflows.
    - Covers the entire ML workflow to label and prepare data, choose an algorithm, train the model, tune and optimize it for deployment, make predictions, and take action.
- Habitual environment:
    - Offers Python and Jupyter notebook environments.
- Provides common ML algorithms, along with other tools, to simplify and accelerate the ML workflow.
    - Provides out-of-the-box solution for quick model training.
    - Allows using custom algorithms.
    - Provides a range of algorithms that can be subscribed to from AWS Marketplace.
    - Provides Apache Spark for data pre-processing.
    - Allows packaging any ML algorithm into a Docker container and plug it in.
    - [Amazon SageMaker Examples](https://github.com/awslabs/amazon-sagemaker-examples)
- “Zero-configuration” workflow for training:
    - No special configuration is required to start training some model remotely in the cloud.
    - One can choose from a single general-purpose instance to a distributed cluster of GPU instances.
- Out-of-the-box support for multi-node training.
- Straightforward deployment of trained models to production.
- A developer can track and trigger alarms for changes in performance via Amazon CloudWatch.
- SageMaker is a valuable skill to learn, since it teaches you the best practices in the ML world.

#### APIs

- High level functionality:
    - Certain choices have been made on the user's behalf.
    - Makes development much quicker.
- Low level functionality:
    - Requires knowing each of the objects involved in the SageMaker environment. 
    - Benefits from allowing the user a great deal of flexibility.
- [Python SDK Documentation](https://sagemaker.readthedocs.io/en/latest/)
- [Developer Documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/)
- Search for code definitions in [Python SDK Code](https://github.com/aws/sagemaker-python-sdk)

### Workflow

#### Create an Amazon S3 bucket

- Amazon S3 is used as a central storage service when using SageMaker.
- Data (also results, checkpoints, logs, etc.) must then be stored in S3 object storage.
    - Create a dedicated S3 bucket for a single project.
- There is no practical limit to the size of the data set.
    - But it takes around 20 minutes to download 100Gb worth of images to a training instance.
    - Thus, do all the preliminary trials and polish the model elsewhere.
- S3 bucket must be in the same region as the training job.
- One can create a default bucket with `sess.default_bucket()`

#### Create a notebook instance

- Notebook Instances provide a convenient place to process and explore data in addition to making it very easy to interact with the rest of SageMaker's features.
- The notebook instances are fully-managed - they are not listed in the console.
- Pro tips:
    - Pick the right family, size and version of the EC2 instance.
    - Pick the right EBS volume (a bit more than the training data, folder `~/SageMaker`)
    - Add or create a git repository for collaboration.
    - Configure security settings (encryption, internet access)
    - Use a lifecycle config (running a bash script every time you start, also in background)
    - Elastic inference: Optionally attach a portion of a GPU for local inference.
    - Use lambda for stopping, resize on the fly, and use [multiprocessing](https://docs.python.org/2/library/multiprocessing.html)
    - [Fully-Managed Notebook Instances](https://youtu.be/uQc8Itd4UTs)

#### Build the dataset

- Having large amounts of training data could be a differentiator in building high-quality models.
- Use [Amazon SageMaker Ground Truth](https://docs.aws.amazon.com/sagemaker/latest/dg/sms.html) to create a labeled dataset.
    - Uses a combination of human labelers and an active learning model to label data.
- Human labelers: 
    - Workers from Amazon Mechanical Turk, a vendor company, or an internal, private workforce.
    - Bounding boxes, image and text classification, semantic segmentation, named entity recognition.
- Active learning model:
    - An ML algorithm decides which data needs to be labeled by humans.
    - Reduces the time and cost to label datasets by about 70%.
- Increase the quality by increasing the number of labelers per dataset object.
    - Use majority voting or probabilities of labelers being correct by looking at their past work.
- [Build Highly Accurate Training Datasets at Reduced Costs](https://youtu.be/oQOQ8nvgu1w)

#### Explore and transform the data

- Explore training data to determine what to clean up and which transformations to apply.
- Split the training dataset into training and validation.
- Save the datasets into files and upload them to S3.
    - One can transform them into `RecordSet` format to do this automatically.
    - Do the same with test to use SageMaker's Batch Transform functionality to test the model.
    - The datasets should contain no headers or index, the label should occur as first column.
    - Also upload all artifacts that are required by inference code (e.g. word vocabulary)
- Think of ETL as a software application.
    - Wrap steps into modular, readable, reusable functions.
- Inference pipelines:
    - Deploy up to 5 containers as a pipeline model (`PipelineModel`)
    - For example, pre-process -> PCA -> XGBoost -> post-process.
    - They will run in serial and co-located on the same EC2 instance.
    - This is one way to productionize the ETL code.

#### Build the model

- Models are essentially a combination of model artifacts formed during a training job (such as weights) and an associated Docker container (code) that is used to perform inference.
- SageMaker uses managed Docker containers when running scripts, training algorithms or deploying models. 
    - Hosted on Amazon ECR, versioned, and can be modified and extended easily.
    - Enable endpoints, batch transform, and inference pipelines by design.
    - Can be developed and run locally for testing.
- [Built-in Machine Learning Algorithms](https://youtu.be/yGc0qePSYig)
- Bring own script, algorithm or model:
    - Script mode: Quick training but limited options.
    - Custom container: Most flexible but more time consuming to develop.
    - Marketplace: Easy to add value quickly but less insight into solution.
    - [Bring Your Own Custom ML Models](https://youtu.be/YQyid2uLOvI)
    - [Use the Deep Learning Framework of Your Choice](https://www.youtube.com/watch?v=VeEGAeohe7c&list=PLhr1KZpdzukcOr_6j_zmSrvYnLUtgqsZz&index=8)
- Each notebook is self contained, that is, models cannot be shared between them.
    - But one can use `attach` method to create an Estimator object which is attached to an already completed training job (only the name of the job required)

#### Train and evaluate the model

- Training Jobs allow us to create model artifacts by fitting various machine learning models to data.
    - SageMaker spins up one or several “training instances”, copies all the necessary scripts and data from S3 there, runs the training, and uploads the model back to S3.
    - Every model run on a training job has its own ephemeral (short-lived) EC2 cluster.
    - No more virtual environments, conflicting package installations, and resource dependencies.
    - The cluster comes down immediately after the model finished training.
    - The logs are sent to CloudWatch and can be monitored via console or notification system.
- A training job requires input and output S3 locations, Docker container location, and EC2 configuration.
- Distributed training:
    - [Horovod](https://hub.packtpub.com/horovod-an-open-source-distributed-training-framework-by-uber-for-tensorflow-keras-pytorch-and-mxnet/) enables running multiple processes per node (multi-GPU training)
    - Use production-ready, infinitely scalable algorithms that support data streaming.
    - Use incremental training (resume a previous training job) to save both time and resources.
    - [Scale up Training of Your ML Models with Distributed Training](https://www.youtube.com/watch?v=CDg55-GkIm4&list=PLhr1KZpdzukcOr_6j_zmSrvYnLUtgqsZz&index=7)
- Pro tips: 
    - Read white papers, always put label into the 1st column, and tune hyperparameters.
    - Use examples provided by Amazon, pipe mode for streaming data from S3, and incremental training.
    - Use SageMaker Search to compare results of previous jobs.
    - Run training jobs in parallel from the notebook.
    - Soft limit the number of EC2 instances used for training job.
    - Do local sanity checks before starting a training job.
    - [Train Your ML Models Accurately](https://youtu.be/Xph2ajPEDPQ)

#### Tune hyperparameters

- Hyperparameter Tuning allow us to create multiple training jobs each with different hyperparameters in order to find the hyperparameters that work best for a given problem.
- SageMaker provides an automated way of doing hyperparameter tuning.
    - One tuning job is just an umbrella over multiple training jobs.
    - One can specify the maximum number of training jobs and parallel training jobs.
    - SageMaker then provides the name of the best-performing job based on the objective metric.
- CloudWatch provides a UI through which we can examine various logs generated during training. 
    - This can be especially useful when diagnosing errors.
- Pro tips:
    - Use Bayesian optimization for efficiency, or random search for full parallelism.
    - Use [warm start](https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-warm-start.html): take the previous evaluations as a starting point (reduces the search space)
    - Use transfer learning: permits changing the search space, algorithm image or dataset.
    - Check docs on which hyperparameters are valid for tuning.
    - [Tune Your ML Models to the Highest Accuracy](https://youtu.be/xpZFNIOaQns)

#### Test the model

- Use SageMaker's Batch Transform functionality to perform inference on a large dataset.
    - SageMaker initializes compute instances and distributes the workload between them.
    - Enables running inference without a need of a persistent endpoint.

#### Deploy the best model

- Deploy the trained model to a production-ready cluster.
    - Integrate endpoints into internet-facing applications.
    - Monitor the inferences, collect "ground truth," and evaluate the model to identify drift.
    - Scale and manage the production environment.
- To get inferences for an entire dataset, use Amazon SageMaker batch transform.
    - Enables preprocessing of and getting inferences from large datasets.
    - Enables serving predictions on a schedule (event trigger -> Lambda -> S3 -> SageMaker)
    - Similar to an endpoint, operates with RESTful API.
- To get one inference at a time in real time, set up a persistent endpoint.
    - Allows to perform inference on small amounts of data by sending it bit by bit.
- Endpoints are the actual HTTP URLs that are created by SageMaker.
    - SageMaker launches a compute instance running a Docker container with the inference code and a URL that data can be sent to and returned from. 
    - So, if you are no longer using a deployed endpoint, shut it down.
- Endpoint Configurations act as blueprints for endpoints: 
    - What resources should be used? 
    - What models should be used? 
    - How the incoming data should be split up among deployed models?
- Pro tips on endpoints:
    - Endpoints require serializing - converting the data into something that can be transferred using HTTP. The backend also needs to know how to deserialize the data.
    - Only entities that are authenticated with AWS can send or receive data from the deployed model. Thus, use an API Gateway to create HTTP endpoints (URL addresses) that are integrated with AWS services and open to the public (charged per execution)
    - Use Lambda function for pre and post processing, e.g., tokenization (charged per execution)
- Common deployment workflow:
    - The user does an action.
    - The website sends the user data off to an HTTP endpoint, created using API Gateway.
    - The endpoint acts as an interface to a Lambda function.
    - The Lambda function processes the data and sends it off to the endpoint using Boto3.
    - The model performs inference on the data and returns the results to the Lambda function.
    - The Lambda function returns the results to the original caller using the HTTP endpoint.
    - Lastly, the website receives the inference results and displays those results to the user.

<img width=600 src="/datadocs/assets/load-test-sagemaker-5-2.gif"/>
<center><a href="https://aws.amazon.com/blogs/machine-learning/load-test-and-optimize-an-amazon-sagemaker-endpoint-using-automatic-scaling/" class="credit">Credit</a></center>

- Pro tips:
    - Turn endpoints off when not in use with Lambda.
    - Use inference pipelines for pre and post processing.
    - Bring multiple models in a single Docker container.
    - Consider the size of the data hitting a single endpoint (batch transform?)
    - One can train the model elsewhere and just host it using SageMaker.
    - Use streaming for faster training, faster inference and smaller payload size.
    - Keep the payload small, cache the results in a database.
    - [Deploy Your ML Models to Production at Scale](https://youtu.be/KFuc2KWrTHs)

#### Update the model

- One may be confronted with a new data distribution that is hitting the model.
    - For example, for NLP, the frequency of use of different words could have changed: Maybe there is some new slang that has been introduced or some other artifact of popular culture that has changed the way that people write.
- Once accumulated enough user data, perform data labeling to build the new test dataset.
- Health-checking: Validate the model to ensure that it satisfies constraints and is still effective.
    - Such constraints may include accurate predictions, interpretability and costs.
    - Use batch transform to test the model on the new dataset.
- Re-train the model and update the existing endpoint so that it uses the updated model.
    - Make sure that the new model also performs well on the original data.
    - Use a low-level approach to construct an endpoint configuration for the new model.
    - Ask SageMaker to update the existing endpoint so that it uses the new configuration.
    - SageMaker first deploys the new model and then shuts down the old one (= no downtime)
- Model comparison: 
    - Create an endpoint that sends data to multiple models for an A/B test (using routing)
    - Do not assume that different models will return data in the same way (JSON or CSV?)
