 CREATE TABLE registrations (
    `registration_id` BIGINT UNSIGNED AUTO_INCREMENT NOT NULL,
    `uuid` VARCHAR(100) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `salt` VARCHAR(100) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `delete_flg` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY (registration_id)
)ENGINE=InnoDB;
