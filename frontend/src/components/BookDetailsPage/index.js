import { useLocation } from "react-router-dom";

const BookDetailsPage = () => {
  const location = useLocation();
  const { bookDetails } = location.state || {};
  return (
    <div className="container bg-yellow-50 h-screen mx-auto p-4">
      <h2 className="text-2xl font-bold">Book Details</h2>
      <div className="mt-4 bg-white h-350 rounded shadow-lg text-black-300 font-normal p-4">
        <h1 className="text-2xl font-bold mt-2">
          {bookDetails?.Title}
        </h1>
        <p className="font-bold mt-2">Description: {bookDetails?.description}</p>
        <p className="font-bold mt-2">Author: {bookDetails?.AuthorName}</p>
        <p className="font-bold mt-2">Genre: {bookDetails?.GenreType}</p>
        <p className="font-bold mt-2">No. of Pages: {bookDetails?.Pages}</p>
        <p className="font-bold mt-2">Published Date: {bookDetails?.PublishedDate}</p>
      </div>
    </div>
  );
};

export default BookDetailsPage;
