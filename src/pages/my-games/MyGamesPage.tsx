import { useMemo, useState } from 'react';

import { Check } from 'lucide-react';

import {
  Avatar,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  type MultiSelectProps,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAuth } from '@/features/auth';
import { gameSessionApi } from '@/features/game-session/api';
import type { Player } from '@/features/game-session/types';
import { userApi } from '@/features/user/api';

import type { AppUser } from '@/shared/types';

type FormErrors = {
  sessionName?: string;
  players?: string;
  notHost?: string;
};

type UserOptionsMap = Record<
  string,
  { value: string; label: string; email: string }
>;

type UserOptions = {
  value: string;
  label: string;
  email: string;
};

export const MyGamesPage = () => {
  const [
    visibleLoadingOverlay,
    { open: openLoadingOverlay, close: closeLoadingOverlay },
  ] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [allUsers, setAllUsers] = useState<AppUser[] | null>(null);
  const [sessionName, setSessionName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [loadingState, setLoadingState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

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
    setFormErrors({ ...formErrors, players: undefined });
  };

  const handleCreationGameSession = async () => {
    const errors = validateData();
    setFormErrors(errors);

    if (Object.keys(errors).length !== 0) return;

    openLoadingOverlay();
    try {
      await gameSessionApi.createGameSession(sessionName, user.uid, players);

      setLoadingState('success');

      setTimeout(() => {
        closeLoadingOverlay();
        close();
        setLoadingState('idle');
        setSessionName('');
        setPlayers([]);
        setFormErrors({});
      }, 1500);
    } catch {
      setLoadingState('idle');
      closeLoadingOverlay();
    }
  };

  const validateData = () => {
    const errors: FormErrors = {};

    if (!isHost) errors.notHost = 'Тільки ведучий можу створювати ігри';
    if (!sessionName) errors.sessionName = "Введіть ім'я ігрової сесії";
    if (players.length === 0)
      errors.players = 'Додайте гравців до ігрової сесії';
    return errors;
  };

  const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({
    option,
  }) => {
    const user = option as UserOptions;

    return (
      <Group gap="sm">
        <Avatar size={36} radius="xl" name={user.label} color="initials" />
        <div>
          <Text size="sm">{user.label}</Text>
          <Text size="xs" opacity={0.5}>
            {user.email}
          </Text>
        </div>
      </Group>
    );
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        onEnterTransitionEnd={onEnterTransitionEnd}
        withCloseButton={false}
      >
        <Modal.Header>
          <LoadingOverlay
            visible={visibleLoadingOverlay}
            loaderProps={{ children: ' ' }}
          />

          <Modal.Title>Створення гри</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay
            visible={visibleLoadingOverlay}
            loaderProps={{
              children:
                loadingState === 'success' ? (
                  <ThemeIcon size="lg" radius="xl" color="lime">
                    <Check />
                  </ThemeIcon>
                ) : (
                  ''
                ),
            }}
          />
          <TextInput
            data-autofocus
            label="Назва ігрової сесії"
            placeholder="Введіть назву ігрової сесії"
            error={formErrors.sessionName}
            value={sessionName}
            onChange={(event) => {
              setSessionName(event.currentTarget.value);
              setFormErrors({ ...formErrors, sessionName: undefined });
            }}
          />
          <MultiSelect
            label="Список гравців"
            renderOption={renderMultiSelectOption}
            placeholder="Виберіть гравців"
            data={Object.values(userOptionsMap)}
            error={formErrors.players}
            nothingFoundMessage="Користувача з таким іменем не існує, або він уже обраний"
            onChange={handleSelectChange}
            hidePickedOptions
            searchable
          ></MultiSelect>
          {formErrors.notHost && (
            <Text c="red" size="sm" mb="sm">
              {formErrors.notHost}
            </Text>
          )}
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
