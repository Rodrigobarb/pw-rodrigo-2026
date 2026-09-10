import { useEffect, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import api from "./services/api";
import WithAuth from "./WithAuth";

const hoje = () => new Date().toISOString().substring(0, 10);

const produtoVazio = {
  codigo: null,
  nome: "",
  descricao: "",
  quantidade_estoque: 0,
  ativo: true,
  valor: 0,
  data_cadastro: hoje(),
  categoria: "",
};

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [produto, setProduto] = useState(produtoVazio);
  const [erro, setErro] = useState("");

  const carregar = async () => {
    try {
      setProdutos(await api.get("/produto"));
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
      if (produto.codigo) {
        await api.put("/produto", produto);
      } else {
        await api.post("/produto", produto);
      }
      setProduto(produtoVazio);
      await carregar();
    } catch (erroSalvar) {
      setErro(erroSalvar.message);
    }
  };

  const excluir = async (codigo) => {
    try {
      await api.delete(`/produto/${codigo}`);
      await carregar();
    } catch (erroExcluir) {
      setErro(erroExcluir.message);
    }
  };

  return (
    <div className="container mt-3">
      <h1>Produtos</h1>

      {erro && <Alert variant="danger">{erro}</Alert>}

      <Form onSubmit={salvar} className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
            maxLength={50}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={produto.descricao || ""}
            onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Quantidade em estoque</Form.Label>
          <Form.Control
            type="number"
            min={0}
            value={produto.quantidade_estoque}
            onChange={(e) =>
              setProduto({ ...produto, quantidade_estoque: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="number"
            min={0}
            step="0.01"
            value={produto.valor}
            onChange={(e) => setProduto({ ...produto, valor: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Data de cadastro</Form.Label>
          <Form.Control
            type="date"
            value={produto.data_cadastro}
            onChange={(e) => setProduto({ ...produto, data_cadastro: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            value={produto.categoria}
            onChange={(e) => setProduto({ ...produto, categoria: e.target.value })}
            required
          >
            <option value="">Selecione...</option>
            {categorias.map((item) => (
              <option key={item.codigo} value={item.codigo}>
                {item.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Check
          className="mb-2"
          type="checkbox"
          label="Ativo"
          checked={produto.ativo}
          onChange={(e) => setProduto({ ...produto, ativo: e.target.checked })}
        />

        <Button type="submit" variant="primary">
          {produto.codigo ? "Alterar" : "Incluir"}
        </Button>

        {produto.codigo && (
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => setProduto(produtoVazio)}
          >
            Cancelar
          </Button>
        )}
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Estoque</th>
            <th>Valor</th>
            <th>Ativo</th>
            <th>Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((item) => (
            <tr key={item.codigo}>
              <td>{item.codigo}</td>
              <td>{item.nome}</td>
              <td>{item.categoria_nome}</td>
              <td>{item.quantidade_estoque}</td>
              <td>{Number(item.valor).toFixed(2)}</td>
              <td>{item.ativo ? "Sim" : "Não"}</td>
              <td>{item.data_cadastro}</td>
              <td>
                <Button size="sm" onClick={() => setProduto(item)}>
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

export default WithAuth(Produtos);
