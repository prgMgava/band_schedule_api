INSERT INTO "user" (username, email, password, admin, "super_admin", cellphone, is_deleted)
VALUES ('superAdmin', 'tes@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', TRUE, TRUE, '2712345678',FALSE),
 ('admin1', 'tes1@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', TRUE, FALSE, '15123456789', FALSE),
 ('admin2', 'tes2@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', TRUE, FALSE, '9998765432', FALSE),
 ('admin3', 'tes3@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', TRUE, FALSE,'', FALSE);
 
 INSERT INTO "user" (username, email, password, admin, "super_admin", cellphone, is_deleted, band_visibility)
 VALUES ('musico', 'tes4@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', FALSE, FALSE, '5532165000',FALSE, 2);


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
('CHURRASQUINHO', '#f76060ff', FALSE),
('CONFIRMADO', '#C4EAA7', FALSE),
('RADIO/TV/LIVE', '#A1CEF4', FALSE),
('ENSAIO INTERNO', '#F7AFF2', FALSE),
('PARTICIPAÇÃO', '#e655b8ff', FALSE),
('CONTRATO + SINAL', '#59F44E', FALSE),
('RESERVADO', '#E1DFDF', FALSE),
('GINGA', '#FEFE00', FALSE),
('GRAVAÇÃO', '#EDFF02', FALSE),
('LANÇ. PLATAFORMA DIGITAL', '#1AAEB3', FALSE),
('LEMBRETES', '#FBE9AE', FALSE),
('NEGOCIANDO', '#FEB583', FALSE),
('OUTROS', '#3C49F4ff', FALSE),



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
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio' ,4 );

INSERT INTO appointment ("title", cellphone, status, id_band , "start_date" , "end_date", 
street, district, state, city, "address_number" , "address_complement", id_label, "event", "money", company_name, contractor, company_cellphone, company_contact, company_email, emphasis, observations, creator)
VALUES
('Meu evento', '123456789', 'agendado', 1, '2022-11-08T13:18:00',
'2022-11-08T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio',1, 'Show', 'Cache', 'Minha empresa', 'Silvio Santos', '(27) 99999-9999', 'Contato da empresa', 'company@email.com', 'Destaque exemplo', 'Evento muito legal', 'admin1'  )

INSERT INTO checkout (value, description, date, type, owner, id_band, is_deleted)
VALUES
(3012.12, 'CHECKOUT A', '2023-01-01', 1, 'RESPONSAVEL', 1, false),
(12.12, 'CHECKOUT B', '2023-01-05', 2, 'RESPONSAVEL', 1, false),
(112.12, 'CHECKOUT C', '2023-01-10', 1, 'RESPONSAVEL', 1, false),
(31012.12, 'CHECKOUT D', '2023-02-02', 1, 'RESPONSAVEL', 1, false),
(312.12, 'CHECKOUT E', '2023-02-02', 1, 'RESPONSAVEL', 1, false),
(2.12, 'CHECKOUT F', '2023-02-03', 1, 'RESPONSAVEL', 1, false),
(512.12, 'CHECKOUT G', '2023-02-05', 1, 'RESPONSAVEL', 1, false),
(5012.12, 'CHECKOUT H', '2023-03-03', 1, 'RESPONSAVEL', 1, false),
(1032.12, 'CHECKOUT I', '2023-03-03', 1, 'RESPONSAVEL', 1, false),
(1032.12, 'CHECKOUT J', '2023-03-03', 1, 'RESPONSAVEL', 1, false),
(3012.12, 'CHECKOUT K', '2023-04-04', 1, 'RESPONSAVEL', 1, false),
(4042.12, 'CHECKOUT L', '2023-04-04', 1, 'RESPONSAVEL', 1, false),
(72.12, 'CHECKOUT M', '2023-05-05', 1, 'RESPONSAVEL', 1, false),
(712.12, 'CHECKOUT N', '2023-05-05', 1, 'RESPONSAVEL', 1, false),
(7.12, 'CHECKOUT O', '2023-05-05', 1, 'RESPONSAVEL', 1, false),
(0.12, 'CHECKOUT P', '2023-06-06', 1, 'RESPONSAVEL', 1, false),
(42.12, 'CHECKOUT Q', '2023-06-06', 1, 'RESPONSAVEL', 1, false),
(43062.12, 'CHECKOUT R', '2023-06-06', 1, 'RESPONSAVEL', 1, false),
(512.12, 'CHECKOUT S', '2023-07-07', 1, 'RESPONSAVEL', 1, false),
(112.12, 'CHECKOUT T', '2023-08-08', 1, 'RESPONSAVEL', 1, false),
(1012.12, 'CHECKOUT U', '2023-10-10', 1, 'RESPONSAVEL', 1, false),
(7012.12, 'CHECKOUT V', '2023-11-11', 1, 'RESPONSAVEL', 1, false),
(8012.12, 'CHECKOUT X', '2023-12-12', 1, 'RESPONSAVEL', 1, false),
(112.12, 'CHECKOUT Z', '2023-12-12', 1, 'RESPONSAVEL', 1, false);


