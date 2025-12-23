type VerticalTableRow<TValue> = {
  key: string;
  label: string;
  value: TValue;
};

export type VerticalTableSchema<TValue> = {
  caption?: string;
  rows: VerticalTableRow<TValue>[];
};

export type EditableVerticalTableRow = {
  label: string;
  path: string;
  hintPath?: string;
};

export type EditableVerticalTableSchema = {
  caption?: string;
  rows: EditableVerticalTableRow[];
};
