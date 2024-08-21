import { State } from "./state";

export const getters = {
  jobs: (state: State) => state.jobs,
  isLoading: (state: State) => state.isLoading,
  job: (state: State) => state.job,
};
