// getters.test.ts
import { getters } from "@/store/getters";
import { State } from "@/store/state";

describe("getters", () => {
  const mockState: State = {
    jobs: [{ id: 1, title: "Software Engineer" }],
    job: { id: 2, title: "Product Manager" },
    isLoading: true,
  };

  it("jobs getter returns the jobs array", () => {
    expect(getters.jobs(mockState)).toEqual(mockState.jobs);
  });

  it("isLoading getter returns the isLoading value", () => {
    expect(getters.isLoading(mockState)).toBe(mockState.isLoading);
  });

  it("job getter returns the job object", () => {
    expect(getters.job(mockState)).toEqual(mockState.job);
  });
});
