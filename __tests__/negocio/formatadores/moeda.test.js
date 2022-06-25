import { formataBrasileiroParaDecimal, formataDecimalParaReal } from '../../../src/negocio/formatadores/moeda';

describe('negocio/formatadores/moeda', () => {

  describe('formataBrasileiroParaDecimal', () => {
    it("deve retornar 8.59 quando o valor for '8,59'", () => {
      const resultado = formataBrasileiroParaDecimal("8,59");
      expect(resultado).toBe(8.59);
    });
  });

  describe('formataDecimalParaReal', () => {
    it("deve retornar R$ 8,59 quando o valor for 8.59", () => {
      const result = formataDecimalParaReal(8.59);
      //usamos toMath quando usamos regex. Regex para validar o espaço em branco: "\s". "\" para dar o scape no $.
      expect(result).toMatch(/R\$\s8,59/);
    });
  });
});