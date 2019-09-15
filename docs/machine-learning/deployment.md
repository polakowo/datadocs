---
id: deployment
title: Deployment
sidebar_label: Deployment
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/machine-learning/deployment.md
---

- Deployment to production is a method that integrates a model into an existing production environment.
    - The model can then be used to make decisions or predictions based upon data input.
- Examples of ML models in production:
    - Fraud detection, recommender systems, risk assessment, facial recognition.
- Deployment is typically a critical part in the workplace.
- Deployment is not typically a critical part with academic or personal usage (e.g. Kaggle)

#### Deployment scenarios

- Python model is converted into a format that can be used in the production environment.
    - Convert Python models into intermediate standard format, like ONNX.
    - The easiest and fastest way to move a Python model from modeling directly to deployment.
- Model is coded in Predictive Model Markup Language (PMML) or Portable Format Analytics (PFA).
    - The Data Mining Group developed both PMML and PFA to provide vendor-neutral executable model specifications for certain predictive models used by data mining and machine learning.
    - Direct import is allows by, for example, IBM SPSS, R, SAS Base & Enterprise Miner, Apache Spark, Teradata Warehouse Miner, and TIBCO Spotfire.
- Python model is recoded into the programming language of the production environment (C++, Java)
    - Rarely used anymore because it takes time to recode, test, and validate the model.

#### Deployment characteristics

- Model versioning:
    - A model version can be saved as part of the metadata or by the deployment platform.
- Model monitoring:
    - Make certain that the model continues to meet its performance metrics.
- Model updating:
    - Model updates can address when a deployed model is failing to meet its performance metrics.
- Model routing:
    - Collect new input data for updating the model.
    - Routing user requests to the deployed models allows comparison of their performance.
- On-demand predictions:
    - On-demand predictions might also be called online, real-time, or synchronous predictions.
    - One expects a low latency of response but allows high variability in request volume.
    - Predictions are returned in the response from the request.
    - Each prediction request from the user can contain one or many requests for predictions. 
    - Noting that many is limited based upon the size of the data sent as the request (5Mb for SageMaker)
- Batch predictions:
    - Batch predictions might also be called asynchronous, or batch-based predictions.
    - One expects high volume of requests with periodic submissions so latency won’t be an issue.
    - Each batch request will point to specifically formatted data file of requests. 
    - Cloud services require these files will be stored in the cloud provider’s cloud.
    - Cloud services typically have limits based on those they impose in their cloud storage service.
    - Batch predictions are commonly used to help make business decisions.

## Endpoints and REST APIs

- The type of environment is defined by the kind of user who can access the service.
    - A test environment is the one that is used for testing an application by testers.
    - A production environment is the one that is used for receiving predictions by customers.
- Communication between the application and the model is done through the endpoint (interface)
    - Allows the application to send user data to the model.
    - Receives predictions back from the model based upon that user data.
- The endpoint itself is like a function call.
    - The function itself would be the model.
    - The functions's argument would be the user's data.
    - The functions's returned value would be the model's prediction.
    - The Python program would be the application.

### REST API

