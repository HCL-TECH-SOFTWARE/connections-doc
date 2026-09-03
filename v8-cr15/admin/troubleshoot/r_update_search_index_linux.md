# Troubleshooting the "too many open files" error when updating the Search index {#reference_zpg_45f_bm .reference}

Attempts to update the HCL Connections™ Search index on Linux™ can result in the following error: `CLFRW0034E: Error reading or writing to the index directory. Please check permissions and capacity. java.io.FileNotFoundException: /opt/IBM/Connections/data/local/search/index/index_forums/_iu.fdt (Too many open files)`. This error means that users cannot search for content that is added to Connections.

## Temporary workaround { .section}

Restarting the Search service temporarily resolves this issue.

## Diagnosing the problem { .section}

To see the current limits on the number of open files, log on to a shell as the user who updates the Connections Search index and run the following command: ulimit -n

The default is 1024 open files.

The recommended limit is 8192 open files.

## Resolving the problem { .section}

As the user who updates the Connections Search index, enter the following commands:

1.  vi .bashrc

    **Note:** .bashrc is in the user's home directory.

2.  Add the line: `ulimit -n 8192`.
3.  Save and exit file.
4.  Set ulimit for the working current session, for example: ulimit -n 8192.
5.  Confirm that the new ulimit setting is in effect: ulimit -a.

**Parent topic:**[Troubleshooting Search](../troubleshoot/c_ts_search.md)

