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

type EditableHorizontalTableColumn<TData> = {
  key: keyof TData;
  label: string;

  editable?: boolean;

  getPath?: (rowId: string) => string;
  getHintPath?: (rowId: string) => string;
};

type EditableHorizontalTableRow<TData> = {
  id: string;
  data?: TData;
};

export type EditableHorizontalTableSchema<TData> = {
  caption?: string;

  columns: EditableHorizontalTableColumn<TData>[];
  rows: EditableHorizontalTableRow<TData>[];
};
