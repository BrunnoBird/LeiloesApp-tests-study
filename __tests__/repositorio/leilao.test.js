import { obtemLeiloes, obtemLeilao } from '../../src/repositorio/leilao';
import apiLeiloes from '../../src/servicos/apiLeiloes';

//mockando de fato a API
jest.mock('../../src/servicos/apiLeiloes');

//Mock de dados do retorno da chamada da api;
const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão'
  }
];

//Criando um mock para retornar qualquer tipo que eu passar no parametro para usar em multiplos testes de chamada
const mockRequisicao = (retorno) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      //resolve -> devolve oque a promisse vair retornar quando sucesso;
      resolve({
        data: retorno
      })
    }, 200);
  });
}

//Mocka de requisição para testar erros da API
const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      //reject -> devolve oque a promisse vair retornar quando falhar;
      reject();
    }, 200);
  });
}

describe('repositorio/leilao', () => {

  /*Resetando os mocks quando cada teste ser realizado 
    beforeEach() -> função que roda sempre antes de cada teste
  */
  beforeEach(() => {
    apiLeiloes.get.mockClear(); //Limpa apenas a requisição e não limpa a implementação em si.
  });


  describe('obtemLeiloes', () => {

    it('deve retornar uma lista de leilões', async () => {
      /* Mockando a função GET de fato
        mockImplementation -> mocka a implementação do nosso método GET
      */
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));

      const leiloes = await obtemLeiloes();
      
      //para expect de objetos usamos o toEquals() e não toBe()
      expect(leiloes).toEqual(mockLeiloes);
      //Validando se os métodos foram chamados com os parâmetros corretos
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      //Valida quantas vezes a API foi chamada
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });

    it('deve retornar uma lista vazia quando a requisição de leilões falhar', async () => {
      /* Mockando a função GET de fato
        mockImplementation -> mocka a implementação do nosso método GET
      */
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

      const leiloes = await obtemLeiloes();
      
      //para expect de objetos usamos o toEquals() e não toBe()
      expect(leiloes).toEqual([]);
      //Validando se os métodos foram chamados com os parâmetros corretos
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
      //Valida quantas vezes a API foi chamada
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('obtemLeilao', () => {
    it('deve retornar um leilão', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes[0]));

      const leilao = await obtemLeilao(1);
      expect(leilao).toEqual(mockLeiloes[0]);
    });

    it('deve retornar um objeto vazio caso erro na requisição', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());

      const leilao = await obtemLeilao(1);
      expect(leilao).toEqual({});
    })
  });
})