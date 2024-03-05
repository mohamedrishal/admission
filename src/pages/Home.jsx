import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/Slices/userSlice";
import { Link } from "react-router-dom";
import DeleteModal from "../Components/DeleteModal";

const Home = () => {
  const dispatch = useDispatch();

  const UserData = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users");
        const result = await response.json();
        result.data.forEach((element) => {
          dispatch(addUser(element));
        });
        // console.log(...result.data);
      } catch (err) {
        console.log("Error fetching data :", err);
      }
    };

    if (UserData.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <>
      <table class="table table-success table-striped container mt-5 w-100  ">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {UserData?.map((data) => (
            <>
              <tr>
                <th scope="row">{data.id}</th>
                <td>
                  <img
                    style={{ height: "3rem", width: "3rem" }}
                    className="rounded-circle"
                    src={data.avatar}
                    alt=""
                  />{" "}
                  <span>{data.first_name + " " + data.last_name}</span>
                </td>
                <td>{data.email}</td>
                <td>
                  <Link to={`/edit/${data.id}`} className="btn btn-success">
                    Update
                  </Link>
                </td>
                <td>
                  <DeleteModal id={data.id} />
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
