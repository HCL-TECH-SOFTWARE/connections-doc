# News - Channel {#id_name .reference}

The News - Channel widget is a news widget that is able to display up to 10 Channels. Channels will be shown in a window on top of each other. Two short news teasers are displayed for each channel, whereby the user can navigate to older entries via arrows. A picture or video \(the first one of the correlating blog entry\) and a limited abstract are displayed for each news entry.

![image](images/image081.png)

## Content source { .section}

For each channel a Connections community or a standalone blog is defined as content source for this widget. The source has to contain at least one blog entry.

## Expected format { .section}

A news channel is displayed for each selected blog. The entries of the blogs are shown within the channel. The first picture of the blog entry, the headline and a plain text abstract is displayed for each entry. If the post contains no picture, the community image is displayed instead.

With a click on an entry an Embedded Experience Pop Up opens up on the right side next to the widget. The pop-up contains the complete content of the blog entry, including all comments and likes. Within the Embedded Experience the article can be liked/unliked and commented. It also contains an **Open in Community** link underneath the article that forwards to the actual blog entry.

You can get the community title as channel name by entering **%sourceName%** into the channel name field.

By selecting the **Slide automatically** check box, you can make the slider rotate through the blog entries automatically.

## Configuration options for Admin/Page Editor { .section}

Personalization

Channel name

Number of Items

Content creation

Slide automatically

**Note:** If you encounter problems with loading images, review your image settings in the Admin Dashboard. For more information, see [Handling external images](cec-handling-external-images.md).

## Other { .section}

Date and time are displayed in the following format: "31 July 2013 02:16". The format can be changed within the [language files](cec-customizethelanguagefile.md#).

