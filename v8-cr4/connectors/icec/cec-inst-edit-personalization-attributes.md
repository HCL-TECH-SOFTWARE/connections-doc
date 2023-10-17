# Edit personalization attributes {#id_name .reference}

You can change the personalization attributes to increase the usability for the Page Editor. You can reduce the number of personalization attributes, change the display name in the widget edit mode, and change the order of the attributes.

## Personalizing { .section}

**Note:** To personalize an Connections Engagement Center widget for HCL external users you have to choose the prof\_mode key with value 1 for external users and 0 for internal users.

|Step|Instructions|
|----|------------|
|1|After an application restart Connections Engagement Center will create a file with the name <personalization.properties\> in the Connections Engagement Center database, if it does not yet exist. If you want to adjust the personalization attributes you may edit them by navigating to the Administration panels on the Connections Engagement Center Settings tab and opening the **Customization Files** section:

 ![image](images/image86.png)

|
|2|You may directly edit the file in the browsers Editor using the wrench icon or download the file and edit it locally in the editor of your choice.

 The files contents look like:

 ```

#Timestamp (creation time of <personalization.properties> file)
<key1> = <value1>
<key2> = <value2>
...

```

 ![image](images/image87.png)

 The part on left side of the equality sign is the table key that is effectively used for personalization. These keys are generated automatically by reading them from the database in the onPremises mode or by providing a template in the cloud mode. Please do not change the keys as they cannot be changed, as Connections Engagement Center would no longer be able to connect the entered value to the user property.

 The part right hand of the equality sign denominates the label that is used in the widget editors. It can be edited freely to fit your personal taste.

 If you want to leave an entire entry out, prefix the line with a hash symbol \(\#\), or delete it. The \# symbol denominates a comment line and can be used multiple times in the file. That way it is possible to leave comments for yourself or to try values and return later.

 When you click on save or reupload a locally changed file, the changes take immediate effect.

|
|3|If you want to display Display Name instead of **display\_name** in the personalization dropdown, change the line **prof\_display\_name=display\_name** to **prof\_display\_name=Display Name**.

 ![image](images/image88.png)

|
| |**Values in Cloud mode**The possible values in Cloud mode cannot be read from the database. Instead Connections Engagement Center provides you with a template of possible values. You may comment or uncomment them as you like. Also, renaming them is possible.

|

**Parent topic:**[Configuring](../../connectors/icec/cec-inst-configuring.md)

