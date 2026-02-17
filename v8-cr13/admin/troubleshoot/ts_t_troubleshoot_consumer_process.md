# Troubleshooting the user life-cycle SPI {#ts_t_troubleshoot_consumer_process .task}

View traces in the log files to get information about the user life-cycle SPI.

The user life-cycle SPI is responsible for processing the user life-cycle commands that are sent from Profiles to the other applications.

1.  To troubleshoot events relating to the user life-cycle SPI, complete the following steps.
2.  Enable trace logging for the com.ibm.lconn.lconn.lifecycle process in the WebSphere® Application Server.

    For information about how to enable trace logging, see [Enabling traces in WebSphere Application Server](ts_t_enable_was_traces.md).

3.  Check the log files for information relating to the user life-cycle SPI.

    Log entries relating to the user life-cycle SPI are identified with the prefix, `com.ibm.lconn.lifecycle.*`.

    For example, when Profiles initiates the record update, the log looks like the following:

    ```
    ***************
    Event data
    ***************
    _er_id: 7b743501-07b5-4abe-976f-68a865cc859e
    _er_time: 1284475145426
    _er_source: PROFILES
    _er_type: COMMAND
    _er_name: user.record.update
    _er_scope: PUBLIC
    _er_related_community: null
    _er_actor: null
    _er_actor_name: null
    _er_actor_email: null
    _er_properties:
    {"externalId":"DRcuidk001retired51","_msg_id":"1301","user.email":"dretired51@janet.iris.com","user.externalId":"DRcuidk001retired51","user.logins":"[\"dretired51
    \",\"dretired51@janet.iris.com\",\"Dan Retired51\"]","user.name":"Dan
    Retiring51"}
    
    Container:
    _er_container_id: null
    _er_container_name: null
    _er_container_html_path: null
    
    Item:
    _er_item_id: null
    _er_item_name: null
    _er_item_html_path: null
    _er_item_atom_path: null
    _er_item_external_url: null
    ***************
    ```

    When an application is called to receive an event life-cycle command, the log looks similar to the following.

    ```
    [9/14/10 10:39:05:567 EDT] 000000a8 UserLifeCycle <
    com.ibm.lconn.lifecycle.spi.UserLifeCycleSpiRegistry getComponentName
    RETURN Activities
    [9/14/10 10:39:05:567 EDT] 000000a8 UserLifeCycle I
    com.ibm.lconn.lifecycle.platformCommandConsumer.UserLifeCycleConsumer
    consumeCommand CLFWY0227I: The User Life Cycle Platform Command Consumer
    successfully invoked the registered SPI to update the application database
    for user with extId DRcuidk001retired51. Application name is Activities.
    ```

    When an application does not have a user in the local database to receive the life-cycle event, the log looks like this:

    ```
    [9/14/10 16:27:19:414 EDT] 000000a4 UserLifeCycle I
     com.ibm.lconn.lifecycle.platformCommandConsumer.UserLifeCycleConsumer
     consumeCommand CLFWY0225I: No user was found in application database
     with directory id DRcuidk001retired51. The person details were not
     updated in application database. Application name is blogs.
    ```

    The ACKCOM events are also fired as applications process the inactivateUser event. Here is an example of an acknowledgement from the Profiles event when an application successfully receives an update:

    ```
     [9/13/10 17:16:51:630 EDT] 0000008c UserLifeCycle <                   
     com.ibm.lconn.lifecycle.spi.UserLifeCycleSpiRegistry getComponentName 
     RETURN Communities                                                    
     [9/13/10 17:16:51:630 EDT] 0000008c AbstractEvent >                   
     com.ibm.lconn.events.internal.AbstractEvent DefaultEvent ENTRY        
     COMMUNITIES ACKCOM PUBLIC user.record.inactivate                      
     [9/13/10 17:16:51:630 EDT] 0000008c DefaultEvent >                    
     com.ibm.lconn.events.internal.object.DefaultEvent DefaultEvent ENTRY  
     COMMUNITIES ACKCOM PUBLIC user.record.inactivate               
    ```


**Parent topic:**[Troubleshooting user data propagation](../troubleshoot/ts_c_troubleshoot_user_lifecycle.md)

**Related information**  


[Enabling traces in WebSphere Application Server](../troubleshoot/ts_t_enable_was_traces.md)

