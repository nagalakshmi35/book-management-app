import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SearchResultsPage from "./components/SearchResultsPage";
import BookDetailsPage from "./components/BookDetailsPage";
import AddBookPage from "./components/AddBookPage";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/search-results" element={<SearchResultsPage />} />
      <Route exact path="/book/:id" element={<BookDetailsPage />} />
      <Route exact path="/add-book" element={<AddBookPage />} />
    </Routes>
  </Router>
);

export default App;
