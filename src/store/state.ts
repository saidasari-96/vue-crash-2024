export interface Job {
  id: number;
  title: string;
  description: string;
  type: string;
  location: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

export interface State {
  jobs: any[];
  job: Job | {};
  isLoading: boolean;
}

export const state: State = {
  jobs: [],
  job: {
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
  },
  isLoading: false,
};
