/*
 * @Description: 
 * @Author: primsie7
 * @Date: 2020-11-19 11:16:16
 * @LastEditTime: 2020-11-24 15:04:56
 */
const Article = require('../model/article');

// 前台文章列表
const getArticleList = async (ctx) => {
  const data = await Article.findAll({});
  ctx.success(data);
};

//添加文章
const addArticle= async(ctx)=>{
   
};
//修改文章
const updateArticle= async(ctx)=>{

};
//删除文章
const delArticle = async(ctx)=>{

}
module.exports={
  getArticleList,
  addArticle,
  updateArticle,
  delArticle
}