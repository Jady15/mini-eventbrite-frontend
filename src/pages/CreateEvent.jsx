import { useState } from 'react'
import { useForm } from "react-hook-form"
import Card from '../components/Card'
import { createEvent } from '../services/api'
import { zodResolver } from "@hookform/resolvers/zod"
import { eventSchema } from "../validations/eventSchema"

export default function CreateEvent() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      venue: "",
      imageUrl: "",
      seatMap: { type: "ga", rows: 1, cols: 1 },
      price: 0,
      isPublished: false
    }
  })
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [ok, setOk] = useState(null)

  const submit = async (data) => {
    setLoading(true); setServerError(null); setOk(null)
    try {
      const payload = { ...data, date: new Date(data.date).toISOString() }
      const res = await createEvent(payload)
      setOk(`Evento creado: ${res?.item?.title} (${res?.item?._id})`)
      reset() // limpia el formulario
    } catch (e) {
      setServerError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // const submit = async (e) => {
  //   e.preventDefault()
  //   setLoading(true); setError(null); setOk(null)
  //   try {
  //     const payload = { ...form, date: new Date(form.date).toISOString() }
  //     console.log("Este es mi payload:", payload)
  //     const res = await createEvent(payload)
  //     setOk(`Evento creado: ${res?.item?.title} (${res?.item?._id})`)
  //   } catch (e2) {
  //     setError(e2.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }


  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <h1 className="text-2xl font-semibold mb-4">Crear evento</h1>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">

          {/* Título */}
          <div>
            <label className="label">Título</label>
            <input className="input" {...register("title")} />
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label className="label">Descripción</label>
            <textarea className="input" rows={3} {...register("description")} />
            {errors.description && <p className="text-red-600">{errors.description.message}</p>}
          </div>

          {/* Fecha */}
          <div>
            <label className="label">Fecha y hora</label>
            <input type="datetime-local" className="input" {...register("date")} />
            {errors.date && <p className="text-red-600">{errors.date.message}</p>}
          </div>

          {/* Lugar e Imagen */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Lugar</label>
              <input className="input" {...register("venue")} />
              {errors.venue && <p className="text-red-600">{errors.venue.message}</p>}
            </div>
            <div>
              <label className="label">Imagen (URL)</label>
              <input className="input" {...register("imageUrl")} />
              {errors.imageUrl && <p className="text-red-600">{errors.imageUrl.message}</p>}
            </div>
          </div>

          {/* Mapa */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="label">Tipo de mapa</label>
              <select className="input" {...register("seatMap.type")}>
                <option value="ga">GA</option>
                <option value="grid">Grid</option>
              </select>
            </div>
            <div>
              <label className="label">Filas</label>
              <input type="number" className="input" {...register("seatMap.rows")} />
              {errors.seatMap?.rows && <p className="text-red-600">{errors.seatMap.rows.message}</p>}
            </div>
            <div>
              <label className="label">Columnas</label>
              <input type="number" className="input" {...register("seatMap.cols")} />
              {errors.seatMap?.cols && <p className="text-red-600">{errors.seatMap.cols.message}</p>}
            </div>
          </div>

          {/* Precio + Publicación */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="label">Precio</label>
              <input type="number" step="0.01" className="input" {...register("price")} />
              {errors.price && <p className="text-red-600">{errors.price.message}</p>}
            </div>
            <div className="flex items-center gap-2 mt-6">
              <input type="checkbox" id="pub" {...register("isPublished")} />
              <label htmlFor="pub">Publicar</label>
            </div>
          </div>

          {/* Mensajes globales */}
          {serverError && <p className="text-red-600">{serverError}</p>}
          {ok && <p className="text-green-600">{ok}</p>}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Creando..." : "Crear evento"}
          </button>
        </form>
      </Card>
    </div>
  )
}