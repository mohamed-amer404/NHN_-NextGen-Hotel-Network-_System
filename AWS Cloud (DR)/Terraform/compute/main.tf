# Reference to networking outputs from remote state
locals {
  region                        = data.terraform_remote_state.networking.outputs.region
  vpc_id                        = data.terraform_remote_state.networking.outputs.vpc_id
  vpc_CIDR                      = data.terraform_remote_state.networking.outputs.vpc_CIDR
  public_subnet_1_id            = data.terraform_remote_state.networking.outputs.Public_Subnet_1
  public_subnet_2_id            = data.terraform_remote_state.networking.outputs.Public_Subnet_2
  Frontend_subnet_1_id          = data.terraform_remote_state.networking.outputs.Frontend_Subnet_1
  Frontend_subnet_2_id          = data.terraform_remote_state.networking.outputs.Frontend_Subnet_2
  Backend_subnet_1_id           = data.terraform_remote_state.networking.outputs.Backend_Subnet_1
  Backend_subnet_2_id           = data.terraform_remote_state.networking.outputs.Backend_Subnet_2
  DB_subnet_1_id                = data.terraform_remote_state.networking.outputs.DB_Subnet_1
  DB_subnet_2_id                = data.terraform_remote_state.networking.outputs.DB_Subnet_2
  private_route_table_ids       = data.terraform_remote_state.networking.outputs.private_route_table_ids

  selected_subnets = var.subnet_type == "public" ? [
    local.public_subnet_1_id,
    local.public_subnet_2_id
  ] : [
    local.Frontend_subnet_1_id,
    local.Frontend_subnet_2_id
  ]
}

#################################################################################
# ALB Security Group
#################################################################################
resource "aws_security_group" "alb_sg" {
  name_prefix = "NHN-alb-sg-"
  description = "Security group for Application Load Balancer"
  vpc_id      = local.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTP access from internet"
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTPS access from internet"
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow API access from internet to Container"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = {
    Name        = "NHN-alb-sg"
    Environment = var.environment
    Module      = "compute"
    Component   = "load_balancer"
  }
}

#################################################################################
# ECS Security Group   # ECS Tasks (Frontend & Backend)
#################################################################################
resource "aws_security_group" "ecs_sg" {
  name        = "NHN_Hotel_ECS_SG"
  vpc_id      = local.vpc_id

  # FrontEnd Port (Nginx)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    security_groups = [aws_security_group.alb_sg.id] ######## ALB 
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    security_groups = [aws_security_group.alb_sg.id]   ######## ALB 
  }

  # BackEnd Port (Node.js)
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    security_groups = [aws_security_group.alb_sg.id]  ######### ALB 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Environment = var.environment }
}

#################################################################################
# EC2 MondoDB Security Group
#################################################################################

resource "aws_security_group" "mongodb_sg" {
  name        = "NHN_Hotel_MongoDB_SG"
  description = "Allow inbound traffic for MongoDB from VPC and VPN"
  vpc_id      = local.vpc_id

 

  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["172.16.13.0/24", "172.16.14.0/24"]
    security_groups = [aws_security_group.ecs_sg.id]
  }

# Replication Between On-Prime And AWS

  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"] 
  }

  ingress {
  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = [local.vpc_CIDR] 
  description = "Allow HTTPS traffic from VPC for SSM Endpoints"
}

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"] 
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Environment = var.environment}
}

#################################################################################
# AWS ECR Repositories
#################################################################################


resource "aws_ecr_repository" "frontend" {
  name                 = "nhn-hotel-frontend"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration { scan_on_push = true }
}

resource "aws_ecr_repository" "backend" {
  name                 = "nhn-hotel-backend"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration { scan_on_push = true }
}

#################################################################################
# EC2 MongoDB
#################################################################################
data "aws_ami" "ubuntu" {
  most_recent = true
  filter { 
    name = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"] 
    }
  filter { 
    name = "virtualization-type" 
    values = ["hvm"] 
    }
  owners      = ["099720109477"] # Canonical
}

resource "aws_instance" "mongodb" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.micro" 
  subnet_id              = local.DB_subnet_1_id
  vpc_security_group_ids = [aws_security_group.mongodb_sg.id]

  iam_instance_profile = aws_iam_instance_profile.mongodb_profile.name

  root_block_device {
    volume_type           = "gp3" 
    volume_size           = 10   
    delete_on_termination = true
  }
########################################
# Auto install MongoDB Dependences 
########################################
  user_data = <<-EOF
              #!/bin/bash
              sudo -i
              apt-get update -y
              apt-get install -y gnupg curl
              
              curl -fsSL "https://www.mongodb.org/static/pgp/server-7.0.asc" | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg --yes
             
              echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
              apt-get update -y
              apt-get install -y mongodb-org

              sed -i 's/bindIp: 127.0.0.1/bindIp: 0.0.0.0/g' /etc/mongod.conf

              echo -e "\nreplication:\n  replSetName: \"rs0\"" >> /etc/mongod.conf

              systemctl daemon-reload
              systemctl start mongod
              systemctl enable mongod
              EOF
  tags = { Name = "NHN_Hotel_MongoDB_DR" }
}

