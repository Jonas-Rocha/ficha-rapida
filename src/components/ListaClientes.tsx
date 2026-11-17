import { useMemo, useState } from 'react'
import { DOCUMENTOS } from '../constants'
import type { Cliente } from '../types'
import { somenteDigitos } from '../utils/formatacao'
import { EtiquetaExemplo } from './EtiquetaExemplo'
import { SituacaoBadge } from './SituacaoBadge'

interface Props {
  clientes: Cliente[]
  onAbrir: (id: string) => void
}

export function ListaClientes({ clientes, onAbrir }: Props) {
  const [busca, setBusca] = useState('')

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    const digitos = somenteDigitos(termo)
    return clientes
      .filter(
        (c) =>
          !termo ||
          c.nome.toLowerCase().includes(termo) ||
          (digitos.length > 0 && somenteDigitos(c.telefone).includes(digitos)),
      )
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  }, [clientes, busca])

  return (
    <section>
      <input
        type="search"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar cliente pelo nome ou telefone"
        aria-label="Buscar cliente"
        className="campo mb-3 bg-white text-lg"
      />

      {clientes.length === 0 && (
        <p className="py-8 text-center text-stone-500">
          Nenhum cliente cadastrado ainda.
          <br />
          Toque em <b>+ Novo cliente</b> para começar.
        </p>
      )}

      {clientes.length > 0 && filtrados.length === 0 && (
        <p className="py-8 text-center text-stone-500">Nenhum cliente encontrado com essa busca.</p>
      )}

      <ul className="flex flex-col gap-2.5">
        {filtrados.map((cliente) => {
          const entregues = DOCUMENTOS.filter((d) => cliente.documentos[d]).length
          return (
            <li key={cliente.id}>
              <button
                onClick={() => onAbrir(cliente.id)}
                className="grid w-full grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-left transition-colors hover:border-laranja-500"
              >
                <span className="min-w-0 break-words text-lg font-bold">
                  {cliente.nome}
                  {cliente.exemplo && <EtiquetaExemplo />}
                </span>
                <SituacaoBadge situacao={cliente.situacao} />
                <span className="col-span-2 min-w-0 break-words text-sm text-stone-500">
                  {cliente.telefone || 'Sem telefone'} · {cliente.imovel || 'Imóvel não informado'} · Documentos{' '}
                  {entregues}/{DOCUMENTOS.length}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
