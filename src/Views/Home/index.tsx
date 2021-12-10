import { ChangeEvent, useState, KeyboardEvent } from "react";
import {
  FormControl,
  InputGroup,
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import "./style.scss";
import axios from "axios";
import { Person, People } from "./types";
import { Cards } from "./Cards";
import DarthVader from "../../assets/darthVader.jpg";

const humanUrl = "https://swapi.dev/api/species/1/";

export const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [people, setPeople] = useState<People>({});
  const [activePage, setActivePage] = useState<number>(1);

  const clear = () => {
    setSearchValue("");
  };

  const search = async () => {
    try {
      const { data } = await axios.get(
        `https://swapi.dev/api/people/?search=${searchValue}&page=${activePage}`
      );
      const people = data.results.reduce((result: People, person: Person) => {
        if (person.species.length === 0) {
          result[humanUrl] = result[humanUrl] || [];
          result[humanUrl].push(person);
        }
        person.species.forEach((specie: string) => {
          result[specie] = result[specie] || [];
          result[specie].push(person);
        });
        return result;
      }, {});
      setPeople(people);
      // setPagination();
      clear();
    } catch (error) {
      console.error(`There was an error with the search request: ${error}`);
    }
  };

  return (
    <>
      <Navbar display-block fixed="top" variant="dark" className="p-0">
        <Navbar.Brand href="#home">
          <img
            id="darth-vader"
            className="d-none d-lg-block"
            src={DarthVader}
            alt="darth vader image"
          />
        </Navbar.Brand>
        <Navbar.Text id="title" className="display-6 navbar-center">
          Welcome to Star Wars Hub
        </Navbar.Text>
        <div></div>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <h1 className="display-5"></h1>
            <h4 className="text-center">
              Search for people in the Star Wars Universe
            </h4>
          </Col>
        </Row>
        <InputGroup className="mt-3 mb-3">
          <FormControl
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === "Enter") search();
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
            placeholder="Search for someone"
            size="sm"
            aria-label="Search"
            aria-describedby="inputGroup-sizing-default"
            value={searchValue}
          />
          <Button onClick={search} variant="outline-light">
            Search
          </Button>
        </InputGroup>
      </Container>
      {Object.keys(people).length ? <Cards people={people} /> : null}
    </>
  );
};
