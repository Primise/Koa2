const Article = require('../model/article');



// 前台文章列表
const getArticleList = async (ctx) => {
  const data = await Article.findAll({
    where: {
      title: "primise"
    }
  });
  ctx.body = {
    code: 0,
    data
  }
};

//添加文章
const addArticle= async(ctx)=>{
   
}




module.exports={
  getArticleList,
  addArticle
}