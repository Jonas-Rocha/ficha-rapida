export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function lerNumero(texto: string): number {
  const limpo = texto.trim().replace(/[R$\s]/g, '')
  if (!limpo) return 0
  const normalizado = limpo.includes(',')
    ? limpo.replace(/\./g, '').replace(',', '.')
    : limpo.replace(/\.(?=\d{3}(\D|$))/g, '')
  return Number.parseFloat(normalizado) || 0
}

export function somenteDigitos(texto: string): string {
  return texto.replace(/\D/g, '')
}

export function formatarData(iso: string): string {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

export function hojeIso(): string {
  const agora = new Date()
  agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset())
  return agora.toISOString().slice(0, 10)
}

export function somarDias(iso: string, dias: number): string {
  const data = new Date(`${iso}T12:00:00`)
  data.setDate(data.getDate() + dias)
  return data.toISOString().slice(0, 10)
}

export function porcentagem(parte: number, total: number): string {
  return `${((parte / total) * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
}
