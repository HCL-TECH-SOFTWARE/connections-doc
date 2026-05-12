# Customize labels for languages {#id_name .reference}

You can customize Connections Engagement Center labels for all languages that are supported by HCL Connections.

The Connections Engagement Center automatically creates both files xcc-de.json and xcc-template.json in the directory **customization/xcc/I18n**

## Example { .section}

Using an example, we want to show you how the Connections Engagement Center language fallback works. Please open the Connections Engagement Center page with a browser and a language cookie, which has the value pt for Portuguese language. The Connections Engagement Center will search for a file with the name **xcc-pt.json** in the directory **customization/xcc/I18n**. If this file is found, the Connections Engagement Center will output the labels contained in this file. Otherwise Connections Engagement Center will search for the file **xcc-en.json**. If this file does also not exist then the Connections Engagement Center will fall back to English labels included in the Connections Engagement Center source code.

![image](images/image85.png)

## Workflow { .section}

You can use the **icec-template.json** file to translate Connections Engagement Center into your desired language. After customization of this file, you have to rename it. Therefore please save the file as **icec-<LANGUAGE\>.json** where <LANGUAGE\> is replaced with the shortcut of your desired language \(for example en, de, pt, zh etc.\). You can up- and download the language files on your Connections Engagement Center page in the customization panel under the Connections Engagement Center Settings tab.

## Structure of JSON { .section}

Connections Engagement Center language files are stored in JSON format. These JSON files contain key-value pairs embarced in quotes and separated by a colon. Multiple key-values are separated by a comma and a newline. For example:

```

"ee_pager_next" : "Next",
"ee_pager_prev" : "Prev"

```

Some entries need placeholders for values to be computed. These entries contain placeholders like $1, $2, $3 and so on. Array entries are separated by a comma **a,b,c,d,e**. Entries specific to dates and times are used with a SimpleDateFormat like placeholder structure like TT for the Day in Month, MM for the Month in Year as a zero filled Number MMM or a shortcut of the Months name MMMM for the Months full name and so on.

**Parent topic:**[Configuring](../../connectors/icec/cec-inst-configuring.md)

