terraform {
  backend "s3" {
    bucket = "graduation-project-cloud-computing-terraform-backend-us-east-1"
    key    = "compute/terraform.tfstate"
    region = "us-east-1"
  }
}
