# Configuring Collabora and Docs Provider


When users open a file in HCL Connections, they can view the file (read-only) or edit the file. Two separate services power these experiences:

- **Docs** — the HCL Docs service (the traditional option)
- **Collabora** — a third-party office editing service

This section explains how administrators control which service powers the file-opening experience, what users see under different configurations, and what to expect in mixed-configuration environments.


## Viewing and editing settings

Both viewing and editing services can be configured in the **`files-config.xml`** file on the server, inside the `<officeEditing>` element:

```xml
<officeEditing>
    <viewerProvider>collabora</viewerProvider>
    <editorProvider>collabora</editorProvider>
</officeEditing>
```

After editing `files-config.xml` with your required configuration, restart the server for the changes to take effect. After the server restarts, clear your browser cache so that the browser loads the updated configuration.

The file includes two independent configuration settings:

| Setting | Controls |
|---|---|
| `officeEditing.viewerProvider` | Controls which service opens the file for viewing |
| `officeEditing.editorProvider` | Controls which service opens the file for editing |

These two settings operate independently. You can set HCL Docs for viewing and Collabora for editing, or use any other combination.

### Configuration and Server Restart Steps

1. Open the Files configuration file and locate the `<officeEditing>` section in `files-config.xml`.
2. Set `viewerProvider` and `editorProvider` to the desired values (`docs`, `collabora`, `none`, or `disabled`).
3. Save the file and apply it to the deployment environment used by your Files application.
4. Restart the application server environment hosting Files. This restart is **mandatory** for provider changes to take effect.
5. After restart, clear browser cache (or use a clean browser session) before validating behavior.

Without the restart, users may continue to see the old provider behavior even if the file was edited correctly.

### Valid Values for Each Setting

| Value | Meaning |
|---|---|
| `docs` | Always use Docs for this action |
| `collabora` | Always use Collabora for this action |
| `none` | No explicit preference — defaults to Docs if available |
| `disabled` | Completely turn off this action for all users |
| *(not set)* | Treated the same as `none` |

!!! note

    When the value is none or missing, the system checks whether HCL Docs is running on the server. If HCL Docs is available, it is used. If HCL Docs is not available, no service is used. Collabora is never selected automatically; it must be explicitly configured.

### Runtime Dependencies: Docs Viewer, Docs Editor, and Thumbnails

Docs runtime dependencies are important even when Collabora is configured:

- **Docs viewer runtime** is required whenever viewing resolves to Docs, including fallback for non-entitled users when `viewerProvider = collabora`.
- **Docs editor runtime** is required whenever editing resolves to Docs (explicitly `editorProvider = docs`, or implicitly via `editorProvider = none`/not set).
- **Docs services for thumbnail generation** remain required, even when Collabora is used for both viewing and editing. To generate document thumbnails, the following Docs services must remain running:

- Docs Proxy
- Docs Viewer
- Docs Conversion


## Managing Collabora user access

Collabora is not available to every user. Access is controlled by a WebSphere security role named `collabora-editor`.

- Users assigned the `collabora-editor` role are referred to as **entitled users**.
- Users without this role are referred to as **non-entitled users**.

Administrators assign users or groups to the `collabora-editor` role in the WebSphere Application Server administration console, under the security role mappings for the Files application. Only users mapped to this role have access to Collabora features.

The system checks this role automatically at run time when Collabora is requested. No manual action is required from the user after the role mapping is configured.

Collabora access is role-gated for **both** actions:

- Collabora **viewing** requires `collabora-editor` role.
- Collabora **editing** requires `collabora-editor` role.

!!! important

    When both `viewerProvider` and `editorProvider` are set to `collabora`, non-entitled users experience the following behavior based on the action:

    - **Viewing:**  Non-entitled users fall back to the HCL Docs viewer if HCL Docs is available and the file is not encrypted. If those conditions are not met, a "Preview not available" message is displayed.
    - **Editing:** Non-entitled users do not fall back to HCL Docs and cannot edit files.
    
    The fallback to HCL Docs applies only to viewing, not to editing.



## Viewing files

- When `viewerProvider` is set to `docs`: 
All users view the file in the HCL Docs viewer, regardless of their Collabora role.

- When `viewerProvider` is set to `collabora`: 

    - **Only Entitled users**: Can view the file in the Collabora viewer.
    - **Non-entitled users**: Automatically fall back to the HCL Docs viewer if the viewer service is running on the server and the file is not encrypted. If either condition is not met, a "Preview not available" message is displayed with the file icon, and the viewer panel does not open.

- When `viewerProvider` is set to `disabled` :
No viewer is shown to any user.

