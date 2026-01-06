import { useEffect, useState } from "react";
import { update, findOne, create } from "../../service/user";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UserForm(){
    const [user,setUser] = useState({
        username: "",
        email: "",
        password: "",
        role: "USER",
    })
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)

    useEffect(()=>{
        if(isEdit){
            (
                async ()=> {
                    const response = await findOne(id)
                    setUser({
                        username: response.username ?? "",
                        email: response.email ?? "",
                        password: response.password ?? "",
                        role: response.role ?? "",
                    })
                }
            )()
        }
    },[id])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setUser({...user, [name]: type === "checkbox" ? checked : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(isEdit){
                await update(id,user)
            }else{
                await create(user)
            }
            navigate("/admin/users/allUsers")
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
                name="username"
                placeholder="Nom d'utilisateur"
                value={user.username}
                onChange={handleChange}
                className="w-full p-2 border rounded-[10px]"
                />

                <input
                name="email"
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-[10px]"
                />

                <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                className="p-2 border rounded w-full"
                value={user.password}
                onChange={handleChange}
                />

                <select
                name="role"
                value={user.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-[10px]"
                >
                    <option vlaue="USER">Utilisateur</option>
                    <option value="ADMIN">Administrateur</option>                    
                </select>

                <div className="flex justify-between items-center">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-[10px]">
                        {isEdit ? "Mettre à jour" : "Créer"}
                    </button>
                    <Link to="/admin/users/allUsers" className="px-4 py-2 bg-red-600 text-white rounded-[10px]">
                        <button>
                            Retour
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    )
}