---
id: aws-networking
title: Networking
sidebar_label: Networking
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/cloud/aws-networking.md
---

## Infrastructure

- Each region is a distinct location designed to provide high availability to a specific geography. 
    - Each region comprises at least two AZs.
- An availability zone (AZ) is one or more discrete data centers.
    - Each with redundant power, networking and connectivity, housed in separate facilities.
- Edge locations are endpoints for AWS that are used for caching content (CloudFront).
    - The number of edge locations >> the number of AZs >> the number of regions.
- A Virtual Private Cloud (VPC) is a virtual network dedicated to a single AWS account. 
    - It is logically isolated from other virtual networks in the AWS cloud, providing compute resources with security and robust networking functionality.

## CloudFront

<img width=100 src="/datadocs/assets/aws-cloudfront.svg"/>

- A Content Delivery Network (CDN) is a system of distributed servers (network) that deliver webpages and other web content to a user based on the geographic locations of the user, the origin of the webpage, and a content delivery server.
    - Origin is the origin of all the files that the CDN will distribute.
    - Distribution is the name of the CDN that consists of a collection of edge locations.
    - Web distributions are typically used for websites.
    - RTMP is used for media streaming.
- Amazon CloudFront is a fast content delivery network (CDN) service.
    - Can deliver an entire website, including dynamic, static, streaming, and interactive content using a global network of edge locations.
    - Requests for the content are automatically routed to the nearest edge location, so the content is delivered with the best possible performance.
- Edge locations:
    - They are not just read-only, one can write to them too.
    - Objects are cached based on the TTL (time to live)
    - You can clear cached objects (i.e. invalidate them), but you will be charged.

## Routing

### DNS

- The Domain Name Systems (DNS) is the phonebook of the Internet.
    - Converts a hostname (`www.example.com`) into a computer-friendly IP address (`192.168.1.1`)
- The DNS recursor is a server designed to receive queries from client machines.
    - Makes a series of requests until it reaches the authoritative DNS nameserver.
    - Cached either locally inside the querying computer or remotely in the DNS infrastructure.
    - Examples include Google DNS, OpenDNS, and providers like Comcast.
