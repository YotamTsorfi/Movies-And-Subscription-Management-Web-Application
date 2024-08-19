const express = require("express");
const usersFileBL = require("../BLL/usersFileBL");
const userDBBL = require("../BLL/userBL");
const permissionsFileBL = require("../BLL/permissionsFileBL");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

//-----------------Get All Users-----------------
router.route("/").get(verifyToken, async (req, resp) => {
  const usersDBData = await userDBBL.getUsers();
  const usersFileData = await usersFileBL.getAllUsers();
  const permissionsData = await permissionsFileBL.getAllPermissions();

  const combinedData = usersDBData.map((userDB) => {
    const userFile = usersFileData.find(
      (userFile) => userFile.id === userDB._doc._id.toString()
    );
    const userPermissions = permissionsData.find(
      (permission) => permission.userId === userDB._doc._id.toString()
    );

    return {
      Id: userDB._doc._id.toString(),
      "User Name": userDB._doc.username,
      Name: userFile ? `${userFile.firstName} ${userFile.lastName}` : "N/A",
      "Session time out": userFile ? userFile.sessionTimeOut : "N/A",
      "Created Date": userFile ? userFile.createdDate : "N/A",
      Permissions: Array.isArray(userPermissions?.permissions)
        ? userPermissions.permissions
        : [],
    };
  });

  return resp.json(combinedData);
});

//-----------------Get User By Id-----------------
router.route("/:id").get(verifyToken, async (req, resp) => {
  const { id } = req.params;

  try {
    // Fetch user from usersDB
    const userDB = await userDBBL.getUserById(id);

    // Fetch user from usersFile
    const userFile = await usersFileBL.getUserById(id);

    // Fetch user's permissions
    const userPermissions = await permissionsFileBL.getPermissionById(id);

    // Combine data
    const combinedData = {
      Id: id,
      "User Name": userDB.username,
      Name: userFile ? `${userFile.firstName} ${userFile.lastName}` : "N/A",
      "Session time out": userFile ? userFile.sessionTimeOut : "N/A",
      "Created Date": userFile ? userFile.createdDate : "N/A",
      Permissions: userPermissions ? userPermissions.permissions : "N/A",
    };

    resp.json(combinedData);
  } catch (error) {
    console.error(`Error fetching user with id ${id}`, error);
    resp.sendStatus(500);
  }
});

//-----------------Delete User-----------------
router.route("/:id").delete(verifyToken, async (req, resp) => {
  const { id } = req.params;

  try {
    // Delete user from usersDB
    const usersDBResult = await userDBBL.deleteUser(id);

    // Delete user from usersFile
    const usersFileResult = await usersFileBL.deleteUser(id);

    // Delete user's permissions
    const permissionsResult = await permissionsFileBL.deletePermission(id);

    if (usersFileResult || usersDBResult || permissionsResult) {
      resp.sendStatus(200);
    } else {
      resp.sendStatus(500);
    }
  } catch (error) {
    console.error(`Error deleting user with id ${id}`, error);
    resp.sendStatus(500);
  }
});

//-----------------Update User-----------------
router.route("/:id").put(verifyToken, (req, resp) => {
  const { id } = req.params;
  const userData = req.body;

  // console.log("userData: ", userData);

  let usersFileResult, permissionsResult, usersDBResult;

  try {
    // Update user's permissions
    const permissionsArray = Object.keys(userData.Permissions).filter(
      (permission) => userData.Permissions[permission]
    );
    const formattedPermissions = {
      userId: userData.Id,
      permissions: permissionsArray,
    };
    permissionsResult = permissionsFileBL.updatePermission(
      userData.Id,
      formattedPermissions
    );
  } catch (error) {
    console.error(`Error updating permissions for user with id ${id}`, error);
  }

  try {
    // Update user in usersFile
    const {
      firstName,
      lastName,
      "Session time out": sessionTimeOut,
      "Created Date": createdDate,
    } = userData;
    const formattedData = {
      id: userData.Id,
      firstName,
      lastName,
      createdDate,
      sessionTimeOut: Number(sessionTimeOut),
    };
    usersFileResult = usersFileBL.updateUser(id, formattedData);
  } catch (error) {
    console.error(`Error updating user in usersFile with id ${id}`, error);
  }

  try {
    // Update user in usersDB
    usersDBResult = userDBBL.updateSingleField(
      id,
      "username",
      userData["User Name"]
    );
  } catch (error) {
    console.error(`Error updating user in usersDB with id ${id}`, error);
  }

  if (usersFileResult && usersDBResult && permissionsResult) {
    resp.sendStatus(200);
  } else {
    resp.sendStatus(500);
  }
});

//-----------------Add User-----------------
router.route("/").post(verifyToken, async (req, resp) => {
  const userData = req.body;

  let usersFileResult, permissionsResult, usersDBResult;

  try {
    const { firstName, lastName, sessionTimeOut, createdDate, userName } =
      userData;
    const formattedData = {
      firstName,
      lastName,
      createdDate,
      username: userName,
      sessionTimeOut: Number(sessionTimeOut),
    };

    // Insert user into usersDB
    usersDBResult = await userDBBL.createUser({
      username: formattedData.username,
    });

    //After the user is created in the DB, we can get the id and insert the user into the file
    // Get the id of the user that was just created
    const userId = usersDBResult.toString();
    formattedData.id = userId;

    const { username: username2, ...dataWithoutUsername } = formattedData;

    usersFileResult = usersFileBL.addUser(dataWithoutUsername);

    // Insert user's permissions
    const permissionsArray = Object.keys(userData.permissions).filter(
      (permission) => userData.permissions[permission]
    );

    const formattedPermissions = {
      userId: formattedData.id,
      permissions: permissionsArray,
    };
    permissionsResult = permissionsFileBL.addPermission(formattedPermissions);
  } catch (error) {
    console.error(`Error inserting user`, error);
    resp.sendStatus(500);
    return;
  }

  if (usersFileResult && usersDBResult && permissionsResult) {
    resp.sendStatus(200);
  } else {
    resp.sendStatus(500);
  }
});

module.exports = router;
