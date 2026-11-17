import { SITUACOES } from '../constants'
import type { Situacao } from '../types'

const CORES: Record<Situacao, string> = {
  novo: 'bg-blue-100 text-blue-700',
  negociacao: 'bg-amber-100 text-amber-700',
  proposta: 'bg-laranja-100 text-laranja-600',
  fechado: 'bg-green-100 text-green-700',
}

export function SituacaoBadge({ situacao }: { situacao: Situacao }) {
  return (
    <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${CORES[situacao]}`}>
      {SITUACOES[situacao]}
    </span>
  )
}
