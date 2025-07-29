export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const brandStore = useBrandStore();

  console.log("Плагин инициализации запущен");

  // Проверяем авторизацию при загрузке приложения
  const userStr = localStorage.getItem("user");
  console.log("Пользователь в localStorage:", !!userStr);

  if (userStr) {
    try {
      // console.log("Проверяем токен...");
      // Сначала проверяем токен и восстанавливаем состояние авторизации
      await authStore.checkToken();

      // console.log("Статус авторизации:", authStore.isAuthenticated);

      // Теперь проверяем, авторизован ли пользователь, и загружаем бренды
      if (authStore.isAuthenticated) {
        // console.log("Загружаем бренды...");
        await brandStore.getBrands();
      }
    } catch (error) {
      console.error("Ошибка инициализации:", error);
    }
  } else {
    console.log("Пользователь не найден в localStorage");
  }
});
