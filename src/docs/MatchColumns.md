# MatchColumns Component

## Properties

### start

Object with the following properties

- list: An object array. Every object must have an `id` as string
- renderItem: The element to render
- title: The title of the list

### end

Object with the following properties

- list: An object array. Every object must have an `id` as string
- renderItem: The element to render
- title: The title of the list

### showHeader (optional)

Boolean property, `false` by default. This hiddes or displays the titles row.

### titleProps (optional)

Contains all the properties that a normal html div element would have.
This is just for titles row.

#### Default styles

`text-center relative font-semibold border py-2 rounded-md`

### listProps (optional)

Contains all the properties that a normal html div element would have.
This is just to the container of items in both lists.

#### Default styles

`flex relative flex-col gap-3`

### containerProps (optional)

Contains all the properties that a normal html div element would have.
This component is a grid. So, this applies to the container grid.

#### Default styles

`h-auto max-sm:w-screen max-md:w-10/12 md:w-9/12 xl:w-1/2 grid grid-cols-[repeat(3,minmax(100px,1fr))] gap-2 p-5 border place-content-center rounded-xl shadow-lg w-full`

### onConnectionsChange (optional)

This event is triggered when changes the value of connections and returns them.

```js
[
  {
    start: startItem // Object in the list of start
    end: endItem // Object in the list of end
  }
]
```

### connections (optional)

Default connections to start with the component.

```js
[
  {
    start: startItem // Object in the list of startSide
    end: endItem // Object in the list of endSide
  }
]
```

## GRID

|   start title           |  end title           |
|------------------------|------------------------|
|   items of start list    | items of end list      |

