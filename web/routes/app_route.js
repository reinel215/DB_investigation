const express = require("express");
const path = require('path');
const router = express.Router();

router.get("/", function (req,res){
  res.sendFile(path.join(__dirname +'\/..\/views\/app.html'));
});

router.all("/*[^\wlogout]", function(req, res){
  res.redirect("/");
});

router.get("/logout", function(req, res){
  req.session.destroy();
  console.log(req.session);
  res.redirect('/');
});

module.exports = router;
