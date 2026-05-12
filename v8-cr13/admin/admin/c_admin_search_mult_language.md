# Searching over Multiple Languages {#c_admin_search_mult_lang .concept}

The Search application provides globalization support by using different dictionaries for different languages. Each dictionary file must be enabled in the Search configuration file before indexing. By default, only the English language dictionary is enabled during installation.

Without multiple dictionary support, for languages other than English, Search returns results only where there is an exact match between the search term and content term. Enabling multiple dictionaries ensures better quality search results when your user base is multilingual, by influencing the text analysis process as follows:

-   Tokenizing terms correctly.
-   Reducing to terms base form.
-   Matching, for example, singular and plural and verbs tenses \(depending on the specific language rules\).

Adding extra dictionaries is a mandatory post-installation step that you perform before you start the HCL Connections Search server for the first time.

!!! note 

    You can still add or remove dictionaries later, but to do so you must rebuild the index from scratch and restart the server. However, re-indexing can be done in the background.

## How does search choose the right language dictionary to index content with? { .section}

When content is analyzed at indexing time, Search attempts to guess \(or detect\) which of the enabled IBM® LanguageWare® dictionaries to use when applying the text analysis process. If the attempt is unsuccessful or if the language guessed does not have a corresponding dictionary enabled, the default dictionary is used.

!!! note 
    
    The browser location, the language of the operating system and the location of the user's computer have no effect on the language guessing process at the indexing time.

    The defined default dictionary in Connections is not related to the location of the operating system or to the browser location. For more information, see *Setting the default dictionary*.

## How does search choose the language dictionary to analyze the users search queries with? { .section}

The language is taken from the user browser settings \(the `Accept-Language` HTTP header\). If there is a problem when loading the dictionary corresponding to the language specified or if there is no corresponding dictionary enabled, then the default dictionary is used.

!!! note 
    
    To change the language of the browser, refer to the browser's documentation.

    The defined default dictionary in Connections is not related to the location of the operating system or to the browser location. For more information, see *Setting the default dictionary*.

## Choosing languages and setting the default dictionary { .section}

Which language dictionaries should I configure?

Configure languages that users are using to creating a significant amount of content. It is recommended to keep the number of languages to a minimum because adding languages increases the risk of a language detection miss that would reduce search quality.

If you do not have any English content, remove English from the available dictionaries.

What is the role of the default language dictionary?

During indexing, the default language is used if Search cannot detect the content's language with high confidence, or if the detected language dictionary is not enabled.

During search time, the default dictionary is used if the dictionary for the user's browser language not enabled.

Which dictionary should I set as the default language dictionary?

Consider the following factors:

-   The default language should be the language in which most of your content is written.
-   In case where the amount of content is the same in two languages, set the default language to the language with the more complex grammar rules. For example, set Japanese over English, so that if the wrong language is detected, the language dictionary with the more complex grammar rules is used.

**Parent topic:** [Configuring dictionaries for Search](../admin/c_admin_search_configure_dictionaries.md)

**Related information**  


[Setting the default dictionary](../admin/t_admin_search_set_default_dictionary.md)

