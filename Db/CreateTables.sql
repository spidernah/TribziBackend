CREATE TABLE IF NOT EXISTS user(
    id int(11) NOT NULL auto_increment,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
--     shopId varchar(50) NON NULL,
    PRIMARY KEY (id)
);
