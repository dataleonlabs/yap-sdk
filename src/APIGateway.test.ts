import APIGateway from './APIGateway';

describe('API Gateway', () => {
  test('U-TEST-1 - Test instance class', () => {
    const aPIGateway = new APIGateway(1);
    expect(aPIGateway.greet()).toEqual(1);
  });
});
