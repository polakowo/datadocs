---
id: aws
title: Amazon Web Services
sidebar_label: Amazon Web Services
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/aws.md
---

## Concepts

- Global infrastructure:
    - Each region is a distinct location within a geographic area designed to provide high availability to a specific geography. Each Region comprises at least two AZ's.
    - An availability zone (AZ) is one or more discrete data centers, each with redundant power, networking and connectivity, housed in separate facilities.
    - Edge locations are endpoints for AWS that are used for caching content (CloudFront). The number of Edge Locations is greater than the number of Availability Zones, which is greater than the number of Regions.
- Networking:
    - A Virtual Private Cloud (VPC) is a virtual network dedicated to a single AWS account. It is logically isolated from other virtual networks in the AWS cloud, providing compute resources with security and robust networking functionality.