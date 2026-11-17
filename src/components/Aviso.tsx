export function Aviso({ mensagem }: { mensagem: string | null }) {
  if (!mensagem) return null

  return (
    <div
      role="status"
      className="fixed bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-stone-900 px-5 py-3 font-semibold text-white shadow-lg"
    >
      {mensagem}
    </div>
  )
}
