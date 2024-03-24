-- 将pages表中user_id字段名改成created_by
ALTER TABLE pages
CHANGE COLUMN user_id created_by INT(11) NOT NULL;

-- categories表新增created_by字段
ALTER TABLE categories
ADD COLUMN created_by INT(11) NOT NULL;

-- 将pages中的created_by字段的值赋值给categories中的created_by字段
UPDATE categories c
INNER JOIN pages p ON c.page_id = p.page_id
SET c.created_by = p.created_by;


ALTER TABLE links
ADD COLUMN created_by INT(11) NOT NULL;

UPDATE links c
INNER JOIN categories p ON c.category_id = p.category_id
SET c.created_by = p.created_by;







-- 分割线--------------------------------------------------------
-- 回撤sql
ALTER TABLE pages
CHANGE COLUMN created_by user_id INT(11) NOT NULL;

ALTER TABLE categories
DROP COLUMN created_by;

ALTER TABLE links
DROP COLUMN created_by;

