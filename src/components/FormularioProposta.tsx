import { useState, type FormEvent, type ReactNode } from 'react'
import { OPCOES_PARCELAS } from '../constants'
import type { AnaliseProposta as Analise, Cliente, DadosProposta } from '../types'
import { hojeIso, somarDias } from '../utils/formatacao'
import { analisarProposta, textoProposta } from '../utils/proposta'
import { AnaliseProposta } from './AnaliseProposta'
import { ResultadoProposta } from './ResultadoProposta'

interface Props {
  clientes: Cliente[]
  clienteInicial?: string
  onGerada: (clienteId: string) => void
  onAviso: (mensagem: string) => void
}

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-xl border border-stone-200 p-4">
      <legend className="px-1 font-titulo text-base font-bold text-stone-600">{titulo}</legend>
      {children}
    </fieldset>
  )
}

export function FormularioProposta({ clientes, clienteInicial, onGerada, onAviso }: Props) {
  const inicial = clientes.find((c) => c.id === clienteInicial)
  const [dados, setDados] = useState<DadosProposta>({
    clienteId: clienteInicial ?? '',
    imovel: inicial?.imovel ?? '',
    valor: '',
    financiamento: '',
    parcelaFinanciamento: '',
    ato: '',
    fgts: '',
    parcelasObra: 24,
    renda: inicial?.renda ?? '',
    dividasMensais: '',
    restricaoNome: false,
    scoreBaixo: false,
    validade: somarDias(hojeIso(), 7),
  })
  const [resultado, setResultado] = useState<{ analise: Analise; texto: string } | null>(null)

  const ordenados = [...clientes].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  const clienteSelecionado = clientes.find((c) => c.id === dados.clienteId)

  function alterar<K extends keyof DadosProposta>(campo: K, valor: DadosProposta[K]) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
  }

  function trocarCliente(id: string) {
    const cliente = clientes.find((c) => c.id === id)
    setDados((atual) => ({
      ...atual,
      clienteId: id,
      imovel: atual.imovel || cliente?.imovel || '',
      renda: atual.renda || cliente?.renda || '',
    }))
  }

  function gerar(e: FormEvent) {
    e.preventDefault()
    if (!clienteSelecionado) {
      onAviso('Escolha o cliente')
      return
    }
    const analise = analisarProposta(dados)
    if (analise.valor <= 0) {
      onAviso('Informe o valor do imóvel')
      return
    }
    setResultado({ analise, texto: textoProposta(clienteSelecionado, dados, analise) })
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

        <Grupo titulo="Imóvel e financiamento">
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
              Financiamento aprovado (R$)
              <input
                className="campo"
                inputMode="decimal"
                value={dados.financiamento}
                onChange={(e) => alterar('financiamento', e.target.value)}
                placeholder="Ex.: 200.000"
              />
            </label>
          </div>
          <label className="rotulo">
            <span>
              Parcela do financiamento <small className="font-normal text-stone-500">(da simulação da Caixa, se tiver)</small>
            </span>
            <input
              className="campo"
              inputMode="decimal"
              value={dados.parcelaFinanciamento}
              onChange={(e) => alterar('parcelaFinanciamento', e.target.value)}
              placeholder="Ex.: 1.650"
            />
          </label>
        </Grupo>

        <Grupo titulo="Perfil do cliente">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="rotulo">
              Renda familiar (R$)
              <input
                className="campo"
                inputMode="decimal"
                value={dados.renda}
                onChange={(e) => alterar('renda', e.target.value)}
                placeholder="Ex.: 6.000"
              />
            </label>
            <label className="rotulo">
              <span>
                Outras dívidas por mês <small className="font-normal text-stone-500">(carro, empréstimo)</small>
              </span>
              <input
                className="campo"
                inputMode="decimal"
                value={dados.dividasMensais}
                onChange={(e) => alterar('dividasMensais', e.target.value)}
                placeholder="Ex.: 900"
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2.5 font-medium">
              <input
                type="checkbox"
                className="h-6 w-6 accent-laranja-500"
                checked={dados.restricaoNome}
                onChange={(e) => alterar('restricaoNome', e.target.checked)}
              />
              Tem restrição no nome
            </label>
            <label className="flex items-center gap-2.5 font-medium">
              <input
                type="checkbox"
                className="h-6 w-6 accent-laranja-500"
                checked={dados.scoreBaixo}
                onChange={(e) => alterar('scoreBaixo', e.target.checked)}
              />
              Score baixo no CPF
            </label>
          </div>
        </Grupo>

        <Grupo titulo="Como pagar a diferença">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="rotulo">
              Ato / entrada (R$)
              <input
                className="campo"
                inputMode="decimal"
                value={dados.ato}
                onChange={(e) => alterar('ato', e.target.value)}
                placeholder="Ex.: 20.000"
              />
            </label>
            <label className="rotulo">
              FGTS (R$)
              <input
                className="campo"
                inputMode="decimal"
                value={dados.fgts}
                onChange={(e) => alterar('fgts', e.target.value)}
                placeholder="Ex.: 30.000"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="rotulo">
              Restante parcelado na obra em
              <select
                className="campo"
                value={dados.parcelasObra}
                onChange={(e) => alterar('parcelasObra', Number(e.target.value))}
              >
                {OPCOES_PARCELAS.map((n) => (
                  <option key={n} value={n}>
                    {n === 1 ? '1x' : `${n}x`}
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
        </Grupo>

        <div>
          <button type="submit" className="botao-principal">
            Gerar proposta
          </button>
        </div>
      </form>

      {resultado && clienteSelecionado && (
        <>
          <AnaliseProposta analise={resultado.analise} />
          <ResultadoProposta texto={resultado.texto} telefone={clienteSelecionado.telefone} onCopiado={onAviso} />
        </>
      )}
    </section>
  )
}
