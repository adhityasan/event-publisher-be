import app from '../../src/app';

describe('\'event-categories\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-categories');
    expect(service).toBeTruthy();
  });
});
