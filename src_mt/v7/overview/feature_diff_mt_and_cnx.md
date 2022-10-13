<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE task PUBLIC "-//OASIS//DTD DITA Task//EN" "task.dtd">
# Feature differences between HCL Connections MT and IBM Connections

| **Features**  | HCL Connections  | IBM Connections | Notes                        |
|-----------|------------------|-----------------|------------------------------|
| Groups    | Not supported    | Supported       | In IBM Cloud, Groups were available in Activities, Communities, and Files|
| Invite guest from UI | Not supported | Supported | MT supports Visitor model, there is noconcept of Guest Org in MT.|  
| Community Surveys | Not supported | Supported | Future support is planned for MT. |
| Encrypted Files (beyond disk encryption) | Not supported | Supported | In IBM Cloud, supported onlywith deployment- owned keys. |
| Journal log | Not supported | Supported |
| Reusable header bar (Connections banner) | Not supported | Supported |
| Footer links | Needs MSP customization | Supported |MSP can customize by changing footer template to provide links back to their 'support' or particularinformation. |
| BSS admin functions through UI (admin console) | MSP__responsibility | Supported | In MT, MSP calls Connections APIs and creates UI for orgmanagement if desired. |
| Integration server feature | MSP responsibility | Supported |
| Profiles/People app | Supported | Supported | In MT, the top menu item is Profiles and user can select My Profile, My Network, and Directory.In IBM Cloud, the item was People and user could select My Contacts, My Network, and < org name > Software Directory |
| Language selector | Supported | Supported via BSS | In MT, the language selector is readily available in the Connections menu bar.In IBM Cloud, the selector was located in Account Settings under the user profile photo. |
| External user (model from Connections on- premises) | Supported | Supported (via cross- Org collaboration) | In MT, external users: Must be provisioned by MSP at request of org admin Can be added to only only one org, no cross-org supportCan be added to communities as member but not ownerCannot be added to standalone ActivitiesCan follow apps but not people. For more information, seeEstablishing externalusers. |
| Connections Engagement Center- Full support | Supported | Supported |
| Extensions | Supported | Supported | In MT, supported by Appreg v3 only. In IBM Cloud,supported by Appreg v1, 2, and 3. |
| Highlights app in Communities | Supported | Not supported |
| Touchpoint onboarding app | Supported | Not supported |
|

<?tm 1541016643182 1 HCL Connections ?>

