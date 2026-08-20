import WithAuth from "./WithAuth";

const Usuario = () => {
    return (
        <div>
            <h1>Dados do usuário</h1>
            <h2>Nome: {localStorage.getItem('nome')}</h2>
            <h2>Email: {localStorage.getItem('usuario')}</h2>
        </div>
    );
};

export default WithAuth(Usuario);
