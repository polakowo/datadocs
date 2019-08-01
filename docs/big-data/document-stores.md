---
id: document-stores
title: Document Stores
sidebar_label: Document Stores
custom_edit_url: https://github.com/polakowo/datadocs/edit/master/docs/big-data/document-stores.md
---

- Document stores are designed for storing, retrieving and managing semi-structured data.
- They are inherently a subclass of the key-value store.
    - The values in a key-value store are black boxes.
    - The values in a document store are transparent and organized.
    - This provides an ability to query based on the internal structure of the document.
- Store all information for a given object in a single instance in the database (= document)
- Documents are equivalent to the programming concept of an object.
    - Can be encoded with XML, YAML, JSON, BSON, and more.
    - Enable developers to use the same format they use in their application code.
- Support CRUD operations:
    - Documents are addressed in the database via a (indexed) unique key.
    - Enable retrieving documents based on content, not only keys.
- Schema-free organization of data:
    - Documents are flexible, semistructured, and have a hierarchical nature.
    - Any sort of document can be stored, and those documents can change in form at any time.
    - No schema update is required and no database downtime is necessary.
    - Ability to add additional metadata outside of the content of the document.
- Enable flexible indexing, powerful ad hoc queries, and analytics over collections of documents.
- Uses cases: 
    - Where documents evolve over time.
    - For example, catalogs, user profiles, and content management systems.

## MongoDB

- MongoDB is an open-source, NoSQL database that provides support for JSON-like storage systems.
- Supports a flexible data model for storing data of any structure.
- Provides a rich set of features, including full index support, sharding, and replication.

### Data modeling