// MYSQL

INSERT INTO `user` (username, email, password, admin, `super_admin`, cellphone, is_deleted)
VALUES ('superAdmin', 'tes@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', TRUE, TRUE, '2712345678',FALSE),
 ('admin1', 'tes1@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', TRUE, FALSE, '15123456789', FALSE),
 ('admin2', 'tes2@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', TRUE, FALSE, '9998765432', FALSE),
 ('admin3', 'tes3@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', TRUE, FALSE,'', FALSE);
 
 INSERT INTO `user` (username, email, password, admin, `super_admin`, cellphone, is_deleted, band_visibility)
 VALUES ('musico', 'tes4@email.com', '$2b$10$Mr7b0LTr33H4rNfrfQf5OOS4WDkK6PHQEe5FfNSyp4DVPWA/hDYt2', FALSE, FALSE, '5532165000',FALSE, 2);

 INSERT INTO band  (`name`, email, `owner`, cellphone, is_deleted)
VALUES 
('AC/DC', 'acdc@emai.com', 2, '27123456789', FALSE), 
('Kiss', 'kiss@email.com', 3, '2798765421', FALSE),
('Banda Calipso', 'calpso@email.com', 4, '9999990000', FALSE),
('Banda Dejavu', 'test@email.com', 2, '5555550000', FALSE),
('Evanescence', 'ev@email.com', 2, '6666660000', FALSE),
('Orchestra de Brasília', 'df@email.com', 2, '3339990000', FALSE);

INSERT INTO `label` (title, color, is_deleted)
VALUES
('CHURRASQUINHO', '#f76060ff', FALSE),
('CONFIRMADO', '#C4EAA7', FALSE),
('RADIO/TV/LIVE', '#A1CEF4', FALSE),
('ENSAIO INTERNO', '#F7AFF2', FALSE),
('PARTICIPAÇÃO', '#e655b8ff', FALSE),
('CONTRATO + SINAL', '#59F44E', FALSE),
('RESERVADO', '#E1DFDF', FALSE),
('GINGA', '#FEFE00', FALSE),
('GRAVAÇÃO', '#EDFF02', FALSE),
('LANÇ. PLATAFORMA DIGITAL', '#1AAEB3', FALSE),
('LEMBRETES', '#FBE9AE', FALSE),
('NEGOCIANDO', '#FEB583', FALSE),
('OUTROS', '#3C49F4ff', FALSE)


INSERT INTO appointment (`title`, cellphone, status, id_band , `start_date` , `end_date`, 
street, district, state, city, `address_number` , `address_complement`, id_label)
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
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio' ,4 );

