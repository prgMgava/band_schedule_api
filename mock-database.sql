INSERT INTO "user" (username, email, password, admin, "super_admin", cellphone, is_deleted)
VALUES ('superAdmin', 'tes@email.com', '1234', TRUE, TRUE, '2712345678',FALSE),
 ('admin1', 'tes1@email.com', '1234', TRUE, FALSE, '15123456789', FALSE),
 ('admin2', 'tes2@email.com', '1234', TRUE, FALSE, '9998765432', FALSE),
 ('admin3', 'tes3@email.com', '1234', TRUE, FALSE,'', FALSE)
 
 INSERT INTO "user" (username, email, password, admin, "super_admin", cellphone, is_deleted, band_visibility)
 VALUES ('musico', 'tes4@email.com', '1234', FALSE, FALSE, '5532165000',FALSE, 2);

UPDATE "user" SET "password" = '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2'


INSERT INTO band  ("name", email, "owner", cellphone, is_deleted)
VALUES 
('AC/DC', 'acdc@emai.com', 2, '27123456789', FALSE), 
('Kiss', 'kiss@email.com', 3, '2798765421', FALSE),
('Banda Calipso', 'calpso@email.com', 4, '9999990000', FALSE),
('Banda Dejavu', 'test@email.com', 2, '5555550000', FALSE),
('Evanescence', 'ev@email.com', 2, '6666660000', FALSE),
('Orchestra de Brasília', 'df@email.com', 2, '3339990000', FALSE);

INSERT INTO "label" (title, color, is_deleted)
VALUES
('maiusculas', '#FF0000', FALSE),
('minusculas', '#ff5500', FALSE),
('em negociação', '#FFFF00', FALSE),
('show fechado', '#00FF00', FALSE),
('participação', '#1E90FF', FALSE),
('gravação', '#FF69B4', FALSE)

INSERT INTO appointment ("title", cellphone, status, id_band , "start_date" , "end_date", 
street, district, state, city, "address_number" , "address_complement", id_label)
VALUES
('Meu evento', '123456789', 'agendado', 1, '2022-10-10T13:18:00',
'2022-10-10T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio',1  ),
('Meu evento 2', '123456789', 'concluido', 2, '2022-10-12T13:18:00',
'2022-10-12T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio' ,1 ),
('Meu evento 3', '123456789', 'concluido', 3, '2022-10-01T13:18:00',
'2022-10-01T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio' ,2 ),
('Meu evento 4', '123456789', 'concluido', 4, '2022-10-02T13:18:00',
'2022-10-02T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio' ,3 ),
('Meu evento 5', '123456789', 'concluido', 5, '2022-10-03T13:18:00',
'2022-10-03T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio' ,4 ),
('Meu evento 6', '123456789', 'concluido', 5, '2022-10-03T13:18:00',
'2022-10-03T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio' ,4 )

INSERT INTO appointment ("title", cellphone, status, id_band , "start_date" , "end_date", 
street, district, state, city, "address_number" , "address_complement", id_label, "event", "money", company_name, contractor, company_cellphone, company_contact, company_email, emphasis, observations, creator)
VALUES
('Meu evento', '123456789', 'agendado', 1, '2022-11-08T13:18:00',
'2022-11-08T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio',1, 'Show', 'Cache', 'Minha empresa', 'Silvio Santos', '(27) 99999-9999', 'Contato da empresa', 'company@email.com', 'Destaque exemplo', 'Evento muito legal', 'admin1'  )
