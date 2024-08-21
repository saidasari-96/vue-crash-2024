import axios from "axios";
import { ActionContext } from "vuex";
import { State, Job } from "./state";

export const actions = {
  async fetchJobs({ commit }: ActionContext<State, State>) {
    commit("SET_LOADING", true);
    try {
      const response = await axios.get("/api/jobs");
      commit("SET_JOBS", response.data);
    } catch (error) {
      console.log("Error fetching jobs:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async fetchJob({ commit }: ActionContext<State, State>, jobId: number) {
    commit("SET_LOADING", true);
    try {
      const response = await axios.get(`/api/jobs/${jobId}`);
      commit("SET_JOB", response.data);
    } catch (error) {
      console.log("Error fetching job:", error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  async addJob({ commit }: ActionContext<State, State>, job: Job) {
    try {
      const response = await axios.post(`/api/jobs`, job);
      commit("SET_JOB", response.data);
      return response.data; // Return updated job for navigation
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async updateJob({ commit }: ActionContext<State, State>, job: Job) {
    try {
      const response = await axios.put(`/api/jobs/${job.id}`, job);
      commit("SET_JOB", response.data);
      return response.data; // Return updated job for navigation
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async deleteJob({ commit }: ActionContext<State, State>, jobId: number) {
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      commit("DELETE_JOB", jobId);
    } catch (error) {
      console.log("Error deleting job:", error);
    }
  },
};
