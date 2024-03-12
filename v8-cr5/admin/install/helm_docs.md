# Helm chart documentation for Component Pack

Helm-docs has been integrated into the Connections Component Pack to automate the generation of documentation from Helm charts, producing Markdown files for easy reference. These generated files include metadata related to the respective chart, along with a table presenting the chart's values, their default settings, and optional descriptions extracted from comments.

If the helm chart hasn't been pulled from Harbor, do the following:

1.  Log in to Harbor:

    ```
    helm registry login -u <<helm_repo_username>> -p <<helm_repo_password>> <<helm_repo_path>>
    ```

    Where:

    - `<<helm_repo_username>>` is the Harbor username
    - `<<helm_repo_password>>` is the CLI secret (to access, log in to Harbor, then click on your name > User Profile > CLI Secret)
    - `<<helm_repo_path>>` is the Harbor repository to log into, that is https://hclcr.io

2.  Pull the helm chart (this command can be copied from Harbor in the Repositories tab for the package):

    ```
    helm pull oci://hclcr.io/cnx/<<chartname>> --version <<chart version>>
    ```

3.  Extract the helm chart:

    ```
    tar -xvf <<chartname.tgz>>
    ```

4.  View the Markdown file for the helm charts. There will be a docs folder for each chart, which will have the Markdown file containing chart metadata named &lt;chart_name.md&gt;. Some packages like OrientMe bundle multiple charts in one package.