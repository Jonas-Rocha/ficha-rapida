import { useRef } from 'react'
import { linkWhatsApp } from '../utils/whatsapp'

interface Props {
  texto: string
  telefone: string
  onCopiado: (mensagem: string) => void
}

function podeImprimir(): boolean {
  try {
    return window.self === window.top
  } catch {
    return false
  }
}

export function ResultadoProposta({ texto, telefone, onCopiado }: Props) {
  const areaTexto = useRef<HTMLPreElement>(null)

  function selecionarTexto() {
    if (!areaTexto.current) return
    const intervalo = document.createRange()
    intervalo.selectNodeContents(areaTexto.current)
    const selecao = window.getSelection()
    selecao?.removeAllRanges()
    selecao?.addRange(intervalo)
    onCopiado('Texto selecionado: use Copiar')
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto)
      onCopiado('Proposta copiada')
    } catch {
      selecionarTexto()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <pre
        ref={areaTexto}
        className="whitespace-pre-wrap break-words rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4 font-sans text-base tabular-nums"
      >
        {texto}
      </pre>
      <div className="flex flex-wrap gap-2.5">
        <button className="botao" onClick={copiar}>
          Copiar texto
        </button>
        <a className="botao-principal" href={linkWhatsApp(telefone, texto)} target="_blank" rel="noopener">
          Enviar no WhatsApp
        </a>
        {podeImprimir() && (
          <button className="botao" onClick={() => window.print()}>
            Imprimir
          </button>
        )}
      </div>
      <p className="text-sm text-stone-500">
        O saldo restante é pago por financiamento bancário. As parcelas do financiamento dependem da análise de crédito
        do banco.
      </p>
    </div>
  )
}
