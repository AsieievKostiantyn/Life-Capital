type HorizontalTableColumn<T> = {
  key: T;
  label: string;
};

type HorizontalTableRow<TData> = {
  id: string;
  data: TData;
};

export type HorizontalTableSchema<TData> = {
  caption?: string;
  columns: HorizontalTableColumn<keyof TData>[];
  rows: HorizontalTableRow<TData>[];
};
