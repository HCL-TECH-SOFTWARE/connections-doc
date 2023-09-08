# Removing nodes from a cluster with the command line {#t_admin_common_remove_node_cmd_line .task}

Use the removeNode command to remove a node from a cluster.

For more information about the removeNode command, see [removeNode command](https://www.ibm.com/docs/en/was-nd/8.5.5?topic=tools-removenode-command) in the WebSphere Application Server Network Deployment documentation.

1.  To remove a node from a cluster, complete the following steps:
2.  Log in to the node that you want to remove.

3.  Open a command prompt and change to the [profile\_root](../plan/i_ovr_r_directory_conventions.md)/bindirectory.

4.  Run the following script to remove the node:

    -   Linux:

        ./removenode.sh\[-username uid\] \[-password pwd\]

    -   Windows:

        removenode.bat\[-username uid\] \[-password pwd\]

    where:

    -   uid is the Deployment Manager administrator user name
    -   pwd is the Deployment Manager administrator password

**Parent topic:**[Removing nodes from a cluster](../admin/c_admin_common_remove_nodes.md)

**Related information**  


[Removing nodes from a cluster using the Integrated Solutions Console](../admin/t_admin_common_remove_node.md)

