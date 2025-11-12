import 'vuetify/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 🎨 Dark Theme (MyTube Dark)
const myTubeDark = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#202020',
    primary: '#FF0000',
    secondary: '#E5E5E5',
    accent: '#1F1F1F',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    error: '#FF5252'
  }
}

// 🎨 Light Theme (MyTube Light)
const myTubeLight = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#E5E5E5',
    primary: '#FF0000',
    secondary: '#212121',
    accent: '#606060',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    error: '#FF5252'
  }
}

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myTubeDark',
    themes: {
      myTubeLight,
      myTubeDark,
    },
  },
})
