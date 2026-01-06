const baseUrl = "http://localhost:3000/polls";
const token = localStorage.getItem("token")

// Ajouter une option
export async function addOption(pollId,data){
    const response = await fetch(`${baseUrl}/${pollId}/options`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    if(!response.ok) throw new Error("Erreur lors de la création d'une option")
    return response.json()
}

// Maj d'une option
export async function updateOption(optionId,data){
    const response = await fetch(`${baseUrl}/options/${optionId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    if(!response.ok) throw new Error("Erreur lors de la modification d'une option")
    return response.json()
}

// Suppression d'une option
export async function deleteOption(optionId){
    const response = await fetch(`${baseUrl}/options/${optionId}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    if(!response.ok) throw new Error("Erreur lors de la suppréssion d'une option")
    return response.json()
}