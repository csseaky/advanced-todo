import Head from "next/head";
import { GoogleLogin } from "react-google-login";
import { Navbar } from "../components/Navbar";

export default function Home() {
  return (
    <div className="hero">
      <Navbar />
      <div className="hero-text">
        <h1>Train your brain</h1>
        <p>In the rain. Or in a train.</p>
      </div>
      <div className="searchbar-wrapper">
        <input
          type="text"
          placeholder="Search for any game..."
          className="search-bar"
        />
        <SearchIcon />
      </div>
    </div>
  );
}

const SearchIcon = () => {
  return (
    <svg
      className="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
