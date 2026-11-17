import { useEffect, useState } from 'react'
import { CHAVE_STORAGE } from '../constants'
import { clientesExemplo } from '../data/exemplos'
import type { Cliente, DadosCliente } from '../types'
import { hojeIso } from '../utils/formatacao'

function carregar(): Cliente[] {
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE)
    return salvo ? (JSON.parse(salvo) as Cliente[]) : clientesExemplo
  } catch {
    return clientesExemplo
  }
}

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>(carregar)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(clientes))
    } catch {
      // modo anônimo do safari bloqueia, o app continua funcionando sem salvar
    }
  }, [clientes])

  function adicionar(dados: DadosCliente): Cliente {
    const novo: Cliente = { ...dados, id: `c${Date.now()}`, documentos: {}, criadoEm: hojeIso() }
    setClientes((atual) => [...atual, novo])
    return novo
  }

  function atualizar(id: string, dados: Partial<Cliente>) {
    setClientes((atual) => atual.map((c) => (c.id === id ? { ...c, ...dados } : c)))
  }

  function alternarDocumento(id: string, documento: string) {
    setClientes((atual) =>
      atual.map((c) =>
        c.id === id ? { ...c, documentos: { ...c.documentos, [documento]: !c.documentos[documento] } } : c,
      ),
    )
  }

  function remover(id: string) {
    setClientes((atual) => atual.filter((c) => c.id !== id))
  }

  return { clientes, adicionar, atualizar, alternarDocumento, remover }
}
