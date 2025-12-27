import { NumberInput, TextInput } from '@mantine/core';

import { usePlayerFinances } from '@/features/player-state/stores';

import { getByPath } from '@/shared/utils/path';

interface EditableCellProps {
  path: string;
  type: 'text' | 'number';
}

export const EditableCell = ({ path, type }: EditableCellProps) => {
  const value = usePlayerFinances((s) => getByPath(s.draft, path));
  const setValueByPath = usePlayerFinances((s) => s.setValueByPath);

  if (type === 'text') {
    return (
      <TextInput
        value={(value as string | undefined) ?? ''}
        onChange={(e) => setValueByPath(path, e.currentTarget.value)}
      />
    );
  }

  return (
    <NumberInput
      hideControls
      value={(value as number | undefined) ?? ''}
      onChange={(v) => setValueByPath(path, v)}
    />
  );
};
