import React from 'react';
import { render } from '@testing-library/react-native';
import Lance from '../../../../src/telas/Leilao/componentes/Lance';

//mock do formatador usado no campo de Texto para valor;
jest.mock('../../../../src/negocio/formatadores/moeda.js', () => ({
  formataDecimalParaReal: jest.fn((valor) => valor),
}));

describe('telas/Leilao/componentes/Lance', () => {
  const lance = {
    id: 1,
    valor: 1000,
  };

  it('deve renderizar mostrando as informações de ID Valor', () => {
    const { getByText } = render(<Lance {...lance}/>);

    expect(getByText('#1')).toBeTruthy();
    expect(getByText('1000')).toBeTruthy();
  });
});