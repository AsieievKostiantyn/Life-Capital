import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAuth } from '@/features/auth';

import { CreateGameModal } from './components';

export const MyGamesPage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { user } = useAuth();
  if (!user) return null;

  return (
    <>
      <CreateGameModal user={user} opened={opened} close={close} />

      <div>MyGamesPage</div>

      {user.role === 'host' || (
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
