// tslint:disable-next-line: no-submodule-imports
import 'whatwg-fetch';
import API from './API';
// tslint:disable-next-line: ordered-imports
import * as sinon from 'sinon';

describe('API Gateway', () => {

    let server: sinon.SinonFakeServer;

    beforeAll(() => {
        server = sinon.fakeServer.create();
        sinon.stub(window, 'fetch');
    });

    afterEach(() => {
        server.restore();
        // window.fetch.restore();
    });

    test('U-TEST-1 - Test instance class', async () => {
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'endpoint' });
        // const user = aPIGateway.createUser({ name: 'Yash' });
        expect(aPIGateway).toBeDefined();
    });

    test('U-TEST-2 - Test create function', async () => {
        server.respondWith("POST", "http://www.example.com", [200, { "Content-Type": "application/json" },
            '{ "id": 12, "name": "Yash" }']);
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
        server.respond();
        const user = await aPIGateway.createEntity({ name: 'Yash' });
        expect(user).toBe('Yash');
    });
});
