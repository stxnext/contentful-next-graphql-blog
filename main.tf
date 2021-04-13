terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

provider "aws" {
  alias  = "global_region"
  region = "us-east-1"
}

module "tf_next" {
  source = "dealmore/next-js/aws"

  providers = {
    aws.global_region = aws.global_region
  }
}

output "cloudfront_domain_name" {
  value = module.tf_next.cloudfront_domain_name
}
