import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { useDispatch } from "react-redux";
// const apiUrlCinema = process.env.REACT_APP_CINEMA_API_URL;

const permissionsList = [
  "View Subscriptions",
  "Create Subscriptions",
  "Delete Subscriptions",
  "Update Subscriptions",
  "View Movies",
  "Create Movies",
  "Delete Movies",
  "Update Movies",
];

function AddUser() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    sessionTimeOut: "",
    createdDate: new Date(),
    permissions: permissionsList.reduce(
      (acc, permission) => ({ ...acc, [permission]: false }),
      {}
    ),
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setUser((prevUser) => {
      let newPermissions = { ...prevUser.permissions, [name]: checked };

      // Automatically check "View Subscriptions" if any subscription permission is checked
      if (
        [
          "Create Subscriptions",
          "Update Subscriptions",
          "Delete Subscriptions",
        ].includes(name) &&
        checked
      ) {
        newPermissions["View Subscriptions"] = true;
      }
      // Automatically check "View Movies" if any movie permission is checked
      if (
        ["Create Movies", "Update Movies", "Delete Movies"].includes(name) &&
        checked
      ) {
        newPermissions["View Movies"] = true;
      }

      return { ...prevUser, permissions: newPermissions };
    });
  };

  const handleSave = async () => {
    try {
      // Convert sessionTimeOut to a number if it's not empty and set createdDate to the current date
      const userToSave = {
        ...user,
        sessionTimeOut: user.sessionTimeOut ? Number(user.sessionTimeOut) : 0,
        createdDate: new Date(),
      };

      // Make a POST request to the server to save the user data
      const response = await axios.post(
        "http://localhost:4824/combinedData",
        userToSave,
        {
          // const response = await axios.post(
          //   `${apiUrlCinema}/combinedData`,
          //   userToSave,
          //   {
          headers: { "x-access-token": token },
        }
      );

      if (response.status === 200) {
        console.log(`User ${user.userName} saved successfully`);
        // Redirect to the All Users page
        navigate("/users");
      }
    } catch (error) {
      if (error.response) {
        console.error(`Error saving user ${user.userName}`, error);
        dispatch(logoutUser);
        navigate("/login");
      }
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <form>
      <TextField
        label="First Name"
        name="firstName"
        value={user.firstName}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        label="Last Name"
        name="lastName"
        value={user.lastName}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        label="Username"
        name="userName"
        value={user.userName}
        onChange={handleInputChange}
      />
      <br />
      <TextField
        label="Session Time Out"
        name="sessionTimeOut"
        value={user.sessionTimeOut}
        onChange={handleInputChange}
      />
      <br />
      {permissionsList.map((permission) => (
        <div key={permission}>
          <FormControlLabel
            control={
              <Checkbox
                checked={user.permissions[permission]}
                onChange={handleCheckboxChange}
                name={permission}
              />
            }
            label={permission}
          />
        </div>
      ))}
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="contained" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </form>
  );
}

export default AddUser;
