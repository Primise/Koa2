const router = require('koa-router')()

router.prefix('/users')
const user = require("../controller/users");

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/add',user.addUser);

module.exports = router;
