import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

function PaginationMenu({ page, setPage, total, perPage = 5 }) {
  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <div className="flex flex-row gap-x-4 pb-4">
      {page !== 1 ? (
        <div className="" onClick={decrementPage}>
          <IoIosArrowBack size={36} />
        </div>
      ) : (
        <></>
      )}
      {page !== 1 ? (
        <div
          onClick={decrementPage}
          className="border-2 border-sm rounded-md min-w-10 text-center pt-1 bg-primary"
        >
          {' '}
          {page - 1}{' '}
        </div>
      ) : (
        <></>
      )}
      <div className="border-2 border-sm rounded-md min-w-10 text-center pt-1 bg-accent">
        {' '}
        {page}{' '}
      </div>
      {page * perPage < total ? (
        <div
          onClick={incrementPage}
          className="border-2 border-sm rounded-md min-w-10 text-center pt-1 bg-primary"
        >
          {' '}
          {page + 1}{' '}
        </div>
      ) : (
        <></>
      )}
      {page * perPage < total ? (
        <div onClick={incrementPage}>
          <IoIosArrowForward size={36} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PaginationMenu;
