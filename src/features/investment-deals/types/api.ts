export type StartInvestmentDealPayload = {
  gameSessionId: string;
  playerId: string;
  investmentCardId: string;
};

export type JoinInvestmentDealPayload = {
  gameSessionId: string;
  playerId: string;
  investmentCardId: string;
};

export type BuyInvestment = {
  gameSessionId: string;
  playerId: string;
  investmentCardId: string;
};
