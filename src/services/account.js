const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const requestDeleteAccount = async (password) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/account/request-delete`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  } catch (err) {
    throw err;
  }
};

export const cancelDeleteAccount = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/account/cancel-delete`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  } catch (err) {
    throw err;
  }
};
