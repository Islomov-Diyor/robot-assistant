const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('demo', {
    title: 'Demo',
    active: 'demo'
  });
});

module.exports = router;
