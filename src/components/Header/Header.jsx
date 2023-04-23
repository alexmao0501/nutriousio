import {Navbar, Nav, Container}  from 'react-bootstrap';

export default function Header(){

    return(
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            Nutrious.io
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href='/enterMeal'>Enter Meal</Nav.Link>
                <Nav.Link href='/viewMeals'>View Meals</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}