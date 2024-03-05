"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`, {
        method: "GET",
      });

      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) {
      fetchPost();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure to delete this post?");
    if (!hasConfirmed) return;
    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });

      const filterPosts = posts.filter((p) => p._id !== post._id);
      setPosts(filterPosts);
    } catch (error) {
      console.log(error);
    }
  };
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

export default MyProfile;
