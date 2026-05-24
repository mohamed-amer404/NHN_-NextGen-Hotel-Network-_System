output "region"{
  value = var.region
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "vpc_CIDR" {
  value = module.vpc.vpc_cidr_block
}

output "Public_Subnet_1" {
  value = module.vpc.public_subnets[0] 
}

output "Public_Subnet_2" {
  value = module.vpc.public_subnets[1] 
}

output "Frontend_Subnet_1" {
  value = module.vpc.private_subnets[0] 
}

output "Frontend_Subnet_2" {
  value = module.vpc.private_subnets[1] 
}

output "Backend_Subnet_1" {
  value = module.vpc.private_subnets[2] 
}

output "Backend_Subnet_2" {
  value = module.vpc.private_subnets[3] 
}

output "DB_Subnet_1" {
  value = module.vpc.private_subnets[4] 
}

output "DB_Subnet_2" {
  value = module.vpc.private_subnets[5] 
}

output "private_route_table_ids" {
  value = module.vpc.private_route_table_ids
}

output "igw"{
  value = module.vpc.igw_id
}

output "ngw" {
  value = module.vpc.natgw_ids
}