---
id: aws
title: Amazon Web Services
sidebar_label: Amazon Web Services
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws.md
---

<center><img width=200 src="/datadocs/assets/200px-Amazon_Web_Services_Logo.svg.png"/></center>

- Amazon Web Services (AWS) is the market leader in IaaS and PaaS for cloud ecosystems (2019)
- Provides on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered pay-as-you-go basis.
    - Most services are not exposed directly to end users, but instead offer functionality through APIs.
    - Offerings are accessed over HTTP, using the REST architectural style and SOAP protocol.
- Provides a set of abstract technical infrastructure and distributed computing building blocks and tools. 
- Ensures infrastructure reliability, compliance with security standards, and the ability to instantly grow or shrink your infrastructure to meet your needs.
- The technology is implemented at server farms throughout the world.
- [AWS Well-Architected Framework](https://d1.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf)
- [AWS Whitepapers & Guides](https://aws.amazon.com/whitepapers/?whitepapers-main.sort-by=item.additionalFields.sortDate&whitepapers-main.sort-order=desc&awsf.whitepapers-content-type=content-type%23whitepaper)

#### Pros

- Amazon's biggest strength is its dominance of the public cloud market.
    - AWS is the most mature, enterprise-ready provider.
- With a vast tool set that continues to grow exponentially, Amazon’s capabilities are unmatched.

#### Cons

- Many enterprises find it difficult to understand the company's cost structure and to manage them.
- Its singular focus on public cloud means that interoperating with your datacenter isn't top priority.

#### Global infrastructure

- An availability zone (AZ) is one or more discrete data centers.
    - Each with redundant power, networking and connectivity, housed in separate facilities.
- Each region is a distinct location designed to provide high availability to a specific geography. 
    - Each region comprises at least two AZs.
- Edge locations are endpoints for AWS that are used for caching content (CloudFront).
    - The number of edge locations >> the number of AZs >> the number of regions.