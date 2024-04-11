-- 2024年3月第一次部署数据库部署文档
-- 执行sql

-- 删除pages表的外键约束 为下一步做前提（把用户表的user_id设置为自增）
ALTER TABLE pages DROP FOREIGN KEY pages_ibfk_1;

-- 把用户表的user_id设置为自增
ALTER TABLE users MODIFY COLUMN user_id INT AUTO_INCREMENT;

-- 重新关联用户表和pages表的关系 pages_ibfk_2为2是因为不能重复
ALTER TABLE pages
ADD CONSTRAINT pages_ibfk_2
FOREIGN KEY (user_id)
REFERENCES users(user_id);

-- username、email设置为非必填
ALTER TABLE users MODIFY COLUMN username varchar(255) NULL;
ALTER TABLE users MODIFY COLUMN email varchar(255) NULL;


-- 新增字段
ALTER TABLE users
ADD COLUMN account VARCHAR(255) NOT NULL,
ADD COLUMN phone VARCHAR(255) NOT NULL;





-- 回退sql


ALTER TABLE users MODIFY COLUMN username varchar(255) NOT NULL;
ALTER TABLE users MODIFY COLUMN email varchar(255) NOT NULL;
ALTER TABLE users
DROP COLUMN account,
DROP COLUMN phone;




-- 下面的指令可以查表结构，看信息
SHOW CREATE TABLE users;