import app from '../../../src/app';

describe('\'action/invite-committee\' service', () => {
  it('registered the service', () => {
    const service = app.service('action/invite-committee');
    expect(service).toBeTruthy();
  });
});
