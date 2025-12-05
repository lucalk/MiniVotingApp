import { useEffect, useState } from "react";
import { create, findOne, update } from "../../service/poll";
import { useNavigate, useParams } from "react-router-dom";

export default function PollForm(){
    const [form,setForm] = useState({
        title: "",
        question: "",
        description: "",
        status: "DRAFT",
        isActive: false
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)

    useEffect(()=>{
        if(isEdit){
            (
                async ()=> {
                    const response = await findOne(id)
                    setForm({
                        title: response.title ?? "",
                        question: response.question ?? "",
                        description: response.description ?? "",
                        status: response.status ?? "",
                        isActive: response.isActive ?? ""
                    })
                }
            )()
        }
    },[id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm({...form, [name]: type === "checkbox" ? checked : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(isEdit){
                console.log("LE SONDAGE : ",form)
                await update(id,form)
            }else{
                await create(form)
            }
            navigate("/admin")
        }catch(error){
            alert(error.message)
        }
    }

    return(
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-3xl text-white font-semibold mb-6">
                {isEdit ? "Modifier le sondage" : "Créer un sondage"}
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                name="title"
                placeholder="Titre"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-[10px]"
                />

                <input
                name="question"
                placeholder="question"
                value={form.question}
                onChange={handleChange}
                className="w-full p-2 border rounded-[10px]"
                />

                <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-[10px]"
                />

                <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-[10px]"
                >
                    <option value="DRAFT">DRAFT</option>
                    <option vlaue="PUBLISHED">PUBLISHED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                </select>

                <label className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    />

                    <span className="text-white">Activer le sondage</span>
                </label>

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-[10px]">
                    {isEdit ? "Mettre à jour" : "Créer"}
                </button>
            </form>
        </div>
    )
}