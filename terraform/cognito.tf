variable "region" {
  type        = string
}

variable "environment" {
  type = string
}

provider "aws" {
  region = var.region
}

resource "aws_cognito_user_pool" "conduit_pool" {
  name                = "conduit-user-pool-${var.environment}"
  alias_attributes     = ["email"]
  auto_verified_attributes = ["email"]
  mfa_configuration    = "OFF"  # Turn off MFA for now (can be configured for MFA)

  tags = {
    "Environment" = var.environment
  }
}

resource "aws_cognito_user_pool_client" "conduit_pool_client" {
  name                     = "conduit-client-${var.environment}"
  user_pool_id             = aws_cognito_user_pool.conduit_pool.id
  generate_secret          = true

  allowed_oauth_flows     = ["client_credentials"]
  supported_identity_providers = ["COGNITO"]
}
