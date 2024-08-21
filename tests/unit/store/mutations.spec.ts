import { mutations } from '@/store/mutations';
import { State, Job } from '@/store/state';

describe('Vuex Mutations', () => {
  let state: State;

  beforeEach(() => {
    // Set up the initial state before each test
    state = {
      jobs: [
        { id: 1, title: 'Job 1', description: '', type: '', location: '', salary: '', company: { name: '', description: '', contactEmail: '', contactPhone: '' } },
        { id: 2, title: 'Job 2', description: '', type: '', location: '', salary: '', company: { name: '', description: '', contactEmail: '', contactPhone: '' } }
      ],
      job: {
        id: 0,
        title: '',
        description: '',
        type: '',
        location: '',
        salary: '',
        company: { name: '', description: '', contactEmail: '', contactPhone: '' }
      },
      isLoading: false
    };
  });

  it('SET_JOBS sets jobs correctly', () => {
    const jobs = [
      { id: 3, title: 'Job 3', description: '', type: '', location: '', salary: '', company: { name: '', description: '', contactEmail: '', contactPhone: '' } }
    ];
    mutations.SET_JOBS(state, jobs);
    expect(state.jobs).toEqual(jobs);
  });

  it('SET_JOB sets a single job correctly', () => {
    const job: Job = {
      id: 4,
      title: 'Job 4',
      description: '',
      type: '',
      location: '',
      salary: '',
      company: { name: '', description: '', contactEmail: '', contactPhone: '' }
    };
    mutations.SET_JOB(state, job);
    expect(state.job).toEqual(job);
  });

  it('SET_LOADING sets isLoading correctly', () => {
    mutations.SET_LOADING(state, true);
    expect(state.isLoading).toBe(true);
    mutations.SET_LOADING(state, false);
    expect(state.isLoading).toBe(false);
  });

  it('DELETE_JOB removes a job by id', () => {
    mutations.DELETE_JOB(state, 1);
    expect(state.jobs).toHaveLength(1);
    expect(state.jobs[0].id).toBe(2); // Only Job with id 2 should remain
  });
});
