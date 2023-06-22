CREATE DATABASE ecommerce;

--USER
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    google JSON,
    facebook JSON
);

--PRODUCT
CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    image_url VARCHAR(500),
    in_cart BOOLEAN
);

--ORDER
CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    total INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created DATE NOT NULL,
    user_id uuid NOT NUll, 
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
);

--ORDER ITEM
CREATE TABLE orderItems(
    orderItems_id SERIAL PRIMARY KEY,
    qty INT NOT NULL,
    price INT NOT NULL,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

--CART
CREATE TABLE carts(
    cart_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) 
);

--CART ITEM
CREATE TABLE cartItems(
    cartItems_id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    qty INT NOT NULL;
);

--Add products to products table

INSERT INTO products(name, description, price, image_url, in_cart) VALUES (
    'iPhone 12 Pro',
    'The ultimate iPhone',
    999,
    'https://ss71.vzw.com/is/image/VerizonWireless/iphone-12-pro-pacific-blue?fmt=pjpg&hei=520&wid=350',
    'false'
    );

INSERT INTO products(name, description, price, image_url, in_cart) VALUES (
    'iPhone 12 Pro Max',
    'A total powerhouse',
    1099,
    'https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-12-pro-max-silver-10132020?fmt=pjpg&hei=520&wid=350',
    'false'
    );

INSERT INTO products(name, description, price, image_url, in_cart) VALUES (
    'iPhone 12',
    'A classic, reinvented',
    899,
    'https://ss71.vzw.com/is/image/VerizonWireless/apple-iphone-12-64gb-purple-53017-mjn13ll-a?fmt=pjpg&hei=520&wid=350',
    'false'
    );