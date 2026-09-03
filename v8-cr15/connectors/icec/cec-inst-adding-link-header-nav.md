# Adding a link to the HCL Connections navigation bar {#id_name .reference}

1. Copy the `header.jsp` file (if you have not already done so) to the HCL Connections customization folder under `/common/nav/templates/`.

2. Add the following markup to the `<ul>` element in `header.jsp`:

	```jsp
	<%--><li id="lotusBannerICEC" class="<c:if test="${first}">lotusFirst</c:if>"><%--
    --%><a href="/xcc/main?page=icec"><%--
        --%><img alt="Link to ICEC" role="presentation" src="<lc-ui:blankGif />" class="lconnBannerIcon lconnSprite lconnSprite-iconHomeBlue16"><%--
        --%><span class="lotusBannerIcec">icec</span><%--
    --%></a><%--
	--%></li><%--
	```

3.	The ID `lotusBannerICEC` on the `<li>` element is important because Connections Engagement Center uses it to mark the menu item as 	  selected when a user is on a Connections Engagement Center page. 

	Currently, only one top-navigation menu item can be displayed as selected. You can add additional menu items in `header.jsp`, but they will not be highlighted as selected. Use unique IDs for any additional `<li>` elements.

4. Restart the Connections servers to publish the updated `header.jsp` file to all Connections applications.

**Parent topic:**[Configuring](../../connectors/icec/cec-inst-configuring.md)