const express = require("express");
const router = express.Router();
router.get("/",(req,res) => {
    res.send("get for users")
})
router.get("/:id",(req,res) => {
    res.send("get id for users")
})
router.post("/",(req,res) => {
    res.send("post for users")
})
router.delete("/:id",(req,res) => {
    res.send("delete for users")
})
module.exports = router