---
id: cloud-computing
title: Cloud Computing
sidebar_label: Cloud Computing
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/cloud-computing.md
---

- No capital requirements for hardware
- Ability to architect for high availability with built-in fault tolerance
- Flexible capacity and near-infinite scalability to deal with elastic demands
- Always the latest technology

#### Two options

- Cloud-managed (Amazon RDS, Amazon DynamoDB, Amazon S3)
    - Re-use of expertise of the cloud provider.
    - Way less staff for managing infrastructure, security, and upgrades.
    - Less operating expenses.
    - Infrastructure as code (IaC) for scripting resources.
- Self-managed (EC2 + PostgreSQL, EC2 + Cassandra, EC2 + Unix FS)
    - More configurable and customizable.

#### Infrastructure-as-Code (IaC)

- IaC lets you automate, maintain, deploy, replicate and share complex infrastructures as easily as you maintain the code.
    - Undreamt-of in on-premise deployment.
    - Creating a machine is as easy as opening a file.
- Pros:
    - Sharing: One can share all the steps with others easily
    - Reproducibility: One can be sure that no steps are forgotten
    - Multiple deployments: One can create a test environment identical to the production environment
    - Maintainability: If a change is needed, one can keep track of the changes by comparing the code
- Intersects with DevOps.
- A number of options to achive IaC on AWS:
    - aws-cli scripts (similar to bash)
    - AWS SDK (available in lots of programming languages such as Python, more power, integration with apps)
    - Amazon Cloud formation (JSON description of resources, permissions and constraints, atomic)