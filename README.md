FASE 1: NECESSIDADE DO CLIENTE

Controle de caixa: entrada e saida
Saldo mensasl
Cadastrar pagantes e devedores (nao entendi muito bem esse cadastro)
gerar relatorios , imprimir ou exportar csv

- Ao final ou no decorrer de cada evento como usuario devo conseguir cadastrar os valores recebidos e gastos realizados;
  Informando valores que entraram , sairam, pagante, descricao das transações, data, link para nota fiscal (subir nota fiscal no drive), banda e evento que estao relacionados ao gastos

- Painel de controle: Como usario devo visualizar graficos de por centagens por mês de faturamento, comparação entre meses, grafico com desempenho anual dos gastos e ganhos, tabela com valores diarios que entraram e sairam;

- Como usuario posso gerar relatorios para impressão ou exportacao em excell

- Como usario consigo definir limites de gastos (por mes, por banda, semana?) e entao receber alertar ou notificações de gastos que ultrapassem o limite;

- Como usuario recebo alertas ou notificacoes de contas a vencer ou a serem cobradas;

FASE 2 - MODELAGEM

FASE 3 - Use cases Back end:
https://www.treasy.com.br/blog/demonstrativo-de-fluxo-de-caixa-planilha/

Fase 4 - Wireframes front end
modal,
dashboard,

ORÇAMENTO:

Gestão do Demonstrativo de Fluxo de Caixa
BACK-END (sistema e banco de dados):
Nova tabela no banco de dados: registros de entrada e saidas;
Serviços para criar, atualizar, obter e deletar estes registros;
Filtragem avançada para trazer registros por datas e periodos;
Permições para quem pode manipular ou ver estes dados;

FRONT-END (design e paginas no site):
Novo item no menu: Financeiro;
Tabela com registros de entrada e saida mensal;
Grafico mostrando movimentação por periodo. Por padrão é anual;
Sumario mostrando total de valores de entradas e saidas;
Formulario para cadastro de novos registros;
Atualizar servidor com novas implementações (hostinger)

Todos esta implementações terão filtros por datas ou periodo;

Horas de trabalho (aproximadamente):
8h
Valor hora: 34R$
Total orçamento: 275R$

Previsão da entrega: 5 dias úteis

Novas requisições:

Relatórios: gerar relatórios para impressão

- Exemplos de relatorios - o do video / montar relatorio final por mes, periodo e ano
- PDF ou Excel - somente pdf
- Lib que vao gerar relatorios:
  - https://www.papodigital.net.br/blog/criando-documentos-pdf-com-reactjs
  - https://www.youtube.com/watch?v=2zDFPM4l7Zw

Novos cadastros: Fornecedores e Saídas no checkout

Novos campos na tabela checkout: responsável - estará relacionado ao fornecedor ou saída ID, eventos relacionados ao eventos

- Configuracao impressora - entidade

BUGS:
Valor na tabela aparece sem ponto, sem formatação de moeda

30'

ORÇAMENTO:

Impressão de relatórios
BACK-END (sistema e banco de dados):
Nova tabela no banco de dados: fornecedores (para entradas), profissionais - músico, operador, comercial (para saídas);
Serviços para criar, atualizar, obter e deletar estes fornecedores/profissionais;
Relacionamento entre entrada/saída com eventos e também fornecedores/músicos/outros
Novos filtros com período de data: de tal dia a tal dia; filtro por eventos (para gerar a impressão)
Sumário mostrando total de despesas e ganhos por evento dentro de um limite de data

FRONT-END (design e paginas no site):
Novos campos no formulário: selecionar fornecedor/profissional
Novo item no menu: formulário de cadastro, edição e remoção de fornecedor/profissional
Geração de PDF, usar os dados do banco de dados para geração de textos e tabelas
Formulário para filtragem e impressão das entradas e saídas

Horas de trabalho (aproximadamente):
8h
Valor hora: 34R$
Total orçamento: 275R$

Previsão da entrega: 12/03/2023

TODO: criar migration, controller fornecedor, editar controller do checkout e testar
