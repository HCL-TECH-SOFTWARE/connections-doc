# Social analytic relationships {#c_admin_search_sand_relationships .concept}

The social analytics service analyzes complex relationships between people, documents, and tags in HCL Connections applications, and uses the results of the analysis to make recommendations to users in the social analytic widgets. These relationships and associations control the type of recommendations that are displayed to users in the widgets.

Two specific concepts are involved in the analysis of social data in HCL Connections: associations and relationships. A social analytic association type refers to the association that a facet has to an indexed document. In the context of social analytic relationship configuration, associations are typically concerned with associations between people and documents. Associations have a weighting associated with them and this weighting is used to compute related facets for a search query.

!!! note 
    
    A facet is an aspect of an indexed document that can be used to classify a document. The types of facet available in HCL Connections Search include date, source, people, and tags. A document can have more than one instance of a facet type. For example, a document can have many person facets associated with it.

A social analytic relationship refers to the relationship between a document and the association of two people to that document. The relationship takes into account the type of document and also the role that the two people have in relation to that document. The type of relationship changes depending on who is the query person and who is the target person. For example, the relationship with the internal identifier le1 denotes a first-level employee relationship. Let’s say that John is Peter’s manager. In this instance, John is the target person and Peter is the query person. However, from John’s perspective, this is a first-level manager relationship, which has the internal identifier lm1. Peter is John’s employee, making Peter the target person and John the query person.

The relationships used in the social analytics service typically concern the people-to-people relationships that are evaluated when generating the list of related people included in the search results for a person query. Each of the social analytic widgets provided with HCL Connections uses its own set of relationships, called a relationship set, for recommending content, communities, and people.

**Parent topic:** [Administering the social analytics service](../admin/c_admin_search_sand_indexing_tasks.md)

