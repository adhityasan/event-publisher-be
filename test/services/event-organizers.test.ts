import app from '../../src/app';

describe('\'event-organizers\' service', () => {
  it('registered the service', () => {
    const service = app.service('event-organizers');
    expect(service).toBeTruthy();
  });
});
