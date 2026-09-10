import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const isAuth = !!localStorage.getItem("usuario");

  const entrar = async (e) => {
    e.preventDefault();
    try {
      const usuario = await api.post("/usuario/login", { email, senha });
      localStorage.setItem("usuario", usuario.email);
      localStorage.setItem("nome", usuario.nome);
      localStorage.setItem("tipo", usuario.tipo);
      navigate("/privado");
    } catch (erroLogin) {
      setErro(erroLogin.message);
    }
  };

  const sair = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("nome");
    localStorage.removeItem("tipo");
    navigate("/");
  };

  return (
    <div className="container mt-3">
      {!isAuth ? (
        <div>
          <h1>Login</h1>

          {erro && <Alert variant="danger">{erro}</Alert>}

          <Form onSubmit={entrar}>
            <Form.Group className="mb-2">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Entrar
            </Button>
          </Form>
        </div>
      ) : (
        <Button variant="secondary" onClick={sair}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Login;
