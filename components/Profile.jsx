import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 space-y-6 sm:columns-2 sm:gap-8 xl:columns-3">
        {data?.map((prompt) => (
          <PromptCard
            key={prompt._id}
            post={prompt}
            handleDelete={() => handleDelete && handleDelete(prompt._id)}
            handleEdit={() => handleEdit && handleEdit(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
