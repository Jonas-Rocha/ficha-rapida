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
  financiamento: string
  parcelaFinanciamento: string
  ato: string
  fgts: string
  parcelasObra: number
  renda: string
  dividasMensais: string
  restricaoNome: boolean
  scoreBaixo: boolean
  validade: string
}

export type NivelAlerta = 'erro' | 'atencao' | 'ok'

export interface Alerta {
  nivel: NivelAlerta
  mensagem: string
}

export interface AnaliseProposta {
  valor: number
  financiamento: number
  ato: number
  fgts: number
  saldoAposFinanciamento: number
  restanteObra: number
  valorParcelaObra: number
  comprometimentoRenda: number | null
  alertas: Alerta[]
  situacao: NivelAlerta
}

export type Tela = 'clientes' | 'ficha' | 'formulario' | 'proposta'
