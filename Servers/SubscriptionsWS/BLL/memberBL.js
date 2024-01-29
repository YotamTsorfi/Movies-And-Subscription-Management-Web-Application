const { MemberModel } = require("../models/subscriptionsModel");

const getMembers = () => {
  return MemberModel.find().exec();
};

const getMemberById = (id) => {
  return MemberModel.findById(id).exec();
};

const createMember = async (obj) => {
  try {
    let member = new MemberModel({
      Name: obj.Name,
      Email: obj.Email,
      City: obj.City,
    });

    await member.save();

    return member._id;
  } catch (err) {
    throw err;
  }
};

const updateMember = (id, obj) => {
  return MemberModel.findByIdAndUpdate(
    id,
    {
      Name: obj.Name,
      Email: obj.Email,
      City: obj.City,
    },
    { new: true }
  ).exec();
};

const updateSingleField = async (id, field, value) => {
  try {
    const updateObj = {};
    updateObj[field] = value;
    await MemberModel.findByIdAndUpdate(id, updateObj);
    return "Update successfully";
  } catch (err) {
    throw err;
  }
};

const deleteMember = async (id) => {
  try {
    await MemberModel.findByIdAndDelete(id);
    return "Deleted successfully";
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  updateSingleField,
  deleteMember,
};
