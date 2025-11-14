import { useMemo, useState } from 'react';

import {
  Avatar,
  Button,
  Group,
  Modal,
  MultiSelect,
  type MultiSelectProps,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAuth } from '@/features/auth';
import { gameSessionApi } from '@/features/game-session/api';
import type { Player } from '@/features/game-session/types';
import { userApi } from '@/features/user/api';

import type { AppUser } from '@/shared/types';

type UserOptionsMap = Record<
  string,
  { value: string; label: string; email: string }
>;

export const MyGamesPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [allUsers, setAllUsers] = useState<AppUser[] | null>(null);
  const [sessionName, setSessionName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  const userOptionsMap = useMemo(() => {
    if (!allUsers) return {} as UserOptionsMap;

    const map: UserOptionsMap = {};
    for (const u of allUsers) {
      map[u.uid] = {
        value: u.uid,
        label: u.displayName,
        email: u.email,
      };
    }
    return map;
  }, [allUsers]);

  const { user } = useAuth();
  if (!user) return null;

  const isHost = user?.role === 'host' ? true : false;

  const onEnterTransitionEnd = async () => {
    if (!allUsers) {
      const data = await userApi.getAllUsers();
      setAllUsers(data);
    }
  };

  const handleSelectChange = (values: string[]) => {
    const selectedPlayers = values.map((uid) => ({
      id: userOptionsMap[uid].value,
      displayName: userOptionsMap[uid].label,
    }));
    setPlayers(selectedPlayers);
  };

  const handleCreationGameSession = async () => {
    const newSession = await gameSessionApi.createGameSession(
      sessionName,
      user.uid,
      players
    );
    console.log('Your new session: ', newSession);
  };

  const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({
    option,
  }) => (
    <Group gap="sm">
      <Avatar size={36} radius="xl" name={option.label} color="initials" />
      <div>
        <Text size="sm">{option.label}</Text>
        <Text size="xs" opacity={0.5}>
          {option.email}
        </Text>
      </div>
    </Group>
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Створення гри"
        onEnterTransitionEnd={onEnterTransitionEnd}
      >
        <Modal.Body>
          <TextInput
            label="Назва ігрової сесії"
            placeholder="Введіть назву ігрової сесії"
            value={sessionName}
            onChange={(event) => setSessionName(event.currentTarget.value)}
          />
          <MultiSelect
            label="Список гравців"
            renderOption={renderMultiSelectOption}
            placeholder="Виберіть гравців"
            data={Object.values(userOptionsMap)}
            nothingFoundMessage="Користувача з таким іменем не існує, або він уже обраний"
            onChange={handleSelectChange}
            hidePickedOptions
            searchable
          ></MultiSelect>
          <Button variant="default" onClick={handleCreationGameSession}>
            Створити гру
          </Button>
        </Modal.Body>
      </Modal>

      <div>MyGamesPage</div>

      {isHost || (
        <Button variant="default" onClick={open}>
          Створити гру
        </Button>
      )}
      {user.games.length > 0 ? (
        user.games.map((gameSession) => (
          <p key={gameSession.id}>
            {gameSession.sessionName} createdAt:
            {new Date(gameSession.createdAt.seconds * 1000).toDateString()}
          </p>
        ))
      ) : (
        <p>У вас немає ігрових сесій</p>
      )}
    </>
  );
};
