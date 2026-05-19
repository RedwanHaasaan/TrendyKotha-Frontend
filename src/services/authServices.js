const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData)=>{
    try{
        const response = await fetch(`${API_URL}/api/v1/auth/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Failed to register user");
    }
    return data;
    }
    catch(error){
        console.error("Error registering user:", error);
        throw error;
    }
}

export const loginUser = async (credentials)=>{
    try{
        const response = await fetch(`${API_URL}/api/v1/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
    });
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || "Failed to login user");
    }
    return data;
    }
    catch(error){
        console.error("Error logging in user:", error);
        throw error;
    }
}