/*
 * @Author: your name
 * @Date: 2020-11-29 12:57:55
 * @LastEditTime: 2020-11-29 22:08:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\utils\redisStore.js
 */


const Redis = require('ioredis') ;
const { Store }  =require('koa-session2');

class RedisStore extends Store {
  constructor() {
      super();
      this.redis = new Redis();
      console.log(this.redis)
  }
  /**
   *
   * 通过id获取redis数据
   * @param {*} sid
   * @param {*} ctx
   * @memberof RedisStore
   */
  async get(sid, ctx) {
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data)
  }

  /**
   *
   * 创建
   * @param {*} session
   * @param {*} [{sid=this.getID(24),maxAge=1000000}={}]
   * @param {*} ctx
   * @memberof RedisStore
   */
  async set(session, { sid = this.getID(24), maxAge = 1000 * 60 * 60 } = {}, ctx) {
    try {
      console.log(`session;${sid}`);
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), "EX", maxAge / 1000)
    } catch (err) {
        throw err;
    }
    return sid;
  }

  /**
   *
   * 删除
   * @param {*} sid
   * @param {*} ctx
   * @returns
   * @memberof RedisStore
   */
  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }

  async refresh(sid, session, maxAge = 1000 * 60 * 60, ctx) {
    try {
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
    } catch (err) {
      throw err;
    }
    return sid;
  }
}

module.exports = RedisStore;