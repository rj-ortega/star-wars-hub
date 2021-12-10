import axios from "axios";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export const Species = ({ speciesUrl }: { speciesUrl: string }) => {
  const [speciesName, setSpeciesName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getSpeciesName = async () => {
    try {
      const { data } = await axios.get(speciesUrl);
      setSpeciesName(data.name);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  getSpeciesName();

  return (
    <div>
      {loading ? <Spinner animation="border" variant="light" /> : speciesName}
    </div>
  );
};
