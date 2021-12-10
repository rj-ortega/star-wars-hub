import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Species } from "./Species";
import { People, Person } from "./types";

export const Cards = ({ people }: { people: People }) => {
  //   const pageItems = [];
  //       <Pagination.Item
  //         onClick={(e: MouseEvent<HTMLElement>) => {
  //           const element = e.target as HTMLElement;
  //           const clickedPageNumber = element.textContent;

  //           if (
  //             clickedPageNumber === null ||
  //             clickedPageNumber.includes("current")
  //           )
  //             return;

  //           setActivePage(parseInt(clickedPageNumber));
  //         }}
  //         key={number}
  //         active={number === activePage}
  //       >
  //         {number}
  //       </Pagination.Item>
  // }
  const cleanName = (name: string) => {
    return name.replace(" ", "-").toLowerCase();
  };

  return (
    <>
      {/* <Pagination size="sm">{pageItems}</Pagination> */}
      {Object.entries(people).map(([speciesUrl, persons]) => {
        return (
          <Container className="vw-100">
            <h3>
              <Species speciesUrl={speciesUrl} />
            </h3>
            <Row
              key={speciesUrl}
              className="g-2 mb-5 row-cols-auto text-center"
            >
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
