INSERT INTO "user" ("username", "password", "admin")
VALUES
('admin1', '$2b$10$GgX8HPoO1gdpZ18pxzGcge1gHAIbnrs.dp4MWRMCjApcd9mRZO3ve', TRUE),
('admin2', '$2b$10$GgX8HPoO1gdpZ18pxzGcge1gHAIbnrs.dp4MWRMCjApcd9mRZO3ve', TRUE);

INSERT INTO band ("name", owner)
VALUES 
('KISS', 5),
('AC/DC', 5),
('Banda Dejavu', 5),
('Calipso', 5),
('Aviões do forro', 5),
('Paramore', 5),
('Evanescence', 6),
('KPOP', 6),
('Jackson 5', 6),
('Anita', 6),
('Gustavo Lima', 6);

INSERT INTO label ("title", "color")
VALUES
('Agendado', 'FF0000'),
('TV/RADIO', 'FF00EF'),
('Teatro', '8000FF'),
('Reservado', '0033FF'),
('Contrato', '00EFFF'),
('Churrasquinho', '00FF66'),
('Participação', 'DEFF00'),
('Ginga', 'FF4400'),
('Ensaio interno', 'E6FF00'),
('Confirmado', '000000'),
('Cancelado', 'FFA200'),
('Concluido', '00FFAB');


Novas atualizacoes:
1 - Tooltip mostrando informações quando passar o mouse por cima do evento;
2 - Novos campos no formulario: (bilheteria, cache), evento (corporativo, show, participação);
3 - FILTROS: por artistas
4 - Nova tela: lista com os compromissos filtrados por mes

