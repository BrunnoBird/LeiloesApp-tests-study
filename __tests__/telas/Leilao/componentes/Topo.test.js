import React from 'react';
import { render } from '@testing-library/react-native';
import Topo from '../../../../src/telas/Leilao/componentes/Topo';

jest.mock('../../../../src/negocio/formatadores/moeda.js', () => ({
  formataDecimalParaReal: jest.fn((valor) => valor),
}));

describe('telas/Leilao/componentes/Topo', () => {
  const leilao = {
    nome: 'Leilão de teste',
    descricao: 'Descrição do leilão',
    lances: [
      {
        valor: 1200,
      },
    ],
    valorInicial: 1000,
  };

  it('deve renderizar mostrando as informações de nome, descrição, melhor lance e valor inicial', async () => {
    const { getByText, getByTestId } = render(<Topo {...leilao} />);

    expect(getByText(leilao.nome)).toBeTruthy();
    expect(getByText(leilao.descricao)).toBeTruthy();
    expect(getByTestId('Melhor Lance').children).toStrictEqual(['1200']);
    expect(getByTestId('Valor Inicial').children).toStrictEqual(['1000']);
  });
});