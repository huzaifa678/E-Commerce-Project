variable "region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "Public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "Private subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "cluster_endpoint_public_access_cidrs" {
  description = "Public CIDR blocks"
  type        = list(string)
  default     = [ "0.0.0.0/0" ]

}

variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
  default     = "e-commerce-app-cluster"
}

variable "kubernetes_version" {
  default     = 1.31
  description = "kubernetes version"
}

variable "desired_capacity" {
  description = "Desired capacity of worker nodes"
  type        = number
  default     = 2
}

variable "max_size" {
  description = "Max size of worker nodes"
  type        = number
  default     = 3
}

variable "min_size" {
  description = "Min size of worker nodes"
  type        = number
  default     = 1
}

variable "doc_db_name" {
    description = "Document DB name"
    type        = string
    default     = "e-commerce-prodoucts-db"
}


variable "doc_db_username" {
    description = "username credential for document DB"
    type        = string
    default     = "root"
}

variable "doc_db_password" {
    description = "password credential for Document DB Optionally can be generated using random_password resource"
    type        = string
    default     = null
    sensitive   = true
}
