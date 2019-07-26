import 'whatwg-fetch';
import APIGatewayRoutes from './APIGatewayRoutes';

const supportedMethods = ['create', 'update', 'delete', 'findOne', 'findAll', 'count'];

const API = new Proxy(APIGatewayRoutes, {
  construct: (target, [message]) => {
    const gateway = new APIGatewayRoutes(message);
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
        return (args: any = {}) => {
          switch (method) {
            case 'create':
              const params = {
                values: args,
                type: method,
                model,
              };
              return target[method](params);
            default:
              args.type = method;
              args.model = model;
              return target[method](args);
          }
        };
      },
    });
  },
});

export default API;