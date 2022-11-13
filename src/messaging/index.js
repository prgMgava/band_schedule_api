const accountSid = "AC78e0cbf4cfe470005c69aa618647fbf1";
const authToken = "bf541c7b7e85f1b96ccafb004e195e03";
const client = require("twilio")(accountSid, authToken);

export const sendMessage = () => {
    client.messages
        .create({
            body: "Tudo certo para hoje? \nSeu show: 'NOME DO SHOW AQUI' está agendado para '13/11/2022' às '18:00' \nEndereço: 'Rua Zero - DF/Brasilia \nEsta é uma mensagem da RedBul Produções - TESTE SMS",
            from: "whatsapp:+14155238886",
            to: "whatsapp:+5527995270853",
        })
        .then((message) => console.log(message.sid))
        .done();
};

// client.messages

//     .create({
//         body: "Tudo certo para hoje? \nSeu show: 'NOME DO SHOW AQUI' está agendado para '13/11/2022' às '18:00' \nEndereço: 'Rua Zero - DF/Brasilia \nEsta é uma mensagem da RedBul Produções - TESTE SMS",
//         to: "+556195331001",
//         from: "+18583304140",
//     })
//     .then((message) => console.log(message.sid))
//     .done();
