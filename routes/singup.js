
const router = require('koa-router')()

router.prefix('/singup')
router.get('/register', function (ctx, next) {
  ctx.body = '注册'
})

module.exports = router