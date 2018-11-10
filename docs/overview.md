---
title: Overview
sidebar_label: General
---

## What is included

`rest-store` provides an in-memory representation of resources returned by a traditional REST, their state and a set of methods used to manipulate this representation.

Additionally this project provides bindings to both [Vue]() and [React]() which takes the pain out of data fetching. A request for your data will automatically be made whenever your view requires it.

## State Layout

The layout of the state object used `rest-store` is fixed and only contains two properties. One is `list` and it represents lists of resources, while the `resources` key contains the actual resource objects.

## Lists

The `list` property of the state root contains an object containing different lists of resources keyed by the name of the list. Each list represents a different set of IDs, this is useful to represent resources for specific objects, filters or ordering. Some examples of lists are given below, but ultimately you can pick any name that fits your data:

- `sorted.name`: a list containing IDs sorted by name
- `file.132`: a list of IDs for subresources in the file with ID `132`
- `search`: a list of IDs that match the current search

```js
{
    list: {
        "listName": { ... },
        "sorted.name": { ... },
        "file.132": { ... },
        "search": { ... }
    },
   resources: { ... }
}
```

### List

A list consists of one required property (`entries`) and some optional properties (`pageSize` and `total`). A list will only contain the ID of resources to prevent duplicate data from being stored in the state object. Resources will be retrieved from the [`resources`](#resources) property when requested, this prevents duplicate data and ensures the resources are consistent within your application.

The `entries` property is populated by the [`addPage`](#) or [`addRange`](#) helper methods provided by this library. To read the contents of a list you should use the [`getPage`](#) or [`getRange`](#) method, these will automatically populate an array with the resources in the correct order. If you are only interested in the IDs within the list there is the `ids` method.

```javascript
// Add a set of IDs at page 3
addPage(state, 'listName', 3, [1, 2, 3, 4]); 
```

The `total` property is used to automatically detect the end of a list and can be set using the [`options`](#) helper. While this property is not required it is highly encouraged to be set. If this property is missing you might run into problems using the status methods such as `isLoading`, which will incorrectly report a list still being loaded.

Setting `pageSize` on a list overwrites the list's default page size of 10 when using the [`getPage`](#) helper.

```javascript
{
    list: {
        "listName": {
            total: 55
            pageSize: 20,
            entries: [ ... ]
        }
    }
}
```

### List Entry

An entry in a list represents a single resources in a list, but it only contains meta data required to compose the final list. This meta data is used to fetch the correct resource, report on status ( `OK`, `LOADING`, `EXPIRED`, `ERROR` ) and to refresh when required.

- `id`: the ID of the resource at this position in the list
- `state`: the current [state](#) of this entry in the list.
- `expires`: a unix timestamp indicating when this entry in the list expires.

```javascript
{
    list: {
        "listName": {
            entries: [{
                id: 1,
                state: OK,
                expires: 1541890352410
            }, {
                id: 2,
                state: OK,
                expires: 1541890352410
            }, {
                id: 3,
                state: OK,
                expires: 1541890352410
            }]
        }
    }
}
```

## Resources

The `resources` property contains the resource and metadata associated with an ID. The ID of the resources is used as a key in the `resources` object such that they can be looked up easily.

Each entry in the `resources` object contains 4 properties:

- `data`: The actual resource data inserted by [`add`](#) is kept here.
- `id`: The ID with which the resource was added.
- `expires`: A timestamp indicating until when this entry is valid.
- `state`: Contains the state of the resource.

```js
{
    resources: {
        "1": {
            data: {
                id: 1,
                name: 'first'
            }
            id: 1,
            expires: 1541890352410,
            state: OK
        },
        
        // Representation of a resource being fetched
        "2": {
            data: null,
            id: 2,
            state: LOADING
        }
    }
}
```