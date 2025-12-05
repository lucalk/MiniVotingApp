import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findOne, update } from "../../service/poll";
import OptionEditor from "./OptionEditor";

export default function PollDetail(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [poll,setPoll] = useState(null)

    const fetchPoll = async() => {
        try{
            const response = await findOne(id)
            setPoll(response)
        }catch(error){
            alert(error.message)
            navigate("/admin")
        }
    }

    useEffect(()=>{
        fetchPoll()
    },[id])

    if(!poll){
        return <div className="p-6">Chargement en cours...</div>
    }

    const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0)
    
    const toggleActive = async() => {
        try{
            await update(poll.id, {isActive: !poll.isActive})
            fetchPoll()
        }catch(error){
            alert(error.message)
        }
    }

    return(
        <div className="p-6">
            <h1 className="text-3xl font-semibold text-white">{poll.title}</h1>
            <p className="text-lg mt-2 text-white">{poll.question}</p>

            <p className="mt-3 text-sm text-gray-500">
                Statut : <span className="font-semibold">{poll.status}</span>
            </p>

            <p className="text-sm text-gray-500">
                Activé : {poll.isActive ? "Oui" : "Non"}
            </p>

            <p className="text-sm mt-2 text-white">
                Total des votes : <strong>{totalVotes}</strong>
            </p>

            <div className="flex justify-between">
                <button
                onClick={()=>navigate(`/admin/edit/${poll.id}`)}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                    Modifier
                </button>

                <button 
                onClick={toggleActive}
                className="px-4 py-2 bg-indigo-600 text-white rounded">
                    {poll.isActive ? "Désactiver" : "Actvier"}
                </button>
            </div>

            {/* Liste des options */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-white">Options</h2>
                <ul className="space-y-2">
                    {
                        poll.options.map((opt)=>(
                            <li key={opt.id} className="p-3 bg-gray-100 rounded">
                                {opt.label} - <strong>{opt.votes}</strong> votes
                            </li>
                        ))
                    }
                </ul>
            </div>

            {/* Editer des options */}
            <OptionEditor pollId={poll.id} options={poll.options} refresh={fetchPoll}/>
        </div>
    )
}