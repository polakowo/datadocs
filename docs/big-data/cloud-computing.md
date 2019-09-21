---
id: cloud-computing
title: Cloud Computing
sidebar_label: Cloud Computing
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/cloud-computing.md
---

- A computing service you traditionally did local, now the service is performed remotely (off-premises)
- Cloud computing is an approach to computing that leverages the efficient pooling of an on-demand, self-managed, virtual infrastructure.
    - [The NIST Definition of Cloud Computing](https://csrc.nist.gov/publications/detail/sp/800-145/final)
    - [Google Cloud: What is cloud computing?](https://cloud.google.com/what-is-cloud-computing/)
    - [Microsoft Azure: What is cloud computing?](https://azure.microsoft.com/en-us/overview/what-is-cloud-computing/)
    - [AWS: What is Cloud Computing?](https://azure.microsoft.com/en-us/overview/what-is-cloud-computing/)
- Think of cloud computing as transforming an IT product into an IT service.
- Most of the factors related to choosing cloud computing services are related to time and cost.
- Cloud computing solutions work best for startups:
    - No real infrastructure overhead costs due to the pay-as-you-go and on-demand access.
    - Requires fewer staff and costs less to build and maintain their software product.
    - Has greater ability to scale and meet customer demand.
    - Can get their software product or application to market much more quickly.
- For established enterprises and organizations, moving to cloud may not make sense:
    - Some of the legacy architectures might not be able to be integrated with cloud services.
    - Some of the risks (security, governance, compliance) might outweigh the benefits.
    - Company culture might not be accepting of replacing traditional infrastructure with cloud.
    - Company employees may lack the skill set to use cloud computing.
- Success examples:
    - Instagram had the luxury of starting from scratch and architecting for the cloud to start.
    - [How Instagram migrated to AWS’s Virtual Private Cloud](https://instagram-engineering.com/migrating-from-aws-to-aws-f4b16a65e13c)
    - [How Instagram migrated from AWS data centers to Facebook data centers](https://instagram-engineering.com/migrating-from-aws-to-fb-86b16f6766e2)
    - Netflix made a business decision to move to the cloud early on.
    - [Netflix on AWS](https://aws.amazon.com/solutions/case-studies/netflix/)
    - HSBC is a 150 year old international organization that recently migrated to the GCP.
    - eBay also recently migrated to the GCP.
    - [Google Cloud Next '17 - Day 1 Keynote](https://www.youtube.com/embed/j_K1YoMHpbk)

#### Pros

- With traditional infrastructure, it takes a considerable amount of time to predict demand, obtain approval for capacity increase, purchase new resources, and install these resources.
    - Wasted capacity when preparing for future demand.
    - Insufficient capacity when there are spikes in demand.
- This ability to meet unstable, fluctuating customer demand is a benefit of cloud computing.
    - Set automated triggers that will increase or decrease cloud capacity based on demand.
    - Cloud capacity always exceeds customer demand for capacity by a small margin.
    
<img width=500 src="/datadocs/assets/capacityutilizationcurve3.png"/>
<center><a href="https://www.udacity.com" class="credit">Credit</a></center>

- Reduced costs:
    - Pay-as-you-go services make using cloud resources proportional to their cost.
    - Predictable costs over time, cheaper upfront investment, no infrastructure investments.
    - Also savings in removing the need to spend company resources on prediction of customer demand.
    - But may end up spending more throughout the system's life cycle.
- Increased scalability:
    - Using automatic triggers and the rapid elasticity ensure that capacity always exceeds demand.
    - These automated features simplify capacity planning for a business.
- Increased availability and reliability:
    - Come with the automatic on-demand self service, broad network access, and rapid elasticity.
    - Cloud providers provide guarantees in their service-level agreement, SLA.
- Offer greater stability and continuous updates as a result of less customization.
    - Customers can work with vendors to see what changes can be made.
- Fast and efficient access to resources that clients actually need.
- Less need for a big administrator team.
- Self-maintenance and fault tolerance resources.

#### Cons

- Increased security vulnerabilities:
    - A customer might use a shared cloud resource instead of a physically isolated resource.
    - One needs to access cloud services through the internet.
- Reduced operational governance control:
    - A disreputable cloud provider might be making customers unknowingly more vulnerable.
    - Increased physical distance could cause variable latency and bandwidth issues.
- Limited portability between cloud providers:
    - The lack of an established industry standard could lead to customer dependency on particular cloud providers.
- Multi-regional compliance and legal issues:
    - The physical location of data centers can cause legal concerns connected to industry or government regulations that specify data privacy and storage policy. 
    - Additionally, there could be legal issues associated to accessibility and disclosure of data based upon the country’s laws where the data center is located (GDPR)
- Clients need to trust the cloud providers.
- Possible limited access to the data and potential data loss.
- Locked in within the cloud provider’s specification.

## Characteristics

- On-demand self-service:
    - Consumer can unilaterally provision computing capabilities without requiring human interaction.
    - For example, log into the cloud storage service and upload, download, or delete the files.
- Broad network access:
    - Capabilities are available over the network and accessed through standard mechanisms.
    - For example, access photos using any device that is connected to the internet.
- Resource pooling:
    - Computing resources are pooled to serve multiple consumers using a multi-tenant model.
    - Resources that are dynamically assigned and re-assigned based upon customer demand.
    - For example, handle any customer storing one to many files (also concurrently)
- Rapid elasticity:
    - Capabilities can be scaled rapidly outward and inward proportional to customer demand. 
    - To the consumer, the capabilities available for provisioning often appear unlimited.
    - For example, store as many or as few files at any time.
- Measured service:
    - Automatically control and optimize resource use by leveraging a metering capability. 
    - Resource usage can be monitored, controlled, and reported, providing transparency.
    - For example, charge a customer appropriately for storage space they are using.

#### Virtualization

- Virtualization is required for cloud computing
- Virtualization provides scalability, fault-tolerance, high availability and load balancing.
- Private clouds are built on top of virtualization.
- Private clouds provide abstraction of resources, secure multi-tenancy, better separation of concerns.

## Service models

- Cloud computing services are offered through three broad service models.
- These models offer increasing abstraction; they are thus often portrayed as a layers in a stack.
- The user's control or responsibility diminishes as you move from on-premises to SaaS.

<img width=800 src="/datadocs/assets/Cloud-Computing-Service-Models.png"/>
<center><a href="https://chrislazari.com/what-is-cloud-computing/" class="credit">Credit</a></center>

#### IaaS

- IaaS is simply a VM with some OS installed.
- With IaaS, pre-configured hardware resources are provided to users through a virtual interface.
- The customer is able to deploy and run arbitrary software.
    - Operating systems, packages, and applications
- Features:
    - Instead of purchasing hardware outright, users pay for IaaS on demand.
    - Infrastructure is scalable depending on processing and storage needs.
    - Saves enterprises the costs of buying and maintaining their own hardware.
    - Because data is on the cloud, there can be no single point of failure.
    - Enables the virtualization of administrative tasks, freeing up time for other work.
- Some examples are Amazon Web Services and Rackspace.

<center><img width=100 src="/datadocs/assets/200px-Amazon_Web_Services_Logo.svg.png"/></center>

#### PaaS

- PaaS builds upon IaaS.
- PaaS provides a platform with tools to test, develop and host applications in the same environment.
- Typically includes a base operating system and a suite of applications and development tools.
- The customer gains additional responsibilities that are associated with managing applications and data.
    - User interface and dashboard, security, logs, and other features
- Features:
    - Enables organizations to focus on development without having to worry about underlying infrastructure.
    - Providers manage security, operating systems, server software and backups.
    - Facilitates collaborative work even if teams work remotely.
- Some examples are Heroku, Engine Yard and Google App Engine.
    - [Angry Birds soars online with App Engine](https://cloud.google.com/customers/rovio/)

<center><img width=100 src="/datadocs/assets/1*VHYGqjhONSJ20pRlIUbg7w.png"/></center>

#### SaaS

- Sometimes referred to as ‘on-demand software’
- SaaS vendors provide users with software and applications via a subscription model.
- The customer’s responsibility is only to maintain their user account:
    - Registration, login, administration, and customization of the application
- Features:
    - Users do not have to manage, install or upgrade software.
    - Data is secure in the cloud: Equipment failure does not result in loss of data.
    - Use of resources can be scaled depending on service needs.
    - Applications are accessible from almost any internet-connected device, from anywhere.
    - In many cases more affordable than similar options.
    - Clients have fast access to most recent patches and features.
- Some examples are Google Docs, Gmail, Dropbox and Salesforce.

<center><img width=100 src="/datadocs/assets/Dropbox_Logo_02.svg.png"/></center>

#### Serverless computing

- A cloud-native platform for short-running, stateless computation, and event-driven applications which scales up and down instantly and automatically and charges for actual usage at millisecond granularity.
- Cloud provider fully manages starting and stopping virtual machines as necessary to serve requests.
- Requests are billed by an abstract measure of the resources required to satisfy the request.
- Serverless does not mean no servers, means worry-less servers.
- Also known as Function-as-a-Service (FaaS): 
    - A service-hosted remote procedure call that leverages serverless computing to enable the deployment of individual functions in the cloud that run in response to events.
- Serverless is a good solution for short-running stateless event-driven operations:
    - For example, microservices, mobile backends, ML inferencing, IoT.
- Serverless is not good for long-running stateless computationally heavy operations:
    - For example, databases, DL training, Spark/Hadoop analytics, video streaming.
- Some examples include AWS Lambda, Azure Functions, Google Functions, Apache OpenWhisk.

<center><img width=100 src="/datadocs/assets/aws-lambda-1.svg"/></center>

## Deployment models

- Different levels of security are automatically provided with each deployment model.
- Most cloud deployment models offered by cloud providers are typically public cloud by default.

#### Public cloud

- The cloud infrastructure is provisioned for open use by the public.
- They are the least secure of the deployment models.
- Most providers enable a “virtual private cloud” to increase the security.
- Examples are Amazon Web Service or Google Cloud Platform.

#### Community cloud

- The cloud infrastructure is provisioned for exclusive use by a specific community of subscribers.
    - Shared mission, security requirements, policies, and/or compliance considerations.
- Providers limit access to community members and isolate computing resources.
- Community clouds are more secure than public clouds.
- [Amazon Web Services’ GovCloud](https://aws.amazon.com/govcloud-us/) is an example of a community cloud.
    - Only US federal government employees, contractors, and agencies have been granted access. 

#### Private cloud

- The cloud infrastructure is provisioned for exclusive use by a single organization of subscribers.
- A private cloud can be physically located on a company’s on-site data center or in cloud.
    - If the private cloud is provided by a cloud provider, then the private cloud services and infrastructure are always maintained on a private network with hardware and software dedicated solely to the customer’s organization.
- Self-run data centers are generally capital intensive.

#### Hybrid cloud

- Hybrid cloud is a composition of a public cloud and a private environment.
- For example, store sensitive client data in house but interconnect that application to public cloud.


