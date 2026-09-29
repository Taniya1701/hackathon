const API_URL = "http://127.0.0.1:8000";

async function request(url, options = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Something went wrong");
  }

  return response.json();
}

export async function getProducts() {
  return request("/products/");
}

export async function addProduct(product) {
  return request("/products/", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function getRequirements() {
  return request("/requirements/");
}

export async function addRequirement(requirement) {
  return request("/requirements/", {
    method: "POST",
    body: JSON.stringify(requirement),
  });
}

export async function getMatches(requirementId) {
  return request(`/matching/${requirementId}`, {
    method: "POST",
  });
}