INSERT INTO appointment (`title`, cellphone, status, id_band , `start_date` , `end_date`, 
street, district, state, city, `address_number` , `address_complement`, id_label, `event`, `money`, company_name, contractor, company_cellphone, company_contact, company_email, emphasis, observations, creator)
VALUES
('Meu evento', '123456789', 'agendado', 1, '2022-11-08T13:18:00',
'2022-11-08T15:18:00', 'Rua Alameda',
'Bairro Republica', 'ES', 'Vitória', '123', 'Proximo a radio',1, 'Show', 'Cache', 'Minha empresa', 'Silvio Santos', '(27) 99999-9999', 'Contato da empresa', 'company@email.com', 'Destaque exemplo', 'Evento muito legal', 'admin1'  )

INSERT INTO creditor (`name`, is_supplier)
VALUES
('Baterista', FALSE),
('Percussão', FALSE),
('Baixista', FALSE),
('Violão', FALSE),
('Operador Staff', FALSE),
('Comercial', FALSE),
('Casa Noturna', TRUE),
('Estadio', TRUE),
('Teatro', TRUE)


INSERT INTO checkout (value, description, date, type, owner, id_band, is_deleted, id_appointment, id_creator)
VALUES
(3012.12, 'CHECKOUT A', '2023-01-01', 1, 'RESPONSAVEL', 1, false,1, 1),
(12.12, 'CHECKOUT B', '2023-01-05', 2, 'RESPONSAVEL', 1, false,1, 1),
(112.12, 'CHECKOUT C', '2023-01-10', 1, 'RESPONSAVEL', 1, false,1, 1),
(31012.12, 'CHECKOUT D', '2023-02-02', 1, 'RESPONSAVEL', 1, false,2, 2),
(312.12, 'CHECKOUT E', '2023-02-02', 1, 'RESPONSAVEL', 1, false,2, 2),
(2.12, 'CHECKOUT F', '2023-02-03', 1, 'RESPONSAVEL', 1, false,2, 2),
(512.12, 'CHECKOUT G', '2023-02-05', 1, 'RESPONSAVEL', 1, false,2, 2),
(5012.12, 'CHECKOUT H', '2023-03-03', 1, 'RESPONSAVEL', 1, false,2, 2),
(1032.12, 'CHECKOUT I', '2023-03-03', 1, 'RESPONSAVEL', 1, false,2, 2),
(1032.12, 'CHECKOUT J', '2023-03-03', 1, 'RESPONSAVEL', 1, false,3, 3),
(3012.12, 'CHECKOUT K', '2023-04-04', 1, 'RESPONSAVEL', 1, false,3, 3),
(4042.12, 'CHECKOUT L', '2023-04-04', 1, 'RESPONSAVEL', 1, false,3, 3),
(72.12, 'CHECKOUT M', '2023-05-05', 1, 'RESPONSAVEL', 1, false,3, 3),
(712.12, 'CHECKOUT N', '2023-05-05', 1, 'RESPONSAVEL', 1, false,3, 3),
(7.12, 'CHECKOUT O', '2023-05-05', 1, 'RESPONSAVEL', 1, false,3, 3),
(0.12, 'CHECKOUT P', '2023-06-06', 1, 'RESPONSAVEL', 1, false,3, 3),
(42.12, 'CHECKOUT Q', '2023-06-06', 1, 'RESPONSAVEL', 1, false,3, 3),
(43062.12, 'CHECKOUT R', '2023-06-06', 1, 'RESPONSAVEL', 1, false,3, 3),
(512.12, 'CHECKOUT S', '2023-07-07', 1, 'RESPONSAVEL', 1, false,3, 3),
(112.12, 'CHECKOUT T', '2023-08-08', 1, 'RESPONSAVEL', 1, false,4, 4),
(1012.12, 'CHECKOUT U', '2023-10-10', 1, 'RESPONSAVEL', 1, false,4, 4),
(7012.12, 'CHECKOUT V', '2023-11-11', 1, 'RESPONSAVEL', 1, false,4, 4),
(8012.12, 'CHECKOUT X', '2023-12-12', 1, 'RESPONSAVEL', 1, false,4, 4),
(112.12, 'CHECKOUT Z', '2023-12-12', 1, 'RESPONSAVEL', 1, false,4, 4)