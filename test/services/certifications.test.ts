import app from '../../src/app';

describe('\'certifications\' service', () => {
  it('registered the service', () => {
    const service = app.service('certifications');
    expect(service).toBeTruthy();
  });
});
