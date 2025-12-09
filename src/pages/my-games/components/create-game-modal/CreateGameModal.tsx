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
import { useMutation } from '@tanstack/react-query';

import { gameSessionMutationOptions } from '@/features/game-session/mutation-options';
import type { ParticipantId } from '@/features/game-session/types';
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
  const [participantIds, setParticipantIds] = useState<ParticipantId[]>([]);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const userOptionsMap: UserOptionsMap = useMemo(() => {
    return allUsers ? mapUsersToOptions(allUsers) : {};
  }, [allUsers]);

  const createGameSession = useMutation(
    gameSessionMutationOptions.createGameSessionMutationOptions
  );

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
      createGameSession.mutate({
        sessionName,
        hostId: user.id,
        participantIds,
      });

      setLoadingState('success');

      setTimeout(() => {
        closeLoadingOverlay();
        close();
        setLoadingState('idle');
        setSessionName('');
        setParticipantIds([]);
        setFormErrors({});
      }, 1500);
    } catch {
      setLoadingState('idle');
      closeLoadingOverlay();
    }
  };

  const handleSelectChange = (ids: string[]) => {
    setParticipantIds(Array.from(new Set([...ids, user.id])));
    setFormErrors({ ...formErrors, players: undefined });
  };

  const validateData = () => {
    const errors: FormErrors = {};

    if (user.role !== 'host')
      errors.notHost = 'Тільки ведучий може створювати ігри';
    if (!sessionName) errors.sessionName = "Введіть ім'я ігрової сесії";
    if (participantIds.length === 1)
      errors.players = 'Додайте гравців до ігрової сесії';
    return errors;
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setParticipantIds([]);
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
          clearable
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
