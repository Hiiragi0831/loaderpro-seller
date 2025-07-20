import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const Loaderpro = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#FEE9CF',
      100: '#FDE0BB',
      200: '#FCCF94',
      300: '#FABD6C',
      400: '#F9AB45',
      500: '#F8991D',
      600: '#D67C07',
      700: '#A05D05',
      800: '#693D03',
      900: '#331E02',
      950: '#180E01',
    },
  },
  pt: {
    badge: {
      root: 'w-10',
    },
  },
});

export default {
  preset: Loaderpro,
  options: {
    darkModeSelector: '.p-dark'
  }
};

