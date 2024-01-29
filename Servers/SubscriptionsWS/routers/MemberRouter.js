const memberBL = require("../BLL/memberBL");
const express = require("express");
const router = express.Router();

router.route("/").get(async function (req, res) {
  try {
    let members = await memberBL.getMembers();
    res.json(members);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").get(async function (req, res) {
  try {
    let id = req.params.id;
    let member = await memberBL.getMemberById(id);
    res.json(member);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/").post(async function (req, res) {
  try {
    let obj = req.body;
    let status = await memberBL.createMember(obj);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").put(async function (req, res) {
  try {
    let id = req.params.id;
    let obj = req.body;

    let updatedMember = await memberBL.updateMember(id, obj);
    res.json(updatedMember);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.route("/:id").delete(async function (req, res) {
  try {
    let id = req.params.id;
    let status = await memberBL.deleteMember(id);
    res.json(status);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
