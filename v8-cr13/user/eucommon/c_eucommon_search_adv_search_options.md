# Advanced search terms {#c_eucommon_search_adv_search_options .concept}

Use advanced search terms to control the scope of your search from any of the applications.

When performing an advanced search, you can search for single terms, such as test or hello, or phrases, such as "test search" or "hello world".

**Important:** To search for a phrase, you must enclose the phrase in double quotation marks \("\).

## Wildcard searches { .section}

A wildcard is a character that can be used to represent one or more other characters in a search term. Search supports single and multiple character wildcard searches within single terms, but not in phrases. You cannot use the question mark \(?\) or asterisk \(\*\) wildcards as the first character of a search string.

-   Single character wildcard searches

    To perform a single character wildcard search, use the question mark \(?\). The Search application looks for terms that match when the single character is replaced by another character.

    For example, if you enter te?t as a search string, the results might include information containing the terms text and test.

-   Multiple character wildcard searches

    To perform a multiple character wildcard search, use the asterisk \(\*\). This type of search looks for zero or more characters.

    For example, if you enter test\* as a search string, the results might include information containing the terms test, tests, and tester.


## Search operators { .section}

Use the following operators to control the scope of your search.

<table>
<tr>
<th><b>Operator</th>
<th><b>Description</th>
</tr>
<tr>
<td>OR</td>
<td>Use the OR operator between two words to search for content that contains either word.<br>
For example, if you enter <b>car or motorcycle</b>, Search returns information that contains either car or motorcycle.</td>
</tr>
<td>AND</td>
<td>Use the AND operator to search for content where both terms exist anywhere in the text of a single document. By default, a space between keywords is treated as an AND operation. The double ampersand (&&) operator can be used as a synonym for the AND operator.
<br>For example, to search for information containing the text car and motorcycle enter the following query:
<br> <b>"car" AND "motorcycle"</b>
</td>
</tr>
<tr>
<td>+</td>
<td>Use the plus sign (+) to combine search words. The plus sign operator is similar to the AND operator, but it applies only to the word immediately following it.
<br>For example, to search for information that must contain car and can contain motorcycle, enter the following query:
<br> <b>+car motorcycle</b>
</td>
</tr>
<tr>
<td>NOT</td>
<td>Use the NOT operator to exclude a word from your search. Results containing the word immediately following the operator are excluded by the search. The exclamation point (!) and minus sign (-) can be used as synonyms for the NOT operator.
<br> For example, to search for information that contains car but not motorcycle, enter one of the following queries:
<br> -   <b>car NOT motorcycle</b>
<br> -   <b>car -motorcycle</b>
<br>
<br> Using the NOT operator, exclamation point (!), or minus sign (-) with a single term returns no results.
</td>
</tr>
</table>

## Grouping { .section}

Use parentheses to group search terms in clauses and further refine the scope of your search.

For example, if you want to search for information that contains plane and car or plane and motorcycle, enter the following query:

<b>(car OR motorcycle) AND plane</b>

## Special characters { .section}

When your search term contains one of the nonalphanumeric characters listed below, you need to escape the character by using a backslash \( \\ \) before the character or by enclosing the search term in double quotation marks \("\). Use a backslash before using any of these characters:

\+ - && \|\| ! \( \) \{ \} \[ \] ^ " ~ \* ? : \\

If you do not perform this escape operation, Search interprets the characters as being part of the query instructions.

For example, if you want to search for information that contains the text string <b>cat + dog</b> and you enter <b>cat + dog</b> as your search term, Search looks for any data that contains both the word <b>cat</b> and the word <b>dog</b>. This result is because the plus sign \(+\) is a reserved operator with a predefined meaning. To search for information containing the actual text string <b>cat + dog</b>, use one of the following queries:

-   <b>cat + dog</b>
-   <b>"cat + dog"</b>

**Parent topic:** [Searching Connections](../eucommon/c_eucommon_search.md)