- When `viewerProvider` is `none` or not set:
The system defaults to HCL Docs if the service is running on the server. If HCL Docs is not available, no viewer is provided. Collabora is not selected automatically.


## Editing files

- When `editorProvider` is set to `docs`:
All users who have permission to edit the file can edit it through HCL Docs.

- When `editorProvider` is set to `collabora`:

    - **Entitled users**: Can edit the file through Collabora.
    - **Non-entitled users**: Do not get HCL Docs as a fallback. The edit option is unavailable.

- When `editorProvider` is set to `disabled`:
Editing is unavailable for all users.

- When `editorProvider` is `none` or not set:
The system defaults to HCL Docs editing if the service is running on the server. If HCL Docs is not available, editing is unavailable. Collabora is not selected automatically.

## Authentication modes and WebSphere role mapping

In `files-config.xml`, the `wopiAuthMode` parameter controls how Collabora authenticates callbacks with HCL Connections.

### Anonymous mode requirements

You can keep **`anonymous`** mode enabled (`<wopiAuthMode>anonymous</wopiAuthMode>`) in `files-config.xml` **if and only if** the **`reader`** role in `Files.ear` is mapped to **`Everyone`** in WebSphere Application Server.

- **What this setting means:** In WebSphere Application Server, security role mappings govern access to application endpoints. Mapping a role to `Everyone` instructs WebSphere to allow incoming requests to reach the application endpoints without requiring a WebSphere container-managed user principal.
- **Where to find this setting:** In the WebSphere Integrated Solutions Console (WAS Admin Console), navigate to **Applications > Application Types > WebSphere enterprise applications > Files.ear > Security role to user/group mapping**.
- **`collabora-editor` role mapping:** When using `anonymous` mode, the **`collabora-editor`** role in `Files.ear` **must also** be mapped to **`Everyone`** in WebSphere.


### OAuth and OIDC mode requirements

If your organization has **not** mapped the `reader` role to `Everyone` (for example, if `reader` is restricted to "All Authenticated in Application's Realm" or specific LDAP groups for security compliance), **anonymous mode will not work**.

In this case, you must configure and enable either **OAuth** or **OIDC** mode in `files-config.xml`:

- For OIDC setup details, refer to the [Central OIDC Configuration Guide](t_config_collabora_oidc.md).
- For OAuth setup details, refer to the [OAuth Configuration Guide](t_config_collabora_oauth.md).

## Safe session management

The integration includes automated safeguards to protect documents from becoming stuck or inaccessible due to unexpected disruptions.


- **Active Tracking:** When you open a file to edit, the system registers your active session in the background.
- **Automatic Cleanup:** If you lose your internet connection or close your browser unexpectedly, your session will automatically expire and clean itself up. This ensures documents are never permanently locked due to technical issues, keeping your team's workflow uninterrupted.



## Deployment scenarios

Each scenario below uses this example:

The following scenarios use an environment with 100 total users, where 20 users are assigned the `collabora-editor` role and HCL Docs is fully available.


### Scenario 1: Standard HCL Docs-Only Deployment

**Configuration:**

```
viewerProvider = docs
editorProvider = docs
```

**User experience:**

- All 100 users view files in the HCL Docs viewer.
- All 100 users edit files in HCL Docs, subject to standard permission settings.

**When to use:** Deploying HCL Docs without Collabora to provide a uniform user experience.


### Scenario 2: Collabora editing for selected users

**Configuration:**

```
viewerProvider = docs
editorProvider = collabora
```

**User experience:**

- All 100 users view files in the HCL Docs viewer.
- The 20 entitled users edit files in Collabora.
- The 80 non-entitled users have no edit option available and cannot fall back to HCL Docs editing.

**When to use:** Testing Collabora editing for a subset of users without modifying the viewer experience.

!!! note 
    
    Non-entitled users lose editing capabilities entirely. To allow non-entitled users to edit through HCL Docs, refer to Scenario 4.


### Scenario 3: Full Collabora deployment

**Configuration:**

```
viewerProvider = collabora
editorProvider = collabora
```

**User experience:**

- The 20 entitled users view and edit files in Collabora.
- The 80 non-entitled users fall back to the HCL Docs viewer if HCL Docs is running and the file is not encrypted. They cannot edit files.

**When to use:** Deploying Collabora as the primary viewer and editor, with HCL Docs configured as a fallback for non-entitled users.

!!! note 
  
    Non-entitled users fall back to the HCL Docs viewer. If HCL Docs is unavailable or the file is encrypted, a ****Preview not available*** message is displayed.

