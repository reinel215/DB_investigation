const express = require("express");
const path = require('path');
const router = express.Router();

router.get("/", function (req,res){
  res.sendFile(path.join(__dirname +'\/..\/views\/app.html'));
});

router.all("/*^logout", function(req, res){
  res.redirect("/");
});

router.get("/logout", function(req, res){
  req.session.destroy();
});

module.exports = router;
