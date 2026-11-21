
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
  if (!baseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const url = `${baseUrl}${path}`;

  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();

    console.error("SERVER FETCH ERROR:", {
      url,
      status: res.status,
      response: errorText,
    });

    throw new Error(
      `API Error: ${res.status} - ${errorText}`
    );
  }

  return res.json();
};


export const serverMutation = async (path, data) => {
  try {
    if (!baseUrl) {
      throw new Error("API base URL is not configured.");
    }

    // First, send the request and get the response.
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Then check the response.
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const result = await res.json();

    return {
      ...result,
      ok: res.ok,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message || "Something went wrong!",
    };
  }
};


export const serverUpdate= async (path,data)=>{
  try {
    if(!baseUrl){
      throw new Error ("API base URL is not configured.")
    }

    const res = await fetch(`${baseUrl}${path}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    })

const result = await res.json()

if(!res.ok){
  throw new Error(result.message || "Failed to update data")
}

  return {
      ...result,
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message || "Something went wrong!",
    };
  }
};