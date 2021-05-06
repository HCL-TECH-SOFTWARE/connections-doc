<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">

# Authentication and Tokens

Connections mobile uses the Open ID Connect protocol with OAuth 2.0 to identify users and stores access and refresh tokens in secure storage on the mobile device. It has been tested with Keycloak as the token provider and Keycloak can be federated with a customer’s Identity provider to provide per-customer validation forms and inputs. The mobile application uses the same user validation forms that are used on the web client.

As part of the OAuth and OIDC protocols, the mobile app will receive and use access and refresh tokens. Access tokens are typically short-lived tokens which are revalidated multiple times a day. A refresh token is used to silently “refresh” the access token. The mobile app uses a scope called “offline_access” which is used to ask the token provider for a refresh token that can be used for an extended time. Once the access token expires, the mobile app silently uses the refresh token to ask Keycloak for an updated access token. Keycloak then validates this token, checks the expiration time on the refresh token and ensures that the user is still valid and has not had their access to the system revoked. If all of these checks pass, then Keycloak will issue a new access token valid for a short duration.

There are a couple of differences in the session timeouts that should be noted.

1.  By default, the access token expiration will inherit the same value as Access Token Lifespan that is defined in Keycloak under Realm Settings > (realm) > Tokens. It is possible to define a client unique Access Token Lifespan but it is not recommended.  

2. The refresh token expiration period is controlled by 3 settings in Keycloak under Realm Settings > (realm) > Tokens.  
  
   -  **Offline Session Idle** – Time an offline session is allowed to be idle. The client must use the refresh token at least once during this period or the session will expire, and the user must login again. For example, setting this to 7 days will require that the mobile user must use the Connections app at least once in 7 days and if not, they will be prompted to login again.  

   -  **Offline Session Max Limited** – set this to on to force a maximum session lifetime limit.  
 
   - **Offline Session Max** – Maximum time that can pass before the session is expired, regardless of activity. For example, set this to 30 days to force all mobile users to login again even if they are actively using the application.  
    
3. The desktop plugin app shares the Offline session timeouts with the Connections mobile apps, since both use offline tokens.



<?tm 1541016643182 1 HCL Connections ?>

