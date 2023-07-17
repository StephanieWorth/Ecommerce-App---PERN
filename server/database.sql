CREATE DATABASE ecommerceshop;

CREATE EXTENSION "uuid-ossp";

--USER
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    isadmin BOOLEAN DEFAULT 'false',
    created DATE NOT NULL DEFAULT CURRENT_DATE,
    google JSON,
    facebook JSON
);

--GUEST USER
CREATE TABLE guestUsers(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    guestName VARCHAR(255),
    email VARCHAR(255),
    created DATE NOT NULL DEFAULT CURRENT_DATE
);

--PRODUCT
CREATE TABLE products(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(900) NOT NULL,
    img VARCHAR(500),
    size VARCHAR(25) [], --change to []
    color VARCHAR(25) [], --change to []
    price INT NOT NULL,
    category VARCHAR(200) [],
    in_cart BOOLEAN,
    created DATE NOT NULL DEFAULT CURRENT_DATE,
    instock BOOLEAN DEFAULT 'true'
);

--ORDER
CREATE TABLE orders(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    total INT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    user_id uuid, 
    address JSON,
    created DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id), 
    FOREIGN KEY (user_id) REFERENCES guestUsers(id) 
);

--ORDER ITEM
CREATE TABLE orderItems(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    qty INT NOT NULL,
    price INT NOT NULL,
    created DATE NOT NULL DEFAULT CURRENT_DATE,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

--CART
CREATE TABLE carts(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid NOT NULL,
    created DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) 
);

--GUEST CART
CREATE TABLE guestCarts(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    guest_id uuid NOT NULL,
    created DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (guest_id) REFERENCES guestUsers(id)
);

--CART ITEM
CREATE TABLE cartItems(
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    qty INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (cart_id) REFERENCES guestCarts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-----------------------------------------------------
--Add a 2nd FOREIGN KEY to cartItems.cart_id that REFERENCES 
--guestCarts.id
ALTER TABLE cartItems
ADD FOREIGN KEY (cart_id) REFERENCES guestCarts(id);

--Modify orders table to DROP NOT NULL constraint
ALTER TABLE orders
ALTER COLUMN user_id DROP NOT NULL;

--Modify orders table to ADD COLUMN guest_id
ALTER TABLE orders
ADD COLUMN guest_id uuid REFERENCES guestUsers(id);

--consider ON DELETE CASCADE for the cartItems and orderItems when a cart or order is deleted.
-- CART ITEM
ALTER TABLE cartItems
DROP CONSTRAINT cartItems_cart_id_fkey,  -- Drop the existing foreign key constraint
ADD CONSTRAINT fk_cartItems_cart_id
FOREIGN KEY (cart_id)
REFERENCES carts(id)
ON DELETE CASCADE;  -- Add ON DELETE CASCADE option
--Add products to products table

-- CART ITEM
ALTER TABLE cartItems
DROP CONSTRAINT cartItems_guestcart_id_fkey,  -- Drop the existing foreign key constraint
ADD CONSTRAINT fk_cartItems_guestcart_id
FOREIGN KEY (guestcart_id)
REFERENCES guestCarts(id)
ON DELETE CASCADE;  -- Add ON DELETE CASCADE option

INSERT INTO products (name, description, img, size, color, price, category)
VALUES
  ('Lume Illumination Mask', 'Lume Wellness Illumination Mask hydrates skin whiles detoxifying. Leaving your skin with a visible glow and improved skin texture.', 'https://i.ibb.co/PgBdKcT/skincare.jpg', ARRAY['15ml', '35ml', '90ml'], ARRAY['White', 'Silver', 'Gold'], 9.99, ARRAY['Dehydration', 'Barrier Repair/Damage']),
  ('Yours Matte and Moist', 'Yours Matte and Moist leaves your skin beautifully moisturised and mattifies at the same time, with no drying effects. ', 'https://i.ibb.co/ySZxfMh/yours.jpg', ARRAY['15ml', '35ml', '90ml'], ARRAY['Pink', 'Purple', 'Blue'], 19.99, ARRAY['Dehydration']),
  ('Tatcha Cleanse Kit', 'Tatcha cleanse, tone and moisturise, perfect for your daily skincare routine.', 'https://i.ibb.co/djxmQNH/tatcha.jpg', ARRAY['15ml', '35ml', '90ml'], ARRAY['Red', 'Green', 'Yellow'], 29.99, ARRAY['Dehydration', 'Redness']),
  ('Rituals... magic touch body cream', 'Rituals... magic touch body cream will cocoon you in comforting bliss.', 'https://i.ibb.co/bXQZNxv/rituals.jpg', ARRAY['15ml'], ARRAY['Green'], 14.99, ARRAY['Dehydration']),
  ('Nora Eczema CBD Treatment', 'Soothe and heal your skin with Nora Eczema CBD Ointment.', 'https://i.ibb.co/m849KSr/nora.jpg', ARRAY['35ml'], ARRAY['Yellow'], 24.99, ARRAY['Redness', 'Barrier Repair/Damage']),
  ('Necessaire Body Lotion', 'Necessaire The Body Lotion soothes and hydrates skin, free from fragrance it will not irritate.', 'https://i.ibb.co/k02Z0n7/neccessaire.jpg', ARRAY['90ml'], ARRAY['Purple'], 34.99, ARRAY['Redness']),
  ('Neuthy', 'Neuthy Skin Care Serum to restore balance to the skins barrier.', 'https://i.ibb.co/3yD09hT/neauthy.jpg', ARRAY['15ml'], ARRAY['Red'], 11.99, ARRAY['Visible Pores']),
  ('Proven Personalised Day Moisturizer with SPF', 'Proven Personalised Day Moisturiser adapted for your skin type will hydrate and re-balance your skin. With added SPF protects against damage from the sun. ', 'https://i.ibb.co/yNTW702/moisturiser.jpg', ARRAY['35ml'], ARRAY['Orange'], 21.99, ARRAY['Pigmentation/Dark Spots']);
