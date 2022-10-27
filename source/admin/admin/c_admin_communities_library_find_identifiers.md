# Finding identifiers for CCM libraries, folders, and documents {#c_admin_communities_library_activit .concept}

Find identifiers of HCL Connections Content Manager libraries, folders, and documents from the HCL Connections web interface. You can then use the identifier in an administrative task or query.

**Related information**  


[Running Library administrative queries and commands](../admin/t_admin_communities_library_queries.md)

## Finding identifiers {#concept_uqg_hm3_bq}

It can be useful to find identifiers of IBM CCM libraries, folders and documents. You might need to find an identifier from the Connections web interface to use in an administrative task or query. For more information, see *Running Library administrative queries and commands*.

To find an identifier, navigate to the resource you want to investigate in the HCL Connections Library user interface. For example, if you want to find the identifier of a library, navigate to the root of the library in the Library app. The user interface includes a link for **Subscribe to this library**, **Subscribe to this folder** or in the case of a document, **Feed for these comments**. Open the required link. Some browsers detect that the response from this action is a feed and attempt to render the content for you. You might need to use the **View source** option in your browser or save the content of the link and open it in a text editor. In the feed, there is an element that is called **id** nested under the feed element; this element is the identifier.

## Library identifiers {#concept_wx3_zm3_bq}

Library identifiers look like the following:

```
<id> urn:lsid:ibm.com:td:E4C61AE8-E586-4F52-AB36-56AED004DEBF%3BAD7A38A5-1977-455D-9956-C6A4A6BF82E0 </id> 
```

The FileNet identifier is preceded with `urn:lsid:ibm.com:td:` and then includes the object store identifier, followed by `%3B`, which is an encoding of the `;` character. `%3B` is followed by the identifier of the **ClbTeamspace** object from FileNet corresponding to the library. In the example, the object store identifier is `E4C61AE8-E586-4F52-AB36-56AED004DEBF`. The ClbTeamspace identifier is `AD7A38A5-1977-455D-9956-C6A4A6BF82E0`. For a typical CCM installation, all libraries are in the same object store and have the same object store identifier. Linked Libraries might connect to content in different object stores. For more information, see *Library concepts and terminology*.

## File and folder identifiers {#concept_bwp_g43_bq}

File and folder identifiers look like the following:

```
<id> urn:lsid:ibm.com:td:%7BCDCD332D-E42B-44F4-9EDD-E146DE0C7DAE%7D </id>
```

The FileNet folder or document identifier is preceded with `urn:lsid:ibm.com:td:`, then`%7B`, which is an encoding of the `{` character. The identifier is then followed by `%7D`, which is an encoding of the `}` character. In the example, the document or folder identifier is `CDCD332D-E42B-44F4-9EDD-E146DE0C7DAE`.

## Changes to identifier formats {#concept_fzl_v43_bq}

The mapping of feed concepts such as identifiers to storage in the FileNet content model is subject to change; these values migh not remain constant between releases. Also, formatting might not remain consistent between releases of HCL Connections. For example, features were added since the original release of these feeds that allow for multiple object stores to be used. This change required a change to library identifiers to encode the object store identifier, where previously library identifiers did not contain an object store identifier. Similar changes are possible in the future and users should not depend on the particular encoding of identifiers being consistent between releases. Within a single release, knowing where to find an identifier for a FileNet resource can be useful to run an administrative command or refer to an object found in a CCM user interface in the FileNet administration interfaces.

