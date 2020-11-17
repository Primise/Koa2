const Article = require('../model/article');



// 前台文章列表
const getArticleList = async (ctx) => {
  const data = await Article.findAll({});

  ctx.body = {
    code: 0,
    data
  }
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