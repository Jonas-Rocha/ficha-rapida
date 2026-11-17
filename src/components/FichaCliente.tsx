import { useState } from 'react'
import type { Cliente } from '../types'
import { formatarData, formatarMoeda, lerNumero } from '../utils/formatacao'
import { linkWhatsApp } from '../utils/whatsapp'
import { ChecklistDocumentos } from './ChecklistDocumentos'
import { EtiquetaExemplo } from './EtiquetaExemplo'
import { SituacaoBadge } from './SituacaoBadge'

interface Props {
  cliente: Cliente
  onAlternarDocumento: (documento: string) => void
  onEditar: () => void
  onProposta: () => void
  onVoltar: () => void
  onApagar: () => void
}

export function FichaCliente({ cliente, onAlternarDocumento, onEditar, onProposta, onVoltar, onApagar }: Props) {
  const [confirmando, setConfirmando] = useState(false)

  const informacoes: [string, string][] = [
    ['Telefone', cliente.telefone || 'Não informado'],
    ['Imóvel', cliente.imovel || 'Não informado'],
    ['Renda', cliente.renda ? formatarMoeda(lerNumero(cliente.renda)) : 'Não informada'],
    ['Origem', cliente.origem || 'Não informada'],
    ['Cadastro', formatarData(cliente.criadoEm)],
  ]

  return (
    <section className="painel flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-titulo text-2xl font-bold">
          {cliente.nome}
          {cliente.exemplo && <EtiquetaExemplo />}
        </h2>
        <SituacaoBadge situacao={cliente.situacao} />
      </div>

      <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5">
        {informacoes.map(([rotulo, valor]) => (
          <div key={rotulo} className="contents">
            <dt className="text-stone-500">{rotulo}</dt>
            <dd className="min-w-0 break-words font-semibold">{valor}</dd>
          </div>
        ))}
        {cliente.observacoes && (
          <div className="contents">
            <dt className="text-stone-500">Observações</dt>
            <dd className="min-w-0 break-words">{cliente.observacoes}</dd>
          </div>
        )}
      </dl>

      <ChecklistDocumentos documentos={cliente.documentos} onAlternar={onAlternarDocumento} />

      <div className="flex flex-wrap gap-2.5">
        {cliente.telefone && (
          <a className="botao-principal" href={linkWhatsApp(cliente.telefone)} target="_blank" rel="noopener">
            Abrir WhatsApp
          </a>
        )}
        <button className="botao" onClick={onProposta}>
          Montar proposta
        </button>
        <button className="botao" onClick={onEditar}>
          Editar
        </button>
        <button className="botao" onClick={onVoltar}>
          Voltar
        </button>
      </div>

      {confirmando ? (
        <div className="flex flex-wrap items-center gap-2.5 rounded-lg bg-laranja-50 p-3">
          <span>
            Apagar a ficha de <b>{cliente.nome}</b>? Não dá para desfazer.
          </span>
          <button className="botao border-red-600 text-red-600" onClick={onApagar}>
            Sim, apagar
          </button>
          <button className="botao" onClick={() => setConfirmando(false)}>
            Não
          </button>
        </div>
      ) : (
        <div>
          <button className="botao border-red-600 bg-transparent text-red-600" onClick={() => setConfirmando(true)}>
            Apagar ficha
          </button>
        </div>
      )}
    </section>
  )
}
