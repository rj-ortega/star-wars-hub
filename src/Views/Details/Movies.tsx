import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { NoDataCard } from "./NoDataCard";
import ANewHope from "../../assets/a_new_hope.jpg";
import TheEmpireStrikesBack from "../../assets/the_empire_strikes_back.jpg";
import ReturnOfTheJedi from "../../assets/return_of_the_jedi.jpg";
import ThePhantomMenace from "../../assets/the_phantom_menace.jpg";
import AttackOfTheClones from "../../assets/attack_of_the_clones.jpg";
import RevengeOfTheSith from "../../assets/revenge_of_the_sith.jpg";

type MovieLookup = {
  [index: string]: string;
};

const movieLookup: MovieLookup = {
  "A New Hope": ANewHope,
  "The Empire Strikes Back": TheEmpireStrikesBack,
  "Return of the Jedi": ReturnOfTheJedi,
  "The Phantom Menace": ThePhantomMenace,
  "Attack of the Clones": AttackOfTheClones,
  "Revenge of the Sith": RevengeOfTheSith,
};

export const Movies = ({ movies }: { movies: string[] }) => {
  const [movieNames, setMovieNames] = useState<string[]>([]);

  useEffect(() => {
    const getMovieNames = async (movies: string[]) => {
      try {
        const newMovieResponses = await Promise.all(
          movies.map((movie) => axios.get(movie))
        );
        const newMovieNames = newMovieResponses.map(({ data }) => data.title);
        setMovieNames(newMovieNames);
      } catch (error) {
        console.error(`There was an error with the movie request: ${error}`);
      }
    };
    getMovieNames(movies);
  }, []);

  const loadCards = () => {
    return movieNames.map((movie: string) => {
      return (
        <Col key={movie}>
          <Card className="movie mb-3">
            <img
              src={movieLookup[movie]}
              className="img-fluid rounded-start"
              alt={movie}
            />
            <Card.Body>
              <Card.Text>{movie}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };
  return (
    <>
      {movieNames.length ? loadCards() : <NoDataCard dataProperty="Movies" />}
    </>
  );
};
