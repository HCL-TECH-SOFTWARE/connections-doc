# News - Slider {#id_name .reference}

The News - Slider widget is a news widget that is displaying only one Channel. Two short news teasers are displayed for each channel, whereby the user can navigate to older entries via arrows. A picture or video \(the first one of the correlating blog entry\) and a limited abstract are displayed for each news entry.

![image](images/image084.png)

## Content source { .section}

For the channel a Connections community or standalone blog is defined as content source for this widget. The source has to contain at least one blog entry. You can aggregate different communities or standalone blogs by adding more sources

## Expected format { .section}

A News Slider is displayed for each selected blog. The entries of the blogs are shown within the channel. The first picture of the blog entry, the headline and a plain text abstract is displayed for each entry. If the post contains no picture, the community image is displayed instead.

With a click on an entry an Embedded Experience Pop Up opens up next to the widget. The pop-up contains the complete content of the blog entry, including all comments and likes. Within the Embedded Experience the article can be liked/unliked and commented on. It also contains an **Open in Community** link underneath the article that forwards to the actual blog entry.

You can get the community title as channel name by entering **%sourceName%** into the channel name field.

By checking the **Slide automatically** checkbox \(added with Version 13\) you can make the slider rotate through the blog entries automatically.

## Configuration options for Admin/Page Editor { .section}

Personalization

Number of Items

Multiple Sources

Content Creation

Slide Automatically

**Note:** If you encounter problems with loading images, review your image settings in the Admin Dashboard. For more information, see [Handling external images](cec-handling-external-images.md).

## Other { .section}

Date and time are displayed in the following format: "31 July 2013 02:16". The format can be changed within the [language files](cec-customizethelanguagefile.md#).

