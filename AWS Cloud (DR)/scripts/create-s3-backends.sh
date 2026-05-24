 
 #!/bin/bash
 ######### Make S3 Bucket to Backend & enable Versioning ############

 echo " ------- Starting Create S3 Buckets... "
 read -p "Enter the (( number )) of buckets : " num
 
 name_backets=()

for((i=1 ; i<=$num ; i++))
do
    read -p "Enter the bucket_#$i name : " bucket_name 
    read -p "Enter the region : " region_name 

        full_name="$bucket_name-terraform-backend-$region_name"

    aws s3 mb "s3://$full_name" --region "$region_name"    ### Create S3 Bucket ###

      read -p "Do you enable Versioning in this Bucket (yes / no): " yes_no

           if [ $yes_no = "yes" ]; then

              aws s3api put-bucket-versioning --bucket $full_name --versioning-configuration Status=Enabled

           else
              echo "---- Versioning disabled for this bucket ----"
           fi

     name_backets+=("$full_name")      

done

  ################  Test Buckets after excuted #################

echo "Starting List & Test Buckets... "
 aws s3 ls
       #while [ $num -le $((count - 1)) ]
       for((i=0 ; i<$num ; i++))
       do
          
           echo "Starting Test Versioning for ${name_backets[$i]}... "
           aws s3api get-bucket-versioning --bucket ${name_backets[$i]}


       done