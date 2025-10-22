data "aws_availability_zones" "available" {}

locals {
  db_creds = jsondecode(aws_secretsmanager_secret_version.production_credentials_version.secret_string)
}

locals {
  doc_db_password = coalesce(var.doc_db_password, random_password.doc_db_password.result)
}

locals {
  docdb_uri = format(
    "mongodb://%s:%s@%s:%s/products?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
    aws_docdb_cluster.docdb.master_username,
    local.doc_db_password,
    aws_docdb_cluster.docdb.endpoint,
    aws_docdb_cluster.docdb.port
  )
}