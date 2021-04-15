import app from '../../src/app';

describe('\'email-verification\' service', () => {
  it('registered the service', () => {
    const service = app.service('email-verification');
    expect(service).toBeTruthy();
  });
});
