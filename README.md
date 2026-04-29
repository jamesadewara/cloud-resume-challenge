# ☁️ Cloud Resume Challenge - James Adewara

[![Terraform](https://img.shields.io/badge/IaC-Terraform-623CE4?logo=terraform)](https://www.terraform.io/)
[![AWS](https://img.shields.io/badge/Cloud-AWS-232F3E?logo=amazon-aws)](https://aws.amazon.com/)
[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-grade, serverless resume implementation built with modern cloud-native principles. This project showcases a high-performance frontend, a scalable Python API, and fully automated **Infrastructure-as-Code (IaC)** deployment using GitHub Actions and AWS OIDC.

## 📐 Architecture

```mermaid
graph TD
    User([User]) --> CF[Cloudflare Edge]
    CF -- HTTPS --> S3[AWS S3 Bucket]
    
    subgraph "AWS Cloud"
        S3
        APIG[API Gateway]
        Lambda[AWS Lambda - FastAPI]
        APIG --> Lambda
    end
    
    User -- Interaction --> APIG
    Lambda -- Persist/Fetch --> MongoDB[(MongoDB Atlas)]
    
    subgraph "CI/CD Pipeline"
        GH[GitHub Actions]
        GH -- Terraform Apply --> CF
        GH -- Terraform Apply --> APIG
        GH -- OIDC Deploy --> S3
        GH -- OIDC Deploy --> Lambda
    end
```

## 🌟 Key Features

- **Zero-Trust Security**: Uses GitHub OIDC for AWS authentication, eliminating the need for long-lived Access Keys.
- **Serverless Compute**: Backend logic powered by AWS Lambda and Mangum, ensuring zero cost when idle.
- **High Availability**: Global CDN acceleration via Cloudflare with automated SSL/TLS termination.
- **Modular IaC**: Reusable Terraform modules for compute, storage, and networking.
- **CI/CD Mastery**: Three separate pipelines managing infrastructure, backend code, and frontend assets.

## 📂 Project Structure

| Repository | Purpose | Tech Stack |
| :--- | :--- | :--- |
| [**`Infrastructure`**](https://github.com/jamesadewara/cloud-resume-challenge-iac) | Cloud provisioning & orchestration. | Terraform, HCL, AWS, Cloudflare |
| [**`Backend`**](https://github.com/jamesadewara/cloud-resume-challenge-backend) | Serverless visitor counter API. | Python, FastAPI, Beanie, MongoDB |
| [**`Frontend`**](https://github.com/jamesadewara/cloud-resume-challenge-resume) | Responsive resume website. | HTML5, CSS3, JavaScript |

## 🚀 Getting Started

To replicate this project, follow the deployment order below:

1.  **Provision Infrastructure**: Navigate to the `iac` directory and run `terraform apply`.
2.  **Deploy Backend**: Configure GitHub Secrets in the `backend` repo and push to `main`.
3.  **Deploy Frontend**: Configure GitHub Variables in the `resume` repo and push to `main`.

## 🔒 Security & Compliance

- **IAM Least Privilege**: Each component has its own dedicated IAM role with restricted policies.
- **CORS Protection**: API only accepts requests from verified production and development origins.
- **Encryption**: Data is encrypted at rest in MongoDB Atlas and in transit via TLS 1.3.

---
*Created by [James Adewara](https://www.linkedin.com/in/james-adewara) as part of the [Cloud Resume Challenge](https://cloudresumechallenge.dev/).*