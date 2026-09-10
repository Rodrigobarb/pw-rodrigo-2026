import { useEffect, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import api from "./services/api";
import WithAuth from "./WithAuth";

const categoriaVazia = { codigo: null, nome: "" };

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(categoriaVazia);
  const [erro, setErro] = useState("");

  const carregar = async () => {
    try {
      setCategorias(await api.get("/categoria"));
      setErro("");
    } catch (e) {
      setErro(e.message);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (categoria.codigo) {
        await api.put("/categoria", categoria);
      } else {
        await api.post("/categoria", { nome: categoria.nome });
      }
      setCategoria(categoriaVazia);
      await carregar();
    } catch (erroSalvar) {
      setErro(erroSalvar.message);
    }
  };

  const excluir = async (codigo) => {
    try {
      await api.delete(`/categoria/${codigo}`);
      await carregar();
    } catch (erroExcluir) {
      setErro(erroExcluir.message);
    }
  };

  return (
    <div className="container mt-3">
      <h1>Categorias</h1>

      {erro && <Alert variant="danger">{erro}</Alert>}

      <Form onSubmit={salvar} className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={categoria.nome}
            onChange={(e) => setCategoria({ ...categoria, nome: e.target.value })}
            maxLength={40}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          {categoria.codigo ? "Alterar" : "Incluir"}
        </Button>

        {categoria.codigo && (
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => setCategoria(categoriaVazia)}
          >
            Cancelar
          </Button>
        )}
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((item) => (
            <tr key={item.codigo}>
              <td>{item.codigo}</td>
              <td>{item.nome}</td>
              <td>
                <Button size="sm" onClick={() => setCategoria(item)}>
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="ms-2"
                  onClick={() => excluir(item.codigo)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WithAuth(Categorias);
