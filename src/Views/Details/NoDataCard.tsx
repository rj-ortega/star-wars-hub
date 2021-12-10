import { Card } from "react-bootstrap";

export const NoDataCard = ({ dataProperty }: { dataProperty: string }) => {
  return (
    <Card>
      <Card.Body>No {dataProperty}</Card.Body>
    </Card>
  );
};