- [Representational state transfer (REST)](https://en.wikipedia.org/wiki/Representational_state_transfer) is a software architectural style that defines a set of constraints to be used for creating Web services.
- Web services that conform to the REST are called RESTful Web services (RWS)
- "verb + resource": 
    - REST uses HTTP(S) to implement stateless message-passing in a distributed system, and suggests using standard HTTP verbs to perform operations on "resources" that can be specified using hierarchical URIs.
- Resource is an object or representation of something.
    - Has some associated data with it and there can be set of methods to operate on it.
    - For example, `GET https://api.example.com/collection/api/users/1`
    - [Request methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
- Collections are set of resources.
    - For example, `https://api.example.com/collection/api/users`
- URI (Uniform Resource Identifier) is a path through which a resource can be located.
    - For example, `https://api.example.com/collection/`
- [RESTful API Designing guidelines — The best practices](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)

#### Pros

- REST focuses on scalability and large-scale performance for distributed hypermedia systems.
- Provides interoperability between computer systems on the Internet.
- Allows to access and manipulate data by using a uniform and predefined set of stateless operations.
- Aims for fast performance, reliability, and the ability to grow by reusing components.
- Separation of concerns enables developments on clients and servers to take place independently.

#### Cons

- Truly RESTful services simply require too much work to be practical for most applications.
- Forces semi-religious debates about when verbs are appropriate.

#### Compared to SOAP

- REST is an architectural style, while SOAP is a protocol.
- REST APIs access a resource for data (a URI); SOAP APIs perform an operation.
- REST+JSON are most commonly used when exposing a public API over the Internet.
    - REST allows a greater variety of data formats, whereas SOAP only allows XML.
    - Coupled with JSON, REST is generally considered easier to work with.
    - Thanks to JSON, REST offers better support for browser clients.
    - REST provides superior performance, particularly through caching.

```json
Example: REST message

POST /api/2.2/auth/signin HTTP/1.1
HOST: my-server
Content-Type:application/json
Accept:application/json

{
  "credentials": {
    "name": "administrator",
    "password": "passw0rd",
    "site": {
      "contentUrl": ""
    }
  }
}
```

- [SOAP](https://en.wikipedia.org/wiki/SOAP) exposes components of application logic as services rather than data.
    - SOAP tends to be better-suited for robust security, data privacy and integrity.
    - SOAP offers built-in retry logic to compensate for failed communications.
    - SOAP's protocol makes it easier for it to operate across firewalls and proxies.
    - SOAP has built-in ACID compliance that reduces anomalies and protects the integrity.
    - For operations requiring content and context to be maintained, SOAP requires less coding.
    - SOAP is highly extensible through other protocols and technologies.

```xml
Example: SOAP message

POST /InStock HTTP/1.1
Host: www.example.org
Content-Type: application/soap+xml; charset=utf-8
Content-Length: 299
SOAPAction: "http://www.w3.org/2003/05/soap-envelope"

<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:m="http://www.example.org">
  <soap:Header>
  </soap:Header>
  <soap:Body>
    <m:GetStockPrice>
      <m:StockName>GOOG</m:StockName>
    </m:GetStockPrice>
  </soap:Body>
</soap:Envelope>
```

- [SOAP vs REST vs JSON comparison [2019]](https://raygun.com/blog/soap-vs-rest-vs-json/)

#### Constraints

- Uniform interface:
    - A uniform way of interacting with a given server irrespective of application type.
    - Simplifies and decouples the architecture, which enables each part to evolve independently.
    - Each resource must have a specific and cohesive URI.
    - Each message includes enough information to describe how to process the message.
    - A REST client should be able to discover all the available actions and resources it needs.
- Statelessness:
    - No client context is stored on the server between requests.
    - Each request from any client contains all the information necessary to service the request.
- Cacheability:
    - Responses must, implicitly or explicitly, define themselves as cacheable or not.
- Client-server architecture:
    - REST application should have a client-server architecture (the separation of concerns)
    - Improves the portability of the UIs and scalability by simplifying the server components.
    - Allows the components to evolve independently.
- Layered system:
    - The client shouldn't know if it's talking with an intermediate or the actual server.
    - A proxy or load balancer wouldn't affect their communications.
    - Intermediary servers can improve system scalability and security.
- Code on demand (optional):
    - Servers can extend the functionality of a client by transferring executable code.

## Containers

- Both the model and the application require a computing environment.
- One way to create and maintain these computing environments is through the use of containers.
- A container is a standard unit of software that packages up code and all its dependencies.

> Analogy to real containers: Shipping containers can contain a wide variety of products, from food to computers to cars. The structure of a shipping container provides the ability for it to hold different types of products while making it easy to track, load, unload, and transport products worldwide. Everything becomes the same and we can develop tooling around this sameness (e.g. cranes). We don't care about the contents of a container anymore.

#### Pros

- Better isolation:
    - Execute application processes in isolation from the underlying host OS.
    - Protect the underlying host OS against malicious escape and breakout attempts.
    - Are sandboxed and isolated from other applications, which increases security.
- Less overhead:
    - Require only software needed to run the application.
    - The host OS doesn’t need this software.
    - Require less system resources than traditional or virtual machine environments.
    - Able to start and stop much faster than traditional VMs.
- Increased portability:
    - Containerization provides an easy packaging mechanism.
    - Can be deployed easily to multiple different operating systems and hardware platforms.
    - Able to run virtually anywhere.
- More consistent operation:
    - Can create predictable environments that are isolated from other applications.
    - Will run the same, regardless of where they are deployed.
- Greater efficiency:
    - Allow applications to be more rapidly deployed, patched, or scaled.
- Better application development:
    - Support agile and DevOps efforts to accelerate development, test, and production cycles.
    - Make application creation, replication, deletion, and maintenance easier and the same.
- Offer the possibility of horizontal scaling:
    - Add more identical containers within a cluster to scale out.
- Provide a more simple and secure way to replicate, save, and share containers (through a script file)
    - For Docker, the [Docker Hub](https://hub.docker.com/explore/) is the official repository for storing and sharing Dockerfiles.

```docker
# Example: Dockerfile

FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py
```

#### Cons

- Containers don't run at bare-metal speeds:
    - Consume resources more efficiently than VMs but still subject to performance overhead.
- Persistent data storage is complicated.
    - There are ways to save data persistently in Docker, but not in a seamless way.
- Graphical applications don't work well:
    - Docker was designed for deploying server applications that don't require a GUI.
- Only applications that are designed to run as a set of discrete micro-services gain.