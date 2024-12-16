import { Component } from "react";
import { Link } from "react-router-dom";
import withNavigation from "../withNavigation";

class HomePage extends Component {
  state = {
    title: "",
    genre: "",
    author: "",
    initialAllBooksList: [],
    searchDetails: [],
  };

  componentDidMount() {
    this.getAllBooksList();
  }

  getAllBooksList = async () => {
    const url = `http://localhost:5000/books/`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        this.setState({ initialAllBooksList: data });
        console.log(data)
      } else {
        console.log(`Failed to fetch: ${response.status}`);
      }
    } catch (error) {
      console.log(`Error occurred: ${error}`);
    }
  };

  onChangeBookTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeGenre = (event) => {
    this.setState({ genre: event.target.value });
  };

  onChangeAuthor = (event) => {
    this.setState({ author: event.target.value });
  };

  onSearchBtn = (event) => {
    event.preventDefault();

    const { initialAllBooksList, author, genre, title } = this.state;
    console.log(typeof author);

    const filteredList = initialAllBooksList.filter((eachItem) => {
      const matchesAuthor = author
        ? eachItem.AuthorName.toLowerCase().includes(author.toLowerCase())
        : true;
      const matchesGenre = genre ? eachItem.GenreType.includes(genre) : true;
      const matchesTitle = title
        ? eachItem.Title.toLowerCase().includes(title.toLowerCase())
        : true;

      return matchesAuthor && matchesGenre && matchesTitle;
    });

    this.setState(
      {
        searchDetails: filteredList,
        author: "",
        genre: "",
        title: "",
      },
      () => {
        this.props.navigate("/search-results", {
          state: { searchDetails: filteredList, initialAllBooksList: initialAllBooksList },
        });
      }
    );
    console.log(filteredList)
  };

  render() {
    const { title, genre, author, initialAllBooksList } = this.state;

    return (
      <>
        <div className="mx-auto p-4 bg-yellow-50">
          <nav className="bg-orange-100 p-3 text-blue-400 font-semibold flex justify-between fixed top-0 left-0 w-full shadow-md z-50">
            <a href="/">
              <img
                src="https://res.cloudinary.com/dkatpw0jt/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1734243149/book_logo_wdrkms.jpg"
                alt="Book Management Logo"
                className="h-8 w-8"
              />
            </a>

            <ul className="flex space-x-12">
              <li>
                <a href="/" className="hover:text-gray-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-500">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-500">
                  Contact
                </a>
              </li>
              <li>
                <Link to="/add-book" state={{initialAllBooksList: initialAllBooksList}} className="hover:text-gray-500">
                  Add Book
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="home" className="mx-auto p-4 bg-yellow-50">
          <form
            className="mt-12 flex flex-col justify-center"
            onSubmit={this.onSearchBtn}
          >
            <h1 className="text-2xl font-bold text-center">Search for Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <input
                type="text"
                placeholder="Search by Book Name"
                className="p-2 border rounded"
                onChange={this.onChangeBookTitle}
                value={title}
              />
              <select
                className="p-2 border rounded"
                onChange={this.onChangeGenre}
                value={genre}
              >
                <option value="" disabled>
                  Select Genre
                </option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Action">Action</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Adventure">Adventure</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Dystopian">Dystopian</option>
              </select>
              <input
                type="text"
                placeholder="Search by author"
                className="p-2 border rounded"
                onChange={this.onChangeAuthor}
                value={author}
              />
            </div>
            <div className="flex justify-center mt-12">
              <button
                className="bg-blue-500 text-white p-2 rounded w-25"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          <div className="min-h-screen p-6">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Book List
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialAllBooksList.map((book) => (
                <Link to={`/book/${book.BookID}`}
                state={{ bookDetails: book }}>
                <div
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 ease-in-out"
                  key={book.BookID}
                  value={book.BookID}
                >
                  <h5 className="text-lg font-bold text-blue-600">
                    {book.Title}
                  </h5>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Author:</span>{" "}
                    {book.AuthorName}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Author ID:</span>{" "}
                    {book.AuthorID}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Genre:</span>{" "}
                    {book.GenreType}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Genre ID:</span>{" "}
                    {book.GenreID}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Pages:</span> {book.Pages}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Published Date:</span>{" "}
                    {book.PublishedDate}
                  </p>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div id="about" className="bg-yellow-50 h-100">
          <div className="mx-auto px-6 py-12 shadow rounded-lg">
            <h1 className="text-xl font-bold text-center mb-6">
              About Book Management App
            </h1>
            <p className="text-sm text-gray-800 text-center mb-8 leading-relaxed font-semibold">
              The Book Management App is a powerful tool for organizing,
              searching, and managing your book collection. Whether you're an
              avid reader, a student, or a librarian, this app is designed to
              simplify your book management experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-500 mb-4">
                  Features
                </h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 font-semibold">
                  <li className="hover:text-blue-500">
                    Add, edit, and delete book records.
                  </li>
                  <li className="hover:text-blue-500">
                    Search books by title, author, or genre.
                  </li>
                  <li className="hover:text-blue-500">
                    Filter books using advanced criteria.
                  </li>
                  <li className="hover:text-blue-500">
                    View detailed information about each book.
                  </li>
                  <li className="hover:text-blue-500">
                    Securely manage your collection with confirmation steps.
                  </li>
                </ul>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-500 mb-4">
                  Why Use This App?
                </h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 font-semibold">
                  <li className="hover:text-blue-500">
                    Keep your book collection organized.
                  </li>
                  <li className="hover:text-blue-500">
                    Save time with efficient search and filter tools.
                  </li>
                  <li className="hover:text-blue-500">
                    Enjoy a clean and user-friendly interface.
                  </li>
                  <li className="hover:text-blue-500">
                    Access your collection anytime, anywhere.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="contact">
          <div className="mx-auto px-6 py-12 bg-yellow-50 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
              Contact Us
            </h1>
            <p className="text-base text-gray-700 text-center mb-8 leading-relaxed font-semibold">
              Have questions, feedback, or need assistance? We'd love to hear
              from you! Fill out the form below or reach out to us directly.
            </p>

            <div className="w-full gap-8">
              <div className="flex flex-col justify-center items-start bg-white shadow-md p-3 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-500 mb-">
                  Get in Touch
                </h2>

                <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 justify-between w-full mt-4">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-envelope text-blue-500 text-xl mr-4"></i>
                    <span className="text-base font-semibold text-gray-700">
                      support@bookapp.com
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <i className="fas fa-phone text-blue-500 text-xl mr-4"></i>
                    <span className="text-base font-semibold text-gray-700">
                      +1 (555) 123-4567
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <i className="fas fa-map-marker-alt text-blue-500 text-xl mr-4"></i>
                    <span className="text-base text-gray-700 font-semibold">
                      123 Library Lane, Booktown, USA
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <i className="fas fa-map-marker-alt text-blue-500 text-xl mr-4"></i>
                    <span className="text-base font-semibold text-gray-700">
                      ©copyright 2024.
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <p className="text-gray-700 text-md font-semibold">
                  We typically respond within 1-2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withNavigation(HomePage);
