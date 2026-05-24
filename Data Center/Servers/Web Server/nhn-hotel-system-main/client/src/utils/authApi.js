const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth";

async function request(endpoint, payload) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export function loginUser(payload) {
    return request("/login", payload);
}

export function registerUser(payload) {
    return request("/register", payload);
}
