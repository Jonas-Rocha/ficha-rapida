import type { Tela } from '../types'

interface Props {
  ativa: Tela
  onTrocar: (tela: Tela) => void
}

const ABAS: { tela: Tela; rotulo: string }[] = [
  { tela: 'clientes', rotulo: 'Clientes' },
  { tela: 'formulario', rotulo: '+ Novo cliente' },
  { tela: 'proposta', rotulo: 'Proposta' },
]

export function Abas({ ativa, onTrocar }: Props) {
  const selecionada = ativa === 'ficha' ? 'clientes' : ativa

  return (
    <nav className="mb-5 grid grid-cols-3 gap-2" role="tablist">
      {ABAS.map(({ tela, rotulo }) => (
        <button
          key={tela}
          role="tab"
          aria-selected={selecionada === tela}
          onClick={() => onTrocar(tela)}
          className={`rounded-xl border-2 px-2 py-3.5 text-base font-semibold transition-colors ${
            selecionada === tela
              ? 'border-laranja-500 bg-laranja-500 text-white'
              : 'border-stone-300 bg-white text-stone-900 hover:border-laranja-500'
          }`}
        >
          {rotulo}
        </button>
      ))}
    </nav>
  )
}
