import { useContext, useEffect, useState } from "react";
import { findAllWithOptions, vote, findAllVotes } from "../../service/poll";
import { AuthContext } from "../../context/AuthContext";

export default function Poll(){
    const [polls,setPolls] = useState([])
    const [votingId,setVotingId] = useState(null)
    const { user } = useContext(AuthContext)
    const [votes,setVotes] = useState([])
    const [move,setMove] = useState(false)

    const fetchPolls = async() => {
        try{
            const response = await findAllWithOptions()
            const validPolls = response.filter((poll) => poll.status === "PUBLISHED" && poll.isActive === true)
            setPolls(validPolls)
            return true
        }catch(error){
            alert(error.message)
        }
    }

    const fetchAllVotes= async() => {
        try{
            const response = await findAllVotes()
            setVotes(response)
        }catch(error){
            alert(error.message)
        }
    }

    useEffect(()=>{
        fetchPolls()
        fetchAllVotes()
    },[])

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const handleVote = async(optionId) => {
        try{
            setVotingId(optionId)
            await wait(500)
            await vote(optionId, user.id)
            await fetchPolls()
            setMove(!move)
        }catch(error){
            alert(error.message)
        }finally{
            setVotingId(null)
        }
    }

    useEffect(()=>{
        fetchAllVotes()
    },[move]) 

    const totalVotes = (poll) => {
        if(!poll?.options) return 0
        const result = poll.options.reduce((total, opt) => total + opt.votes, 0)
        return result
    }

    if(polls.length === 0){
        return <p className="text-3xl">Aucun sondage disponible pour le moment. 😥​</p>
    }

    return(
        <div>
            <div className="space-y-4">
                {
                    polls.map((poll)=>{
                        const total = totalVotes(poll)
                        return (
                            <div key={poll.id}
                                className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl text-white">
                                    <h1 className="text-2xl font-bold mb-2 text-center">{poll.title}</h1>
                                    <p className="text-lg mb-4 text-center">{poll.question}</p>

                                    <p className="text-sm mb-4 text-center opacity-80">
                                        Total des votes : <strong>{totalVotes(poll)}</strong>
                                    </p>

                                    {/* Les options */}
                                    <div className={`grid ${poll.options.length > 4 ? "grid-cols-4" : `grid-cols-${poll.options.length}`} gap-2 `}>
                                        {
                                            poll.options.map((option)=>{
                                                const pourcentage = total === 0 ? 0 : Math.round((option.votes / total) * 100)
                                                const hasVotedOption = votes.some(
                                                    vote=>
                                                        vote.pollId === poll.id &&
                                                        vote.optionId === option.id &&
                                                        vote.userId === user.id
                                                )
                                                const btnColor = hasVotedOption ? "bg-green-500 hover:bg-green-700" : "bg-blue-500"
                                                
                                                return (
                                                    <div
                                                    key={option.id}
                                                    className={`p-3 rounded-xl border border-white/20 bg-white/5 
                                                    ${option.isActive ? "" : "opacity-50"}`}
                                                    >
                                                        <div className="flex justify-between mb-2 text-sm">
                                                            <span className="font-medium mr-2">{option.label}</span>
                                                            <span>{option.votes} votes ({pourcentage}%)</span>
                                                        </div>

                                                        {/* Barre de progression */}
                                                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-3">
                                                            <div className="h-full bg-blue-500 transition-all" style={{width: `${pourcentage}%`}}/>
                                                        </div>

                                                        <button
                                                            disabled={votingId === option.id || !option.isActive}
                                                            onClick={()=>handleVote(option.id)}
                                                            // className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed"
                                                            className={`w-full py-2 rounded-lg ${btnColor} hover:bg-blue-700 disabled:cursor-not-allowed`}
                                                            >
                                                                {votingId === option.id ? "Vote en cours..." : "Voter"}
                                                            </button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                        )
                        
                        
                    })
                }
            </div>
        </div>
    )
}