import { useMemo, useState } from 'react';

import { Check } from 'lucide-react';

import {
  Button,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { gameSessionApi } from '@/features/game-session/api';
import type { Player } from '@/features/game-session/types';
import { userApi } from '@/features/user/api';

import type { AppUser } from '@/shared/types';

import { renderMultiSelectOption } from './render-user-option';
import { type UserOptionsMap, mapUsersToOptions } from './user-option';

type FormErrors = {
  sessionName?: string;
  players?: string;
  notHost?: string;
};

interface CreateGameModalProps {
  opened: boolean;
  close: () => void;
  user: AppUser;
}

export const CreateGameModal = ({
  opened,
  close,
  user,
}: CreateGameModalProps) => {
  const [
    visibleLoadingOverlay,
    { open: openLoadingOverlay, close: closeLoadingOverlay },
  ] = useDisclosure(false);
  const [allUsers, setAllUsers] = useState<AppUser[] | null>(null);
  const [loadingState, setLoadingState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [sessionName, setSessionName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const userOptionsMap: UserOptionsMap = useMemo(() => {
    return allUsers ? mapUsersToOptions(allUsers) : {};
  }, [allUsers]);

  const onEnterTransitionEnd = async () => {
    if (!allUsers) {
      const data = await userApi.getAllUsers();
      setAllUsers(data);
    }
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

  const handleSelectChange = (ids: string[]) => {
    const selectedPlayers = ids.map((uid) => ({
      id: userOptionsMap[uid].value,
      displayName: userOptionsMap[uid].label,
    }));
    setPlayers(selectedPlayers);
    setFormErrors({ ...formErrors, players: undefined });
  };

  const validateData = () => {
    const errors: FormErrors = {};

    if (user.role !== 'host')
      errors.notHost = 'Тільки ведучий може створювати ігри';
    if (!sessionName) errors.sessionName = "Введіть ім'я ігрової сесії";
    if (players.length === 0)
      errors.players = 'Додайте гравців до ігрової сесії';
    return errors;
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setPlayers([]);
        close();
        setFormErrors({});
      }}
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
          limit={10}
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
  );
};
