export const useGoodsStore = defineStore("goods", () => {
  const activeTab = ref("home");

  const setActiveTab = (tab: string) => {
    activeTab.value = tab;
  };

  return {
    activeTab,
    setActiveTab,
  };
});
