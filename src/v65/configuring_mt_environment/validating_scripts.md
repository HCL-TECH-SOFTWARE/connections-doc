<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Running the auto deploy scripts

## Prior to provisioning and entitling new users, there are just a few things to check after running the MT update scripts to validate that they have run properly.

  1. Check all logs from the MT scripts for errors orwarnings.
  2. Verify that all WebSphere Nodes and Servers arerunning
  3. Check the WebSphere logs forerrors.

Once you have provisioned a user, login with that user to verify the that authentication with Keycloak works properly and that the various Connections apps are loading properly. Ensure that you create a community and prove that the Rich Content widget is loading properly (this widget uses an OAuth flow with Keycloak).
<?tm 1541016643182 1 HCL Connections ?>

