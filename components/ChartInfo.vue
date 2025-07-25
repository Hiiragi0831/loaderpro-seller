<template>
  <div class="p-30">
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-325"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        fill: true,
        backgroundColor: documentStyle.getPropertyValue("--p-primary-color"),
        borderColor: documentStyle.getPropertyValue("--p-primary-color"),
        pointBackgroundColor: documentStyle.getPropertyValue("--p-black-color"),
        pointBorderColor: documentStyle.getPropertyValue("--p-black-color"),
        tension: 0.4,
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };
};
const setChartOptions = () => {
  return {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
};
</script>
