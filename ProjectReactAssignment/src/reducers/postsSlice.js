import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  addPost,
  updatePost,
  fetchPostDetails,
  fetchCommentsPost,
  deletePost,
} from "../APIs/postsApi";

export const postsSlice = createSlice({
  name: "postsData",

  initialState: {
    posts: [],
    postDetails: [],
    comments: [],
    deleteState: [],
    status: "idle",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
      });

    builder.addCase(fetchCommentsPost.fulfilled, (state, actions) => {
      state.comments = actions.payload;
    });

    builder.addCase(deletePost.fulfilled, (state, actions) => {
      state.deleteState = actions.payload;
      state.posts = state.posts.filter(
        (post) => post.id !== actions.payload.id
      );
    });

    builder.addCase(fetchPostDetails.fulfilled, (state, actions) => {
      state.postDetails = actions.payload;
    });

    builder.addCase(addPost.fulfilled, (state, actions) => {
      state.posts.push(actions.payload);
    });

    builder.addCase(updatePost.fulfilled, (state, actions) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === actions.payload.id
      );
      if (postIndex !== -1) {
        // -1 means not found in array
        state.posts[postIndex] = actions.payload;
      }
    });
  },
});

export default postsSlice.reducer;
