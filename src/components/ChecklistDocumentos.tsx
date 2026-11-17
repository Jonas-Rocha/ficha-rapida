import { DOCUMENTOS } from '../constants'

interface Props {
  documentos: Record<string, boolean>
  onAlternar: (documento: string) => void
}

export function ChecklistDocumentos({ documentos, onAlternar }: Props) {
  const entregues = DOCUMENTOS.filter((d) => documentos[d]).length
  const progresso = Math.round((entregues / DOCUMENTOS.length) * 100)

  return (
    <div>
      <h3 className="text-lg font-bold">
        Documentos entregues: {entregues} de {DOCUMENTOS.length}
      </h3>
      <div className="mb-3 mt-1.5 h-2.5 overflow-hidden rounded-full bg-stone-200">
        <div className="h-full rounded-full bg-green-600 transition-all" style={{ width: `${progresso}%` }} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {DOCUMENTOS.map((doc) => (
          <label
            key={doc}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-2.5 font-medium"
          >
            <input
              type="checkbox"
              checked={!!documentos[doc]}
              onChange={() => onAlternar(doc)}
              className="h-6 w-6 shrink-0 accent-green-600"
            />
            {doc}
          </label>
        ))}
      </div>
    </div>
  )
}
