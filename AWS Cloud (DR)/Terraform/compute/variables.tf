variable "region" {
  type        = string
  description = "AWS region for deployment"
  default = "us-east-1"
}


variable "environment" {
  type        = string
  description = "Environment name (dev, prod)"
  default     = "NHN-dev"
}

variable "subnet_type" {
  type        = string
  description = "Subnet type for instances: public or private"
  default     = "private"
  validation {
    condition     = contains(["public", "private"], var.subnet_type)
    error_message = "Subnet type must be either 'public' or 'private' or 'intra'."
  }
}
