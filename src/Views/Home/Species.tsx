import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export const Species = ({ speciesUrl }: { speciesUrl: string }) => {
  const [speciesName, setSpeciesName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSpeciesName = async () => {
      try {
        const cache = window.localStorage.getItem(speciesUrl);
        let name;
        if (cache) {
          name = cache;
        } else {
          const { data } = await axios.get(speciesUrl);
          window.localStorage.setItem(speciesUrl, data.name);
          name = data.name;
        }
        setSpeciesName(name);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSpeciesName();
  }, []);

  return (
    <div>
      {loading ? <Spinner animation="border" variant="light" /> : speciesName}
    </div>
  );
};
