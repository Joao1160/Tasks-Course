import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "../../APIs/postsApi";
import "./posts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import PostModal from "./PostModal";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function Posts() {
  const posts = useSelector((state) => state.postsData.posts);
  const postStatus = useSelector((state) => state.postsData.status);

  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    body: "",
  });

  const handelVAlidation = (post) => {
    if (post.title && post.body) {
      if (post.title.length < 10 || post.title.length > 150) {
        swal({
          title: "Title length is not correct",
          text: "Title length should be greater or equal than 10 and less or equal than 150 !",
          icon: "warning",
          dangerMode: true,
        });
      } else if (post.body.length < 50 || post.body.length > 300) {
        swal({
          title: "Body length is not correct",
          text: "Body length should be greater or equal than 50 and less or equal than 300 !",
          icon: "warning",
          dangerMode: true,
        });
      } else {
        return true;
      }
    } else if (post.title) {
      swal({
        title: "Post's Body is not Found",
        text: "if you want to add post , you have to add title and body!",
        icon: "error",
        dangerMode: true,
      });
    } else if (post.body) {
      swal({
        title: "Post's Title is not Found",
        text: "if you want to add post , you have to add title and body!",
        icon: "error",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Post's Details is not Found",
        text: "if you want to add post , you have to add title and body!",
        icon: "error",
        dangerMode: true,
      });
    }
  };

  const handleAddPost = () => {
    const check = handelVAlidation(newPost);
    if (check) {
      dispatch(addPost(newPost)).then(() => {
        setNewPost({ title: "", body: "" });
        toast.success("Post added successfully");
      });
    }
  };

  const deletePostAction = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(id));
        toast.success("Post Has Been Deleted successfully");
      } else {
      }
    });
  };

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, []);
  let content = React.ReactNode;
  if (postStatus === "pending") {
    content = <h1 className="loading-screen">Loading...</h1>;
  }
  const showEditModal = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleUpdatePost = () => {
    const check = handelVAlidation(currentPost);
    if (check) {
      const updatedData = {
        title: currentPost.title,
        body: currentPost.body,
      };
      dispatch(updatePost({ id: currentPost.id, updatedData })).finally(() => {
        setShowModal(false);
        toast.success("Post Updated successfully");
      });
    }
  };
  return (
    <>
      {content}

      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts.map((post) => (
                <div className="card post-item" key={post.id}>
                  <div className="card-body">
                    <h5>
                      {post.id} -
                      <Link
                        className="ms-1 text-decoration-none text-dark"
                        to={`/postDetails/${post.id}`}
                      >
                        {post.title}
                      </Link>
                    </h5>

                    <p className="card-text">{post.body}</p>
                    <div className="postControlButtons">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          showEditModal(post);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deletePostAction(post.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="add-post-form">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => {
                    setNewPost({ ...newPost, title: e.target.value });
                  }}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Body"
                  rows="4"
                  value={newPost.body}
                  onChange={(e) => {
                    setNewPost({ ...newPost, body: e.target.value });
                  }}
                />
                <button className="btn btn-success" onClick={handleAddPost}>
                  <FontAwesomeIcon icon={faPlus} /> Add Post
                </button>
              </div>
            </div>
          </div>
        </div>

        <PostModal
          showModal={showModal}
          handleClose={handleClose}
          currentPost={currentPost}
          handleChange={setCurrentPost}
          handleUpdatePost={handleUpdatePost}
        />

        <ToastContainer />
      </div>
    </>
  );
}

export default Posts;
