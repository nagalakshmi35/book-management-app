import { Component } from "react";

class AddBookPage extends Component {
  state = {
    title: "",
    authorID: "",
    genreID: "",
    pages: "",
    date: "",
  };

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeAuthorID = (event) => {
    this.setState({ authorID: parseInt(event.target.value) });
  };

  onChangeGenreID = (event) => {
    this.setState({ genreID: parseInt(event.target.value) });
  };

  onChangePages = (event) => {
    this.setState({ pages: parseInt(event.target.value) });
  };

  onChangeDate = (event) => {
    this.setState({ date: event.target.value });
  };

  onSubmitFormBtn = async (event) => {
    event.preventDefault();
    const { title, authorID, genreID, pages, date } = this.state;

    const formData = {
      title,
      authorID,
      genreID,
      pages,
      date,
    };
    console.log(formData);

    const url = "https://book-management-app-n4jf.onrender.com/books/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response.status);
      if (response.ok) {
        alert("Book Added successfully!");
        const { initialBooksList } = this.props.location.state;
        
        this.props.location.state.initialBooksList = [
          ...initialBooksList,
          formData,  
        ];
      } else {
        const errorDetails = await response.json();
        throw new Error("Failed to add the book: ", errorDetails);
      }
    } catch (error) {
      console.error("Error Adding the book:", error);
      alert("An error occurred while adding the book.");
    }
  };

  render() {
    const { title, authorID, genreID, pages, date } = this.state;

    return (
      <div className="mx-auto p-4 bg-yellow-50">
        <h2 className="text-2xl font-bold">Add Book</h2>
        <form onSubmit={this.onSubmitFormBtn} className="mt-4">
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.onTitleChange}
            placeholder="Title"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="author"
            value={authorID}
            onChange={this.onChangeAuthorID}
            placeholder="Author ID"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="text"
            name="genre"
            value={genreID}
            onChange={this.onChangeGenreID}
            placeholder="Genre ID"
            className="p-2 border rounded mb-4 w-full"
          />

          <input
            type="number"
            name="pages"
            value={pages}
            onChange={this.onChangePages}
            placeholder="No. of Pages"
            className="p-2 border rounded mb-4 w-full"
          />
          <input
            type="date"
            name="publishedDate"
            value={date}
            onChange={this.onChangeDate}
            className="p-2 border rounded mb-4 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddBookPage;
