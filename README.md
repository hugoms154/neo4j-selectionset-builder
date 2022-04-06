# Neo4J SelectionSet Builder
In order to get some intellisense from TypeScript when writing queries with OGM, so we can know what properties, objects or arrays are coming next, we built SelectionSet Builder to solve this problem.
While you writing your selectionSet it will be able to show you the properties available in that path.

## Contributing
You can contribute to this project by sending a pull request or opening an issue. Feel free to help!

## Syntax
> Remember to always apply the generics, otherwise the intellisense will not work.

All keys of primitive types should be in Arrays
```ts
buildSelectionSet<T>(['key', ..., 'key-n']);
```

Output: 
```
{ key ... key-n }
```

All keys of Arrays OR Objects should be an Object inside the Array
```ts
buildSelectionSet<T>([
  {
    Object: ['key', ..., 'key-n'], 
    Array: ['key', ..., 'key-n'] 
  }
]);
```
Output: 
```
{ Object { key ... key-n } Array { key ... key-n } }
```

Do it recursively!
```ts
buildSelectionSet<T>([
  {
    Object: [
      'key',
      ...,
      'key-n'
      {
        ObjectOrArray2: ['key', ..., 'key-n', { ... }]
      }
    ],
    Array: [
      'key',
      ...,
      'key-n'
      {
        ObjectOrArray2: ['key', ..., 'key-n', { ... }]
      }
    ] 
  }
]);
```
Output: 
```
{ Object { key ... key-n } Array { key ... key-n } }
```

## Usage

```ts
buildSelectionSet<User>([
  "id",
  "email",
  "name",
  "password",
  {
    portfolio: [
      "id",
      "name",
      {
        assets: [
          "id",
          "name",
          "value",
          {
            category: [
              "id",
              "name"
            ],
            sector: [
              "id",
              "name"
            ],
            segment: [
              "id",
              "name"
            ],
          }
        ]
      }
    ]
  }
])
```
Output: 
```
{ id email name password portfolio { id name assets { id name value category { id name } sector { id name } segment { id name } } } } 
```


