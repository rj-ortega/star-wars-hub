import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import axios from "axios";
import { NoDataCard } from "./NoDataCard";

export const Vehicles = ({ vehicles }: { vehicles: string[] }) => {
  const [vehicleNames, setVehicleNames] = useState<string[]>([]);

  useEffect(() => {
    const getVehicleNames = async (vehicles: string[]) => {
      try {
        const newVehicleResponses = await Promise.all(
          vehicles.map((vehicle) => axios.get(vehicle))
        );
        const newVehicleNames = newVehicleResponses.map(
          ({ data }) => data.name
        );
        setVehicleNames(newVehicleNames);
      } catch (error) {
        console.error(`There was an error with the vehicle request: ${error}`);
      }
    };
    getVehicleNames(vehicles);
  }, []);

  const loadCards = () => {
    return vehicleNames.map((vehicle: string) => {
      return (
        <Card key={vehicle}>
          <Card.Body>{vehicle}</Card.Body>
        </Card>
      );
    });
  };
  return (
    <>
      {vehicleNames.length ? (
        loadCards()
      ) : (
        <NoDataCard dataProperty="Vehicles" />
      )}
    </>
  );
};
