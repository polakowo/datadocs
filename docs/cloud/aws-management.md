---
id: aws-management
title: Management
sidebar_label: Management
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws-management.md
---

## CloudWatch

<img width=100 src="/datadocs/assets/cloudwatch.png"/>

- Amazon CloudWatch is a monitoring service for AWS resources and applications.
    - CloudWatch can monitor most of the AWS.
- Dashboards:
    - Creates dashboards to see what is happing in the AWS environment.
    - Can be global or regional.
- Alarms:
    - Set alarms to notify you when particular thresholds have been hit.
- Events:
    - Helps you to respond to state changes in AWS resources.
- Logs:
    - Helps you to aggregate, monitor and store logs.
- Watching compute instances:
    - Host level checks metrics include CPU, network, disk and status check.
    - Standard monitoring = 5 minutes (default)
    - Detailed monitoring = 1 minute (additional costs may apply)
    - Allows creating performance alarms that trigger notifications.
- Compared to AWS CloudTrail:
    - CloudTrail monitors AWS Management Console actions and API calls.
    - CloudTrail records users who called AWS services, their IP addresses, and timestamps.
    - CloudWatch is used for monitoring performance, while CloudTrail is used for auditing.