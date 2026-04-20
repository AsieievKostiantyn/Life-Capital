import { Table } from '@mantine/core';

import type { Investment } from '../../types';

type Props = {
  investment: Investment;
};

export const InvestmentDetails = ({ investment }: Props) => {
  switch (investment.type) {
    case 'business':
      return (
        <Table withRowBorders>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th ta="center">Код</Table.Th>
              <Table.Th ta="center">Вартість</Table.Th>
              <Table.Th ta="center">Перший внесок</Table.Th>
              <Table.Th ta="center">Інвестор</Table.Th>
              <Table.Th ta="center">ПД</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td ta="center">{investment.code}</Table.Td>
              <Table.Td ta="center">{investment.cost}</Table.Td>
              <Table.Td ta="center">{investment.firstPayment}</Table.Td>
              <Table.Td ta="center">{investment.credit}</Table.Td>
              <Table.Td ta="center">{investment.passiveIncome}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      );

    case 'currency':
      return (
        <Table withRowBorders>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th ta="center">Курс</Table.Th>
              <Table.Th ta="center">Діапазон цін</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td ta="center">{investment.exchangeRate}</Table.Td>
              <Table.Td ta="center">{investment.priceRange}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      );

    case 'shares':
      return (
        <Table withRowBorders>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th ta="center">Поточна ціна</Table.Th>
              <Table.Th ta="center">Діапазон цін</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Td ta="center">{investment.currentlyPrice}</Table.Td>
              <Table.Td ta="center">{investment.priceRange}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      );
  }
};
