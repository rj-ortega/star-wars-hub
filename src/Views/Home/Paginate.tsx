import { FC } from "react";
import { Pagination } from "react-bootstrap";

type PaginateProps = {
  activePage: number;
  previousPage: number | null;
  nextPage: number | null;
  searchPage: Function;
};

export const PaginatePeople: FC<PaginateProps> = ({
  activePage,
  previousPage,
  nextPage,
  searchPage,
}) => {
  return (
    <Pagination className="justify-content-center mb-0">
      <Pagination.Prev
        disabled={previousPage ? false : true}
        onClick={() => searchPage(activePage - 1)}
      />
      <Pagination.Item key={activePage} active>
        {activePage}
      </Pagination.Item>
      <Pagination.Next
        disabled={nextPage ? false : true}
        onClick={() => searchPage(activePage + 1)}
      />
    </Pagination>
  );
};
