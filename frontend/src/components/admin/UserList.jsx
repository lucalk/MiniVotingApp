import { useEffect, useState } from "react";
import { findAll, remove } from "../../service/user";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function UserList(){
    const [users,setUsers] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    const fetchUsers = async () => {
        try{
            const response = await findAll()
            setUsers(response)
        }catch(error){
            console.error(error.message)
        }
    }

    const handleDelete = async(id) => {
        if(!confirm("Supprimer l'utilisateur ?")) return

        try{
            const response = await remove(id)
            fetchUsers()
        }catch(error){
            alert(error.message)
        }
    }

    useEffect(()=>{
        if(token){
            fetchUsers()
        }
    },[])


    return(
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Liste des utilisateurs</h1>

            <Link to="/admin/users/create">
                <button className="p-2 px-4 bg-black rounded-[20px] mb-4 text-white">
                    Créer un nouvel utilisateur
                </button>
            </Link>

            <div className="space-y-4">
                {
                    users.map((user)=>(
                        <div
                            key={user.id}
                            // className="p-4 bg-white shadow rounded-[20px] flex justify-between items-center"
                            className={`p-4 ${user.role === "ADMIN" ? "bg-blue-300" : "bg-white"} shadow rounded-[20px] flex justify-between items-center`}
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{user.username}</h2>
                                <p className="text-sm text-gray-600">{user.email} | {user.role}</p>
                            </div>

                            {/* <div>
                                <h2 className="text-xl font-semibold">{user.email}</h2>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold">{user.role}</h2>
                            </div> */}

                            <div className="mx-4 grid grid-cols-3 gap-4">
                                <button
                                    onClick={()=>navigate(`/admin/users/profil/${user.id}`)}
                                    className="px-3 py-1 bg-gray-800 text-white rounded-[10px]"
                                    >Voir
                                </button>

                                <button
                                    onClick={()=>navigate(`/admin/users/edit/${user.id}`)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded-[10px]"
                                    >Modifier
                                </button>

                                <button
                                    onClick={()=>handleDelete(user.id)}
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