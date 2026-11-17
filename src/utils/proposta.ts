import type { Cliente, DadosProposta } from '../types'
import { formatarData, formatarMoeda, lerNumero, porcentagem } from './formatacao'

export interface ResultadoProposta {
  texto: string
  erro?: string
}

export function montarProposta(cliente: Cliente, dados: DadosProposta): ResultadoProposta {
  const valor = lerNumero(dados.valor)
  const entrada = lerNumero(dados.entrada)

  if (valor <= 0) return { texto: '', erro: 'Informe o valor do imóvel' }
  if (entrada < 0 || entrada > valor) return { texto: '', erro: 'A entrada precisa ser menor que o valor do imóvel' }

  const saldo = valor - entrada
  const linhaEntrada =
    dados.parcelas > 1
      ? `Entrada: ${formatarMoeda(entrada)} (${porcentagem(entrada, valor)})\n   em ${dados.parcelas}x de ${formatarMoeda(entrada / dados.parcelas)}`
      : `Entrada: ${formatarMoeda(entrada)} (${porcentagem(entrada, valor)}) à vista`

  const linhas = [
    'PROPOSTA DE COMPRA',
    '',
    `Cliente: ${cliente.nome}`,
    `Imóvel: ${dados.imovel.trim() || cliente.imovel || '—'}`,
    '',
    `Valor do imóvel: ${formatarMoeda(valor)}`,
    linhaEntrada,
    `Saldo a financiar: ${formatarMoeda(saldo)} (${porcentagem(saldo, valor)})`,
    '',
    `Proposta válida até ${formatarData(dados.validade)}.`,
    'Valores sujeitos à aprovação de crédito e à tabela vigente.',
  ]

  return { texto: linhas.join('\n') }
}
