import { useEffect, useState } from "react";
import { findAll, remove } from "../../service/poll";
import { useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { LuNotepadText } from "react-icons/lu";

export default function PollList(){
    const [polls,setPolls] = useState([])
    const navigate = useNavigate()

    const fetchPolls = async () => {
        try{
            const response = await findAll()
            setPolls(response)
        }catch(error){
            console.error(error.message)
        }
    }

    useEffect(()=>{
        fetchPolls()
    },[])

    const handleDelete = async(id) => {
        if(!confirm("Supprimer ce sondage ?")) return

        try{
            await remove(id)
            fetchPolls()
        }catch(error){
            alert(error.message)
        }
    }

    return(
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Liste des sondages</h1>

            <button 
                onClick={()=> navigate("/admin/create")}
                className="p-2 px-4 bg-black rounded-[20px] mb-4 text-white">
                    Créer un nouveau sondage
            </button>

            <div className="space-y-4">
                {
                    polls.map((poll)=>(
                        <div
                            key={poll.id}
                            className="p-4 bg-white shadow rounded-[20px] flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{poll.title}</h2>
                                <p className="text-sm text-gray-600">Statut : {poll.status}</p>
                            </div>

                            <div className="mx-4 grid grid-cols-3 gap-4">
                                <button
                                    onClick={()=>navigate(`/admin/${poll.id}`)}
                                    className="px-3 py-1 bg-gray-800 text-white rounded-[10px]"
                                    >Voir
                                </button>

                                <button
                                    onClick={()=>navigate(`/admin/edit/${poll.id}`)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded-[10px]"
                                    >Modifier
                                </button>

                                <button
                                    onClick={()=>handleDelete(poll.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded-[10px]"
                                    >Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}