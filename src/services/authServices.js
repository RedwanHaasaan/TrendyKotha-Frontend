const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw data.message || "Failed to login user";
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  const response = await fetch(
    `${API_URL}/api/v1/profile/me`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
};

// services/authServices.js

export const logoutUser = async () => {
  const response = await fetch(
    `${API_URL}/api/v1/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
};