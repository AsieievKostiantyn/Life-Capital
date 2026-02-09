import { Box, Overlay, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { DemandCard, EventCard } from '@/features/cards/components';
import { cardsQueryOptions } from '@/features/cards/query-options';
import type { CardsRow } from '@/features/cards/types/cardTypes';
import { useGameState } from '@/features/game_state/stores';

export const NewsList = () => {
  const newsList = useGameState((s) => s.newsList);
  const listOfCardIds = newsList
    .slice(-5)
    .map((newItem) => newItem.referenceCardId);

  const { data: cardList } = useQuery({
    ...cardsQueryOptions.getCardsByIdQueryOption(listOfCardIds),
  });

  const cardsOrderMap = new Map(
    listOfCardIds.reverse().map((id, index) => [id, index])
  );

  let sortedCardsRowList: CardsRow[] = [];

  if (cardList) {
    sortedCardsRowList = [...cardList].sort(
      (a, b) => (cardsOrderMap.get(a.id) ?? 0) - (cardsOrderMap.get(b.id) ?? 0)
    );
  }

  const lastCardRow = sortedCardsRowList?.at(-1);

  const isOverlayShown = sortedCardsRowList.length >= 5;

  if (newsList.length === 0)
    return <Text ta="center">Дошка новин порожня</Text>;

  return (
    <>
      <Stack>
        {sortedCardsRowList
          ?.slice(0, sortedCardsRowList.length - 1)
          .map((cardRow) => {
            if (cardRow.type === 'event')
              return <EventCard key={cardRow.id} data={cardRow.data} />;
            if (cardRow.type === 'demand')
              return <DemandCard key={cardRow.id} data={cardRow.data} />;
          })}
        <Box pos="relative">
          {lastCardRow?.type === 'event' && (
            <EventCard data={lastCardRow.data} />
          )}
          {lastCardRow?.type === 'demand' && (
            <DemandCard data={lastCardRow.data} />
          )}
          {isOverlayShown && (
            <Overlay
              gradient="linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 60%,
    var(--mantine-color-body) 140%
  )"
              blur={2}
              opacity={1}
              zIndex={10}
              style={{ pointerEvents: 'none' }}
            />
          )}
        </Box>
      </Stack>
    </>
  );
};
