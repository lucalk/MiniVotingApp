import { useContext, useEffect, useState } from "react";
import { getUser } from "../service/user";
import { findAllWithOptions } from "../service/poll";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { LuNotepadText } from "react-icons/lu";

export default function Profil(){
    const [userTarget,setUserTarget] = useState([])
    const [votes,setVotes] = useState([])
    const [polls,setPolls] = useState([])
    const [participePolls,setParticipePolls] = useState([])
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const fetchUser = async(id) => {
        try{
            const response = await getUser(id)
            setUserTarget(response.user)
            setVotes(response.votes)
        }catch(error){
            alert(error.message)
        }
    }

    const fetchPolls = async() => {
        try{
            const response = await findAllWithOptions()
            setPolls(response)
        }catch(error){
            alert(error.message)
        }
    }

    const dateFormat = (date) => {
        const newDate = new Date(date)
        const day = newDate.getUTCDate().toString().padStart(2, "0")
        const month = (newDate.getUTCMonth() + 1).toString().padStart(2, "0")
        const year = newDate.getUTCFullYear()
        const hour = newDate.getUTCHours().toString().padStart(2, "0")
        const minutes = newDate.getUTCMinutes().toString().padStart(2, "0")

        return `${day}/${month}/${year} à ${hour}h${minutes}`
    }

    const finalPolls = () => {
        const ca = []
        for(let i = 0; i<polls.length; i++){
            for(let j = 0; j<votes.length; j++){
                if(polls[i].id === votes[j].pollId){
                    for(let a = 0; a<polls[i].options.length; a++){
                        if(polls[i].options[a].id === votes[j].optionId){
                            ca.push({poll: polls[i], option: polls[i].options[a]})
                        }
                    }
                }
            }
        }
        setParticipePolls(ca)
    }

    useEffect(()=>{
        if(id){
            fetchUser(id)
        }else{
            fetchUser(user.id)
        }
        fetchPolls()
    },[])

    useEffect(() => {
        if (polls.length > 0 && votes.length > 0) {
            finalPolls()
        }
        }, [polls, votes])

    return(
        <div>
            <div className="space-y-4 mb-4">
                <div key={userTarget.id}
                className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl text-white">
                    <h1 className="text-2xl font-bold mb-2 text-center">{userTarget.username}</h1>
                    <p className="text-lg mb-4 text-center">{userTarget.email}</p>

                    <div className="grid grid-cols-2">
                        <div>
                            <p className="mt-3 text-sm text-gray-500">
                                Utilisateur depuis : <span className="font-semibold">{dateFormat(userTarget.createdAt)}</span>
                            </p>

                            <p className="text-sm text-gray-500">
                                Rôle : {userTarget.role}
                            </p> 
                        </div>

                        <div>
                            <p className="mt-3 text-sm text-gray-500">
                                Total de sondages : <span className="font-semibold">{participePolls.length}</span>
                            </p>
                        </div>
                    </div>                                  
                </div>             
            </div>

           <div className="space-y-4">
                {
                    participePolls.map((poll)=>(
                        <div
                            key={poll.poll.id}
                            className=" p-4 bg-white shadow rounded-[20px] flex justify-between items-center grid grid-cols-3"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{poll.poll.title}</h2>
                                <p className="text-sm text-gray-600">Statut : {poll.poll.status}</p>
                            </div>

                            <div>
                                <p><span className="text-gray-600">Vote</span> : <strong>{poll.option.label}</strong></p>
                            </div>

                            <div className="mx-4 grid grid-cols-3 gap-4">
                                <button
                                    onClick={()=>navigate(`/admin/${poll.poll.id}`)}
                                    className="px-3 py-1 bg-gray-800 text-white rounded-[10px] flex justify-center items-center"
                                    ><LuNotepadText />
                                </button>

                                <button
                                    onClick={()=>navigate(`/admin/edit/${poll.poll.id}`)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded-[10px] flex justify-center items-center"
                                    ><FiEdit />
                                </button>

                                <button
                                    onClick={()=>handleDelete(poll.poll.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded-[10px] flex justify-center items-center">
                                        <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>          
        </div>
    )
}