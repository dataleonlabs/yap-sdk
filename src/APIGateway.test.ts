import 'whatwg-fetch';
import API from './APIGateway';

const gb = global as any;

describe('API Gateway', () => {

    test('U-TEST-1 - Test instance class', async () => {
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'endpoint' });
        expect(aPIGateway).toBeDefined();
        expect(aPIGateway).toBeInstanceOf(API);
    });

    test('U-TEST-2 - Test instance class - negative', async () => {
        try {
            const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: '' });
            expect(aPIGateway).toBeDefined();
        } catch (error) {
            expect(error.message).toEqual('You must specify API Key and API URL');
        }
    });

    test('U-TEST-3 - Test create function', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 200,
                    json() {
                        return { data: { id: 1, name: 'Title' } };
                    },
                });
            });
        });
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
        const user = await aPIGateway.createUser({ name: 'Title' });
        expect(user.name).toBe('Title');
    });

    test('U-TEST-4 - Test create function When model not available for user', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 400,
                    json() {
                        return { errors: ['Model not defined!'] };
                    },
                });
            });
        });
        try {
            const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
            await aPIGateway.createUser({ name: 'Title' });
        } catch (error) {
            expect(error).toBeInstanceOf(Object);
            expect(error.errors).toBeInstanceOf(Array);
            expect(error.errors[0]).toBe('Model not defined!');
        }
    });

    test('U-TEST-5 - Test create function When model not available for user', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 200,
                    json() {
                        return { errors: ['Something went wrong!'] };
                    },
                });
            });
        });
        try {
            const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
            await aPIGateway.createUser({ name: 'Title' });
        } catch (error) {
            expect(error).toBeInstanceOf(Array);
            expect(error[0]).toEqual('Something went wrong!');
        }
    });

    test('U-TEST-6 - Test update function', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 200,
                    json() {
                        return { data: { id: 1, name: 'Title updated' } };
                    },
                });
            });
        });
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
        const user = await aPIGateway.updateUser({ where: { id: 1 }, values: { name: 'Title updated' }, projection: ['id', 'name'] });
        expect(user).toBeInstanceOf(Object);
        expect(user.name).toBe('Title updated');
    });

    test('U-TEST-7 - Test delete function', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 200,
                    json() {
                        return { data: { id: 1 } };
                    },
                });
            });
        });
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
        const user = await aPIGateway.deleteUser({ where: { id: 1 } });
        expect(user).toBeInstanceOf(Object);
        expect(user.id).toBe(1);
    });

    test('U-TEST-8 - Test findOne function', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 200,
                    json() {
                        return { data: { id: 1, name: 'Title' } };
                    },
                });
            });
        });
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
        const user = await aPIGateway.findOneUser({
            where: { id: 1 },
            projection: ['id', 'name'],
        });
        expect(user).toBeInstanceOf(Object);
        expect(user.id).toBe(1);
        expect(user.name).toBe('Title');
    });

    test('U-TEST-9 - Test findAll function', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 200,
                    json() {
                        return { data: [{ id: 1, name: 'John Brown' }, { id: 1, name: 'John Alwin' }] };
                    },
                });
            });
        });
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
        const users = await aPIGateway.findAllUser({
            where: { name: 'John' },
            projection: ['id', 'name'],
        });
        expect(users).toBeInstanceOf(Array);
        expect(users[0].name).toContain('John');
    });

    test('U-TEST-10 - Test when model is not present', async () => {
        try {
            const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
            await aPIGateway.findAll({
                where: { name: 'John' },
                projection: ['id', 'name'],
            });
        } catch (error) {
            expect(error.message).toEqual('You must have a model to perform any action');
        }
    });

    test('U-TEST-11 - Test when corrent model method is not present @deprecated', async () => {
        try {
            const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
            await aPIGateway.searchUser({
                where: { name: 'John' },
                projection: ['id', 'name'],
            });
        } catch (error) {
            expect(error.message).toEqual('Method not supported. Supported methods : create | update | delete | findOne | findAll | count');
        }
    });

    test('U-TEST-12 - Test count function', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 200,
                    json() {
                        return { data: 1 };
                    },
                });
            });
        });
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
        const user = await aPIGateway.countUser({
            where: { id: 1 },
        });
        expect(user).toBe(1);
    });

    test('U-TEST-13 - Test findAll function without where or parameters', async () => {
        gb.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve, _) => {
                resolve({
                    status: 200,
                    json() {
                        return { data: [{ id: 1, name: 'John Brown' }, { id: 1, name: 'John Alwin' }] };
                    },
                });
            });
        });
        const aPIGateway: any = new API({ apiKey: 'xxx', apiUrl: 'http://www.example.com' });
        const users = await aPIGateway.findAllUser();
        expect(users).toBeInstanceOf(Array);
        expect(users[0].name).toContain('John');
    });
});