#################################################################################
# AWS ECS Fargate Cluster 
#################################################################################
resource "aws_ecs_cluster" "main" {
  name = "NHN_Hotel_Cluster"
  
  tags = { Environment = var.environment }
}

#################################################################################
# AWS Application Load Balancer
#################################################################################
resource "aws_lb" "main" {
  name               = "NHN-Hotel-ALB"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [local.public_subnet_1_id, local.public_subnet_2_id]

  tags = { Environment = var.environment }
}

###### Target Group to Frontend ######

resource "aws_lb_target_group" "frontend_tg" {
  name        = "nhn-frontend-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = local.vpc_id
  target_type = "ip" 

  health_check {
    path                = "/"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    matcher             = "200"
  }
}

resource "aws_lb_target_group" "backend_tg" {
  name        = "nhn-backend-tg"
  port        = 5000
  protocol    = "HTTP"
  vpc_id      = local.vpc_id
  target_type = "ip" 

  health_check {
    path                = "/" 
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    matcher             = "200,499" 
  }
}

###### Routing Rules ########

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_tg.arn
  }
}

resource "aws_lb_listener_rule" "api_routing" {
  listener_arn = aws_lb_listener.http.arn
  priority     = 10

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}
#################################################################################
# IAM Role to ECS Tasks
#################################################################################

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "NHN_Hotel_ECS_TaskExecutionRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

###### Execution Role

resource "aws_iam_role_policy_attachment" "ecs_execution_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

######### Send Docker Logs to Cloudwatch

resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "/ecs/nhn-hotel"
  retention_in_days = 7 
}

#### IAM Role to MongoDB & SSM Manger

resource "aws_iam_role" "mongodb_ssm_role" {
  name = "NHN_Hotel_MongoDB_SSM_Role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

####  SSM ---> Role

resource "aws_iam_role_policy_attachment" "ssm_policy_attach" {
  role       = aws_iam_role.mongodb_ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

#### Convert Role To Instance Profile ---> EC2

resource "aws_iam_instance_profile" "mongodb_profile" {
  name = "NHN_Hotel_MongoDB_Instance_Profile"
  role = aws_iam_role.mongodb_ssm_role.name
}


#################################################################################
# ECS Task Definitions
#################################################################################


################## Frontend Task ##############

resource "aws_ecs_task_definition" "frontend" {
  family                   = "nhn-frontend-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "hotel_frontend"
    image     = "${aws_ecr_repository.frontend.repository_url}:latest"
    essential = true
    portMappings = [{
      containerPort = 80
      hostPort      = 80
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
        "awslogs-region"        = local.region
        "awslogs-stream-prefix" = "frontend"
      }
    }
  }])
}

################# Backend Task ##################

resource "aws_ecs_task_definition" "backend" {
  family                   = "nhn-backend-task"
  network_mode             = "awsvpc" 
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name      = "hotel_backend"
    image     = "${aws_ecr_repository.backend.repository_url}:latest"
    essential = true
    portMappings = [{
      containerPort = 5000
      hostPort      = 5000
    }]
    environment = [
      { name = "PORT", value = "5000" },
      { name = "JWT_SECRET", value = "your_secret_key_here" },
      { name = "DB_URL", value = "mongodb://${aws_instance.mongodb.private_ip}:27017/nhn_hotel" }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.ecs_logs.name
        "awslogs-region"        = local.region
        "awslogs-stream-prefix" = "backend"
      }
    }
  }])
}

#################################################################################
# ECS Services (Front & Back)
#################################################################################

####### Frontend Services ##############

resource "aws_ecs_service" "frontend" {
  name            = "nhn-frontend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 1 
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [local.Frontend_subnet_1_id, local.Frontend_subnet_2_id] 
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_tg.arn
    container_name   = "hotel_frontend"
    container_port   = 80
  }

  depends_on = [aws_lb_listener.http]
}

######### Backend Services ####

resource "aws_ecs_service" "backend" {
  name            = "nhn-backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1 
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [local.Backend_subnet_1_id, local.Backend_subnet_2_id] 
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = false 
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_tg.arn
    container_name   = "hotel_backend"
    container_port   = 5000
  }

  depends_on = [aws_lb_listener_rule.api_routing]
}

#################################################################################
# API EndPoint
#################################################################################

####### Endpoint to ECR API ###########

resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id              = local.vpc_id
  service_name        = "com.amazonaws.${local.region}.ecr.api"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [local.Frontend_subnet_1_id, local.Backend_subnet_2_id]
  security_group_ids  = [aws_security_group.ecs_sg.id]
  private_dns_enabled = true
}

############ Endpoint to Service ECR Docker Registry ########

