---
id: aws-management
title: Management & Governance
sidebar_label: Management & Governance
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws-management.md
---

## Monitoring

### CloudWatch

<img width=100 src="/datadocs/assets/0_aws-cloudwatch.9e5ac55ae4.svg"/>

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
- Available metrics:
    - CPU Utilization identifies the processing power required to run an application. 
    - Network Utilization identifies the volume of incoming and outgoing network traffic. 
    - Disk Reads metric identifies the volume of the data the application reads from the hard disk.
- Custom metrics:
    - You can prepare a custom metric using CloudWatch Monitoring Scripts (shell, Perl, etc.)
    - You can also install CloudWatch Agent to collect more system-level metrics (Linux and Windows)
    - Custom metrics include Memory utilization, Disk swap utilization, Disk space utilization, Page file utilization, Log collection.
    - [Monitoring Memory and Disk Metrics for Amazon EC2 Linux Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/mon-scripts.html#using_put_script)
    - [CloudWatch Agent vs SSM Agent vs Custom Daemon Scripts](https://tutorialsdojo.com/aws-cheat-sheet-cloudwatch-agent-vs-ssm-agent-vs-custom-daemon-scripts/)
- Watching compute instances:
    - Host level checks metrics include CPU, network, disk and status check.
    - Standard monitoring = 5 minutes (default)
    - Detailed monitoring = 1 minute (additional costs may apply)
    - Allows creating performance alarms that trigger notifications.
- Compared to AWS CloudTrail:
    - CloudTrail monitors AWS Management Console actions and API calls.
    - CloudTrail records users who called AWS services, their IP addresses, and timestamps.
    - CloudWatch is used for monitoring performance, while CloudTrail is used for auditing.
    - CloudWatch will only cover the activities of the regional services.
    - Using Amazon CloudWatch alarm actions, [you can create alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/UsingAlarmActions.html) that automatically stop, terminate, reboot, or recover your EC2 instances.
- AWS can see the instance, but not inside the instance to what it is doing.
- [Amazon CloudWatch Cheat Sheet](https://tutorialsdojo.com/aws-cheat-sheet-amazon-cloudwatch/)

### CloudTrail

<img width=100 src="/datadocs/assets/9_aws-cloudtrail.5797f03873.svg"/>

- AWS CloudTrail is a service that enables governance, compliance, operational auditing, and risk auditing of your AWS account. 
- An event in CloudTrail is the record of an activity in an AWS account.
    - This activity can be an action taken by a user, role, or service that is monitorable by CloudTrail.
    - Provides a history of both API and non-API account activity made through the AWS Management Console, AWS SDKs, command line tools, and other AWS services.
- A trail can be applied to all regions (default) or a single region.
    - Pass `--is-multi-region-train` when using CLI.
- Events are delivered to any trail that includes global services.
    - Pass `--include-global-service-events` when using CLI.
- [About Global Service Events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-global-service-events)
- [Logging IAM and AWS STS API Calls with AWS CloudTrail](https://docs.aws.amazon.com/IAM/latest/UserGuide/cloudtrail-integration.html)
- [AWS CloudTrail Cheat Sheet](https://tutorialsdojo.com/aws-cheat-sheet-aws-cloudtrail/)

<img width=600 src="/datadocs/assets/cloudtrail_all_regions_main_screen_turn_on_1.png"/>
<center><a href="https://www.udemy.com/course/aws-certified-solutions-architect-associate-amazon-practice-exams/" class="credit">Credit</a></center>

## Organization

### Resource groups

- A resource group is a collection of AWS resources that are all in the same AWS region, and that match criteria provided in a query.
- With Resource Groups, you can:
    - View and manage large numbers of related resources.
    - Create a custom console that organizes and consolidates information.
    - Perform bulk actions on resources at one time.
- Two types of queries supported: tag-based and AWS CloudFormation stack-based.

### Organizations

<img width=100 src="/datadocs/assets/7_aws-organizations.5fb8d30d97.svg"/>

- AWS Organizations is an account management service which allows you manage multiple accounts centrally.
- Features:
    - Hierarchical-based control over groups of IAM users and roles, within multiple accounts.
    - Grouping all of your AWS accounts into Organizational Units (OUs)
    - AWS accounts that are members of an Organization benefit from consolidated billing.

## Automation

### CloudFormation

<img width=100 src="/datadocs/assets/5_aws-cloudformation.9c30330994.svg"/>

- CloudFormation is a way of completely scripting your cloud environment.
- [AWS Quick Starts](https://aws.amazon.com/quickstart/?quickstart-all.sort-by=item.additionalFields.updateDate&quickstart-all.sort-order=desc) is a bunch of CloudFormation templates to create complex environments easily.
- Template sections include *AWSTemplateFormatVersion*, *Description*, *Metadata*, *Parameters*, *Mappings*, *Conditions*, *Transform*, *Resources*, and *Outputs*.
- The formats JSON and YAML can be used to create CloudFormation templates.
- There is no additional charge for AWS CloudFormation. 
    - You only pay for the AWS resources that are created.
- [AWS CloudFormation FAQs](https://aws.amazon.com/cloudformation/faqs/)
- [AWS CloudFormation Cheat Sheet](https://tutorialsdojo.com/aws-cheat-sheet-aws-cloudformation/)

### OpsWorks

<img width=100 src="/datadocs/assets/12_aws-opsworks.aec47ed4ff.svg"/>

- Automates deployment, configurations and operational tasks for distributed applications.
- Using Chef, customize stacks or use pre-built layer templates on Chef scripts called cookbooks.

## Support

- Business Level Premium Support:
    - General guidance: < 24 hours
    - System impaired: < 12 hours
    - Production system impaired: < 4 hours
    - Production system down: < 1 hour

## Billing and cost management

- Consolidated Billing:
    - A single bill is issued containing the charges for all AWS accounts.
    - Account charges can be still tracked individually.
    - Multiple standalone accounts are combined and may reduce your overall bill.
- AWS Budgets gives you the ability to set custom budgets that alert you when your costs or usage exceed.
    - Can be tracked at the monthly, quarterly, or yearly level.
- Cost Explorer helps you visualize and manage your AWS costs and usages over time.
    - Offers a set of reports you can view data with for up to the last 13 months.
    - Can forecast how much you're likely to spend for the next three months.
    - Can get recommendations for what Reserved Instances to purchase.

## Disaster recovery (DR)

- RTO refers to the length of time it takes to restore business operations.
- RPO refers to the amount of time between backups.
- Disaster recovery plans:
    - Backup and Restore: Backs up your data and applications from anywhere to the AWS cloud.
    - Pilot Light: A small part of your infrastructure is always running simultaneously syncing mutable data (as databases or documents), while other parts of your infrastructure are switched off and used only during testing.
    - Warm Standby: A scaled-down version of a fully functional environment is always running in the cloud. It further decreases the recovery time because some services are always running.
    - Multi-Site: A multi-site solution runs on AWS as well as on your existing on-site infrastructure in an active-active configuration.
    - [Rapidly Recover Mission-Critical Systems in a Disaster](https://aws.amazon.com/blogs/publicsector/rapidly-recover-mission-critical-systems-in-a-disaster/)
- [AWS Disaster Recovery](https://aws.amazon.com/disaster-recovery/)