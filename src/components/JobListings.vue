<script setup lang="ts">
import JobListing from "./JobListing.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { RouterLink } from "vue-router";
import { VueSpinner } from "vue3-spinners";

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();

const jobs = computed(() => store.getters.jobs);
const isLoading = computed(() => store.getters.isLoading);

onMounted(() => {
  store.dispatch("fetchJobs");
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div v-if="isLoading" class="text-center text-gray-500 py-6">
        <VueSpinner size="40" color="green" class="mx-auto" />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing
          v-for="job in jobs.slice(0, limit || jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
