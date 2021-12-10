import { ChangeEvent, useState, KeyboardEvent } from "react";
import {
  FormControl,
  InputGroup,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./style.scss";
import axios from "axios";
import { Person, People } from "./types";
import { Cards } from "./Cards";
import { PaginatePeople } from "./Paginate";
import { NavBar } from "../Shared/NavBar";

const humanUrl = "https://swapi.dev/api/species/1/";

export const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [people, setPeople] = useState<People>({});
  const [activePage, setActivePage] = useState<number>(1);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [nextPage, setNextPage] = useState<number | null>(2);

  const clear = () => {
    setSearchValue("");
  };

  const cleanPage = (page: string | null) => {
    return page ? parseInt(page.split("page=")[1]) : null;
  };

  const reset = () => {
    setPeople({});
  };

  const searchPage = (page: number) => {
    setActivePage(page);
    search(page);
  };

  const search = async (page: number | null = null) => {
    try {
      const { data } = await axios.get(
        `https://swapi.dev/api/people/?search=${searchValue}&page=${page ?? 1}`
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
      setPreviousPage(cleanPage(data.previous));
      setNextPage(cleanPage(data.next));
      clear();
    } catch (error) {
      console.error(`There was an error with the search request: ${error}`);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <Container className="min-vw-100">
        <Row>
          <Col>
            <h4 className="text-center mt-4">
              Search for people in the Star Wars Universe
            </h4>
          </Col>
        </Row>
        <InputGroup className="mt-3 mb-3 justify-content-center">
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
          <Button onClick={() => search()} variant="outline-light">
            Search
          </Button>
        </InputGroup>
        <Container fluid className="d-flex justify-content-center my-4">
          <Button
            onClick={() => search()}
            variant="outline-light"
            className="me-3"
          >
            Browse Characters
          </Button>
          <Button onClick={reset} variant="outline-light">
            Reset
          </Button>
        </Container>
      </Container>

      {Object.keys(people).length > 1 ? (
        <PaginatePeople
          activePage={activePage}
          previousPage={previousPage}
          nextPage={nextPage}
          searchPage={searchPage}
        />
      ) : null}
      {Object.keys(people).length ? <Cards people={people} /> : null}
    </>
  );
};
