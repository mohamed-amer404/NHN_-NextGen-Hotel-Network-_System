# Hybrid Enterprise Infrastructure & Cloud Architecture

 📌 Project Overview
 This repository features the design and implementation of a highly secure, scalable, and resilient Hybrid Cloud Infrastructure. The project seamlessly bridges an enterprise On-Premises environment—simulating core networking devices, robust firewall perimeter defenses, and essential centralized corporate services—with a modern, automated public cloud environment on AWS, fully provisioned through Infrastructure as Code (IaC) using Terraform.


 By establishing a secure, high-performance Site-to-Site IPsec VPN tunnel between the local edge firewall and the AWS cloud gateway, this hybrid architecture achieves seamless data replication, secure private workload migration, and unified corporate monitoring across physical and virtual boundaries.


🎯 Key Architectural Objectives
Hybrid Connectivity: Bridging traditional data center workloads with elastic cloud computing without exposing internal traffic to the public internet.


Immutable Infrastructure: Utilizing Terraform to eliminate configuration drift and ensure environment repeatability.


Zero Trust Perimeter: Implementing multi-layered defense-in-depth using dedicated physical/virtual Next-Generation Firewalls and isolated subnetting schemes.


Centralized Governance: Ensuring all authentication, logging, system time, and network monitoring are consolidated under strict enterprise control systems.