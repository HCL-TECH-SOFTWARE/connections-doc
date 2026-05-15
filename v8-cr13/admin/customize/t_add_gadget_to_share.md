# Adding a gadget to the Share dialog {#add_gadget_to_share .task}

Add an OpenSocial gadget to the Share dialog.

To add widgets to the Home page, you must be logged in as an administrator.

When you add an OpenSocial gadget to the Share dialog, an additional tab is displayed in the Share dialog.

1.  Open the Administration view.

2.  Click **Add another widget** to display the **Add new widget** form.

3.  For the Share dialog

    1.  Select that the widget is based on the**Open Social Gadget** specification.

    2.  Select Trusted as the security type because the gadget will need access to the ibm.connections.sharedialog container feature

    3.  Select Show in Share dialog for UI integration point and select in the drop-down the name of the gadget that your gadget should follow in the Share dialog tab order.

4.  Enter a name for the widget in the **Widget Title** field.

5.  Enter a short description of the widget in the **Description** field.

6.  Enter the web address for the XML widget descriptor in the **URL Address** field.

    This address must be prefixed with HTTPS and must be an absolute web address.

7.  Enter the widget location in the **Secure URL Address** field.

    This address must be prefixed with HTTPS and must be an absolute web address.

8.  The **Icon URL** web address does not apply to adding gadgets to the Share dialog so you can ignore it.

9.  The **Icon Secure URL** address does not apply to adding gadgets to the Share dialog so you can ignore it.

10. The **HCL Connections specific tags** option does not apply to adding gadgets to the Share dialog so you can ignore it.

11. The Display in the My Page view does not apply to adding gadgets to the Share dialog so you can ignore it.

12. The Display in the Updates view does not apply to adding gadgets to the Share dialog so you can ignore it.

13. The option **Opened by default** does not apply to adding gadgets to the Share dialog so you can ignore it.

14. To enable multiple instances of the widget to be used, select **Multiple widgets**.

    Each widget instance has its own properties. For example, if you are using a widget that displays bookmarks for a specific tag, you can enable multiple instances of the widget so that you can follow different tags in each widget.

    **Note:** This setting is applicable only for iWidgets. Only one instance of an OpenSocial gadget can be loaded at a time.

15. Select opensocial as a required application in the Prerequisites area.

16. Click **Save**.

17. Open the Administration view and in the Disabled widgets area, select the gadget that you want to enable, and click **Enable**.


**Parent topic:**[Adding new ways to share content](../customize/t_customize_sharebox_gadgets.md)

**Related information**  


[Adding new ways to share content](../customize/t_customize_sharebox_gadgets.md)

