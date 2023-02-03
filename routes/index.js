const { Router } = require('express')
const router =  Router()

router.get('/',(req, res) => {
  res.send('server is up')
})

//Exporting
module.exports = router