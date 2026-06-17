export const createPost = async (postData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/create`, {
    method: "POST",
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(postData),
  });

  return await response.json();
};
