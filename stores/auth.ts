import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      name: "",
      company: "",
      email: "",
      token: "",
      loginAt: "",
    },
    message: null as { type: string; title: string; text: string } | null,
    loader: false,
    isAuthenticated: false,
  }),
  actions: {
    /**
     * Авторизация пользователя
     */
    async signUp(email: string, password: string) {
      this.loader = true;
      this.message = null;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok && data.data && data.token) {
          // Успешная регистрация
          this.user = {
            ...data.data,
            token: data.token,
            loginAt: Date.now(),
          };
          localStorage.setItem("user", JSON.stringify(this.user));

          // Загрузка брендов
          await useBrandStore().getBrands();

          this.isAuthenticated = true;

          this.message = {
            type: "success",
            title: "Вы успешно вошли в аккаунт",
            text: `Здравствуйте, ${this.user.name}!`,
          };

          // Перенаправление на домашнюю страницу
          await useRouter().push({ name: "home" });
        } else if (res.status === 401) {
          // Неверные учетные данные
          this.message = {
            type: "error",
            title: "Ошибка",
            text: "Неверный логин или пароль",
          };
        } else if (data.message) {
          // Ошибка из API
          this.message = {
            type: "error",
            title: "Ошибка",
            text: String(data.message),
          };
        } else {
          // Неизвестная ошибка
          this.message = {
            type: "error",
            title: "Ошибка авторизации",
            text: `код ${res.status}`,
          };
        }
      } catch (error) {
        // Сетевая ошибка
        console.error("Ошибка регистрации:", error);
        this.message = {
          type: "error",
          title: "Сетевая ошибка",
          text: "Попробуйте позже",
        };
      } finally {
        this.loader = false;
      }
    },

    /**
     * Проверка токена и авторизации
     */
    async checkToken() {
      const userStr = localStorage.getItem("user");

      if (!userStr) {
        this.isAuthenticated = false;
        return;
      }

      const user = JSON.parse(userStr);
      const now = Date.now();
      const DAY_MS = 24 * 60 * 60 * 1000;

      // Проверка истечения сессии
      if (!user.loginAt || now - user.loginAt > DAY_MS) {
        this.logout({
          type: "warn",
          title: "Сессия истекла",
          text: "Время сессии истекло. Пожалуйста, войдите снова",
        });
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth_me`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (res.ok) {
          this.user = user;
          this.isAuthenticated = true;
        } else {
          this.logout({
            type: "error",
            title: "Ошибка авторизации",
            text: "Ваша сессия недействительна. Пожалуйста, войдите снова",
          });
        }
      } catch (error) {
        console.error("Ошибка проверки токена:", error);
        this.logout({
          type: "error",
          title: "Ошибка авторизации",
          text: "Ваша сессия недействительна. Пожалуйста, войдите снова",
        });
      }
    },

    /**
     * Выход пользователя из системы
     */
    logout(messageParams?: { type?: string; title?: string; text?: string }) {
      this.message = {
        type: messageParams?.type || "info",
        title: messageParams?.title || "Выход из системы",
        text: messageParams?.text || "Вы успешно вышли из аккаунта",
      };

      // Сброс данных пользователя
      this.user = {
        name: "",
        email: "",
        token: "",
        loginAt: "",
        company: "",
      };

      this.isAuthenticated = false;
      useBrandStore().loaded = false;
      localStorage.clear();
    },
  },
});
