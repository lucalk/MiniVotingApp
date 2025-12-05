import { useEffect, useState } from "react";
import { addOption, updateOption, deleteOption } from "../../service/options";
import { findOne } from "../../service/poll";

export default function OptionEditor({pollId, options, refresh}){
    const [label,setLabel] = useState("")
    const [editingId,setEditingId] = useState(null)
    const [editingLabel,setEditingLabel] = useState("")

    const handleAdd = async() => {
        if(!label.trim()){
            return alert("Veuillez entrer un nom d'option.")
        }
        try{
            await addOption(pollId, {label})
            setLabel("")
            refresh()
        }catch(error){
            alert(error.message)
        }
    }

    const handleUpdate = async(optionId) => {
        if(!editingLabel.trim()){
            return alert("Le nom ne peut pas être vide.")
        }
        try{
            await updateOption(optionId, {label: editingLabel})
            setEditingId(null)
            refresh()
        }catch(error){
            alert(error.message)
        }
    }

    const handleToggle = async(option) => {
        try{
            await updateOption(option.id, {isActive: !option.isActive})
            refresh()
        }catch(error){
            alert(error.message)
        }
    }

    const handleDelete = async(optionId) => {
        if(!confirm("Supprimer cette option ?")){
            return
        }
        try{
            await deleteOption(optionId)
            refresh()
        }catch(error){
            alert(error.message)
        }
    }

    return(
        <div className="mt-8 p-4 bg-gray-50 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Options du sondage</h2>

            {/* Ajouter une option */}
            <div className="flex space-x-2 mb-4">
                <input  
                    type="text"
                    placeholder="Nouvelle option"
                    value={label}
                    onChange={(e)=>setLabel(e.target.value)}
                    className="flex-1 p-2 border rounded"    
                />

                <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Ajouter
                </button>
            </div>

            {/* Liste des options */}
            <div className="space-y-3">
                {
                    options.map((option)=>(
                        <div key={option.id}
                            className={`p-3 rounded border flex justify-between items-center
                            ${option.isActive ? "bg-white" : "bg-gray-200 opacity-70"}`}
                        >
                            <div className="flex-1 px-3">
                                {
                                    editingId === option.id ? (
                                        <input
                                            value={editingLabel}
                                            onChange={(e)=>setEditingLabel(e.target.value)}
                                            className="w-full p-1 border rounded"
                                        />                      
                                    ) : (
                                        <span className="font-medium">{option.label}</span>
                                    )
                                }
                            </div>

                            <div className="space-x-2">
                                {
                                    editingId === option.id ? (
                                        <button
                                        onClick={()=>handleUpdate(option.id)}
                                        className="px-3 py-1 bg-green-600 text-white rounded"
                                        >
                                            Enregistrer
                                        </button>
                                    ) : (
                                        <button
                                        onClick={()=>{
                                            setEditingId(option.id)
                                            setEditingLabel(option.label)
                                        }}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                                        >
                                            Modifier
                                        </button>
                                    )
                                }

                                <button
                                onClick={()=>handleToggle(option)}
                                className="px-3 py-1 bg-indigo-600 text-white rounded"
                                >
                                    {option.isActive ? "Désactiver" : "Activer"}
                                </button>

                                <button
                                onClick={()=>handleDelete(option.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}