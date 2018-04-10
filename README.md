# Quake log API

# Problema
Construa um parser para o arquivo de log games.log e exponha uma API de consulta.

O arquivo games.log é gerado pelo servidor de quake 3 arena. Ele registra todas as informações dos jogos, quando um jogo começa, quando termina, quem matou quem, quem morreu pq caiu no vazio, quem morreu machucado, entre outros.

O parser deve ser capaz de ler o arquivo, agrupar os dados de cada jogo, e em cada jogo deve coletar as informações de morte.

# Exemplo

      21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
  
  O player "Isgalamido" morreu pois estava ferido e caiu de uma altura que o matou.

      2:22 Kill: 3 2 10: Isgalamido killed Dono da Bola by MOD_RAILGUN
  
  O player "Isgalamido" matou o player Dono da Bola usando a arma Railgun.
  
Para cada jogo o parser deve gerar algo como:

    game_1: {
        total_kills: 45;
        players: ["Dono da bola", "Isgalamido", "Zeh"]
        kills: {
          "Dono da bola": 5,
          "Isgalamido": 18,
          "Zeh": 20
        }
      }

# Observações
- Quando o `<world>` mata o player ele perde -1 kill.
-`<world>` não é um player e não deve aparecer na lista de players e nem no dicionário de kills.
-`total_kills` são os kills dos games, isso inclui mortes do `<world>`.

 Após construir o parser construa uma API que faça a exposição de um método de consulta que retorne um relatório de cada jogo.

# Requisitos para Aplicação
Node https://nodejs.org/en/  

# Instalação
Após clonar o repositório, utilize o comando via terminal  
`npm install` para baixar os pacotes de dependências.   

# API
Utilizando o comando `node app` ou `npm start` se estiver com o nodemon instalado,  a aplicação rodará em: 
`http://localhost:3000/`
Observação: Configurações setadas no arquivo webconfig.js como URL, PORT e VERSION.    

# Testes Unitários
Para a realização dos testes unitários, foi necessário a instalação no Mocha. Caso o Mocha não seja instalado
executando o comando npm install, basta utilizar o comando npm install -g mocha.
Após a instalação do Mocha, execute o comando npm test.