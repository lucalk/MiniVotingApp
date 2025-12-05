import { useEffect, useState } from "react";
import { findAll, findOne, vote } from "../../service/poll";

export default function PublicPoll(){
    const [poll,setPoll] = useState(null)
    const [loading,setLoading] = useState(true)
    const [votingId,setVotingId] = useState(null)
    const [error,setError] = useState("")
    
    const fetchPolls = async() => {
        setLoading(true)
        setError("")

        try{
            const polls = await findAll()
            const activePoll = polls.find((p)=>p.status === "PUBLISHED" && p.isActive === true)

            if(!activePoll){
                setPoll(null)
                setError("Aucun sondage public n'est disponible pour le moment")
                setLoading(false)
                return
            }

            const fullPoll = await findOne(activePoll.id)
            setPoll(fullPoll)
        }catch(error){
            setError("Impossible de charger le sondage")
        }finally{
            setLoading(false)
        }        
    }

    useEffect(()=>{
        fetchPolls()
    },[])

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleVote = async(optionId) => {
        try{
            setVotingId(optionId)
            await wait(500)
            await vote(optionId)
            if(poll){
                const updatePoll = await findOne(poll.id)
                setPoll(updatePoll)
            }
        }catch(error){
            alert(error.message)
        }finally{
            setVotingId(null)
        }
    }
    

    if(loading){
        return(
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black">
                <p className="text-white text-lg">Chargement du sondage...</p>
            </div>
        )
    }

    if(error){
        return(
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black">
                <p className="text-white text-lg text-center px-4">{error}</p>
            </div>
        )
    }

    if(!poll){
        return null
    }

    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0)

    return(
        <div>
            <div className="maw-w-xl w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl text-white">
                <h1 className="text-2xl font-bold mb-2 text-center">{poll.title}</h1>
                <p className="text-lg mb-4 text-center">{poll.question}</p>

                <p className="text-sm mb-4 text-center opacity-80">
                    Total des votes : <strong>{totalVotes}</strong>
                </p>

                <div className="space-y-4">
                    {
                        poll.options.map((option)=>{
                            const pourcentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100)
                            
                            return (
                                <div
                                key={option.id}
                                className={`p-3 rounded-xl border border-white/20 bg-white/5 
                                ${option.isActive ? "" : "opacity-50"}`}
                                >
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span className="font-medium">{option.label}</span>
                                        <span>{option.vote} votes ({pourcentage}%)</span>
                                    </div>

                                    {/* Barre de progression */}
                                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                                        <div className="h-full bg-blue-500 transition-all" style={{width: `${pourcentage}%`}}/>
                                    </div>

                                    <button
                                        disabled={votingId === option.id || !option.isActive}
                                        onClick={()=>handleVote(option.id)}
                                        className="w-full py-2 rounded-lg bg-blue-600 hover: bg-blue-700 disabled:cursor-not-allowed"
                                        >
                                            {votingId === option.id ? "Vote en cours..." : "Voter"}
                                        </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}