- Root nameserver responds to the resolver with the address of a TLD server (such as `.com` or `.net`)
- Top Level Domain (TLD) nameserver stores the information for its domains.
    - The TLD server responds with the IP address of the domain’s nameserver (`example.com`)
    - The top-level domain (TLD) names (e.g. `.com`) are controlled by the Internet Assigned Numbers Authority (IANA) in a root zone database, which is essentially a database of all available TLD names.
    - The database can be viewed under [https://www.iana.org/domains/root/db](https://www.iana.org/domains/root/db)
- Authoritative nameserver is a server that actually holds, and is responsible for, DNS resource records.
    - This is the server at the bottom of the DNS lookup chain.
    - Can satisfy queries from its own data without needing to query another source.
    - But requires an additional nameserver for serving queries for a subdomain (`blog.cloudflare.com`)
- A registrar is an authority that can assign domain names under one or multiple TLDs.
    - This domains are registered with InterNIC, a service of ICANN, which enforces uniqueness of domain names across the Internet.
    - Each domain name becomes registered in a central database known as the WhoIS database.
    - For example, Amazon, `GoDaddy.com`

<img width=500 src="/datadocs/assets/1354-1.jpg"/>
<center><a href="http://www.itgeared.com/articles/1354-domain-name-system-dns-tutorial-overview/" class="credit">Credit</a></center>

#### Records

- The State of Authority Record (SOA) stores information about:
    - The name of the server that supplied the data for the zone.
    - The administrator of the zone.
    - The current version of the data file.
    - The default number of seconds for the TTL file on resource records.
    - When any record in the zone is updated, the SOA record serial number is incremented.
- The Name Server (NS) record is used for recursively resolving the required domain name.
    - Used to redirect the resolver to the DNS server hosting the next level domain.
- The A record maps a name to one or more IP addresses.
    - The "A" stands for address.
    - Use an A record if you manage which IP addresses are assigned to a particular machine, or if the IP are fixed (this is the most common case).
- The Canonical Name (CNAME) record maps a name to another name.
    - Use a CNAME record if you want to alias one name to another name, and you don’t need other records (such as MX records for emails) for the same name.
    - Can be used to map two domain names to the same IP address.
    - Should only be used when there are no other records on that name.
- The ALIAS record maps a name to another name, but can coexist with other records on that name.
    - Use an ALIAS record if you’re trying to alias the root domain (apex zone), or if you need other records for the same name.
    - Given the choice, always choose an ALIAS record over a CNAME.
- The MX record is used for emails.
- The PTR record is used to lookup the domain name of an IP address (also called reversed A record)
- The duration that the DNS record is cached (on Resolving Server or user PC) is TTL in seconds.
    - The default is 48 hours, that is, a DNS change may need 48 hours to fully propagate.

### Route 53

<img width=100 src="/datadocs/assets/1*Ezs2-Kqjlo7mPczPv_q_gA.png"/>

- Route 53 is Amazon's DNS Service.
- Route 53 is named so because the DNS port is 53.
- You can buy domain names directly with AWS.
    - Can take up to 3 days to register.
    - There is a default limit of 50 domain names. However, this limit can be increased by contacting the AWS support.
- Health checks:
    - You can set health checks on individual record sets.
    - If a record set fails a health check, it will be removed until it passes the check.
    - You can also set up SNS notifications to be notified about any failed health checks.

#### Routing policies

- Simple routing:
    - One record with multiple IP addresses.
    - If multiple values are specified, Route 53 returns them in random order.
    - For example, the user can be redirected to Ohio and the next time to Sydney (after TTL expires)
    - Cannot be associated with health checks.
- Weighted routing:
    - Allows you to split your traffic based on different weights assigned.
    - For example, you can set 10% of traffic to go to US-EAST-1 and 90% to EU-WEST-1.
- Latency-based routing:
    - Routes traffic based on the lowest network latency for the end user.
    - To use it, create a latency RRset for the AWS resource in each region it is hosted.
    - Use VPN clients (such as NordVPN) to test the service.
- Failover routing:
    - Used when you want to create an active/passive setup.
    - For example, when your primary server is in US-EAST-1 and secondary in EU-WEST-1.
    - Route 53 will monitor the health of the primary server using a health check.
- Geolocation routing:
    - Routes traffic based on the geolocation of the end user.
    - For example, route all queries from Europe to a fleet of EC2 instances in EU-WEST-1. These servers may have the local language of European customers and all price are displayed in Euros.
    - Not to be confused with latency-based routing.
- Geoproximity routing (traffic flow only):
    - Routes traffic based on the geolocation of the end user and the resource.
    - You can also specify to route more traffic or less to a given resource by specifying a value (bias)
    - A bias expands or shrinks the size of the geographic region from which traffic is routed.
    - To use it, you must use Route 53 traffic flow.
- Multivalue Answer routing:
    - Lets configure Route 53 to return multiple IP addresses in response to DNS queries.
    - Compared to simple routing, allows health checks and returns only values for healthy resources.
    - The choice of which to use is left to the requesting service effectively creating a form or randomization.

## VPC

<img width=150 src="/datadocs/assets/0*0q474CHdkubW1ZA-.jpg"/>

- Amazon Virtual Private Cloud (Amazon VPC) lets you provision a logically isolated section of the AWS where you can launch AWS resources in a virtual network that you define.
    - Think of VPC as a logical datacenter on AWS.
- You have complete control over your network environment, including selection of your IP address range, creation of subnets, and configuration of route tables and network gateways.
    - For example, create a public-facing subnet (`10.0.1.0/24`) for web servers and private-facing subnet (`10.0.2.0/24`) for databases.
- Allows creation of a hardware VPN connection between private datacenters and Amazon VPC.
- Consists of Virtual Private Gateways (IGWs), route tables, ACLs, subnets, and security groups.
- Classless Inter-Domain Routing (CIDR) blocks:
    - Some private IP address ranges include `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`
    - To translate an IP address with prefix (`192.64.0.0/14`), convert the prefix into the bitmask (14 bits from left is `11111111.11111100.00000000.00000000`), then into the decimal subnet mask (`255.252.0.0`), then into the wildcard (remaining `0.3.255.255`), and finally add the prefix to the IP address (the first available host is `192.64.0.1`, the last `192.67.255.254`)
    - [AN INTERACTIVE IP ADDRESS AND CIDR RANGE VISUALIZER](http://cidr.xyz)
    - The largest prefix Amazon allows is 16 (65,536 addresses), the smallest is 28 (16 addresses)
    - Amazon always reserves 5 IP addresses within each subnet for own use.
- Default VPC:
    - User friendly, allowing to immediately deploy instances.
    - Your default VPC includes a subnet per AZ, an internet gateway (each default subnet is a public subnet), a route table with the route to the internet gateway, a default NACL that allows everything, and a default security group that also allows everything. Each EC2 instance created under a subnet of this VPC has both a private and public IP address.
    - If you do delete the default VPC, it will remove any network objects associated with it. But you can recover it now.
- VPC Peering:
    - Connect one VPC with another via a direct network route using private IP addresses.
    - Instances behave as they are on the same private network.
    - You can peer VPCs with VPCs in another regions or even AWS accounts.
    - Peering is a star configuration: 1 central VPC peers with 4 others. Transitive peering is not allowed: if both VPC 'B' and VPC 'C' are peered with VPC 'A', they cannot communicate with each other directly.
- Vulnerability scans:
    - Until recently customers were not permitted to conduct penetration testing without AWS engagement. However that has changed. There are still conditions though.
- You can create up to 5 VPCs in a single region.
- In Amazon VPC, an instance always retains its private IP address.

### Concepts

- Inside a region, we have our VPC. On the outside of the VPC, we have two ways to connecting to it: Internet Gateway and Virtual Private Gateway. The traffic from an Internet gateway is routed to the appropriate subnet using the routes in the routing table. The rules of the network ACL associated with the subnet control which traffic is allowed to the subnet. The rules of the security group associated with an instance control which traffic is allowed to the instance.
- A virtual private cloud (VPC) is a virtual network dedicated to your AWS account.
- A subnet is a range of IP addresses in your VPC.
    - To protect the AWS resources in each subnet, you can use multiple layers of security, including security groups and ACL.
    - Subnets cannot span multiple AZs.
    - By default, instances in new subnets in a custom VPC can communicate with each other across AZs. In a custom VPC with new subnets in each AZ, there is a route that supports communication across all subnets/AZs. Plus a default SG with an allow rule 'All traffic, all protocols, all ports, from anything using this default SG'.
- A route table contains a set of rules (routes) that are used to determine where network traffic is directed.
    - The route table entries enable instances in the subnet to communicate with other instances in the VPC (also in other subnets), and to communicate directly over the Internet.
    - Every time we create a subnet, it will be automatically associated with the main route table.
    - Thus, create a separate, custom route table for any public subnets.
- An internet gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet. 
    - It therefore imposes no availability risks or bandwidth constraints on your network traffic.
    - A subnet that's associated with a route table that has a route to an Internet gateway is known as a public subnet.
    - You can only attach one internet gateway per VPC.
- Network ACLs act as a firewall for associated subnets:
    - Think of Homeland Security.
    - Operates at the subnet level.
    - Supports allow rules and deny rules.
    - Is stateless: Return traffic must be explicitly allowed by rules.
    - Automatically applies to all instances in the subnets it's associated with (therefore, an additional layer of defense if the security group rules are too permissive)
- Security groups act as a firewall for associated Amazon EC2 instances:
    - Think of local law enforcement.
    - Operates at the instance level.
    - Supports allow rules only.
    - Is stateful: Return traffic is automatically allowed, regardless of any rules.
    - By default, security groups do not have access to each other.

<img width=500 src="/datadocs/assets/security-diagram.png"/>
<center><a href="https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html" class="credit">Credit</a></center>

#### Custom VPC

- Create a new VPC (`10.0.0.0/16`). When you create a custom VPC, a default route table, a default ACL, and a default VPC security group are created. It won't create any subnets, nor it will create an internet gateway.
- Create two subnets under this VPC. Assign custom IP address ranges in each subnet: `10.0.1.0/24` for public and `10.0.2.0/24` for private. Select the AZ for each one (Keep in mind: An AZ in one AWS account can be different from the same AZ in a different AWS account, since they are randomized). By default, any user-created VPC subnet WILL NOT automatically assign public IPv4 addresses to instances, thus for the public one, turn on "Auto-assign IPv4".
- Create an internet gateway and attach it to the VPC.
- Configure route tables between subnets. Since the created subnets are associated with the main route table by default, create a new route table and add the `0.0.0.0/0` route to the internet gateway created earlier. Associate then the public subnet `10.0.1.0/24` with this table.
- Go over to the AWS resources, and create them under the corresponding subnets.
- Specify the appropriate security groups for your resources for them to communicate. For example, for SG 'A' to talk to a private SG 'B', create a new rule for SG 'B' and add SG 'A' as Source.

<img width=600 src="/datadocs/assets/internet-gateway-diagram.png"/>
<center><a href="https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html" class="credit">Credit</a></center>

### NAT

<img width=100 src="/datadocs/assets/27_vpc-nat-gateway.aac10e8c0d.svg"/>

- You can use a network address translation (NAT) gateway to enable instances in a private subnet to connect to the internet or other AWS services, but prevent the internet from initiating a connection with those instances.
    - For example, this can be used to do software updates in private subnets.

#### NAT instances (outdated)

- A NAT instance is acting as a bridge between subnets and the internet gateway.
- To set it up, create a NAT instance, and in the route table of the subnet where your EC2 instance is located, enter a route to this NAT instance to direct the internet traffic through this instance.
- Must be in a public subnet and source/destination checks must be disabled.
- The amount of traffic that this instance can support depends on its size.
- A massive bottleneck: A single VM, which can be easily overwhelmed. You can create HA using Autoscaling Groups, multiple subnets in different AZs, and a script to automate failover.
- When the instance is removed, the corresponding route is marked as "blackhole"
- Behind the security group.

#### NAT Gateways

- Redundant in the AZ and thus highly available.
- Starts at 5Gbps and scales currently to 45Gbps.
- There is no need to patch operation system.
- Automatically assigned a public IP address.
- Remember to update your route tables.
- Uses ephemeral ports 1024-65535.
- Not behind any security group.
- If you have resources in multiple AZs and they share one NAT gateway, in the event of that the NAT gateway's AZ is down, resources in the other AZs lose internet access.
    - To create an AZ-independent architecture, create a NAT gateway in each AZ.

#### Bastion host

- A NAT gateway is used to provide internet traffic to EC2 instances in private subnets.
- A bastion is used to securely administer EC2 instances (SSH/RDP)
- Don't confuse Bastions and NATs, which allow outside traffic to reach an instance in a private subnet.
- A bastion host is a special computer on a network designed and configured to withstand attacks.
    - Generally hosts a single application (e.g. proxy server)
    - All other services are removed or limited to reduce the threat to the computer.
    - Located either on the outside of the firewall or in a demilitarized zone (DMZ)
    - Usually involves access from untrusted networks or computers.

### NACL

<img width=100 src="/datadocs/assets/41_network-access-control-list.d577137fe9.svg"/>

- NACLs have separate inbound and outbound rules, and each rule can either allow or deny traffic.
- Your VPC automatically comes with a default network ACL that allows everything.
- When creating a new NACL, all inbound and outbound rules are denied by default.
- Each subnet in the VPC must be associated with a network ACL.
    - If you don't explicitly associate a subnet with a NACL, the subnet is automatically associated with the default NACL.
    - You can associate a NACL with multiple subnets.
    - However, a subnet can only be associated with a single NACL at a time.
    - When you associate a subnet with a new NACL, starting with the lowest numbered rule.
- Amazon recommends that you use increments of 100 for each rule (and of 1 for IPv4 and IPv6)
    - The rules are evaluated in numerical order, from the lowest to the highest.
    - For example, if you allow port 80 in the rule "100" and disable it in the rule "200", the port will still be open. That's also why everything under the rule "*" is denied at the end.

### VPC Flow Logs

- VPC Flow Logs enables you to capture information about the IP traffic.
- Logs are stored either using S3 or Amazon CloudWatch Logs.
    - For this, create a log group in Amazon CloudWatch and an IAM role first.
- Can be created at three levels:
    - VPC
    - Subnet
    - Network Interface Level
- Limitations:
    - You cannot enable flow logs for VPCs that are peered with your VPC unless the peer VPCs are under your account.
    - After you've created a flow log, you cannot change its configuration.
    - You cannot tag a flow log.
- Not all IP traffic is monitored:
    - Traffic generated by EC2 instances when they contact the Amazon DNS server (unless its your own DNS server)
    - Traffic generated by a Windows instance for Amazon Windows license activation.
    - Traffic to and from `169.254.169.254` for instance metadata.
    - DHCP traffic as well as the traffic to the reserved IP address for the default VPC router.

### VPC Endpoints

<img width=100 src="/datadocs/assets/23_vpc-endpoints.6dddeea38c.svg"/>

- A VPC endpoint enables you to privately connect from your VPC to other AWS services without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection.
    - In contrast to a NAT gateway, traffic does not leave the Amazon network.
    - Instances in your VPC do not require public IP addresses.
- Endpoints are virtual devices that are horizontally scaled, redundant, and highly available.
- There are two types of VPC endpoints:
    - Interface endpoints: A whole bunch of services are supported.
    - Gateway endpoints: S3 and DynamoDB are supported.

## Direct Connect

<img width=100 src="/datadocs/assets/19_aws-direct-connect.f5d993d6da.svg"/>

- Direct Connect makes it easy to establish a dedicated network connection from your premises to AWS.
- Useful for high throughput workloads (i.e. lots of network traffic)
- Or if you want to establish a stable and reliable network connection.
- Provides a more consistent network experience than Internet-based applications.

## High availability

- Availability is the % of a time period when the service will be able to respond to request in some fashion.
- Durability refers to the on-going existence of the object or resource.
- Resiliency can be described as the ability to a system to self heal after damage or an event.
- Reliability is the probability that a system will work as designed.
- Everything fails. Everything. You should always plan for failure.  
    - Use multiple AZs and multiple regions wherever you can.
    - Know the difference between Multi-AZ (for disaster recovery) and read replicas (for performance) for RDS.
    - Know the difference between scaling out (auto-scaling) and up (increase resources)
    - Know the different S3 storage classes.
    - Always consider the cost element.
    - Perform manual robustness testing: [The Netflix Simian Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)

<img width=400 src="/datadocs/assets/this-is-fine-meme-625x350.jpg"/>
<center><a href="https://www.geek.com/culture/this-is-fine-meme-dog-being-turned-into-a-plushie-1664644/" class="credit">Credit</a></center>

### ELB

<img width=100 src="/datadocs/assets/38_application-load-balancer.40610a2c7e.svg"/>

- Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple targets, such as Amazon EC2 instances, containers, IP addresses, and Lambda functions.
- Application ELBs:
    - Best suited for load balancing of HTTP and HTTPs traffic.
    - Operate at LAYER 7 and are application aware.
    - Capable of intelligent request routing: based on rules for target group, condition, and priority.
    - For example, ELB can see changing currency to $ on a website and redirect traffic to US.
- Network ELBs:
    - Best suited for load balancing of TCP traffic where extreme performance is required.
    - Specifically designed for high performance traffic that is not conventional web traffic.
    - Operate at LAYER 4 and are connection aware.
    - Capable of handling millions of requests per second while maintaining low latencies.
- Classic ELBs:
    - Classic ELBs are the previous generation ELBs.
    - Can operate at LAYER 7 (e.g. X-Forwarded and sticky sessions)
    - Can also use strict LAYER 4 load balancing for applications that rely on TCP.
    - Cheaper than others and is usually used for round-robin DNS.
    - If your application stops responding, the ELB responds with "504 Gateway Time-out" error.
- X-Forwarded:
    - When a request is going through an ELB, the EC2 instance receives the IP address of the ELB instead of the client. To forward the client's IP address, use `X-Forwarded-For` field.
- Monitoring:
    - Instances monitored by ELB are either InService or OutService.
    - Health checks check the health of an instance by talking to it.
- Sticky sessions:
    - Sticky session allow you to bind a user's session to a specific EC2 instance.
    - Can be useful if you're storing information locally on that instance.
    - If you're confronted with an EC2 instance that receives no traffic, disable sticky sessions.
- Cross-Zone Load Balancing:
    - Direct traffic across multiple AZs.
- Path patterns:
    - Direct traffic based on the URL contained in the request.
    - For example, for microservices, you can route traffic to multiple backend services (`www.myurl.com` to US-EAST-1A and `www.myurl.com/images/` to US-EAST-1B)
- They do not have IPv4 addresses; you can resolve to them using a DNS name.
- You need at least two public subnets when creating a load balancer.
- Read the [ELB FAQ](https://aws.amazon.com/elasticloadbalancing/faqs/) for Classic Load Balancers.

### Auto Scaling

<img width=100 src="/datadocs/assets/auto-scaling.svg"/>

- Auto Scaling allows you to set up dynamic and predictive scaling for scalable AWS resources.
- Always check that the launch configuration is being triggered properly.
