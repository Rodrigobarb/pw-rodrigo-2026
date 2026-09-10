import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const MenuPrivado  = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="px-3">
        <NavLink className="navbar-brand" to="/">
          pw-rodrigo-2026
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/privado">
              Privado
            </NavLink>

            <NavDropdown title="Ações" id="basic-nav-dropdown">
              <NavLink className="dropdown-item" to="/privado/categoria">
                Categorias
              </NavLink>

              <NavLink className="dropdown-item" to="/privado/produto">
                Produtos
              </NavLink>

              <NavLink className="dropdown-item" to="/privado/usuario">
                Usuário
                {localStorage.getItem('usuario')}

              </NavLink>
            </NavDropdown>

            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </>
  );
};

export default MenuPrivado;