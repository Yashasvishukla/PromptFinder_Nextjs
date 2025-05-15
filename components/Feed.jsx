"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ post, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {post.map((prompt) => (
        <PromptCard
          key={prompt._id}
          post={prompt}
          handleTagClick={handleTagClick}
        ></PromptCard>
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the prompts from the database
      const response = await fetch("/api/prompt");
      const prompts = await response.json();
      setData(prompts);
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const filterPrompt = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return data.filter(
      (prompt) =>
        regex.text(prompt.creator.username) ||
        regex.test(prompt.prompt) ||
        regex.test(prompt.tag)
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // debource method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value);
        setSearchText(searchResult);
      }, 500)
    );
  };
  return (
    <section className="feed flex flex-col">
      <form className="relative w-full flex-center gap-2">
        <input
          type="text"
          placeholder="Search for prompts..."
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList
        post={data}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  );
};

export default Feed;
