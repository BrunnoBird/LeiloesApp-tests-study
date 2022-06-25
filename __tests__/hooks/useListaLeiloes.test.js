import { renderHook, act } from '@testing-library/react-hooks';
import useListaLeiloes from '../../src/hooks/useListaLeiloes';
import { obtemLeiloes } from '../../src/repositorio/leilao';

//mockando nosso repostitório que usamos para consumir o HOOK;
jest.mock('../../src/repositorio/leilao');

//Mock de dados do retorno da chamada da api;
const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão'
  }
];

const mockLeiloesAtualizada = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão'
  },
  {
    id: 2,
    nome: 'Leilão2',
    descricao: 'Descrição do leilão2'
  }
];

describe('hooks/useListaLeiloes', () => {

  it('deve retornar uma lista de leiloes e uma função para atualizar', async () => {
    //mockando o retorno da chamada da API;
    obtemLeiloes.mockImplementation(() => mockLeiloes);

    //waitForNextUpdate -> espera até o proximo update pois nosso hook faz uma chamada na API e é asincrono
    const { result, waitForNextUpdate } = renderHook(() => useListaLeiloes());

    expect(result.current[0]).toEqual([]);
    await waitForNextUpdate(); // espera que o hook do useEffect seja chamado novamente para dar o SET ao chamar a API
    expect(result.current[0]).toEqual(mockLeiloes);
    
    obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada);
    //act -> chamamos as funções que estejam dentro de estados e useEffects sejam rodados e fiquem aguardando até terminar o processo para depois fazer algo
    await act(() => result.current[1]()); //chamando o segundo parêametro do meu useState que é o meu setState, e passamos '()' no final pois devemos chamar a função
    expect(result.current[0]).toEqual(mockLeiloesAtualizada);
  });
});