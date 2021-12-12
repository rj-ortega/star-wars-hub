import { Navbar } from "react-bootstrap";
import DarthVader from "../../assets/darthVader.jpg";

export const NavBar = () => {
  return (
    <Navbar fixed="top" className="p-0">
      <Navbar.Brand href="/">
        <img
          id="darth-vader"
          className="d-none d-sm-block"
          src={DarthVader}
          alt="darth vader"
        />
      </Navbar.Brand>
      <Navbar.Text
        as="a"
        href="/"
        id="title"
        className="display-6 navbar-center"
      >
        Welcome to Star Wars Hub
      </Navbar.Text>
      <div></div>
    </Navbar>
  );
};
