// state.test.ts
import { state } from '@/store/state';

describe('state', () => {
  it('has initial state values', () => {
    expect(state.jobs).toEqual([]);
    expect(state.job).toEqual({
      id: 0,
      title: "",
      description: "",
      type: "",
      location: "",
      salary: "",
      company: {
        name: "",
        description: "",
        contactEmail: "",
        contactPhone: "",
      },
    });
    expect(state.isLoading).toEqual(false);
  });
});