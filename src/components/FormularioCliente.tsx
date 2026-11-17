import { useState, type FormEvent } from 'react'
import { ORIGENS, SITUACOES } from '../constants'
import type { Cliente, DadosCliente, Origem, Situacao } from '../types'

interface Props {
  cliente?: Cliente
  onSalvar: (dados: DadosCliente) => void
  onCancelar: () => void
}

const VAZIO: DadosCliente = {
  nome: '',
  telefone: '',
  situacao: 'novo',
  imovel: '',
  renda: '',
  origem: '',
  observacoes: '',
}

export function FormularioCliente({ cliente, onSalvar, onCancelar }: Props) {
  const [dados, setDados] = useState<DadosCliente>(() =>
    cliente
      ? {
          nome: cliente.nome,
          telefone: cliente.telefone,
          situacao: cliente.situacao,
          imovel: cliente.imovel,
          renda: cliente.renda,
          origem: cliente.origem,
          observacoes: cliente.observacoes,
        }
      : VAZIO,
  )
  const [erro, setErro] = useState('')

  function alterar<K extends keyof DadosCliente>(campo: K, valor: DadosCliente[K]) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
  }

  function enviar(e: FormEvent) {
    e.preventDefault()
    if (!dados.nome.trim()) {
      setErro('Escreva o nome do cliente')
      return
    }
    onSalvar({ ...dados, nome: dados.nome.trim(), telefone: dados.telefone.trim() })
  }

  return (
    <section className="painel">
      <h2 className="mb-4 font-titulo text-xl font-bold">{cliente ? 'Editar cliente' : 'Novo cliente'}</h2>

      <form onSubmit={enviar} className="flex flex-col gap-4" autoComplete="off">
        <label className="rotulo">
          Nome do cliente
          <input
            className="campo"
            value={dados.nome}
            onChange={(e) => alterar('nome', e.target.value)}
            placeholder="Ex.: Maria Souza"
            autoFocus
          />
        </label>
        {erro && <p className="-mt-2 text-sm font-semibold text-red-600">{erro}</p>}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="rotulo">
            Telefone / WhatsApp
            <input
              className="campo"
              inputMode="tel"
              value={dados.telefone}
              onChange={(e) => alterar('telefone', e.target.value)}
              placeholder="(11) 90000-0000"
            />
          </label>
          <label className="rotulo">
            Situação
            <select
              className="campo"
              value={dados.situacao}
              onChange={(e) => alterar('situacao', e.target.value as Situacao)}
            >
              {Object.entries(SITUACOES).map(([valor, rotulo]) => (
                <option key={valor} value={valor}>
                  {rotulo}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="rotulo">
          Imóvel de interesse
          <input
            className="campo"
            value={dados.imovel}
            onChange={(e) => alterar('imovel', e.target.value)}
            placeholder="Ex.: 2 quartos, 37 m², torre B"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="rotulo">
            <span>
              Renda familiar <small className="font-normal text-stone-500">(aproximada)</small>
            </span>
            <input
              className="campo"
              inputMode="decimal"
              value={dados.renda}
              onChange={(e) => alterar('renda', e.target.value)}
              placeholder="Ex.: 5.500"
            />
          </label>
          <label className="rotulo">
            Como conheceu
            <select className="campo" value={dados.origem} onChange={(e) => alterar('origem', e.target.value as Origem)}>
              <option value="">Escolher</option>
              {ORIGENS.map((origem) => (
                <option key={origem}>{origem}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="rotulo">
          Observações
          <textarea
            className="campo min-h-24 resize-y"
            value={dados.observacoes}
            onChange={(e) => alterar('observacoes', e.target.value)}
            placeholder="Ex.: prefere andar alto, quer visitar o decorado no sábado"
          />
        </label>

        <div className="flex flex-wrap gap-2.5">
          <button type="submit" className="botao-principal">
            Salvar cliente
          </button>
          <button type="button" className="botao" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  )
}
