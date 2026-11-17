import type { Cliente } from '../types'
import { hojeIso } from '../utils/formatacao'

export const clientesExemplo: Cliente[] = [
  {
    id: 'ex1',
    exemplo: true,
    nome: 'Maria Souza',
    telefone: '(11) 98888-1234',
    situacao: 'negociacao',
    imovel: '2 quartos, 37 m²',
    renda: '5.800',
    origem: 'Stand / plantão',
    observacoes: 'Quer visitar o decorado no sábado de manhã.',
    documentos: { 'RG ou CNH': true, CPF: true, 'Comprovante de renda': true },
    criadoEm: hojeIso(),
  },
  {
    id: 'ex2',
    exemplo: true,
    nome: 'Carlos Lima',
    telefone: '(11) 97777-5678',
    situacao: 'novo',
    imovel: '1 quarto, 27 m²',
    renda: '3.900',
    origem: 'Indicação',
    observacoes: 'Indicado por cliente antigo. Usa FGTS na entrada.',
    documentos: {},
    criadoEm: hojeIso(),
  },
]
