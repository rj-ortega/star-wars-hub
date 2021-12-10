import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Species } from "./Species";
import { People, Person } from "./types";

export const Cards = ({ people }: { people: People }) => {
  //
  const cleanName = (name: string) => {
    return name.replace(" ", "-").toLowerCase();
  };

  return (
    <>
      {Object.entries(people).map(([speciesUrl, persons]) => {
        return (
          <Container key={speciesUrl} className=" mx-5">
            <h3>
              <Species speciesUrl={speciesUrl} />
            </h3>
            <Row className="g-2 mb-5 row-cols-auto text-center">
              {persons.map((person: Person) => {
                return (
                  <Col key={person.name}>
                    <Card bg="dark" text="white" border="light">
                      <Card.Body>
                        <Card.Title>{person.name}</Card.Title>
                      </Card.Body>
                      <Card.Footer>
                        <Link to={`/details/${cleanName(person.name)}`}>
                          More details
                        </Link>
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        );
      })}
    </>
  );
};
