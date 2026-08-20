import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");

  const navigate = useNavigate();

  const isAuth = !!localStorage.getItem("usuario");

  return (
    <div>
      {!isAuth ? (
        <div>
          <h1>Usuário</h1>

          <input
            onChange={(e) => setUsuario(e.target.value)}
            value={usuario}
          />

          <button
            onClick={() => {
              localStorage.setItem("usuario", usuario);
              navigate("/privado");
            }}
          >
            Login
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem("usuario");
            navigate("/");
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;