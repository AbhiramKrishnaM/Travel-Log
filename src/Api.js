function baseUrl(path) {
  return `http://localhost:4000${path}`;
}

export async function listLogEntries() {
  const response = await fetch(baseUrl("/api/logs"));
  return response.json();
}
