import app from '../../src/app';

describe('"event-categories" service', () => {
  it('registered the service', () => {
    const service = app.service('master/event-categories');
    expect(service).toBeTruthy();
  });
});
