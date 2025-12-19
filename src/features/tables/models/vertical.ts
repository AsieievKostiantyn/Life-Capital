type VerticalTableRow<TValue> = {
  key: string;
  label: string;
  value: TValue;
};

export type VerticalTableSchema<TValue> = {
  caption?: string;
  rows: VerticalTableRow<TValue>[];
};
