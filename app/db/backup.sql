-- MySQL dump 10.13  Distrib 8.2.0, for macos13 (arm64)
--
-- Host: localhost    Database: webhome
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `page_id` int DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  KEY `page_id` (`page_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`page_id`) REFERENCES `pages` (`page_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,1,'常用地址','这里是分类描述','2023-12-06 02:11:39',0,'2024-01-08 15:31:53'),(2,1,'这是分类二2','2','2023-12-08 00:34:17',1,'2023-12-10 03:00:54'),(3,NULL,'新增分类','新增分类新增分类','2023-12-08 09:11:28',0,'2023-12-08 09:11:28'),(4,NULL,'新增分类','新增分类新增分类','2023-12-08 09:15:37',0,'2023-12-08 09:15:37'),(5,1,'新增分类','新增分类','2023-12-08 09:17:45',1,'2023-12-11 00:40:50'),(6,1,'1210test','1210test','2023-12-10 03:02:05',1,'2023-12-11 00:44:46'),(7,1,'前端相关官方文档','前端相关官方文档desc','2023-12-10 03:03:14',0,'2023-12-11 05:37:05'),(8,1,'testt','testttestt','2023-12-10 04:48:12',1,'2023-12-11 00:58:26'),(9,1,'asd','asd','2023-12-10 05:01:29',1,'2023-12-11 00:56:03'),(10,1,'123','1233','2023-12-10 05:03:09',1,'2023-12-11 00:56:17'),(11,1,'3334','3333','2023-12-10 12:53:28',1,'2023-12-11 05:36:27'),(12,1,'123','1233','2023-12-10 13:33:39',1,'2023-12-11 05:36:23'),(13,1,'12351235123','1234','2023-12-10 13:34:09',1,'2023-12-11 05:36:19'),(14,1,'12312354','1234','2023-12-10 13:34:26',1,'2023-12-11 05:34:28'),(15,1,'r1234','1243','2023-12-10 13:43:28',1,'2023-12-11 00:58:55'),(16,1,'123','1234','2023-12-10 13:44:29',1,'2023-12-11 00:58:50'),(17,1,'123','123123','2023-12-11 00:37:21',1,'2023-12-11 00:58:44'),(18,1,'0108test','','2024-01-08 15:32:13',1,'2024-01-08 15:32:18'),(19,1,'娱乐','','2024-01-08 16:06:07',0,'2024-01-08 16:06:07'),(20,3,'依赖平台','','2024-01-20 11:47:55',0,'2024-01-20 11:47:55'),(21,3,'webhome开发地址','','2024-01-22 08:22:34',0,'2024-01-22 08:22:34'),(22,1,'图片素材','','2024-01-24 10:09:37',0,'2024-01-24 10:09:37'),(23,1,'富国工作常用地址','','2024-02-23 14:44:24',0,'2024-02-26 06:56:14'),(24,1,'webhome','webhome项目相关','2024-02-25 02:52:16',0,'2024-02-25 02:52:16');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `links` (
  `link_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `link_name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`link_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `links_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES (1,1,'百度','https://www.baidu.com','百度一下你就知道','2023-12-06 02:11:57',0,'2023-12-07 00:39:04'),(2,1,'antd','https://ant-design.antgroup.com/components/overview-cn/','antddesc','2023-12-06 09:39:36',1,'2024-01-19 09:42:54'),(3,1,'chat','https://suchat.chatbh.com','chatdesc','2023-12-06 10:48:09',1,'2023-12-07 01:51:42'),(4,1,'语雀','https://www.yuque.com/dashboard','https://www.yuque.com/dashboard语雀','2023-12-06 11:55:53',0,'2023-12-07 00:39:04'),(5,1,'RN','https://www.reactnative.cn/docs/components-and-apis','REACT-NATIVE','2023-12-07 01:52:40',1,'2023-12-08 09:43:23'),(6,1,'test','testurl','testdesc','2023-12-07 12:15:01',0,'2023-12-07 12:15:01'),(7,1,'antd-RN','https://rn.mobile.ant.design/components/list-cn/','rn.mobile.ant.design','2023-12-08 09:26:13',0,'2023-12-08 09:26:13'),(8,1,'react','https://react.docschina.org/','','2023-12-10 04:50:40',0,'2023-12-10 04:50:40'),(9,19,'bilibili','https://www.bilibili.com/','','2024-01-08 16:09:30',0,'2024-01-08 16:09:30'),(10,1,'0115test','123','','2024-01-15 07:16:32',1,'2024-01-15 07:54:06'),(11,1,'chat8','https://suchat.chatbh.com/#/home?from=lg','chatGPT---','2024-01-15 08:15:30',0,'2024-01-15 08:28:53'),(12,7,'MDN','https://developer.mozilla.org/zh-CN/','https://developer.mozilla.org/zh-CN/','2024-01-19 07:00:59',0,'2024-01-19 07:00:59'),(13,20,'阿里云短信服务','https://help.aliyun.com/zh/sms/getting-started/get-started-with-sms?spm=a2c4g.11186623.0.0.396a888bgH59QR','','2024-01-20 11:48:10',0,'2024-01-20 11:48:10'),(14,21,'home','http://localhost:3000/home?page_id=1','','2024-01-22 08:22:51',0,'2024-01-22 08:22:51'),(15,1,'地图','https://map.baidu.com/@13532591,3642468,13z','百度地图','2024-01-24 05:24:39',0,'2024-01-24 05:24:39'),(16,22,'pixabay','https://pixabay.com/images/search/?order=ec','','2024-01-24 10:09:52',0,'2024-01-24 10:09:52'),(17,22,'pexels','https://www.pexels.com/zh-cn/','','2024-01-24 10:10:08',0,'2024-01-24 10:10:08'),(18,22,'freepik','https://www.freepik.com/','','2024-01-24 10:10:21',0,'2024-01-24 10:10:21'),(19,20,'iconfont','https://www.iconfont.cn/manage/index?spm=a313x.icontype_collection.i3.22.75ca3a81SPfb5J&manage_type=myprojects&projectId=4421438','','2024-01-24 11:10:29',0,'2024-01-24 11:10:29'),(20,7,'ahooks','https://ahooks.js.org/zh-CN/hooks/use-request/index','','2024-01-24 11:21:20',0,'2024-01-24 11:21:20'),(21,24,'ui稿','https://mastergo.com/file/119866506706714?page_id=M&shareId=119866506706714&layer_id=16%3A9640','','2024-02-25 02:52:41',0,'2024-02-25 02:52:41'),(22,24,'云服务器','https://ecs.console.aliyun.com/home#/','','2024-02-25 15:54:54',0,'2024-02-25 15:54:54'),(23,23,'爱发布','https://appdeploy.fullgoal.com.cn/appstore/app/63ede1aa3309ac2dcbbb68c6','','2024-02-26 06:56:35',0,'2024-02-26 06:56:35'),(24,23,'gitlab','http://192.168.41.94:8090/','','2024-02-26 06:57:00',0,'2024-02-26 06:57:00'),(25,23,'confluence','http://confluence.fullgoalos.com.cn/pages/viewpage.action?pageId=52944375','','2024-02-26 06:57:30',0,'2024-02-26 06:57:30'),(26,23,'效能','http://xiaoneng.fullgoal.com.cn:30251/frame/pms/workbench','','2024-02-26 07:11:51',0,'2024-02-26 07:11:51'),(27,23,'短信验证码','http://10.4.49.69/testPlatform/message','','2024-02-26 07:33:12',0,'2024-02-26 07:33:12'),(28,24,'流程图、时序图等','https://app.diagrams.net/','','2024-02-26 08:08:34',0,'2024-02-26 08:08:34');
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `page_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `page_name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`page_id`),
  KEY `pages_ibfk_2` (`user_id`),
  CONSTRAINT `pages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (1,1,'主页','这里是描述','2023-12-06 02:07:42',0,'2024-01-19 00:36:18'),(2,1,'富国基金','富国基金213','2024-01-19 08:02:14',0,'2024-01-20 02:17:46'),(3,1,'webhome','','2024-01-20 11:47:27',0,'2024-01-20 11:47:27');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20240313141951-create-test-0313.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `account` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'invoker','759302142@qq.com','$2a$10$nvuj1wtYCtzoegA3r/ODUech.JG0QdDR56AVbk2b5m2qcgj1rTk6q','2023-12-06 01:30:40',0,'2024-03-16 12:58:29','invoker','18146686507'),(2,NULL,NULL,'$2a$10$CxQs8wV2l/GNc3voBYCeAeRhzGizcW5lbvhVxVzvvCG7eEOYNky2y','2024-03-14 16:48:34',0,'2024-03-14 16:48:34','test','1234513463');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-16 22:48:40
