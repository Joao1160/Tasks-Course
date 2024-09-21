import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Base_URL = "http://localhost:9000/posts";
const Comments_URL = "http://localhost:9000/comments";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(Base_URL);
  return response.data;
});

export const fetchPostDetails = createAsyncThunk("posts/fetchPostDetails", async (id) => {
  const response = await axios.get(`${Base_URL}/${id}`);
  return response.data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const response = await axios.delete(`${Base_URL}/${id}`);
  return response.data;
});

export const fetchCommentsPost = createAsyncThunk("posts/fetchCommentsPost", async () => {
  const response = await axios.get(Comments_URL);
  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (postInfo) => {
  const response = await axios.post(Base_URL, postInfo);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedData }) => {
    const response = await axios.patch(`${Base_URL}/${id}`, updatedData);
    return response.data;
  }
);
