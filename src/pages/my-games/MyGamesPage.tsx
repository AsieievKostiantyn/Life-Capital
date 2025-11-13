import { useAuth } from '@/features/auth';
import { gameSessionApi } from '@/features/game-session/api';

export const MyGamesPage = () => {
  const { user } = useAuth();
  if (!user) return null;

  const isHost = user?.role === 'host' ? true : false;

  const handleClick = async () => {
    await gameSessionApi.createGameSession('New test', user.uid, []);
  };

  return (
    <>
      <div>MyGamesPage</div>
      {isHost || <button onClick={handleClick}>Create Game Session</button>}
      {user.games.length > 0 ? (
        user.games.map((gameSession) => (
          <p key={gameSession.id}>
            {gameSession.sessionName} createdAt:
            {new Date(gameSession.createdAt.nanoseconds).toDateString()}
          </p>
        ))
      ) : (
        <p>У вас немає ігрових сесій</p>
      )}
    </>
  );
};
