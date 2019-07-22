import 'whatwg-fetch';
import APIGateway from './APIGateway';

const supportedMethods = ['create', 'update', 'delete', 'findOne', 'findAll'];

const API = new Proxy(APIGateway, {
    construct: (target, [message]) => {
        const gateway = new APIGateway(message);
        return new Proxy(gateway, {
            get: (target: any, name: string) => {
                const method = supportedMethods.find((method: string) => name.includes(method));
                if (!method) {
                    throw new Error(`Method not supported. Supported methods : ${supportedMethods.join(' | ')}`);
                }
                const model = name.replace(method, '');
                if (!model) {
                    throw new Error(`You must have a model to perform any action`);
                }
                return (args: any) => {
                    return target[method].call(target, model, method, args);
                };
            },
        });
    },
});

export default API;