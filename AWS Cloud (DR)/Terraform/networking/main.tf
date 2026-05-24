module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "NHN_Hotel_Cloud_vpc"
  cidr =  var.vpc_CIDR

  azs = ["${var.region}a", "${var.region}b"]

  public_subnets  = [var.Public_Subnet_1_CIDR, var.Public_Subnet_2_CIDR]

  private_subnets = [var.Frontend_Subnet_1_CIDR, var.Frontend_Subnet_2_CIDR,

                    var.Backend_Subnet_1_CIDR, var.Backend_Subnet_2_CIDR,

                    var.DB_Subnet_1_CIDR, var.DB_Subnet_2_CIDR]

  # database_subnets = [var.intra_Subnet_1_CIDR, var.intra_Subnet_2_CIDR]

  enable_nat_gateway = true

  single_nat_gateway = true 

  enable_dns_hostnames = true
  enable_dns_support   = true
 ################### VPN Site-to_Site VPN ##########################

 enable_vpn_gateway = true
  
  propagate_private_route_tables_vgw = true
 
  propagate_public_route_tables_vgw  = true

  tags = {
    Environment = "NHN_dev"
  }

}
##############################################

resource "aws_customer_gateway" "main" {
  bgp_asn    = 65000
  ip_address = "3.215.114.8" 
  type       = "ipsec.1"

   tags = { Name = "NHN-CGW" }
}


resource "aws_vpn_connection" "main" {
  vpn_gateway_id      = module.vpc.vgw_id
  customer_gateway_id = aws_customer_gateway.main.id
  type                = "ipsec.1"
  static_routes_only  = true
}


resource "aws_vpn_connection_route" "office" {
   destination_cidr_block = "10.0.0.0/8" 
   vpn_connection_id      = aws_vpn_connection.main.id
}


