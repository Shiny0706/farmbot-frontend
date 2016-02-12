import { getParam } from '../util';

describe('util.js', () => {
  it('parses querystrings', () => {
    expect(getParam("?name=rick")).toEqual({name: "rick"});
  });
});
