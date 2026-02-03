type UpdateByCardGameSessionAndPlayerIdsPayload = {
  gameSessionId: string;
  playerId: string;
  investmentCardId: string;
};

type UpdateByDealIdPayload = {
  dealId: string;
};

export type StartInvestmentDealPayload =
  UpdateByCardGameSessionAndPlayerIdsPayload;

export type JoinInvestmentDealPayload =
  UpdateByCardGameSessionAndPlayerIdsPayload;

export type BuyInvestment = UpdateByCardGameSessionAndPlayerIdsPayload;

export type ConfirmParticipantNotePayload = UpdateByDealIdPayload & {
  userId: string;
  notes: string;
};

export type RemoveParticipantPayload = UpdateByDealIdPayload & {
  targetUserId: string;
};

export type ConfirmDealPayload = UpdateByDealIdPayload;

export type SetDealOwnerPayload = UpdateByDealIdPayload & {
  newOwnerId: string;
};

export type SellInvestmentPayload = UpdateByDealIdPayload;
