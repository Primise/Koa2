/*
 * @Description:接口返回数据统一处理
 * @Author: primsie7
 * @Date: 2020-11-24 13:56:17
 * @LastEditTime: 2020-11-24 15:01:49
 */

module.exports = function (options = {}) {
  return async function (ctx, next) {
    /**
     * success(成功)
     * @example {"code":0,msg:"操作成功",data:{}}
     * @params {*} data
     * @params {*} msg
     */
    ctx.success = function (data, msg) {
      ctx.type = options.type || "json";
      ctx.body = {
        code: options.successCode || "0",
        msg: msg,
        data: data,
      };
    };
    /**
     * fail(失败)
     * @example {"code":-1,msg:"操作失败",data:null
     * @params {*} data
     * @params {*} msg
     */
    ctx.fail = function (msg, code) {
      ctx.type=options.type||"json"
      ctx.body={
          code:code||options.failCode||"-1",
          msg:msg||options.msg||"操作失败"
      }
    };
    await next();
  };
};