### Scenario 4: Collabora viewing and HCL Docs editing for all users

**Configuration:**

```
viewerProvider = collabora
editorProvider = docs
```

**User experience:**

- The 20 entitled users view files in Collabora and edit files in HCL Docs.
- The 80 non-entitled users fall back to the HCL Docs viewer and edit files in HCL Docs.

**When to use:** Providing the Collabora viewer experience for entitled users while maintaining universal HCL Docs editing access.

!!! note
    
    This configuration represents a specialized deployment. Because Collabora licenses typically cover both viewing and editing, splitting the providers is uncommon. Users licensed for Collabora typically use it for both actions.


### Scenario 5: Disabling editing for all users

**Configuration:**

```
viewerProvider = docs
editorProvider = disabled
```

**User experience:**

- All 100 users view files in the HCL Docs viewer.
- Editing is unavailable for all users.

**When to use:** Making files read-only for all users while keeping the viewer available.


### Scenario 6: Disabling viewing and editing

**Configuration:**

```
viewerProvider = disabled
editorProvider = disabled
```

**User experience:**

- Viewing is unavailable for all users.
- Editing is unavailable for all users.

**When to use:** Performing temporary maintenance, locking down files, or turning off office features for a deployment.


### Scenario 7: Defaulting to HCL Docs

**Configuration:**

```
viewerProvider = (not set)
editorProvider = (not set)
```

**User experience:**

- If HCL Docs is running, all users view and edit files in HCL Docs. This mirrors the default Docs-only experience.
- If HCL Docs is not running, viewing and editing are unavailable.

**When to use:** Migrating from an earlier configuration where these settings were not explicitly defined. The system retains legacy default behavior.


### Scenario 8: Collabora viewing with editing disabled

**Configuration:**

```
viewerProvider = collabora
editorProvider = disabled
```

**User experience:**

- The 20 entitled users view files in Collabora.
- The 80 non-entitled users fall back to the HCL Docs viewer, if eligible.
- **Editing is unavailable for all users, including entitled users.**

!!! note
    
    When `editorProvider` is set to `disabled`, Collabora opens files in **read-only** mode for entitled users. The edit option is not displayed.

### Scenario 9: Viewing disabled with Collabora editing

**Configuration:**

```
viewerProvider = disabled
editorProvider = collabora
```

**User experience:**

- Viewing is unavailable for all users.
- Entitled users edit files in Collabora.
- Non-entitled users have no edit option available.


### Scenario 10: Collabora viewing with HCL Docs default editing

**Configuration:**

```
viewerProvider = collabora
editorProvider = (not set)
```

**User experience:**

- Entitled users view files in Collabora. Non-entitled users fall back to the HCL Docs viewer.
- Editing defaults to HCL Docs if the service is running. Collabora editing is not selected automatically.
- All users with edit permissions edit files in HCL Docs.

!!! note
    
    When `editorProvider` is unset and `viewerProvider` is set to `collabora`, the default HCL Docs logic applies only to the unset setting.


## Configuration settings matrix

The table below shows the resulting behavior for every combination of the two settings, assuming Docs is fully available and the file is a standard, non-encrypted, editable file.

| Viewer Setting | Editor Setting | Entitled user - Viewer | Entitled user - Edit | Non-entitled user - Viewer | Non-entitled user - Edit |
|---|---|---|---|---|---|
| docs | docs | Docs | Docs | Docs | Docs |
| docs | collabora | Docs | Collabora | Docs | None |
| docs | none | Docs | Docs | Docs | Docs |
| docs | disabled | Docs | None | Docs | None |
| collabora | docs | Collabora | Docs | Docs (fallback) | Docs |
| collabora | collabora | Collabora | Collabora | Docs (fallback) | None |
| collabora | none | Collabora | Docs | Docs (fallback) | Docs |
| collabora | disabled | Collabora | None* | Docs (fallback) | None |
| none | docs | Docs | Docs | Docs | Docs |
| none | collabora | Docs | Collabora | Docs | None |
| none | none | Docs | Docs | Docs | Docs |
| none | disabled | Docs | None | Docs | None |
| disabled | docs | None | Docs | None | Docs |
| disabled | collabora | None | Collabora | None | None |
| disabled | none | None | Docs | None | Docs |
| disabled | disabled | None | None | None | None |

!!! note 
    
    "HCL Docs (fallback)" indicates that the user lacks the `collabora-editor` role, so the system falls back to the HCL Docs viewer. Fallback requires the HCL Docs viewer service to be running and the file to be unencrypted. If either condition is not met, a "Preview not available" message is displayed and the viewer panel does not open.


