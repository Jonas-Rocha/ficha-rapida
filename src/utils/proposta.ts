import { LIMITE_COMPROMETIMENTO } from '../constants'
import type { Alerta, AnaliseProposta, Cliente, DadosProposta, NivelAlerta } from '../types'
import { formatarData, formatarMoeda, lerNumero, porcentagem } from './formatacao'

export function analisarProposta(dados: DadosProposta): AnaliseProposta {
  const valor = lerNumero(dados.valor)
  const financiamento = lerNumero(dados.financiamento)
  const ato = lerNumero(dados.ato)
  const fgts = lerNumero(dados.fgts)
  const renda = lerNumero(dados.renda)
  const dividas = lerNumero(dados.dividasMensais)
  const parcelaFinanciamento = lerNumero(dados.parcelaFinanciamento)

  const saldoAposFinanciamento = Math.max(valor - financiamento, 0)
  const restanteObra = saldoAposFinanciamento - ato - fgts
  const parcelas = Math.max(dados.parcelasObra, 1)
  const valorParcelaObra = restanteObra > 0 ? restanteObra / parcelas : 0
  const comprometimentoRenda = renda > 0 && parcelaFinanciamento > 0 ? (parcelaFinanciamento + dividas) / renda : null

  const alertas: Alerta[] = []

  if (valor <= 0) alertas.push({ nivel: 'erro', mensagem: 'Informe o valor do imóvel.' })
  if (financiamento > valor && valor > 0)
    alertas.push({ nivel: 'erro', mensagem: 'O financiamento aprovado é maior que o valor do imóvel.' })
  if (restanteObra < 0)
    alertas.push({
      nivel: 'atencao',
      mensagem: `Ato e FGTS passam do necessário em ${formatarMoeda(-restanteObra)}. Dá para diminuir o ato.`,
    })

  if (dados.restricaoNome)
    alertas.push({
      nivel: 'erro',
      mensagem: 'Com restrição no nome a Caixa costuma negar o financiamento. O ideal é regularizar antes.',
    })
  if (dados.scoreBaixo)
    alertas.push({
      nivel: 'atencao',
      mensagem: 'Score baixo pode diminuir o valor aprovado. Um ato maior ou o FGTS ajudam a compensar.',
    })

  if (comprometimentoRenda !== null && comprometimentoRenda > LIMITE_COMPROMETIMENTO)
    alertas.push({
      nivel: 'atencao',
      mensagem: `Parcela do financiamento + dívidas comprometem ${porcentagem(comprometimentoRenda, 1)} da renda (o limite costuma ser 30%). Aumentar o ato ou usar o FGTS reduz o valor financiado.`,
    })

  if (renda > 0 && valorParcelaObra > renda * LIMITE_COMPROMETIMENTO)
    alertas.push({
      nivel: 'atencao',
      mensagem: `A parcela de obra (${formatarMoeda(valorParcelaObra)}) passa de 30% da renda. Vale aumentar o número de parcelas ou o ato.`,
    })

  if (renda <= 0) alertas.push({ nivel: 'atencao', mensagem: 'Sem a renda familiar não dá para avaliar se as parcelas cabem no bolso.' })

  const situacao: NivelAlerta = alertas.some((a) => a.nivel === 'erro')
    ? 'erro'
    : alertas.some((a) => a.nivel === 'atencao')
      ? 'atencao'
      : 'ok'

  if (situacao === 'ok') alertas.push({ nivel: 'ok', mensagem: 'Pelos dados informados, a proposta parece caber no perfil do cliente.' })

  return {
    valor,
    financiamento,
    ato,
    fgts,
    saldoAposFinanciamento,
    restanteObra: Math.max(restanteObra, 0),
    valorParcelaObra,
    comprometimentoRenda,
    alertas,
    situacao,
  }
}

export function textoProposta(cliente: Cliente, dados: DadosProposta, analise: AnaliseProposta): string {
  const linhas = [
    'PRÉ-PROPOSTA DE COMPRA',
    '',
    `Cliente: ${cliente.nome}`,
    `Imóvel: ${dados.imovel.trim() || cliente.imovel || '—'}`,
    '',
    `Valor do imóvel: ${formatarMoeda(analise.valor)}`,
    `Financiamento (Caixa): ${formatarMoeda(analise.financiamento)}`,
    `Diferença a pagar: ${formatarMoeda(analise.saldoAposFinanciamento)}`,
    '',
    'Como pagar a diferença:',
    `• Ato (entrada): ${formatarMoeda(analise.ato)}`,
    `• FGTS: ${formatarMoeda(analise.fgts)}`,
  ]

  if (analise.restanteObra > 0) {
    linhas.push(
      `• Parcelas durante a obra: ${dados.parcelasObra}x de ${formatarMoeda(analise.valorParcelaObra)}`,
    )
  }

  linhas.push(
    '',
    `Proposta válida até ${formatarData(dados.validade)}.`,
    'Esboço para simulação. Os valores finais dependem da análise de crédito da Caixa e da tabela da construtora.',
  )

  return linhas.join('\n')
}
