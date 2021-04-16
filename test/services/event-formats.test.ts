import app from '../../src/app';

describe('"event-formats" service', () => {
  it('registered the service', () => {
    const service = app.service('master/event-formats');
    expect(service).toBeTruthy();
  });
});
