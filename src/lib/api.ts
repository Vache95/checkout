export class Http {
  static HEADERS: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  static async get(url: string, options = {}) {
    try {
      return await request(url, "GET", options);
    } catch (e) {
      throw e;
    }
  }

  static async post(url: string, data = {}, options = {}) {
    try {
      return await request(url, "POST", data, options);
    } catch (e) {
      throw e;
    }
  }

  static async delete(url: string, options = {}) {
    try {
      return await request(url, "DELETE", options);
    } catch (e) {
      throw e;
    }
  }

  static async patch(url: string, data = {}, options = {}) {
    try {
      return await request(url, "PATCH", data, options);
    } catch (e) {
      throw e;
    }
  }
}

async function request(url: string, method: string = "GET", data?: object, options?: RequestInit) {
  const config: {
    body?: string;
    headers: HeadersInit;
    method: string;
    options?: RequestInit;
  } = {
    headers: Http.HEADERS,
    method,
    options,
  };

  if (method === "POST" || method === "PATCH") {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL || ""}${url}`, config);

    if (!response.ok) throw response;

    return await response.json();
  } catch (e: any) {
    if (e.status === 401) {
      localStorage.removeItem("token");
      // const token = await fetch refresh token
      localStorage.setItem("token", "token");
    }
    throw e;
  }
}