"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@components/Form";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const { data: session } = useSession();
  const [submit, setSubmit] = useState(false);

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmit(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        // Redirect to the home page
        router.push("/");
      }
    } catch (error) {
      // Log the error
      console.log(error);
    } finally {
      // Reset the submit button
      setSubmit(false);
    }
  };

  return (
    <div>
      {/* Passing the prompts from one component to another component */}
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={createPrompt}
      ></Form>
    </div>
  );
};

export default CreatePrompt;
