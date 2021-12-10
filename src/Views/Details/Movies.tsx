import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import { NoDataCard } from "./NoDataCard";

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
    console.log(movieNames);
    return movieNames.map((movie: string) => {
      return (
        <Card key={movie}>
          <Card.Body>{movie}</Card.Body>
        </Card>
      );
    });
  };
  console.log(movies);
  return (
    <>
      {movieNames.length ? loadCards() : <NoDataCard dataProperty="Movies" />}
    </>
  );
};
