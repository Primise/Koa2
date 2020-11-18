



-- 创建user表




-- 创建文章列表

DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`(
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
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


INSERT INTO `articles` VALUES ('1','第一篇博客','primise',12,'https://yanxuan.nosdn.127.net/31da695c84cabd0eaff054265da29e5c.jpg?imageView&quality=75&thumbnail=750x0','测试内容','1242142681','1242976699',1,)