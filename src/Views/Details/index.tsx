import { useLocation } from "react-router";
import { NavBar } from "../Shared/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { DetailedPerson } from "../Home/types";
import { Movies } from "./Movies";
import { Starships } from "./Starships";
import { Vehicles } from "./Vehicles";

export const Details = () => {
  const [person, setPerson] = useState<DetailedPerson>();
  const [homeworldName, setHomeworldName] = useState<string>("");
  const personUrl = useLocation();

  useEffect(() => {
    const getPerson = async () => {
      try {
        const { data } = await axios.get(personUrl.state);
        setPerson(data);
      } catch (error) {
        console.error(`There was an error with the person request: ${error}`);
      }
    };
    getPerson();
  }, []);

  useEffect(() => {
    const getHomeworld = async (hw: string) => {
      try {
        const { data } = await axios.get(hw);
        setHomeworldName(data.name);
      } catch (error) {
        console.error(
          `There was an error with the homeworld request: ${error}`
        );
      }
    };

    if (person) {
      getHomeworld(person.homeworld);
    }
  }, []);
  return (
    <>
      <NavBar></NavBar>
      {person ? (
        <Container className="min-vw-100 justify-content-center">
          <Container>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">{person.name}</Card.Title>
              </Card.Body>
            </Card>
          </Container>
          <Container>
            <h3>Details</h3>
            <Card>
              <ListGroup>
                <ListGroup.Item>Height: {person.height}</ListGroup.Item>
                <ListGroup.Item>Mass: {person.mass}</ListGroup.Item>
                <ListGroup.Item>Birth Year: {person.birth_year}</ListGroup.Item>
                <ListGroup.Item>Gender: {person.gender}</ListGroup.Item>
                <ListGroup.Item>Homeworld: {homeworldName}</ListGroup.Item>
                <ListGroup.Item>Hair Color: {person.hair_color}</ListGroup.Item>
                <ListGroup.Item>Skin Color: {person.skin_color}</ListGroup.Item>
                <ListGroup.Item>Eye Color: {person.eye_color}</ListGroup.Item>
              </ListGroup>
            </Card>
            <h3>Movies</h3>
            <Movies movies={person.films} />
            <h3>Starships</h3>
            <Starships starships={person.starships} />
            <h3>Vehicles</h3>
            <Vehicles vehicles={person.vehicles} />
          </Container>
        </Container>
      ) : null}
    </>
  );
};