resource "aws_vpc_endpoint" "ecr_dkr" {
  vpc_id              = local.vpc_id
  service_name        = "com.amazonaws.${local.region}.ecr.dkr"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [local.Frontend_subnet_1_id, local.Backend_subnet_2_id]
  security_group_ids  = [aws_security_group.ecs_sg.id]
  private_dns_enabled = true
}

####### Endpoint to Service CloudWatch Logs #########

resource "aws_vpc_endpoint" "logs" {
  vpc_id              = local.vpc_id
  service_name        = "com.amazonaws.${local.region}.logs"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [local.Frontend_subnet_1_id, local.Backend_subnet_2_id]
  security_group_ids  = [aws_security_group.ecs_sg.id]
  private_dns_enabled = true
}

##### Gateway Endpoint to S3 #####

resource "aws_vpc_endpoint" "s3" {
  vpc_id            = local.vpc_id
  service_name      = "com.amazonaws.${local.region}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = local.private_route_table_ids
}

#### Endpoint  SSM

resource "aws_vpc_endpoint" "ssm" {
  vpc_id              = local.vpc_id
  service_name        = "com.amazonaws.${local.region}.ssm"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [local.DB_subnet_1_id, local.DB_subnet_2_id]
  security_group_ids  = [aws_security_group.mongodb_sg.id] 
  private_dns_enabled = true
}

#### Endpoint  SSM_messages
resource "aws_vpc_endpoint" "ssmmessages" {
  vpc_id              = local.vpc_id
  service_name        = "com.amazonaws.${local.region}.ssmmessages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [local.DB_subnet_1_id, local.DB_subnet_2_id]
  security_group_ids  = [aws_security_group.mongodb_sg.id]
  private_dns_enabled = true
}

##### Endpoint EC2_messages
resource "aws_vpc_endpoint" "ec2messages" {
  vpc_id              = local.vpc_id
  service_name        = "com.amazonaws.${local.region}.ec2messages"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = [local.DB_subnet_1_id, local.DB_subnet_2_id]
  security_group_ids  = [aws_security_group.mongodb_sg.id]
  private_dns_enabled = true
}

######
######
######
#####3#
####
#######3
#####
#################################################################################
# EC2 Security Group
#################################################################################
###################################
# resource "aws_security_group" "ec2_sg" {
#   name_prefix = "${var.instance_name_prefix}-sg-"
#   description = "Security group for EC2 instances"
#   vpc_id      = local.vpc_id

#   ingress {
#     from_port       = 80
#     to_port         = 80
#     protocol        = "tcp"
#     security_groups = [aws_security_group.alb_sg.id]
#     description     = "Allow HTTP from ALB security group"
#   }

#   ingress {
#     from_port       = 443
#     to_port         = 443
#     protocol        = "tcp"
#     security_groups = [aws_security_group.alb_sg.id]
#     description     = "Allow HTTPS from ALB security group"
#   }

#   ingress {
#     from_port   = 22
#     to_port     = 22
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "Allow SSH access for management"
#   }

# ######################### API Between Subnets ##########################
#   ingress {
#     from_port   = 5000
#     to_port     = 5000
#     protocol    = "tcp"
#     cidr_blocks = ["192.168.0.0/16"]
#     description = "Allow API between frontend and backend"
#   }
# ########################################################################
#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "Allow all outbound traffic"
#   }

#   tags = {
#     Name        = "${var.instance_name_prefix}-sg"
#     Environment = var.environment
#     Module      = "compute"
#     Component   = "web_server"
#   }
# }

# #################################################################################
# # RDS Security Group
# #################################################################################
# resource "aws_security_group" "rds_sg" {
#   name_prefix = "NHN-rds-sg-"
#   description = "Security group for RDS MariaDB database"
#   vpc_id      = local.vpc_id

#   ingress {
#     from_port       = 3306
#     to_port         = 3306
#     protocol        = "tcp"
#     security_groups = [aws_security_group.ec2_sg.id]
#     description     = "Allow MariaDB access from EC2 security group"
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#     description = "Allow all outbound traffic"
#   }

#   tags = {
#     Name        = "NHN-rds-sg"
#     Environment = var.environment
#     Module      = "compute"
#     Component   = "database"
#   }
# }


# #################################################################################
# # EC2 Instances
# #################################################################################
# resource "aws_instance" "compute_instances" {
#   count                = var.instance_count
#   ami                  = var.aws_ami
#   instance_type        = var.instance_type
#   subnet_id            = local.selected_subnets[count.index % length(local.selected_subnets)]
#   vpc_security_group_ids = [aws_security_group.ec2_sg.id]
#   key_name             = var.key_pair_name != "" ? var.key_pair_name : null
#   associate_public_ip_address = var.enable_public_ip
#   monitoring           = var.enable_detailed_monitoring

#   root_block_device {
#     volume_type           = "gp3"
#     volume_size           = 20
#     delete_on_termination = true
#     encrypted             = true
#   }

#   tags = {
#     Name        = "${var.instance_name_prefix}-${count.index + 1}"
#     Environment = var.environment
#     Module      = "compute"
#   }

#   lifecycle {
#     create_before_destroy = true
#   }
# }
