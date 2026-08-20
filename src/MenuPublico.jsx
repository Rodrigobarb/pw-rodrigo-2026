import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const MenuPublico  = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <NavLink className="navbar-brand" to="/">
          Rotas com react-router
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/publico">
              Público
            </NavLink>

            <NavDropdown title="Ações" id="basic-nav-dropdown">
              <NavLink className="dropdown-item" to="/usuario">
                Usuário
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

export default MenuPublico;