import type { PlayerLegendData } from '@/features/player-legend/types';

import type { CardTypes } from '@/shared/types';

export type CardsRow = {
  id: string;
  type: CardTypes;
  data: CardData;
};

export type CardData = PlayerLegendData;
