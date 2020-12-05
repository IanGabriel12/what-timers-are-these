import VueRouter from 'vue-router'
import TimerPage from '@/components/TimerPage'
import PomodoroPage from '@/components/PomodoroPage'

const routes = [
  { path: '/timer', component: TimerPage },
  { path: '/pomodoro', component: PomodoroPage }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router