-- sql笔记
-- 连接数据库
-- mysql -u root -p
-- 退出
-- exit;
-- 密码
-- qj759302142
-- 创建数据库
-- CREATE DATABASE webhome;
-- 切换数据库
-- USE your_database;
-- USE webhome
-- users表
-- 创建表
-- CREATE TABLE users (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
-- 插入数据
-- INSERT INTO users (username, email, password) VALUES ('invoker', '759302142@qq.com', 'qj759302142');
-- 将users中的id字段改成user_id
-- ALTER TABLE users
-- CHANGE COLUMN id user_id INT;  -- 这里的 INT 应该是你原来 id 列的数据类型，确保匹配
-- pages
CREATE TABLE pages (
    page_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    page_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- INSERT INTO pages (user_id, page_name, description) VALUES ('1', '第一个页面', '这里是描述');
-- categories
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    page_id INT,
    category_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(page_id)
);
-- INSERT INTO categories (page_id, category_name, description) VALUES ('1', '常用地址', '这里是分类描述');
-- links
CREATE TABLE links (
    link_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    link_name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
-- INSERT INTO links (category_id, link_name, url, description) VALUES ('1', '百度', 'https://www.baidu.com', '百度一下你就知道');

在links表中新增is_deleted字段作为逻辑删除
ALTER TABLE links
ADD COLUMN is_deleted BOOLEAN DEFAULT 0;

-- ALTER TABLE categories
-- ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 下面的指令可以查表结构，看信息
SHOW CREATE TABLE users;

-- 数据库备份
mysqldump -u root -p webhome > backup.sql
