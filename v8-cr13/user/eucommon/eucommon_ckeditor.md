# Using the rich text editor {#eucommon_ckeditor .concept}

Use the rich text editor to create visually interesting blog posts, wiki articles, forum topics, and activity entries. The rich text editor is also used in Communities, Events, and Profiles.

**Note:** This topic describes the default rich text editor in HCL Connections™, but your organization might have implemented TinyMCE editor.

Use the rich text editor to enter and format text or to insert images and links. Depending on the application that you are using and how it is configured, some features of the editor might not be available. For example, you can insert an Adobe™ Flash movie into a blog entry but this capability is not available in a forum topic.

## Spell-checking { .section}

In most browsers, you can spell-check words in the editor by selecting the words and then simultaneously pressing **Ctrl** and right-clicking the mouse.

## Embedding external content { .section}

You can embed content such as a video or an external website by inserting an HTML iframe element into your blog post or wiki page. The external content displays on your page in much the same way as a photo or other graphic, except that it is dynamic and interactive. When the external content changes, so does the display within the iframe. When you insert an iframe, you specify the URL of the web page or video that you want to embed. You can also specify other attributes such as the height and width in pixels. For more information, see [Embedding videos](../eucommon/embed_video.md).

## Partial list of features { .section}

In the editor, hover your mouse cursor over an icon for a label that describes the feature. The following table describes some of the more advanced features available in the editor.

**Copy formatting**
![Copy formatting icon](../wikis/images/copyformatting.png)

Copy formatting from one part of a document and apply it to another part of the document. You can copy the formatting of text styles, table cells, and lists. List styles must be applied to a single list at a time. When the list style formatting is copied from one list to another, the list style and list type \(number to bullet and the reverse\) is applied only to the outer list. Text style \(font face, color, size, decoration, weight, background color\) is applied to the entire selection.

**Note:** When you apply copy formatting from a table cell to another table cell or from a list to another list, the table cell style, list style, and text style also copied. Table cell or list style is not applied if you are copying formatting from a table cell to a list or text or if you are copy formatting from a list to a table cell or text.

1.  Select the source text or place the cursor within the text.
2.  Click the **Copy formatting** icon in the toolbar. The cursor icon changes to a paint brush icon. ![Insert image](../communities/images/copyformatting.png)
3.  Select the target text or place the cursor within it.
4.  Release the mouse button to paste the formatting.

**Note:**

-   Copy formatting is disabled when you click outside the source or target text or press the **Esc** key.
-   To apply copy formatting repeatedly with the mouse, double-click the copy formatting icon in the toolbar.
-   To apply copy formatting by using keyboard shortcuts:
    1.  Select the source text or place the cursor within the text.
    2.  Press **Control+Shift+C**.
    3.  Select the target text or place the cursor within it.
    4.  Press **Control+Shift+V** to paste the formatting.

-   Copy formatting is disabled by pressing the **Esc** key.
-   To apply copy formatting repeatedly, select the target text and press **Control+Shift+V**.

**Paste**
![Paste](../wikis/images/paste.png)

Paste content in the following ways:

-   The **Paste** menu item provides a way of pasting content if your browser security prevents you from pasting content from the clipboard.
-   The **Paste as plain text** menu item provides a way of removing formatting from the pasted content and then inserting it into the document.

In both cases, use the keyboard to paste the content into the dialog and then click **OK** to insert it into the page.

**Insert table**
![Insert table](../wikis/images/table.png)

Insert a new table and specify columns, rows, and other table properties.

**Tip:**

-   To resize columns, drag the column borders or use the **Column** \> **Column Width** menu option.
-   To resize a cell in the column, use the **Cell** \> **Cell Properties** menu option.
-   To keep the table organized, use table headers.
-   To fill the page, set the table width to 99%.
-   To delete a table, right-click it and select **Delete Table**.
-   To sort the order of items in a table, right-click it and select **Sort Table**. From here, you can sort all rows in the table, except for header cells.

**Insert image**
![Insert image](../wikis/images/image.png)

