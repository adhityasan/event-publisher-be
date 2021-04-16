import app from '../../src/app';

describe('\'interest\' service', () => {
  it('registered the service', () => {
    const service = app.service('interest');
    expect(service).toBeTruthy();
  });
});
