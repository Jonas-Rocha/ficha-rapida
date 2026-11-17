export type Situacao = 'novo' | 'negociacao' | 'proposta' | 'fechado'

export type Origem = '' | 'Stand / plantão' | 'Indicação' | 'Redes sociais' | 'Captação na rua' | 'Outro'

export interface Cliente {
  id: string
  nome: string
  telefone: string
  situacao: Situacao
  imovel: string
  renda: string
  origem: Origem
  observacoes: string
  documentos: Record<string, boolean>
  criadoEm: string
  exemplo?: boolean
}

export type DadosCliente = Omit<Cliente, 'id' | 'documentos' | 'criadoEm' | 'exemplo'>

export interface DadosProposta {
  clienteId: string
  imovel: string
  valor: string
  entrada: string
  parcelas: number
  validade: string
}

export type Tela = 'clientes' | 'ficha' | 'formulario' | 'proposta'
