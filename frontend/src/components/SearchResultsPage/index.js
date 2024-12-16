import { Component } from "react";
import { Link } from "react-router-dom";
import withLocation from "../withLocation";

class SearchResultsPage extends Component {
  onDeleteBookBtn = async (bookId) => {
    console.log(bookId);
    const url = `http://localhost:5000/books/${bookId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const updatedSearchDetails =
          this.props.location.state.searchDetails.filter(
            (book) => book.BookID !== bookId
          );
        this.setState({ searchDetails: updatedSearchDetails });
        alert("Book deleted successfully!");
      } else {
        throw new Error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
      alert("An error occurred while deleting the book.");
    }
  };

  onEditBookBtn = async (bookId) => {
    const url = `http://localhost:5000/books/${bookId}`;
    const {title} = this.state
    const formData = {
      title
    }
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const updatedSearchDetails =
          this.props.location.state.searchDetails.filter(
            (book) => book.BookID === bookId
          );
        this.setState({ searchDetails: updatedSearchDetails });
        alert("Book Updated successfully!");
      } else {
        throw new Error("Failed to update the book");
      }
    } catch (error) {
      console.error("Error updating the book:", error);
      alert("An error occurred while updating the book.");
    }

  };
  render() {
    const searchDetails =
      this.props.location.state && this.props.location.state.searchDetails
        ? this.props.location.state.searchDetails
        : [];
    console.log("Received searchDetails:", searchDetails);

    return (
      <div className="container bg-yellow-50 mx-auto p-4 h-screen">
        <h2 className="text-2xl font-bold">Search Results</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-4">
          {searchDetails.length > 0 ? (
            searchDetails.map((book) => (
              <div
                key={book.BookID}
                className="bg-white p-4 border rounded h-350"
              >
                <h3 className="font-bold">{book.Title}</h3>
                <p className="font-semibold">Author: {book.AuthorName}</p>
                <p className="font-semibold">Genre: {book.GenreType}</p>
                <div className="flex justify-center gap-6 mt-4">
                  <Link
                    to={`/book/${book.BookID}`}
                    state={{ bookDetails: book }}
                  >
                    <button className="bg-blue-500 text-white p-2 rounded">
                      View
                    </button>
                  </Link>

                  <button
                    className="bg-yellow-500 text-white p-2 rounded"
                    onClick={() => this.onEditBookBtn(book.BookID)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => this.onDeleteBookBtn(book.BookID)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No search results found.</p>
          )}
        </div>
      </div>
    );
  }
}

export default withLocation(SearchResultsPage);
