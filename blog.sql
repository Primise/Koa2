
--mysql数据库基本操作
 --1.数据库得基本操作
  DROP TABLE IF EXISTS `数据库表`
 --2.创建数据库表
CREATE TABLE `数据库表名`(
  字段名1  字段类型 属性值 默认值
  字段名2  字段类型 属性值 默认值
  字段名3 字段类型 属性值 默认值
  字段名4 字段类型 属性值 默认值
  ...
  字段名n  字段类型 属性值 默认值
  PRIMARY KEY(`id`)指定一个自增key
) 

-- 创建user表 （如果数据库不存在就创建如果存在就不做任何操作）
DROP TABLE IF EXISTS `users` 
CREATE TABLE `users` (
 `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
 `user_name` varchar(100) NOT NULL,
  `true_name` varchar(100) NOT Null,
 `password` varchar(100) NOT Null,
  `create_time` int(12) unsigned NOT NULL DEFAULT '0',
  `update_time` int(12) unsigned NOT NULL DEFAULT '0',
 PRIMARY KEY(`id`) 
)ENGINE=InnoDB AUTO_INCREMENT= 5 DEFAULT CHARSET=utf8mb4;


-- 创建文章列表
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`(
  `id`  varchar(32),
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `read_count` int(10) NOT NULL DEFAULT 0, 
  `image_url` text NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `create_time` int(12) unsigned NOT NULL DEFAULT '0',
  `update_time` int(12) unsigned NOT NULL DEFAULT '0',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
)ENGINE=InnoDB AUTO_INCREMENT= 5 DEFAULT CHARSET=utf8mb4;


INSERT INTO `articles` VALUES ('1','第一篇博客','primise',12,'https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg?imageView&quality=75&thumbnail=750x0','测试内容','1242142681','1242976699',1)



DROP TABLE IF EXISTS `blog_category`;
CREATE TABLE `blog_category` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
    `category_id` int(11) NULL COMMENT '',
    `uid` int(11) NULL COMMENT '所属用户ID',
    `sort` int(11) NULL COMMENT '排序',
    `category_name` varchar(255) NULL COMMENT '分类名称',
    `category_description` varchar(255) NULL COMMENT '描述',
    `status` tinyint(1) NULL DEFAULT '0' COMMENT '状态 0开 1关',
    `create_time` bigint(20) NULL COMMENT '创建时间',
    `update_time` bigint(20) NULL COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB COMMENT '系统-博客文章分类表';
