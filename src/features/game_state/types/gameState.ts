export type GameState = {
  id: string;
  gameSessionId: string;
  newsList: NewItem[];
};

export type GameStateStore = {
  newsList: GameState['newsList'];

  setInitial: (data: { newsList: NewItem[] }) => void;
};

type NewItem = {
  referenceCardId: string;
  appearAt: string;
};
