import { Avatar, Group, type MultiSelectProps, Text } from '@mantine/core';

import type { UserOption } from './user-option';

export const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({
  option,
}) => {
  const user = option as UserOption;

  return (
    <Group gap="sm">
      <Avatar
        src={user.avatar_url}
        size={36}
        radius="xl"
        name={user.label}
        color="initials"
      />
      <div>
        <Text size="sm">{user.label}</Text>
        <Text size="xs" opacity={0.5}>
          {user.email}
        </Text>
      </div>
    </Group>
  );
};
