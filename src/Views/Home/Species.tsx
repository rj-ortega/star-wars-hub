import axios from "axios";
import { useState } from "react";

export const Species = ({ speciesUrl }: { speciesUrl: string }) => {
  const [speciesName, setSpeciesName] = useState<string>("");

  const getSpeciesName = async () => {
    try {
      const { data } = await axios.get(speciesUrl);
      setSpeciesName(data.name);
    } catch (error) {
      console.log(error);
    }
  };
  getSpeciesName();

  return <div>{speciesName}</div>;
};
