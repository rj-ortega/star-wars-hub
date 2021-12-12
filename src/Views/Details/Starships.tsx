import { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import axios from "axios";
import { NoDataCard } from "./NoDataCard";

export const Starships = ({ starships }: { starships: string[] }) => {
  const [starshipNames, setStarshipNames] = useState<string[]>([]);

  useEffect(() => {
    const getStarshipNames = async (starships: string[]) => {
      try {
        const newStarshipResponses = await Promise.all(
          starships.map((starship) => axios.get(starship))
        );
        const newStarshipNames = newStarshipResponses.map(
          ({ data }) => data.name
        );
        setStarshipNames(newStarshipNames);
      } catch (error) {
        console.error(`There was an error with the starship request: ${error}`);
      }
    };
    getStarshipNames(starships);
  }, []);
  const loadCards = () => {
    return starshipNames.map((starship: string) => {
      return <ListGroup.Item key={starship}>{starship}</ListGroup.Item>;
    });
  };
  return (
    <Card>
      <ListGroup>
        {starshipNames.length ? (
          loadCards()
        ) : (
          <ListGroup.Item>No Starships</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
};
