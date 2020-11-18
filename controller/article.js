const Article = require('../model/article');
// const{responseClient} =  require("../utils/utils") 


// 前台文章列表
const getArticleList = async (req,res) => {
  const data = await Article.findAll({});
  //  responseClient(res,0,'操作成功',data)
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