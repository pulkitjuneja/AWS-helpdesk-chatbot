var express = require('express');
var router = express.Router();


router.get('/showdata', function (req, res, next) {
  res.json(req.query);
});

module.exports = router;
