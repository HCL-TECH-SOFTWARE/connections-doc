# Adding a link to the HCL Connections navigation bar {#id_name .reference}

## Step 1

Copy (if not already done so) the header.jsp file into the HCL Connections customization folder under **/common/nav/templates/**.

## Step 2

Add the following markup to the header.jsp `<ul\>` node:

```
--%><li id="lotusBannerICEC" class="<c:if test="${first}">lotusFirst</c:if>"><%-- 
	--%><a href="/xcc/main?page=icec "><%--
		--%><img alt="Link to ICEC" role="presentation" src="<lc-ui:blankGif />" class="lconnBannerIcon lconnSprite lconnSprite-iconHomeBlue16"><%--
		--%><span class="lotusBannerIcec">icec</span><%-- 
	--%></a><%--
--%></li><%--
```

## Step 3

The ID **lotusBannerICEC** of the li tag is important, because the Connections Engagement Center will set this menu item as selected, if you are on a Connections Engagement Center page. We currently support only one menu item in the top navigation, which is instantly highlighted as selected. You can have further menu items in the header.jsp, therefore please use different ID's for the LI elements, but these will not be highlighted as selected.


## Step 4

Restart the Connections servers to publish the changed header.jsp to all Connections applications.



**Parent topic:**[Configuring](../../connectors/icec/cec-inst-configuring.md)

