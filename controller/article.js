/*
 * @Description:
 * @Author: primsie7
 * @Date: 2020-11-19 11:16:16
 * @LastEditTime: 2020-12-23 22:37:47
 */
const ArticleModel = require("../model/article");
const Op = require('sequelize').Op


class Article {

  /**
   * 获取文章列表
   * @static
   * @param {*} ctx 
   * @memberof Article
   */
  static async getArticleList(ctx) {
    const {page_index,page_size} = ctx.query;
    const _page_index= page_index||1;
    const _page_size= page_size||10;
    const data = await ArticleModel.findAndCountAll({
      where:{},
      limit:_page_size,
      offset:(_page_index-1)*_page_size
    });
    let page={
      page_index:_page_size,
      page_size:_page_index,
      total:data.count
    }
    ctx.success(data.rows,page, "操作成功");
  }
  static async articleAdd(ctx){
    console.log(ctx.request.body)
    const {
      title,
      author,
      description,
      // article_id,
      tag,
      cover,
      content,
    }= ctx.request.body;
    let params = {
      title,
      author,
      description,
      // article_id,
      tag,
      cover,
      content,
  };
    const [article,created] = await ArticleModel.findOrCreate({
      where:{
        title:{
          [Op.eq]:params.title
        }
      },
      defaults:{...params}
    });
    if(created){
      ctx.success(0,null,"新增成功")
    }else{
      ctx.fail("字段已存在",-1)
    }
  }
}
module.exports = Article;
