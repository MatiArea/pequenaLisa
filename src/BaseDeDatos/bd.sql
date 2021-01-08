CREATE DATABASE pollo;

CREATE TABLE account (

    id_account SERIAL NOT NULL,
    user VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    admin BOOLEAN NOT NULL,
    first BOOLEAN NOT NULL,
    UNIQUE(user),
    CONSTRAINT pk_account PRIMARY KEY (id_account)

)

CREATE TABLE client (

    id_client SERIAL NOT NULL,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    balance FLOAT NOT NULL,
    id_account INT,
    CONSTRAINT pk_client PRIMARY KEY (id_client), 
    CONSTRAINT fk_account FOREIGN KEY (id_account) 
        REFERENCES public.account(id_account) 

)

CREATE TABLE purchase (

    id_purchase SERIAL NOT NULL,
    number INT NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT pk_purchase PRIMARY KEY (id_purchase)

)

CREATE TABLE product (

    id_product SERIAL NOT NULL,
    code INT NOT NULL,
    name VARCHAR NOT NULL,
    stock INT NOT NULL,
    cost_price JSON NOT NULL,
    sale_price FLOAT NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY (id_product)

)

CREATE TABLE expense (

    id_expense SERIAL NOT NULL,
    date DATE NOT NULL,
    type VARCHAR NOT NULL,
    amount FLOAT NOT NULL,
    description TEXT,
    CONSTRAINT pk_expense PRIMARY KEY(id_expense)

)

CREATE TABLE sale (

    id_sale SERIAL NOT NULL,
    number INT NOT NULL,
    date DATE NOT NULL,
    total FLOAT NOT NULL,
    payment FLOAT NOT NULL,
    id_cliente INT NOT NULL,
    CONSTRAINT pk_sale PRIMARY KEY (id_sale),
    CONSTRAINT fk_cliente FOREIGN KEY (id_cliente)
        REFERENCES public.client(id_client),
    UNIQUE(number)
)

CREATE TABLE product_purchase (

    id_product_purchase SERIAL NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    id_purchase INT,
    id_product INT,
    CONSTRAINT pk_product_purchase PRIMARY KEY (id_product_purchase),
    CONSTRAINT fk_purchase FOREIGN KEY (id_purchase) 
        REFERENCES public.purchase(id_purchase), 
    CONSTRAINT fk_product FOREIGN KEY (id_product) 
        REFERENCES public.product(id_product) 

)


CREATE TABLE product_sale (

    id_product_sale SERIAL NOT NULL,
    quantity INT NOT NULL,
    cost_price FLOAT NOT NULL,
    cost_sale FLOAT NOT NULL,
    id_sale INT,
    id_product INT
    CONSTRAINT pk_product_sale PRIMARY KEY (id_product_sale),
    CONSTRAINT fk_sale FOREIGN KEY (id_sale) 
        REFERENCES public.sale(id_sale) 
    CONSTRAINT fk_product FOREIGN KEY (id_product) 
        REFERENCES public.product(id_product) 

)