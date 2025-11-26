import { UsersModel } from './users.model';

describe('UsersModel', () => {
  it('test user model', () => {
    // given
    const id = 1;
    const name = 'Test User';

    //when
    const model = new UsersModel(id, name);

    // then
    expect(model.id).toBe(1);
    expect(model.name).toBe('Test User');
    expect(typeof model.id).toBe('number');
    expect(typeof model.name).toBe('string');
  });
});
