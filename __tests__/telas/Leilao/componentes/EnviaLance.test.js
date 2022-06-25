import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ENVIADO, NAO_ENVIADO } from '../../../../src/negocio/constantes/estadosLance';
import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe("telas/leilao/componentes/EnviaLance", () => {
  it("deve enviar o lance quando o botão for pressionado", async () => {
    //MOCK que a resposta sempre seja o ENVIADO;
    const enviaLance = jest.fn(() => new Promise(resolve => resolve(ENVIADO)))
    //toJSON -> serve para ver as propriedades do componente
    const {
      getByPlaceholderText,
      getByA11yHint,
      getByText
    } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor="blue"
      />
    );
    const input = getByPlaceholderText('R$');
    //usando as props de acessibilidade para pegar componentes em tela
    const botao = getByA11yHint("Enviar lance")

    fireEvent.changeText(input, "10");
    fireEvent.press(botao);

    //waitFor -> ele espera algo que ainda não ocorreu.
    await waitFor(() => {
      expect(enviaLance).toHaveBeenCalledWith("10");
      expect(getByText(ENVIADO)).toBeTruthy();
    });
    //.toThrow() -> esperar algo que pode dar errado, então verificamos que deu uma execption.
    expect(() => getByText(NAO_ENVIADO)).toThrow();
  });

  it("deve exibir o erro quando o lance não for enviado", async () => {
    const enviaLance = jest.fn(() => new Promise(resolve => resolve(NAO_ENVIADO)));

    const {
      getByPlaceholderText,
      getByA11yHint,
      getByText
    } = render(
      <EnviaLance
        enviaLance={enviaLance}
        cor="blue"
      />
    );
    const input = getByPlaceholderText("R$");
    const botao = getByA11yHint("Enviar lance");

    fireEvent.changeText(input, "10");
    fireEvent.press(botao);

    expect(enviaLance).toHaveBeenCalledWith("10");
    await waitFor(() => {
      expect(getByText(NAO_ENVIADO)).toBeTruthy();
    });
    expect(() => getByText(ENVIADO)).toThrow();
  });
});