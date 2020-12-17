/*
 * @Description:
 * @Author: primsie7
 * @Date: 2020-11-19 11:16:16
 * @LastEditTime: 2020-12-09 14:03:07
 */
const ArticleModel = require("../model/article");

// 前台文章列表
// const getArticleList = async (ctx) => {
//   const data = await Article.findAndCountAll({});
//   // console.log(data)

//   ctx.success(data.rows,'操作成功');
// };

// //添加文章
// const addArticle= async(ctx)=>{

// };
// //修改文章
// const updateArticle= async(ctx)=>{

// };
// //删除文章
// const delArticle = async(ctx)=>{

// }

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
}
module.exports = Article;
