import type { AnaliseProposta as Analise, NivelAlerta } from '../types'
import { formatarMoeda, porcentagem } from '../utils/formatacao'

const ESTILO: Record<NivelAlerta, string> = {
  erro: 'border-red-200 bg-red-50 text-red-800',
  atencao: 'border-amber-200 bg-amber-50 text-amber-900',
  ok: 'border-green-200 bg-green-50 text-green-800',
}

const TITULO: Record<NivelAlerta, string> = {
  erro: 'Difícil aprovar',
  atencao: 'Precisa de atenção',
  ok: 'Parece viável',
}

export function AnaliseProposta({ analise }: { analise: Analise }) {
  const linhas: [string, string][] = [
    ['Diferença após o financiamento', formatarMoeda(analise.saldoAposFinanciamento)],
    ['Ato + FGTS', formatarMoeda(analise.ato + analise.fgts)],
    ['Falta parcelar na obra', formatarMoeda(analise.restanteObra)],
  ]

  if (analise.valorParcelaObra > 0) linhas.push(['Parcela de obra', formatarMoeda(analise.valorParcelaObra)])
  if (analise.comprometimentoRenda !== null)
    linhas.push(['Renda comprometida', porcentagem(analise.comprometimentoRenda, 1)])

  return (
    <div className={`rounded-xl border p-4 ${ESTILO[analise.situacao]}`}>
      <p className="mb-2 font-titulo text-lg font-bold">{TITULO[analise.situacao]}</p>
      <dl className="mb-3 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 tabular-nums">
        {linhas.map(([rotulo, valor]) => (
          <div key={rotulo} className="contents">
            <dt>{rotulo}</dt>
            <dd className="text-right font-semibold">{valor}</dd>
          </div>
        ))}
      </dl>
      <ul className="flex flex-col gap-1.5 text-sm">
        {analise.alertas.map((alerta) => (
          <li key={alerta.mensagem} className="flex gap-2">
            <span aria-hidden>{alerta.nivel === 'ok' ? '✓' : '!'}</span>
            <span>{alerta.mensagem}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
