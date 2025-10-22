resource "random_password" "doc_db_password" {
  length           = 16
  special          = false
  override_special = "!#$&*"
  upper            = true  
  lower            = true  
  numeric          = true
}

resource "aws_db_subnet_group" "doc_db_subnet_group" {
  name       = "doc-db-subnet-group"
  subnet_ids = module.vpc.private_subnets

  tags = {
    Name = "doc-db-subnet-group"
  }
}

resource "aws_docdb_cluster" "docdb" {
  cluster_identifier      = "crypto-docdb-cluster"
  engine                  = "docdb"
  master_username         = var.doc_db_username
  master_password         = local.doc_db_password
  db_subnet_group_name    = aws_db_subnet_group.doc_db_subnet_group.name
  vpc_security_group_ids  = [aws_security_group.doc_db_sg.id]
  skip_final_snapshot     = true

  backup_retention_period = 1
  preferred_backup_window = "07:00-09:00"

  tags = {
    Name = "crypto-docdb-cluster"
  }
}

resource "aws_docdb_cluster_instance" "docdb_instance" {
  identifier         = "crypto-docdb-instance"
  cluster_identifier = aws_docdb_cluster.docdb.id
  instance_class     = "db.t3.small"
  apply_immediately  = true

  tags = {
    Name = "crypto-docdb-instance"
  }
}
