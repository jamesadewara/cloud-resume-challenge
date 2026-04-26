# ☁️ Cloud Resume Challenge

A full-stack, serverless resume implementation built with modern cloud-native principles. This project showcases a high-performance frontend, a scalable Python API, and automated Infrastructure-as-Code (IaC) deployment.

![Project Diagram](assets/project-diagram.png)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (S3 + Cloudflare)
- **Backend**: Python (FastAPI), AWS Lambda
- **Database**: MongoDB Atlas
- **IaC**: Terraform (HCL)
- **CI/CD**: GitHub Actions (OIDC Authentication)

## 📂 Project Structure

| Component | Description |
| :--- | :--- |
| [**`resume`**](./cloud-resume-challenge-resume) | Responsive frontend assets hosted on AWS S3. |
| [**`backend`**](./cloud-resume-challenge-backend) | Serverless Python API for the visitor counter. |
| [**`iac`**](./cloud-resume-challenge-iac) | Terraform modules for AWS & Cloudflare automation. |

## 🚀 Quick Start

### 1. Infrastructure
```bash
cd cloud-resume-challenge-iac
terraform init
terraform apply
```

### 2. Backend
```bash
cd cloud-resume-challenge-backend
pip install -r requirements.txt
python main.py
```

### 3. Frontend
```bash
cd cloud-resume-challenge-resume
# Open index.html in your browser
```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.