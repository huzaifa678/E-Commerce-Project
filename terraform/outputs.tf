output "doc_db" {
  description = "DOC DB"
  value       = aws_docdb_cluster_instance.docdb_instance
}

output "doc_db_creds" {
  description = "Username"
  sensitive = true
  value = local.db_creds
}

output "vpc_id" {
  description = "The VPC ID"
  value       = module.vpc.vpc_id
}

output "eks_cluster_name" {
  description = "EKS Cluster name"
  value       = aws_eks_cluster.eks_cluster.name

}

output "launch_template_user_data" {
  description = "user data"
  value       = aws_launch_template.eks_nodes.user_data 
}

output "cert_manager_irsa_role_arn" {
  value = aws_iam_role.cert_manager_irsa_role.arn
}