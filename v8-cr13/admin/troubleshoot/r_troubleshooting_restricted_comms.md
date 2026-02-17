# Troubleshooting searches in multiple restricted communities {#reference_zpg_45f_bm .reference}

Users who are members of many restricted communities may get incorrect search results.

## Summary { .section}

Some HCL Connections™ users see incorrect behavior for Search, when they are searching multiple Restricted Communities.

When a community owner searches "All Content" for a restricted community's exact title, the community is not returned in the search results.

The issue persists after the Search index is rebuilt.

## Cause { .section}

The search application uses a Lucene 3.0.3 index, which has an ACL clause limit: BooleanQuery.setMaxClauseCount\(\). For more information, see: [http://lucene.apache.org/core/3\_0\_3/api/core/org/apache/lucene/search/BooleanQuery.html](http://lucene.apache.org/core/3_0_3/api/core/org/apache/lucene/search/BooleanQuery.html)

BooleanQuery.setMaxClauseCount\(\) sets a limit of 1024 ACL Clauses whenever someone searches Connections.

Restricted Files and other private data are associated directly with the user's ACL token, so when a user searches the ACL of that user is searched only. For example, "find all files that are associated with acl=<user id\>".

Searches in restricted communities are special because of the amount of content they contain. As a result, the content within a Restricted Community is indexed with the UUID of the Community as an ACL token. With Restricted Communities, if you check the ACL tokens, you see what Restricted Communities that user is a member of. The list then gets passed to the Search query as a restriction.

This is where the clause limit is important, one clause is needed for every ACL token the user has.

Therefore, the Search query is as follows when a user searches for restricted communities:

```
"Search all where acl=<user id> 
OR acl=<restricted community 1> 
OR acl=<restricted community 2> 
.
.
.
" 
```

If the user is a member of multiple Restricted Communities, the clause limit of 1024 could be exceeded.

The 1024 clause limit affects Restricted Communities only. Public or Moderated Communities have special ACLs that can be found by all users so no additional information is needed in the Search query.

## Diagnosing the problem { .section}

To confirm that the user exceeds the ACL clause limit on the search query:

-   Log on as the user who cannot search successfully.
-   Go to the URL: http://<connections server root url\>/communities/seedlist/authverify/getACLTokens
-   Check whether the number of rows exceeds the ACL limit.

## Resolving the problem { .section}

For users where the number of ACL clauses exceeds 1024, work with that user to reduce the number of Restricted Communities that they are a member of. You do not have to reindex content.

**Parent topic:**[Troubleshooting Search](../troubleshoot/c_ts_search.md)

