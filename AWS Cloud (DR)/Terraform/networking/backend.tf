terraform {
  backend "s3" {
    bucket         = "graduation-project-cloud-networking-terraform-backend-us-east-1"
    key            = "networking/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "Lock_Terraform"
  }
}


