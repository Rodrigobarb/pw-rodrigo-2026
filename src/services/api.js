// Acesso a API (Frameworks & Drivers do frontend).
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const requisicao = async (caminho, opcoes = {}) => {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });

  const corpo = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(corpo && corpo.msg ? corpo.msg : "Erro ao acessar a API");
  }

  return corpo;
};

export const api = {
  get: (caminho) => requisicao(caminho),
  post: (caminho, dados) =>
    requisicao(caminho, { method: "POST", body: JSON.stringify(dados) }),
  put: (caminho, dados) =>
    requisicao(caminho, { method: "PUT", body: JSON.stringify(dados) }),
  delete: (caminho) => requisicao(caminho, { method: "DELETE" }),
};

export default api;
