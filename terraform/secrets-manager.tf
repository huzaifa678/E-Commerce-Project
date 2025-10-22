resource "aws_secretsmanager_secret" "production_credentials" {
  name = "e-commmerce-app-production-credentials-v1"
}

data "external" "env" {
  program = ["bash", "${path.module}/parse_env.sh"]

  query = {
    MongoDBURI = local.docdb_uri
  }
}

resource "aws_secretsmanager_secret_version" "production_credentials_version" {
  secret_id = aws_secretsmanager_secret.production_credentials.id
  secret_string = jsonencode(data.external.env.result)

  depends_on = [
    aws_docdb_cluster_instance.docdb_instance
  ]
}