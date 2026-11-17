import { useState } from 'react'
import { Abas } from './components/Abas'
import { Aviso } from './components/Aviso'
import { Cabecalho } from './components/Cabecalho'
import { FichaCliente } from './components/FichaCliente'
import { FormularioCliente } from './components/FormularioCliente'
import { FormularioProposta } from './components/FormularioProposta'
import { ListaClientes } from './components/ListaClientes'
import { useAviso } from './hooks/useAviso'
import { useClientes } from './hooks/useClientes'
import type { DadosCliente, Tela } from './types'

export default function App() {
  const { clientes, adicionar, atualizar, alternarDocumento, remover } = useClientes()
  const { mensagem, avisar } = useAviso()
  const [tela, setTela] = useState<Tela>('clientes')
  const [clienteAtual, setClienteAtual] = useState<string | null>(null)
  const [editando, setEditando] = useState(false)

  const cliente = clientes.find((c) => c.id === clienteAtual)

  function irPara(destino: Tela) {
    if (destino === 'formulario') setEditando(false)
    if (destino === 'clientes') setClienteAtual(null)
    setTela(destino)
    window.scrollTo({ top: 0 })
  }

  function abrirFicha(id: string) {
    setClienteAtual(id)
    setTela('ficha')
    window.scrollTo({ top: 0 })
  }

  function salvar(dados: DadosCliente) {
    if (editando && cliente) {
      atualizar(cliente.id, dados)
      avisar('Ficha atualizada')
      abrirFicha(cliente.id)
    } else {
      const novo = adicionar(dados)
      avisar('Cliente salvo')
      abrirFicha(novo.id)
    }
    setEditando(false)
  }

  function apagar() {
    if (!cliente) return
    remover(cliente.id)
    avisar('Ficha apagada')
    irPara('clientes')
  }

  function propostaGerada(id: string) {
    const alvo = clientes.find((c) => c.id === id)
    if (alvo && (alvo.situacao === 'novo' || alvo.situacao === 'negociacao')) {
      atualizar(id, { situacao: 'proposta' })
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-12 pt-5">
      <Cabecalho />
      <Abas ativa={tela} onTrocar={irPara} />

      {tela === 'clientes' && <ListaClientes clientes={clientes} onAbrir={abrirFicha} />}

      {tela === 'ficha' && cliente && (
        <FichaCliente
          cliente={cliente}
          onAlternarDocumento={(doc) => alternarDocumento(cliente.id, doc)}
          onEditar={() => {
            setEditando(true)
            setTela('formulario')
          }}
          onProposta={() => setTela('proposta')}
          onVoltar={() => irPara('clientes')}
          onApagar={apagar}
        />
      )}

      {tela === 'formulario' && (
        <FormularioCliente
          key={editando ? cliente?.id : 'novo'}
          cliente={editando ? cliente : undefined}
          onSalvar={salvar}
          onCancelar={() => (editando && cliente ? abrirFicha(cliente.id) : irPara('clientes'))}
        />
      )}

      {tela === 'proposta' && (
        <FormularioProposta
          key={clienteAtual ?? 'sem-cliente'}
          clientes={clientes}
          clienteInicial={clienteAtual ?? undefined}
          onGerada={propostaGerada}
          onAviso={avisar}
        />
      )}

      <p className="mt-7 text-sm text-stone-500">
        Os dados ficam guardados só neste aparelho. As fichas marcadas como exemplo servem para treinar e podem ser
        apagadas.
      </p>

      <Aviso mensagem={mensagem} />
    </div>
  )
}
