import app from '../../src/app';

describe('\'event-formats\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-formats');
    expect(service).toBeTruthy();
  });
});
