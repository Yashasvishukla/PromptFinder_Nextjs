"use client";

import React, { useEffect, useState } from "react";
import Form from "@components/Form";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EditPrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [submit, setSubmit] = useState(false);
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const prompt = await response.json();
      setPost({
        prompt: prompt.prompt,
        tag: prompt.tag,
      });
    };

    if (promptId) fetchPrompt();
    setSubmit(false);
  }, [promptId]); // Call the fetchPrompt function when the promptId changes

  const updatePrompt = async (e) => {
    if (!promptId) alert("Prompt not found");
    setSubmit(true);
    e.preventDefault();

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("error occured while updating the prompt", error);
    } finally {
      setSubmit(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submit={submit}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
