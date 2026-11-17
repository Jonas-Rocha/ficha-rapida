import { useCallback, useEffect, useState } from 'react'

export function useAviso(duracao = 2200) {
  const [mensagem, setMensagem] = useState<string | null>(null)

  useEffect(() => {
    if (!mensagem) return
    const timer = setTimeout(() => setMensagem(null), duracao)
    return () => clearTimeout(timer)
  }, [mensagem, duracao])

  const avisar = useCallback((texto: string) => setMensagem(texto), [])

  return { mensagem, avisar }
}
