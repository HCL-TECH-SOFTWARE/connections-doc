<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# TXT config file and Rclone parameters

The requirements that have been put in place for the AWS bucket and rclone encryption attributes are intended to support a transfer process that is primarily intended to protect the transfer of the customer&#39;s data between IBM and the customer or the customer&#39;s designated agent. The strict specification may seem rigid, but it is also, meant to facilitate the export and transfer process.

The bucket and encryption attributes:

1. The file must be named: transfer-config-<org_id>.txt. For example, transfer-config-1000530836.txt

2. The format of the file is (all fields must be included):
   - region = AWS data center region
   - access_key_id = AWS S3 Access Key ID
   - secret_access_key = AWS S3 Secret Access Key
   - bucket_name = AWS Bucket Name
   - org_id = Org ID
   - password = encrypted rclone encryption password
   - password2 = encrypted rclone encryption password2
   
From this configuration specification, at the export side an S3 remote and a rclone crypt will be added to the rclone.conf file. The export process will specify the configured crypt to which all artifacts will be copied. The AWS bucket properties and keys are available to you as a consequence of having set up the bucket and created the policies and access key information.

Just as, the export side creates an S3 remote and a rclone crypt; the import side must create those as well. They can be created interactively by typing rclone config at the command line and following the steps (just keep in mind file names and directories are not be encrypted). Or you can issue the following commands at the command line or in a script to create the remote and the crypt. (For more details see [https://rclone.org/commands/rclone\_config\_create/](https://rclone.org/commands/rclone_config_create/) and [https://rclone.org/crypt/](https://rclone.org/crypt/)

- Create the remote:
> rclone config create <remote_name> s3 provider AWS env_auth false access_key_id <access_key_id>secret_acces_key <secret_access_key> region <region> bucket_acl private disable_checksum false

- Create the crypt:
> rclone config create <crypt_name> crypt remote <remote> filename_encryption offdirectory_name_encryption false password <your_password> password2 <your_password2>

When you create the crypt using the command line, it will generate a stanza in your rclone.conf file for the crypt, with the encrypted passwords. It is those encrypted password strings that you must provide in the transfer config file, unencrypted passwords will not be accepted. Also, note while the crypt documentation states that password2 is optional, it is not optional for the transfer process.

<?tm 1541016643182 1 HCL Connections ?>


