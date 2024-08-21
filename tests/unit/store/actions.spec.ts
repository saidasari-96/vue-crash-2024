import { actions } from "@/store/actions";
import { ActionContext } from "vuex";
import axios from "axios";
import { Job, State } from "@/store/state";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Vuex Actions", () => {
  let context: Partial<ActionContext<State, State>>;
  let state: State;

  beforeEach(() => {
    state = {
      jobs: [],
      job: {} as Job,
      isLoading: false,
    };

    // Mock the ActionContext object with only the necessary properties
    context = {
      commit: jest.fn(),
      state: state,
      dispatch: jest.fn(),
      getters: {},
    };
  });

  describe("fetchJobs", () => {
    it("should fetch jobs and commit SET_JOBS mutation", async () => {
      const jobs = [{ id: 1, title: "Frontend Developer", description: "A job", type: "Full-time", location: "Remote", salary: "80000", company: { name: "Company", description: "A company", contactEmail: "email@example.com", contactPhone: "1234567890" } }];
      mockedAxios.get.mockResolvedValue({ data: jobs });

      await actions.fetchJobs(context as ActionContext<State, State>);

      expect(context.commit).toHaveBeenCalledWith("SET_LOADING", true);
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/jobs");
      expect(context.commit).toHaveBeenCalledWith("SET_JOBS", jobs);
      expect(context.commit).toHaveBeenCalledWith("SET_LOADING", false);
    });

    it("should handle error when fetching jobs fails", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Error fetching jobs"));

      await actions.fetchJobs(context as ActionContext<State, State>);

      expect(context.commit).toHaveBeenCalledWith("SET_LOADING", true);
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/jobs");
      expect(context.commit).toHaveBeenCalledWith("SET_LOADING", false);
    });
  });

  describe("fetchJob", () => {
    it("should fetch a job and commit SET_JOB mutation", async () => {
      const job: Job = { id: 1, title: "Frontend Developer", description: "A job", type: "Full-time", location: "Remote", salary: "80000", company: { name: "Company", description: "A company", contactEmail: "email@example.com", contactPhone: "1234567890" } };
      mockedAxios.get.mockResolvedValue({ data: job });

      await actions.fetchJob(context as ActionContext<State, State>, 1);

      expect(context.commit).toHaveBeenCalledWith("SET_LOADING", true);
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/jobs/1");
      expect(context.commit).toHaveBeenCalledWith("SET_JOB", job);
      expect(context.commit).toHaveBeenCalledWith("SET_LOADING", false);
    });

    it("should handle error when fetching a job fails", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Error fetching job"));

      await actions.fetchJob(context as ActionContext<State, State>, 1);

      expect(context.commit).toHaveBeenCalledWith("SET_LOADING", true);
      expect(mockedAxios.get).toHaveBeenCalledWith("/api/jobs/1");
      expect(context.commit).toHaveBeenCalledWith("SET_LOADING", false);
    });
  });

  describe("addJob", () => {
    it("should add a job and commit SET_JOB mutation", async () => {
      const newJob: Job = { id: 1, title: "Frontend Developer", description: "Develop front-end applications", type: "Full-time", location: "Remote", salary: "80000", company: { name: "Tech Corp", description: "A leading tech company", contactEmail: "contact@techcorp.com", contactPhone: "123-456-7890" } };
      mockedAxios.post.mockResolvedValue({ data: newJob });

      const result = await actions.addJob(context as ActionContext<State, State>, newJob);

      expect(mockedAxios.post).toHaveBeenCalledWith("/api/jobs", newJob);
      expect(context.commit).toHaveBeenCalledWith("SET_JOB", newJob);
      expect(result).toEqual(newJob);
    });

    it("should handle error when adding a job fails", async () => {
      const newJob: Job = { id: 1, title: "Frontend Developer", description: "Develop front-end applications", type: "Full-time", location: "Remote", salary: "80000", company: { name: "Tech Corp", description: "A leading tech company", contactEmail: "contact@techcorp.com", contactPhone: "123-456-7890" } };
      mockedAxios.post.mockRejectedValue(new Error("Error adding job"));

      await expect(actions.addJob(context as ActionContext<State, State>, newJob)).rejects.toThrow("Error adding job");

      expect(mockedAxios.post).toHaveBeenCalledWith("/api/jobs", newJob);
      expect(context.commit).not.toHaveBeenCalledWith("SET_JOB", newJob);
    });
  });

  describe("updateJob", () => {
    it("should update a job and commit SET_JOB mutation", async () => {
      const updatedJob: Job = { id: 1, title: "Frontend Developer - Updated", description: "Develop front-end applications and maintain updates", type: "Full-time", location: "Remote", salary: "90000", company: { name: "Tech Corp", description: "A leading tech company", contactEmail: "contact@techcorp.com", contactPhone: "123-456-7890" } };
      mockedAxios.put.mockResolvedValue({ data: updatedJob });

      const result = await actions.updateJob(context as ActionContext<State, State>, updatedJob);

      expect(mockedAxios.put).toHaveBeenCalledWith("/api/jobs/1", updatedJob);
      expect(context.commit).toHaveBeenCalledWith("SET_JOB", updatedJob);
      expect(result).toEqual(updatedJob);
    });

    it("should handle error when updating a job fails", async () => {
      const updatedJob: Job = { id: 1, title: "Frontend Developer - Updated", description: "Develop front-end applications and maintain updates", type: "Full-time", location: "Remote", salary: "90000", company: { name: "Tech Corp", description: "A leading tech company", contactEmail: "contact@techcorp.com", contactPhone: "123-456-7890" } };
      mockedAxios.put.mockRejectedValue(new Error("Error updating job"));

      await expect(actions.updateJob(context as ActionContext<State, State>, updatedJob)).rejects.toThrow("Error updating job");

      expect(mockedAxios.put).toHaveBeenCalledWith("/api/jobs/1", updatedJob);
      expect(context.commit).not.toHaveBeenCalledWith("SET_JOB", updatedJob);
    });
  });

  describe("deleteJob", () => {
    it("should delete a job and commit DELETE_JOB mutation", async () => {
      mockedAxios.delete.mockResolvedValue({});

      await actions.deleteJob(context as ActionContext<State, State>, 1);

      expect(mockedAxios.delete).toHaveBeenCalledWith("/api/jobs/1");
      expect(context.commit).toHaveBeenCalledWith("DELETE_JOB", 1);
    });

    it("should handle error when deleting a job fails", async () => {
      mockedAxios.delete.mockRejectedValue(new Error("Error deleting job"));

      await actions.deleteJob(context as ActionContext<State, State>, 1);

      expect(mockedAxios.delete).toHaveBeenCalledWith("/api/jobs/1");
      expect(context.commit).not.toHaveBeenCalledWith("DELETE_JOB", 1);
    });
  });
});
