"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (promptId) => {
    try {
      const confirmDelete = confirm(
        "Are you sure you want to delete this prompt?"
      );
      if (!confirmDelete) return;
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== promptId)
        );
      }
    } catch (error) {
      console.log("error occured while deleting the prompt", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await fetch(`/api/users/${session?.user.id}/prompts`);
        const data = await posts.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
