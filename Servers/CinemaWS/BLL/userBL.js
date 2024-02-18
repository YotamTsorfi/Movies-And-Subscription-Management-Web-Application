const { UserModel } = require("../models/usersModel");
const bcrypt = require('bcrypt');

const registerUser = async (username, password) => {
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store the user in the database with the hashed password
    const user = new UserModel({
      username: username,
      password: hashedPassword
    });
    await user.save();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const validatePassword = async (user, password) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const getUsers = () => {
  return UserModel.find().exec();
};

//TODO: Id is the _id field in the database, might not need to use it
const getUserById = (id) => {
  return UserModel.findById(id).exec();
};

const getUserByUsername = (username) => {
  return UserModel.find({ username: username }).exec();
};

//TODO: create user need to use registerUser() instead of createUser()
const createUser = async (obj) => {
  try {
    let user = new UserModel({
      username: obj.username,
      password: "",      
    });

    await user.save();

    return user._id;
  } catch (err) {
    throw err;
  }
};

//TODO: Might need to change the function to use the registerUser() to hash the password
const updateUser = (username, obj) => {
  return UserModel.findOneAndUpdate(
    { Username: username },
    {
      username: obj.username,
      password: obj.password, 
    },
    { new: true }
  ).exec();
};

//TODO: Might need to change the function to use the registerUser() to hash the password
const updateSingleField = async (id, field, value) => {
  try {
    const updateObj = {};
    updateObj[field] = value;
    await UserModel.findByIdAndUpdate(id, updateObj);
    return "Update successfully";
  } catch (err) {
    throw err;
  }
};

//TODO: Might need to change the function to use the username instead of the id
const deleteUser = async (id) => {
  try {
    await UserModel.findByIdAndDelete(id);
    return "Deleted successfully";
  } catch (err) {
    throw err;
  }
};


const updateUserPassword = async (username, password) => {
// Hash the password
//find the user by its username
//update the password
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await UserModel.findOneAndUpdate(
      { username: username },
      { password: hashedPassword }
    ).exec();
  } catch (err) {
    console.error(err);
    throw err;
  }

};


module.exports = {
  registerUser,
  validatePassword,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateSingleField,
  deleteUser,
  getUserByUsername,
  updateUserPassword
};
