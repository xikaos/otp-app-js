# otp-app

## Setup
1. Tenha o docker instalado.
2. Tenha o docker-compose instalado.
3. docker-compose up
4. Abra o navegador com localhost.

## Objetivo
O objetivo da aplicação é demonstrar na prática o OTP e demonstrar possíveis ataques contra sua arquitetura e implementação.

## Proposta
Através de uma aplicação web que irá agir como um gerador na arquitetura do OTP, o usuário poderá se autenticar (ou autenticar uma operação realizada) com o servidor. A idéia é permitir que o usuário selecione a implementação desejada (TOTP, HOTP), insira sua senha e submeta a requisição. Também é necessário que as variáveis do servidor (janela de tempo,  contador e última senha válida) sejam exibidas para o cliente por questões de demonstração.

## Implementação

### Frontend
Para que o navegador possa agir como um gerador, é necessário que uma biblioteca Javascript disponibilize essas funções, tanto para o TOTP quanto para HOTP. Felizmente, encontrei uma no [Github](https://github.com/jiangts/JS-OTP). 

Segundo a documentação, é necessário incluir o arquivo [jsOTP.js](https://github.com/jiangts/JS-OTP/blob/master/dist/jsOTP.js "jsOTP.js") na página que irá fazer a geração. Depois é só chamar as funções passando os devidos parâmetros de acordo com a seleção do usuário.

Em relação a interface gráfica, para a geração, serão necessários:
* Input de texto para a senha do usuário
* Select do algorítmo desejado
* Botão de submissão

Para exibição das variáveis do servidor, será necessário:
* Contador (HOTP)
* Contador Janela de Tempo (TOTP)
* Última senha válida (ambos)

### Backend
Para permitir a autenticação, alguns endpoints serão necessários. Eles podem ser divididos entre endpoints de geração e endpoints de validação.

#### Consulta
Para permitir a obtenção dos parâmetros do servidor, é necessário que dois endpoints existam, sendo eles:
1. `GET /hotp/params` - Busca o contador no servidor.
2. `GET /totp/params` - Busca a janela de tempo no servidor.

Através destes endpoints, o código Javascript poderá exibir os parâmetros da implementação OTP utilizada, que irá comparar o resultado enviado aos endpoints de validação com o resultado computado localmente. Ambos os endpoints irão retornar a última senha OTP válidada.

#### Validação
Para efetivamente autenticar o usuário, os seguintes endpoints são necessários:

1. `POST /hotp/auth` - Compara o parâmetro `password` enviado com o valor do HOTP computado localmente.
2. `POST /totp/auth` - Compara o parâmetro `password` enviado com o valor do TOTP computado localmente.

Caso o usuário tenha enviado a senha correta, os endpoints irão retornar código 200 e caso contrário, irão retornar código 401.

## Ataques
É necessário que alguns ataques sejam realizados de forma a demonstrar vulnerabilidades da arquitetura do sistema OTP e de suas implementações. Eles podem ser divididos entre essas duas categorias, respectivamente:

### Arquitetura
Exibir os cenários que podem comprometer a segurança relativos a arquitetura do sistema OTP.

### Implementação
Exibir os cenários que podem comprometer a segurança relativos a implementação do sistema OTP.