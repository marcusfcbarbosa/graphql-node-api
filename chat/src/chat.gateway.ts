import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets'

@WebSocketGateway(5000)//pode definir a porta que vai estar usando no seu servidor
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    //Definimos um servidor aqui dentro
    @WebSocketServer()

    handleConnection(client: any) {
        console.log(client.id + ' conectando ..');

        client.emit('connection', 'Conectado ao servidor..');

        client.broadcast.emit('users', {
            user: client.id, //Voce emite uma mensagem para um cliente especifico
            action: 'connected'
        });
    }

    handleDisconnect(client: any) {
        console.log(client.id + ' desconectando ..');
        client.broadcast.emit('users', {
            user: client.id, //Voce emite uma mensagem para um cliente especifico
            action: 'disconnected'
        });
    }


    @SubscribeMessage('chat')
    chat(client: any, data: any) {
        //cliente emite para usuarios internos
        console.log(data);
        client.emit(client.id, 'Mensagem');//mandando mensagem para cliente especifico
        client.broadcast.emit('chat', data);//emite mensagem pro chat todo
    }

    @SubscribeMessage('users')
    users(client: any, data: any) {
        //usuarios internos para os clientes
        console.log(data);
        return data;
    }
}