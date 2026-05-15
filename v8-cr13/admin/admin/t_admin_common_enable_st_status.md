# Enabling Sametime status in the Important to Me Bar {#t_admin_common_enable_st_status .task}

Starting with Connections 8.0 CR3, Sametime status indicator is now displayed for each person on the Important To Me bar. Hovering over the bubble will display the Sametime chat options along with the Sametime status.

The appregistry extension enables the Sametime status to be displayed for a user in the Important To Me. To enable the Sametime status to work in the Important To Me bar, perform the following  

## Procedure 

Perform the following steps to set up the Appregistry Extension to enable the Sametime status in the **Important to Me Bar**.

1. Launch the appregistry UI at /appreg/apps URL (requires admin access) or navigate to your Connections URL. Example: *https://yourConnectionsUrl.com/appreg/apps*.

2. In the **Apps manager**, click **New App**.

3. On the **Code Editor** page, either clear the default outline json that is created by default and then paste in the following:

    ```
    {
        "name": "Sametime ITM Integrations",
        "title": "Sametime ITM Integrations",
        "description": "Sametime integration actions",
        "services": [
            "ImportantToMe"
        ],
        "state": "disabled",
        "extensions": [
            {
                "name": "Sametime Chat Integrations",
                "description": "Enable chat from ITM bubbles",
                "translations": {
                    "": {
                        "ImportantToMeSametimeIntegrationWebChat.label": "Chat"
                    },
                    "en": {
                        "ImportantToMeSametimeIntegrationWebChat.label": "Chat"
                    },
                    "fr": {
                    "ImportantToMeSametimeIntegrationWebChat.label": "Discussion"
                    }
                },
                "type": "com.ibm.itm.entry.person.default",
                "payload": {
                    "actions": [
                        {
                            "type": "sametimeweb",
                            "label": "%nls:ImportantToMeSametimeIntegrationWebChat.label",
                            "icon": {
                                "type": "svg",
                                "data": "data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjU3LjQ5IDI0My45NCI+PGRlZnM+PHN0eWxlPi5jbHMtMSwuY2xzLTIsLmNscy0ze2ZpbGw6IzQxNzhiZTt9LmNscy0xe2NsaXAtcnVsZTpldmVub2RkO30uY2xzLTN7ZmlsbC1ydWxlOmV2ZW5vZGQ7fS5jbHMtNHtjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgpO30uY2xzLTV7aXNvbGF0aW9uOmlzb2xhdGU7fS5jbHMtNntjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgtMik7fS5jbHMtN3tjbGlwLXBhdGg6dXJsKCNjbGlwLXBhdGgtMyk7fTwvc3R5bGU+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMzLjg4IDMzLjg4KSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDAuNjYsODEuMzFoNjcuNzZWOTQuODZINDAuNjZabTAtNDAuNjVIMTQ5LjA3VjU0LjIxSDQwLjY2Wm02NiwxMzUuNTJMOTQuODYsMTY5LjQsMTIyLDEyMmg0MC42NWExMy41NiwxMy41NiwwLDAsMCwxMy41Ni0xMy41NVYyNy4xYTEzLjU2LDEzLjU2LDAsMCwwLTEzLjU2LTEzLjU1SDI3LjFBMTMuNTUsMTMuNTUsMCwwLDAsMTMuNTUsMjcuMXY4MS4zMkExMy41NSwxMy41NSwwLDAsMCwyNy4xLDEyMmg2MXYxMy41NWgtNjFBMjcuMSwyNy4xLDAsMCwxLDAsMTA4LjQyVjI3LjFBMjcuMSwyNy4xLDAsMCwxLDI3LjEsMEgxNjIuNjJhMjcuMSwyNy4xLDAsMCwxLDI3LjExLDI3LjF2ODEuMzJhMjcuMTEsMjcuMTEsMCwwLDEtMjcuMTEsMjcuMUgxMjkuODNaIi8+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMy44OCAzMy44OCkiPjxyZWN0IGNsYXNzPSJjbHMtMiIgeD0iLTMzLjg4IiB5PSItMzMuODgiIHdpZHRoPSIyNTcuNDkiIGhlaWdodD0iMjQzLjk0Ii8+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMy44OCAzMy44OCkiPjxyZWN0IGNsYXNzPSJjbHMtMiIgd2lkdGg9IjE4OS43MyIgaGVpZ2h0PSIxNzYuMTgiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQwLjY2LDgxLjMxaDY3Ljc2Vjk0Ljg2SDQwLjY2Wm0wLTQwLjY1SDE0OS4wN1Y1NC4yMUg0MC42NlptNjYsMTM1LjUyTDk0Ljg2LDE2OS40LDEyMiwxMjJoNDAuNjVhMTMuNTYsMTMuNTYsMCwwLDAsMTMuNTYtMTMuNTVWMjcuMWExMy41NiwxMy41NiwwLDAsMC0xMy41Ni0xMy41NUgyNy4xQTEzLjU1LDEzLjU1LDAsMCwwLDEzLjU1LDI3LjF2ODEuMzJBMTMuNTUsMTMuNTUsMCwwLDAsMjcuMSwxMjJoNjF2MTMuNTVoLTYxQTI3LjEsMjcuMSwwLDAsMSwwLDEwOC40MlYyNy4xQTI3LjEsMjcuMSwwLDAsMSwyNy4xLDBIMTYyLjYyYTI3LjEsMjcuMSwwLDAsMSwyNy4xMSwyNy4xdjgxLjMyYTI3LjExLDI3LjExLDAsMCwxLTI3LjExLDI3LjFIMTI5LjgzWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzMuODggMzMuODgpIi8+PGcgY2xhc3M9ImNscy00Ij48ZyBjbGFzcz0iY2xzLTUiPjxyZWN0IGNsYXNzPSJjbHMtMiIgd2lkdGg9IjI1Ny40OSIgaGVpZ2h0PSIyNDMuOTQiLz48ZyBjbGFzcz0iY2xzLTYiPjxyZWN0IGNsYXNzPSJjbHMtMiIgeD0iMzMuODgiIHk9IjMzLjg4IiB3aWR0aD0iMTg5LjczIiBoZWlnaHQ9IjE3Ni4xOCIvPjxnIGNsYXNzPSJjbHMtNyI+PHJlY3QgY2xhc3M9ImNscy0yIiB3aWR0aD0iMjU3LjQ5IiBoZWlnaHQ9IjI0My45NCIvPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg"
                            },
                            "url": "https://sametime.example.com/chat/conversations/${dn}",
                            "enabled": true
                        }
                ]
            },
                "path": "OrientMe",
                "state": "enabled"
            }
        ]
    }
    ```

4. Update the Sametime server host in the url key (sametime.example.com) to host name used for the sametime server in your  deployment.
5. Click on **Save** to save the application.
6. Each bubble in the **Important to Me** bar should be highlighted with the user's Sametime Status.
7. Hover over a bubble and the Sametime status will be displayed for the user as well as a Sametime chat icon.

**Parent topic:** [Customizing the deployment](../admin/c_admin_common_customizing.md)
