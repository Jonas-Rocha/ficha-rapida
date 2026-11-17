import { useState, type FormEvent } from 'react'
import { OPCOES_PARCELAS } from '../constants'
import type { Cliente, DadosProposta } from '../types'
import { hojeIso, somarDias } from '../utils/formatacao'
import { montarProposta } from '../utils/proposta'
import { ResultadoProposta } from './ResultadoProposta'

interface Props {
  clientes: Cliente[]
  clienteInicial?: string
  onGerada: (clienteId: string) => void
  onAviso: (mensagem: string) => void
}

export function FormularioProposta({ clientes, clienteInicial, onGerada, onAviso }: Props) {
  const inicial = clientes.find((c) => c.id === clienteInicial)
  const [dados, setDados] = useState<DadosProposta>({
    clienteId: clienteInicial ?? '',
    imovel: inicial?.imovel ?? '',
    valor: '',
    entrada: '',
    parcelas: 24,
    validade: somarDias(hojeIso(), 7),
  })
  const [texto, setTexto] = useState('')

  const ordenados = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  const clienteSelecionado = clientes.find((c) => c.id === dados.clienteId)

  function alterar<K extends keyof DadosProposta>(campo: K, valor: DadosProposta[K]) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
  }

  function trocarCliente(id: string) {
    const cliente = clientes.find((c) => c.id === id)
    setDados((atual) => ({ ...atual, clienteId: id, imovel: atual.imovel || cliente?.imovel || '' }))
  }

  function gerar(e: FormEvent) {
    e.preventDefault()
    if (!clienteSelecionado) {
      onAviso('Escolha o cliente')
      return
    }
    const resultado = montarProposta(clienteSelecionado, dados)
    if (resultado.erro) {
      onAviso(resultado.erro)
      return
    }
    setTexto(resultado.texto)
    onGerada(clienteSelecionado.id)
  }

  return (
    <section className="painel flex flex-col gap-5">
      <h2 className="font-titulo text-xl font-bold">Montar proposta</h2>

      <form onSubmit={gerar} className="flex flex-col gap-4" autoComplete="off">
        <label className="rotulo">
          Cliente
          <select className="campo" value={dados.clienteId} onChange={(e) => trocarCliente(e.target.value)}>
            <option value="">Escolher cliente</option>
            {ordenados.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="rotulo">
          Imóvel / unidade
          <input
            className="campo"
            value={dados.imovel}
            onChange={(e) => alterar('imovel', e.target.value)}
            placeholder="Ex.: Apto 2 quartos, 37 m², 12º andar"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="rotulo">
            Valor do imóvel (R$)
            <input
              className="campo"
              inputMode="decimal"
              value={dados.valor}
              onChange={(e) => alterar('valor', e.target.value)}
              placeholder="Ex.: 320.000"
            />
          </label>
          <label className="rotulo">
            Entrada total (R$)
            <input
              className="campo"
              inputMode="decimal"
              value={dados.entrada}
              onChange={(e) => alterar('entrada', e.target.value)}
              placeholder="Ex.: 32.000"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="rotulo">
            Entrada dividida em
            <select
              className="campo"
              value={dados.parcelas}
              onChange={(e) => alterar('parcelas', Number(e.target.value))}
            >
              {OPCOES_PARCELAS.map((n) => (
                <option key={n} value={n}>
                  {n === 1 ? 'À vista' : `${n}x`}
                </option>
              ))}
            </select>
          </label>
          <label className="rotulo">
            Proposta válida até
            <input
              type="date"
              className="campo"
              value={dados.validade}
              onChange={(e) => alterar('validade', e.target.value)}
            />
          </label>
        </div>

        <div>
          <button type="submit" className="botao-principal">
            Gerar proposta
          </button>
        </div>
      </form>

      {texto && clienteSelecionado && (
        <ResultadoProposta texto={texto} telefone={clienteSelecionado.telefone} onCopiado={onAviso} />
      )}
    </section>
  )
}
