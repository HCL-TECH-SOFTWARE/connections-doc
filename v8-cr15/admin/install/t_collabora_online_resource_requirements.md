# Collabora Online resource allocation and sizing guide


This guide provides hardware allocation and container deployment sizes for **Collabora Online**.

!!! Note
    The resource metrics, ratios, and formulas presented in this guide are based on general guidance and benchmarks provided by Collabora. For the latest and authoritative sizing guidance, see [Hardware Provisioning](https://sdk.collaboraonline.com/docs/technotes/hardware_provisioning.html) and [Collabora Online Technical Information (PDF)](https://mautic.collaboraoffice.com/asset/60:collabora-online-technical-information-pdf).

##  Concurrent user sizing quick reference

The table below provides high-level, rounded planning values for peak **Active Concurrent Users (CUs)**. Validate final production sizing against the latest Collabora guidance in the linked SDK and PDF documentation.

| Active Concurrent Users (CUs) | vCPU Required | RAM Required | Network Bandwidth |
| :---- | :---- | :---- | :---- |
| **50 CUs** | **4 vCPU** | **4 GB** | **5 Mbit/s** |
| **100 CUs** | **7 vCPU** | **6 GB** | **10 Mbit/s** |
| **250 CUs** | **17 vCPU** | **14 GB** | **25 Mbit/s** |
| **500 CUs** | **34 vCPU** | **26 GB** | **50 Mbit/s** |
| **1,000 CUs** | **67 vCPU** | **51 GB** | **100 Mbit/s** |


## Container deployment profiles

When deploying Collabora Online in containerized environments, resources can be allocated using standard **Profiles**. Use these profile values as a quick starting point, then tune based on workload behavior and the latest Collabora recommendations:

| Profile | Active Capacity Target | vCPU Allocation | RAM Request / Limit | Local Disk Storage |
| :---- | :---- | :---- | :---- | :---- |
| **Small Profile** | \~30 Active Concurrent Users | **2 vCPU** | **3 GB / 4 GB** | **10 GB** |
| **Medium Profile** | \~60 Active Concurrent Users | **4 vCPU** | **5 GB / 8 GB** | **20 GB** |
| **Large Profile** | \~120 Active Concurrent Users | **8 vCPU** | **10 GB / 16 GB** | **40 GB** |

### Key allocation guidelines

1. **Memory Limits:** Setting RAM limits higher than initial requests provides necessary safety headroom when users open unusually large or complex spreadsheets and presentations.  
2. **Profile Selection:** The **Medium Profile** is generally recommended as a balanced starting point for most worker nodes, whether running on bare metal or virtualized infrastructure.

