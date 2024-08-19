const memberBL = require("../BLL/memberBL");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.route("/").get(verifyToken, async function (req, res) {
  try {
    // console.log("get all membersList");

    let members = await memberBL.getMembers();
    // console.log("members: ", members);

    res.json(members);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").get(verifyToken, async function (req, res) {
  try {
    let id = req.params.id;
    let member = await memberBL.getMemberById(id);
    res.json(member);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/").post(verifyToken, async function (req, res) {
  try {
    let obj = req.body;
    let newMember = await memberBL.createMember(obj);
    res.json(newMember);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").put(verifyToken, async function (req, res) {
  try {
    let id = req.params.id;
    let obj = req.body;

    let updatedMember = await memberBL.updateMember(id, obj);
    res.json(updatedMember);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").delete(verifyToken, async function (req, res) {
  try {
    let id = req.params.id;
    let status = await memberBL.deleteMember(id);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
