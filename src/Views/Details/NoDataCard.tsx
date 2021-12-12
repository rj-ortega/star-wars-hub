import { Card, Container } from "react-bootstrap";

export const NoDataCard = ({ dataProperty }: { dataProperty: string }) => {
  return (
    <Container>
      <Card>
        <Card.Body>No {dataProperty}</Card.Body>
      </Card>
    </Container>
  );
};
