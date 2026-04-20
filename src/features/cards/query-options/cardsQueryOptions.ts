import { queryOptions } from '@tanstack/react-query';

import { cardsApi } from '../api';

export const cardsQueryOptions = {
  getCardByIdQueryOption: (cardId: string) => {
    return queryOptions({
      queryKey: ['game-session-users', cardId],
      queryFn: () => cardsApi.getCardById(cardId),
    });
  },

  getCardsByIdQueryOption: (cardIds: string[]) => {
    return queryOptions({
      queryKey: ['game-session-users', cardIds],
      queryFn: () => cardsApi.getCardsById(cardIds),
    });
  },
};