Browse for an image on your computer, select an image that you already uploaded, or enter the URL for an image on the web. For more information, see the [Adding an image](t_eucommon_insert_image.md) topic. In some applications, you can paste an image instead of inserting it.

 **Note:** This function differs across applications. In most applications, for example, it is not possible to upload an image from your computer, paste an image, nor use an attached image that you already uploaded. Those abilities are supported in Blogs, Forums, and Wikis only. Moreover, pasting an image is supported in the Chrome, Firefox, and Safari browsers only; it is not supported in Internet Explorer.

**Permanent pen**
![Permanent pen icon](../wikis/images/Perm_Pen_image.PNG)

Change the text font style by using the **Permanent pen** icon. **Notes:**

-   The Permanent Pen function is available in the toolbar.
-   When you click the **Permanent pen** icon and begin typing, the input defaults to Arial bold font; font size 12 and font color red.
-   To disable the Permanent Pen function, click the **Permanent pen** icon again.
-   To use the Permanent Pen function, you can click anywhere in the text field.
-   To change the text style while Permanent Pen is enabled, right-click anywhere in the text field to open the **Context** menu, then select **Permanent pen properties**.

**Insert link**
![Insert link](../wikis/images/link.png)

Insert or edit a link. You can link to a file, URL, wiki page, wiki attachment, or Document Bookmark.

 **Note:**

-   This function differs for applications. For example, it is possible to link to a wiki page or attachment in Wikis but not in Activities, Blogs, Profiles, or Forums.
-   You can link to a file only if the Files application is enabled.
-   You can link to a file only from within a Community. For example, to insert a file link in a wiki page, the wiki must be owned by a community.
-   When you link to a file, it is shared with the current community.

**Insert a document bookmark**
![Insert a Document Bookmark](../wikis/images/atnDocumentBookmark16.png)

Create an anchor at the cursor location. You can link to the anchor from another location in the document.

**Insert iFrame**
![Insert iFrame](../wikis/images/iframe.png)

Embed external content such as a web page or video. You must supply the URL of the embedded content. You can specify parameters such as the width and height in pixels, and the visibility of the border and scrollbars.

**Note:** This feature is available in Blogs, Forums, and Wikis only.

**Insert Flash movie**
![Insert Flash Movie](../wikis/images/flash.png)

Insert an Adobe Flash movie. You must supply the URL of the Flash movie, which usually has a file name extension of .swf. For example, http://example.com/movie.swf. Some features of the editor are not available in certain apps. For example, you can insert an Adobe Flash movie into a blog post, but not into a forum topic. For more information, see the [Embedding videos](../eucommon/embed_video.md) topic.

**Note:** This feature is available in Blogs, Forums, and Wikis only.

**Insert page break**
![Insert page break](../wikis/images/page_break.png)

Control the location of the page break when your post appears in the activity stream. The activity stream displays the first few lines of your blog post, but it might split the post at an inconvenient location. Use the page break to ensure that the post is split where you want it.

**Insert line break**
![Insert line break](../wikis/images/line_break.png)

Insert a line break to control how your text is formatted.

**Insert special character**
![Insert special character](../wikis/images/special_character.png)

Insert special characters and symbols, such as currency symbols.

**Insert block quote**
![Insert block quote](../wikis/images/block_quote.png)

Insert a block quote to indent a whole section of text in a posting.

**Insert emoticon**
![Insert emoticon](../wikis/images/emoticon.png)

Insert an emoticon to animate your posts with small graphics that convey feelings.

**Show blocks**![Show blocks](../wikis/images/show_blocks.png)

Display the formatting in the post, entry, or topic that you are editing.

**Remove format**
![Remove format](../wikis/images/atnStyle16.png)

Remove formatting such as fonts, colors, bold, or italics.

-   **[Adding an image](../eucommon/t_eucommon_insert_image.md)**  
Add an image to an entry in an HCL Connections application.
-   **[Inserting an iFrame](../eucommon/t_eucommon_insert_iFrame.md)**  
You can add embedded content, such as webpages or videos, to an iFrame by referencing a URL to the content. An iFrame is an object that is embedded in a frame within a webpage.
-   **[Embedding videos](../eucommon/embed_video.md)**  
To emphasize your point of view, embed Flash movies or YouTube videos in your blog or wiki entry.

**Parent topic:** [Shared features](../eucommon/c_eucommon_shared_components.md)

