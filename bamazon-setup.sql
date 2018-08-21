create database bamazon;

use bamazon;

create table products (
	item_id INTeger NOT NULL AUTO_INCREMENT,
    product_name varchar(30) not null,
    department_name varchar(30),
    price integer(20) not null,
    stock_quantity integer(20),
    primary key (item_id)
);

select * from products; 

insert into products (product_name, department_name, price, stock_quantity)
values ("laptop", "electronics", 550.00, 50), 
	("calculator", "electronics", 45.75, 100),
	("bookbag", "accessories", 35.50,250),
    ("pencils", "accessories", 5.00, 500),
    ("notebook", "accessories", 1.50, 1000),
    ("eraser", "accessories", .99, 4589),
    ("ramen", "food", .25, 53099),
    ("snickers", "food", .50, 24048),
    ("mac n cheese", "food", .99, 39439),
    ("granola bar", "food", .50, 32355),
    ("shoes", "clothes", 45.99, 345),
    ("shirt", "clothes", 20.00, 3400),
    ("pants", "clothes", 55.99, 3828);