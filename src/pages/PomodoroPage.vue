<template>
  <div class="container">
    <h1 class="medium-title">
      {{ isRest ? 'Descanso' : `Seção ${sectionNumber}` }}
    </h1>
    <div class="timer-container">
      <button class="increment-button" @click="removeFiveMinutes">-</button>
      <div class="input-container big-title">
        <number-input v-model="minutes" :maximum="120" :minimum="0" style="text-align: right"/>
        :
        <number-input v-model="seconds" :maximum="59" :minimum="0" style="text-align: left"/>
      </div>
      
      <button class="increment-button" @click="addFiveMinutes">+</button>
    </div>
    <div class="buttons-container">
      <button class="action-button" @click="toggleTimer">
        {{ timerStopped ? 'Começar' : 'Parar'}}
      </button>
      <button class="action-button" @click="toggleRest">
        {{ isRest ? 'Seção' : 'Descanso'}}
      </button>
    </div>
  </div>
</template>

<script>
import NumberInput from '@/components/NumberInput'
const AMOUNT_TIME = 5
export default {
  components: {
    NumberInput
  },
  data(){
    return {
      minutes: AMOUNT_TIME,
      seconds: 0,
      sectionNumber: 1,
      isRest: false,
      timerStopped: true,
    }
  },
  watch: {
    timerStopped(){
      if(this.timerStopped){
        clearInterval(this.interval)
      }else{
        this.interval = setInterval(() => {
          this.seconds--

          if(this.seconds <= 0){
            if(parseInt(this.minutes, 10) === 0){
              //timer ended
              this.timerStopped = true
              
              if(!this.isRest){
                this.sectionNumber++
              }

              this.toggleRest()
              return
            }

            this.seconds = 59
            this.minutes--
          }

        }, 1000)
      }
    }
  },
  methods: {
    addFiveMinutes(){
      this.minutes += AMOUNT_TIME
    },

    removeFiveMinutes(){
      if(this.minutes < AMOUNT_TIME){
        this.minutes = 0
        this.seconds = 0
        this.timerStopped = true
      }else{
        this.minutes -= AMOUNT_TIME
      }
    },

    toggleTimer(){
      this.timerStopped = !this.timerStopped
    },

    toggleRest(){
      this.isRest = !this.isRest
      this.timerStopped = true
      this.minutes = this.isRest ? AMOUNT_TIME : AMOUNT_TIME * 3
      this.seconds = 0
    },
  }
}
</script>

<style scoped>
.timer-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin: auto;
}

.timer-container .big-title{
  margin: 0;
}

.buttons-container{
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.buttons-container button{
  width: 150px;
}

.buttons-container button:first-child{
  margin-right: 48px;
}

.input-container{
  display: flex;
  align-items: center;
}
</style>
