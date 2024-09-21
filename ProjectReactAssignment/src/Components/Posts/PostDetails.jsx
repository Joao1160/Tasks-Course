import { useParams } from "react-router-dom";
import { fetchPostDetails, fetchCommentsPost } from "../../APIs/postsApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";

function PostDetails() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postsData.postDetails);
  const comments = useSelector((state) => state.postsData.comments);
  const newComments = comments.filter((comment) => comment.postId == postId);
  const handelComments = (action) => {
    console.log(action);
    if (action.length > 0) {
      return (
        <div className="col-10">
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {newComments.map((comment) => {
                return (
                  <tr>
                    <td>{comment.id}</td>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td>{comment.body}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <span className="col-10 fs-3">No Comments Yet...</span>;
    }
  };
  useEffect(() => {
    dispatch(fetchPostDetails(postId));
    dispatch(fetchCommentsPost());
  }, []);

  return (
    <>
      <div className="m-5">
        <h1>Post ID #{post.id}</h1>
        <h3 className="fs-3">
          Title : <span className="text-primary fs-4">{post.title}</span>
        </h3>
        <h5 className="fs-3">
          Body :
          <span className="fs-5 text-secondary font-size-s"> {post.body}</span>
        </h5>
        <div className="row my-5">
          <h1 className="col-2 fs-3">Comments : </h1>
          {handelComments(newComments)}
        </div>
      </div>
    </>
  );
}

export default PostDetails;
