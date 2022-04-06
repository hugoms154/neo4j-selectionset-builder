type ObjectOfType<T, V> = { [P in keyof T as T[P] extends V ? P : never]: P };

type ExcludeKeysOfType<T, V> = {
  [P in Exclude<keyof T, keyof ObjectOfType<T, V>>]: T[P];
};

type PartialObjectOrArrayKeysOf<T extends [] | {}> = {
  [key in keyof T]?: T[key] extends unknown[]
    ?
        | Array<keyof ExcludeKeysOfType<T[key][number], object>>
        | SelectionSet<T[key][number]>
    : SelectionSet<T[key]>;
};

type SelectionSet<T> = T extends {}
  ? Array<
      | keyof ExcludeKeysOfType<T, object>
      | PartialObjectOrArrayKeysOf<
          ExcludeKeysOfType<T, string | number | boolean | Date>
        >
    >
  : Array<PartialObjectOrArrayKeysOf<T>>;

export function buildSelectionSet<T>(query: SelectionSet<T>): string {
  const serializedQuery = JSON.stringify(query);

  return serializedQuery
    .replace(/,|:/g, " ")
    .replace(/"|{|}/g, "")
    .replace(/\[/g, "{")
    .replace(/\]/g, "}");
}
