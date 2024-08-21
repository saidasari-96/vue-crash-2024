import { State, Job } from "./state";

export const mutations = {
  SET_JOBS(state: State, jobs: any[]) {
    state.jobs = jobs;
  },
  SET_JOB(state: State, job: Job) {
    state.job = job;
  },
  SET_LOADING(state: State, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  DELETE_JOB(state: State, jobId: number) {
    state.jobs = state.jobs.filter((job) => job.id !== jobId);
  },
};
