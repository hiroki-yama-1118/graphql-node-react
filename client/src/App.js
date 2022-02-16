import React from "react";
import Header from "./components/Header";
import { Container, Row, Col } from "reactstrap";
import SideNav from "./components/SideNav";
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row>
          <Col xs={12} sm={4}>
            <SideNav />
          </Col>
          <Col xs={12} sm={8}>
            <MovieList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
