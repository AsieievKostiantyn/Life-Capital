export type GameState = {
  id: string;
  gameSessionId: string;
  newsList: NewItem[];

  currentInvestment?: CurrentInvestment;
};

export type GameStateStore = {
  newsList: GameState['newsList'];
  currentInvestment?: GameState['currentInvestment'];

  setInitial: (data: {
    newsList: GameState['newsList'];
    currentInvestment?: GameState['currentInvestment'];
  }) => void;
};

type NewItem = {
  referenceCardId: string;
  appearAt: string;
};

type CurrentInvestment = {
  cardId: string;
  ownerId: string;
  isAllowedToBuy: boolean;
};
