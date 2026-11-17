import type { Origem, Situacao } from './types'

export const CHAVE_STORAGE = 'ficha-rapida-v2'

export const DOCUMENTOS = [
  'RG ou CNH',
  'CPF',
  'Comprovante de residência',
  'Comprovante de renda',
  'Certidão de estado civil',
  'Extrato do FGTS',
  'Carteira de trabalho',
  'Declaração de IR',
]

export const SITUACOES: Record<Situacao, string> = {
  novo: 'Novo interesse',
  negociacao: 'Em negociação',
  proposta: 'Proposta enviada',
  fechado: 'Negócio fechado',
}

export const ORIGENS: Origem[] = ['Stand / plantão', 'Indicação', 'Redes sociais', 'Captação na rua', 'Outro']

export const OPCOES_PARCELAS = [1, 6, 10, 12, 18, 24, 36]
