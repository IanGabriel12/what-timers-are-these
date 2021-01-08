import VueRouter from 'vue-router'
import TimerPage from '@/pages/TimerPage'
import PomodoroPage from '@/pages/PomodoroPage'
import RegressivePage from '@/pages/RegressivePage'

const routes = [
  { path: '/timer', component: TimerPage },
  { path: '/pomodoro', component: PomodoroPage },
  { path: '/regressive', component: RegressivePage },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router