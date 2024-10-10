import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link } from "react-router-dom";
import { fetchAllPostsData } from "../redux/actions/Posts";
import { useDispatch, useSelector } from "react-redux";

function Paginate({ page }) {
  const dispatch = useDispatch();
  const numberOfPage = useSelector(({ posts }) => posts?.data?.numberOfPage);

  useEffect(() => {
    dispatch(fetchAllPostsData(page));
  }, [dispatch, page]);

  return (
    <Pagination
      page={page}
      style={{ justifyContent: "center" }}
      count={numberOfPage ? numberOfPage : page}
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/posts?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
}

export default Paginate;
