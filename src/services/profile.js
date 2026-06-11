const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createProfile = async (profileData) => {
    try{
        const response = await fetch(`${API_URL}/api/v1/profile/create`, {
            method: "POST",
            credentials: "include",
            body: profileData
        });
        if (!response.ok) {
            throw new Error("Failed to create profile");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const getProfile = async(userID)=>{
    try{
        const response = await fetch(`${API_URL}/api/v1/profile/get/${userID}`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}