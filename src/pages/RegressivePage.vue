<template>
  <div class="container">
    <div class="timer-container">
      <div class="number-container">
        <h2 class="medium-title">Horas</h2>
        <number-input 
          v-model="currentTime.hours" 
          :maximum="1000" 
          :minimum="0"
          :disabled="timerStarted"
          @blur="saveTime"
          style="width: 150px"
        />
      </div>
      <div class="number-container">
        <h2 class="medium-title">Minutos</h2>
        <number-input 
          v-model="currentTime.minutes" 
          :maximum="59" 
          :minimum="0"
          :disabled="timerStarted"
          @blur="saveTime"
        />
      </div>
      <div class="number-container">
        <h2 class="medium-title">Segundos</h2>
        <number-input 
          v-model="currentTime.seconds" 
          :maximum="59" 
          :minimum="0"
          :disabled="timerStarted"
          @blur="saveTime"
        />
      </div>
    </div>
    <div class="buttons-container">
      <button class="action-button" @click="toggleTimer">
        {{ timerStarted ? 'Parar' : timerIsOn ? 'Continuar' : 'Começar'}}
      </button>
      <button class="action-button" @click="resetTimer">
        Reiniciar
      </button>
    </div>
  </div>
</template>

<script>
import NumberInput from '@/components/NumberInput'
export default {
  data(){
    return {
      savedTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      currentTime: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      timerIsOn: false,
      timerStarted: false,
    }
  },
  watch: {
    timerStarted(){
      const time = this.currentTime
      if(this.timerStarted){
        this.timerIsOn = true
        this.interval = setInterval(() => {
          if(time.seconds === 0 && time.minutes === 0 && time.hours === 0){
            this.timerStarted = false
            return
          }

          time.seconds--

          if(time.seconds < 0){
            time.seconds = 59
            time.minutes--

            if(time.minutes < 0){
              time.minutes = 59
              time.hours--
            }
          }
        }, 1000)
      }else{
        clearInterval(this.interval)
      }
    }
  },
  methods: {
    resetTimer(){
      this.currentTime = {...this.savedTime}
      this.timerStarted = false
      this.timerIsOn = false
    },

    toggleTimer(){
      this.timerStarted = !this.timerStarted
    },

    saveTime(){
      this.savedTime = {...this.currentTime}
    }
  },
  components: {
    NumberInput
  },
}
</script>

<style scoped>
.timer-container{
  position: relative;
  display: flex;
  justify-content: space-between;
}

.number-container{
  text-align: center;
  width: 200px;
}

.number-container h2, .number-container p{
  margin: 0;
}
</style>