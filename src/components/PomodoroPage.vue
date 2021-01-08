<template>
  <div class="container">
    <h1 class="medium-title">
      {{ isRest ? 'Descanso' : `Seção ${sectionNumber}` }}
    </h1>
    <div class="timer-container">
      <button class="increment-button" @click="removeFiveMinutes">-</button>
      <div class="input-container big-title">
        <input 
          type="number" 
          max="120" min="0" 
          id="minutes"
          class="big-title"
          style="text-align: right"
          :value="minutesString"
          :disabled="!timerStopped"
          @input="updateMinutes"
          @blur="validateMinutesInput"
        />
        :
        <input 
          type="number" 
          max="59" min="0" 
          id="seconds" 
          class="big-title"
          style="text-align: left"
          :disabled="!timerStopped"
          :value="secondsString"
          @input="updateSeconds"
          @blur="validateSecondsInput"
        />
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
const AMOUNT_TIME = 5
export default {
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

  computed: {
    minutesString(){
      return this.minutes < 10 ? '0' + this.minutes : this.minutes
    },

    secondsString(){
      return this.seconds < 10 ? '0' + this.seconds : this.seconds
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

    validateMinutesInput(){
      if(this.minutes > 120){
        this.minutes = 120
      }else if(this.minutes < 0){
        this.minutes = 0
      }
    },

    validateSecondsInput(){
      if(this.seconds > 59){
        this.seconds = 59
      }else if(this.seconds < 0){
        this.seconds = 0
      }
    },

    updateMinutes(event){
      this.minutes = parseInt(event.target.value, 10)
      event.target.value = this.minutesString
    },

    updateSeconds(event){
      this.seconds = parseInt(event.target.value)
      event.target.value = this.secondsString
    }
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
