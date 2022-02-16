import React from "react";
import { Navbar, NavBarBrand } from "reactstrap";

function Header() {
  return (
    <Navbar color="primary" dark className="mb-4">
      <NavBarBrand href="/">Movie list</NavBarBrand>
    </Navbar>
  );
}

export default Header;
