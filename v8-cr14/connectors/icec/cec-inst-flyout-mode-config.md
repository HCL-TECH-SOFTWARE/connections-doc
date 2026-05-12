# Flyout mode configuration {#id_name .reference}

To integrate the Connections Engagement Center into the Connections top navigation bar, configure a custom drop-down menu in `header.jsp` under `<CUSTOMIZATION_DIR>`.

1. Copy the `header.jsp` file into the Connections customization folder under `common/nav/templates/`.

2. Add the following markup to `header.jsp` (for example, after the section containing this block):

    ```html
    <li><span class=lotusBranding>
    . . .
    </span></li>
    ```

    Then add:

    ```html
    # Start Connections Engagement Center FLYOUT PAGE
    --%><c:if test="${hasUsername || fn:indexOf(appName, ':search:') == -1}"><%--
          --%><li id="lotusBannerFlyout"><%--
          --%><a id="lotusBannerFlyoutLink"
      class="lotusBannerFlyout"
      onmouseover="dojo.require('lconn.core.header'); lconn.core.header.menuMouseover(this);"
      onclick="dojo.require('lconn.core.header');lconn.core.header.menuClick(this);"
      onfocus="dojo.require('lconn.core.header');lconn.core.header.menuFocus(this);"
      role="button"
      src="/xcc/rest/public/getFlyoutConfigs?lang=<c:out value="${locale.language}" />&amp;_<%= System.currentTimeMillis() %>"
      href="javascript:;"
      aria-label="Open Flyout"><%--
              --%><img alt="FlyoutIcon" src="<lc-ui:blankGif />" class="xccTHIcon" /><%--
              --%><span class="lotusAltText">Open Flyout</span><%--
            --%></a><%--
          --%></li><%--
        --%></c:if><%--
    # END Connections Engagement Center FLYOUT PAGE
    ```

3. Add the following CSS to your Connections theme customization, and copy the images for the flyout page to the `<THEME_FOLDER>/images` folder of `<CUSTOMIZATION_DIR>`.

    !!! note
        For right-to-left languages such as Hebrew or Arabic, add the following CSS to the `customRTL.css` file.

    ```css
    .xccTHIcon {
          background-image: url("/com.ibm.lconn.core.styles.oneui3/hikariTheme/images/flyout.png");
          background-position: 0 0;
          background-repeat: no-repeat;
          height: 16px;
          margin: 2px 0 0 0;
          width: 16px;
    }
    .lotusui30 #lotusBannerFlyout.lotusSelected .xccTHIcon,
    .lotusui30 #lotusBannerFlyout.lotusHover .xccTHIcon,
    .lotusui30 .lotusBanner .xccTHIcon:hover,
    .lotusui30 .lotusBanner .xccTHIcon:focus,
    .lotusui30 .lotusBanner .xccTHIcon:active {
        background-image: url("/com.ibm.lconn.core.styles.oneui3/hikariTheme/images/flyout_active.png");
    }
    ```

4. Restart the Connections servers to publish the updated `header.jsp` file to all Connections applications.

**Parent topic:** [Mode configuration](../../connectors/icec/cec-inst-configure-modes.md)