## System behavior during failure conditions

### Role check failures (network error or API unreachable)
The system treats the user as non-entitled. Viewing falls back to HCL Docs if eligible; otherwise, a "Preview not available" message is displayed. Editing is unavailable in Collabora editor mode.

### HCL Docs service unavailable
Configurations that rely on HCL Docs (explicitly or via fallback) result in the action being unavailable. For example, a non-entitled user who would fall back to the HCL Docs viewer sees a "Preview not available" message.

If the Docs service is unavailable, thumbnails may be missing or not refreshed even if Collabora is configured for viewer and editor.

### Encrypted files
The HCL Docs viewer cannot open encrypted files. Non-entitled users in Collabora viewer mode see a "Preview not available" message even if HCL Docs is running.

### Unrecognized values settings
Setting values other than `docs`, `collabora`,`none`, or `disabled` are normalized to none. The system defaults to HCL Docs if available.


## Administrator quick reference

- **To configure HCL Docs for all actions (standard setup)**: Set both settings to `docs`, or leave both unset.

- **To provide Collabora editing for selected users while retaining HCL Docs editing for others**: This configuration is not supported by a single setting because Collabora editing replaces HCL Docs editing. Use `editorProvider = docs` to maintain universal HCL Docs editing.

- **To set Collabora as the primary viewer with HCL Docs as a viewer fallback**: Set `viewerProvider = collabora` and `editorProvider = collabora` (or `docs` for universal editing access).

- **To turn off editing for all users**: Set `editorProvider = disabled`.

- **To turn off viewing and editing for all users**: Set both `viewerProvider` and `editorProvider` to disabled.

- **To troubleshoot configuration issues**: Append `?debug=true` to the file viewer URL and open the browser console to review setting resolution and fallback decisions.


## Enabling debug logs

To activate detailed logging, append `?debug=true` to the file viewer URL in the browser. The browser console logs display:

- Values read from the configuration file.
- Resolved providers for viewing and editing.
- Verification status of the `collabora-editor` role (passed or failed).
- The reason why a fallback occurred (or did not occur).

No server restart is needed to enable debug logging.

### Sample log output

The following examples display browser console output for common scenarios:

**Provider resolved from explicit configuration (`viewerProvider = collabora`, `editorProvider = collabora`):**

```
[feature.js] Viewer provider resolved from explicit config
  configuredViewerProvider: "collabora"
  configuredEditorProvider: "collabora"

[feature.js] Editor provider resolved from explicit config
  configuredProvider: "collabora"

[feature.js] Resolved office viewer provider
  provider: "collabora"

[feature.js] Resolved office editor provider
  provider: "collabora"
```

**Role endpoint resolved and user is entitled:**

```
[feature.js] Resolved role endpoint
  filesService: "https://connections.example.com/files"
  roleCheckUrl: "https://connections.example.com/files/app/user/roles"

[feature.js] Requesting collabora-editor role from endpoint
  roleCheckUrl: "https://connections.example.com/files/app/user/roles"

[feature.js] Resolved collabora-editor role
  hasRole: true
  source: "endpoint"

[ViewerPreview.js] Launching Collabora preview for file: ...
```

**User lacks the `collabora-editor` role — fallback to Docs:**

```
[feature.js] Resolved collabora-editor role
  hasRole: false
  source: "endpoint"

[ViewerPreview.js] Falling back from Collabora to Docs because user lacks collabora-editor role
  hasDocsViewerRuntime: true
  isEncrypted: false
```

**Role check request failed (network error):**

```
[feature.js] Failed to resolve collabora-editor role
  error: { status: 503, ... }

[ViewerPreview.js] Failed to resolve collabora-editor role; trying Docs fallback
  error: { status: 503, ... }
```

**Provider set to `none` with no Docs runtime available:**

```
[feature.js] Editor provider resolved from runtime fallback
  configuredProvider: "none"
  hasDocsEditorRuntime: false
  resolvedProvider: "none"
```

**Unknown or misspelled provider value normalized:**

```
[feature.js] Unknown provider, normalizing to none
  originalProvider: "colabra"
```

**Files service unavailable — role check falls back to default endpoint:**

```
[feature.js] Files service unavailable, using fallback role endpoint
  endpoint: "/files/app/user/roles"
```

**Docs edit action suppressed because Collabora editing policy is active:**

```
[EditDocAction.js] Docs edit action disabled because all-or-none collabora editing policy is active
```

**Parent Topic**: [Installing and Configuring Collabora Online](../admin/t_admin_inst_config_collabora.md)