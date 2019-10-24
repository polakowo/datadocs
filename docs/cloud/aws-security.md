---
id: aws-security
title: Security
sidebar_label: Security
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws-security.md
---

## IAM

<img width=100 src="/datadocs/assets/11_iam.6979bf0d85.svg"/>

- IAM allows to manage users and their level of access to the AWS console.
- IAM is universal and is not region-specific at this time.
- Identity access management (IAM) offers the following features:
    - Centralized control of the AWS account
    - Shared access to the account
    - Fine-grained access control to AWS resources
    - Identity federations (Facebook, Linkedin, etc.)
    - Multi-factor authentication
    - Provides temporary access for users/devices and services when necessary.
    - Allows to set up own password rotation policy.
- The "root account" is simply the account created with the AWS account.
- Users:
    - End users such as employees of an organization.
    - New users have no permissions by default.
    - To access the AWS management console, new users use the account and password combination. 
    - To access the AWS programmatically, they use the access key & secret access key combination.
    - Credentials can be viewed only once, thus save them in a secure location.
    - Set up multi-factor authentication (MFA) to the root account (easy with Google Authenticator)
    - Using SAML (Security Assertion Markup Language 2.0), you can give your federated users single sign-on (SSO) access to the AWS Management Console.
- Groups:
    - Groups are collections of users.
    - Each user inherits the permissions of the group.
- Policies:
    - A policy is a JSON document that provides formal statement of one or more permissions.
    - For example, allow user to access of all AWS services except the IAM service (power user)
    - Configure users and policy documents only once, as these are applied globally.
- Roles:
    - Give permissions to AWS services to use other AWS services.
- Tips:
    - Enact a strong password policy: user passwords must be changed every 45 days, with each password containing a combination of capital letters, lower case letters, numbers, and special symbols.