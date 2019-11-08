# otp-app-js

## Setup
### Requisitos
1. git
2. docker
3. docker-compose

### Setup
1. `git clone https://github.com/xikaos/otp-app-js`
2. `cd otp-app-js`
3. `docker-compose up`
4. `docker-compose exec app npm install`
5. `docker-compose exec app npm run serve`
6. Abra outro terminal no mesmo diretório, digite `docker-compose exec app node app.js`
7. Acesse localhost no navegador na porta 80

## Objetivo
O objetivo da aplicação é demonstrar na prática o OTP e demonstrar possíveis ataques contra sua arquitetura e implementação.

## Proposta
Através de uma aplicação web que irá agir como um gerador na arquitetura do OTP, o usuário poderá validar se o seu OTP gerado corresponde com o OTP gerado no servidor com a senha correspondente. A idéia é permitir que o usuário selecione a implementação desejada (TOTP, HOTP), insira sua senha e submeta a requisição. Também é necessário que as variáveis do servidor (janela de tempo,  contador e última senha válida) sejam exibidas para o cliente por questões de demonstração.

## Implementação

### Frontend
Para que o navegador possa agir como um gerador, é necessário que uma biblioteca Javascript disponibilize essas funções, tanto para o TOTP quanto para HOTP. A biblioteca utilizada foi a [lepture/otpauth](https://github.com/lepture/otpauth). 


Em relação a interface gráfica, para a geração, serão necessários:
* Input de texto para a senha do usuário
* Select do algorítmo desejado
* Botão de geração de eventos (para o HOTP)
* Botão de submissão

Para exibição das variáveis do servidor, será necessário:
* Contador (HOTP)
* Contador Janela de Tempo (TOTP)
* Última senha válida (ambos)

### Backend
Para permitir a autenticação, alguns endpoints serão necessários. Eles podem ser divididos entre endpoints de geração e endpoints de validação.

#### Consulta
Para permitir a obtenção dos parâmetros do servidor, é necessário que dois endpoints existam, sendo eles:
1. `GET /api/hotp/params` - Busca o contador no servidor.
2. `GET /api/totp/params` - Busca a janela de tempo no servidor.

Através destes endpoints, o código Javascript poderá exibir os parâmetros da implementação OTP utilizada. Ambos os endpoints irão retornar a última senha OTP válidada.

#### Validação
Para efetivamente autenticar o usuário, os seguintes endpoints são necessários:

1. `POST /api/hotp/validate` - Através do parâmetro `email` enviado em formato JSON, o servidor localiza o `password` correspondente (localizado em app.js) e computa o OTP. Esse OTP então é comparado com o OTP calculado localmente pelo usuário, retornando se este é válido ou não. 
2. `POST /api/totp/auth` - Exatamente a mesma coisa que o endpoint anterior.

Caso o usuário tenha enviado a senha correta, os endpoints irão retornar código 200 e caso contrário, irão retornar código 401.

## Ataques
É necessário que alguns ataques sejam realizados de forma a demonstrar vulnerabilidades da arquitetura do sistema OTP e de suas implementações. Eles podem ser divididos entre essas duas categorias, respectivamente:

### Arquitetura
Elaborar um cenário de bruteforce. É improvável que na demonstração feita durante a aprensentação isso seja viável, de forma que os ataques serão mais focados na implementação.

### Implementação
Alguns cenários envolvendo a implementação do gerador OTP no cliente e no servidor podem ser explorados.
### Cliente
1. Inclusão deu um arquivo Javascript malicioso que implanta um keylogger no input de passphrase.
2. Acesso as variáveis de geração do OTP através da extensão de debug do Vue.
3. Encontrar mais umas duas ou três.

### Servidor
1. DOS.
2. Comprometimento do servidor e debug das variáveis.
3. Mais um tá tri.