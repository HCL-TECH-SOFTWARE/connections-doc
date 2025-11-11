# Reviewing the JVM heap size {#increasejvmheapsize .task}

Review the size of the Java™ Virtual Machine heap and adjust it, if necessary, to avoid out-of-memory errors or to suit your hardware capabilities.

If you selected the Small or Medium deployment option when you installed HCL Connections, IBM® Installation Manager set the Maximum Heap Size of the Java Virtual Machine \(JVM\) on each application server. This setting is designed to avoid out-of-memory errors.

Review the heap size on each server to ensure that you are allocating enough memory for HCL Connections but also to ensure that you are not allocating more memory than the physical capabilities of the systems where the JVMs are deployed.

Whether you installed a Small, Medium, or Large deployment of HCL Connections, you should review the JVM heap sizes in your deployment and make adjustments, if necessary.

To review the JVM heap size, complete the following steps:

1.  Log into the WebSphere® Application Server Integrated Solutions Console and select **Servers** \> **Server Type** \> **WebSphere application servers**.

2.  Click **server**, where server is the name of an HCL Connections server. You might have several servers in your deployment, so you might need to repeat these steps for each server.

3.  In the Server Infrastructure area, click**Java and Process Management** and then click **Process Definition** \> **Java Virtual Machine**.

4.  Review the Maximum heap size. IBM Installation Manager sets the following default values:

    -   Small deployment:

        Maximum Heap Size
        :   2560 MB

    -   Medium deployment:

        Maximum Heap Size
        :   2560 MB

    -   Large deployment:

        Maximum Heap Size
        :   2560 MB

    **Note:** Ensure that you are not allocating more memory than the physical capacity of the system where the JVM is installed.

5.  Adjust the current values of the heap size up or down to suit the needs of your deployment and your hardware capabilities.

6.  Click **OK** and then click **Save**.

7.  Repeat these steps for any additional servers in your deployment.


For more information about tuning the JVM, see the [HCL Connections 6.0 Performance Tuning Guide](https://www-10.lotus.com/ldd/lcwiki.nsf/dx/IBM_Connections_V6_Tuning_guide) in the Community Articles section of the wiki.

**Parent topic:**[Post-installation tasks](../install/r_post-installation_tasks.md)

