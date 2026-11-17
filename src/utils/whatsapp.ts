import { somenteDigitos } from './formatacao'

export function linkWhatsApp(telefone: string, mensagem?: string): string {
  const numero = somenteDigitos(telefone)
  const comDdi = numero && numero.length <= 11 ? `55${numero}` : numero
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''
  return `https://wa.me/${comDdi}${texto}`
}
