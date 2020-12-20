/*
 * @Author: zzz
 * @Date: 2020-12-19 22:44:04
 * @LastEditTime: 2020-12-20 14:13:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Koa2\controller\category.js
 */
const CategoryModel = require("../model/category");
const Op = require('sequelize').Op
class CategoryServer {
  static async categoryList(ctx){
    try {
      const {page_index,page_size} = ctx.query;
      const _page_index= page_index||1;
      const _page_size= page_size||10;
      const data = await CategoryModel.findAndCountAll({
        where:{},
        limit:_page_size,
        offset:(_page_index-1)*_page_size
      });
      let page={
        page_index:_page_size,
        page_size:_page_index,
        total:data.count
      }
      ctx.success(data.rows,page,"操作成功")
    } catch (error) {
        ctx.fail("失败",-1)
    }
  }
  static async addCategory(ctx) {
    try {
      const params = ctx.request.body;
      const [blog_category,created] =  await CategoryModel.findOrCreate({
        where: {
          category_name:{
            [Op.eq]:params.category_name
          }
         },
         defaults:{...params}
        
      })
      if(created){
        ctx.success(0,null,"新增成功")
      }else{
        ctx.fail("字段已存在",-1)
      }
      
    } catch (error) {
        ctx.fail("失败",-1)
    }
  }
}












module.exports = CategoryServer;
