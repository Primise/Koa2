/*
 * @Description:
 * @Author: primsie7
 * @Date: 2020-11-19 11:16:16
 * @LastEditTime: 2021-01-10 22:27:34
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
    const { page_index, page_size } = ctx.query;
    const _page_index = page_index || 1;
    const _page_size = page_size || 10;
    const data = await ArticleModel.findAndCountAll({
      where: {
        is_delete:0
      },
      limit: _page_size,
      offset: (_page_index - 1) * _page_size
    });
    let page = {
      page_index: _page_size,
      page_size: _page_index,
      total: data.count
    }
    ctx.success(data.rows, page, "操作成功");
  }
  static async articleAdd(ctx) {
    const {
      title,
      author,
      description,
      tag,
      cover,
      content,
    } = ctx.request.body;
    let params = {
      title,
      author,
      description,
      tag,
      cover,
      content,
    };

    const [article, created] = await ArticleModel.findOrCreate({
      where: {
        title: {
          [Op.eq]: params.title
        }
      },
      defaults: { ...params }
    });
    if (created) {
      ctx.success(article.article_id, null, "新增成功")
    } else {
      ctx.fail("字段已存在", -1)
    }
  }

  static async detail(ctx) {
    // 文章ID
    let { id } = ctx.params;
    console.log(id)
    // 检测是否传入ID
     if (!id || isNaN(id)) {
         ctx.fail('请传入正确的用户ID',400)
         return false;
     }

    try {
      let data = await ArticleModel.findOne({
        where:{
          article_id:id
        }
      });
      console.log(data)
      if (data !== null) {
        // 浏览次数增加1
         let read_count = data.read_count + 1;
         await ArticleModel.update({read_count},{
           where:{
             article_id:id
           }
         });
      }

      ctx.success(data, null, "新增成功")
    } catch (err) {
      console.log(err)
      ctx.fail(err, 500)
    }
  }

  static async delete(ctx){
    let {id} = ctx.params;
    let is_delete=1;
    try {
      await ArticleModel.update({is_delete}, {
        where: {
          article_id:id,
        },
        fields: ['is_delete'],
    });;
      // let data = await ArticleModel.detail(id);
       ctx.success(0,null,'删除成功')
    } catch (error) {
      console.log(error)
      ctx.fail('删除失败',-1)
    }
  }
}
module.exports = Article;
