<template>
  <div id="app">
    <h1 id="timer">{{ timeToString(now) }}</h1>
    <div class="buttons-container">
      <button @click="() => isTimerOn = !isTimerOn">{{ isTimerOn ? "Parar" : "Iniciar" }}</button>
      <button @click="addLap">Volta</button>
      <button @click="resetTimer">Restaurar</button>
    </div>
    <div class="laps" v-if="laps.length !== 0">
      <h1 id="laps-title">Voltas</h1>
      <hr id="laps-divisor"/>
      <div class="lap-fields">
        <h2>Tempo</h2>
        <h2>Duração</h2>
        <h2>Diferença</h2>
      </div>
      <div v-for="(lap, index) in laps" :key="index" class="lap-info">
        <p>{{timeToString(lap.at)}}</p>
        <p>{{timeToString(lap.time)}}</p>
        <p 
          :class="lap.difference > 0 ? 'positive' : 'negative'"
        >
          {{lap.difference > 0 ? '+' : '-'}}
          {{timeToString(lap.difference)}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function(){
    return {
      now: 0,
      laps: [],
      isTimerOn: false,
    }
  },
  watch: {
    isTimerOn: function(){
      if(this.isTimerOn){
        this.startTimer = setInterval(this.updateTime, 10)
        return
      }

      if(!this.isTimerOn) {
        clearInterval(this.startTimer)
      }
    }
  },
  methods: {
    updateTime: function(){
      this.now = this.now + 10
    },
    
    resetTimer: function(){
      this.isTimerOn = false
      this.now = 0
      this.laps = []
    },

    addLap: function(){
      const now = this.now
      if(this.laps.length === 0){
        this.laps.push({
          at: now,
          time: now,
          difference: 0,
        })
        return
      }
      
      const lastLap = this.laps[this.laps.length - 1]
      const time = now - lastLap.at
      this.laps.push({
        at: now,
        time,
        difference: time - lastLap.time 
      })
    },

    timeToString: function(time){
      const date = new Date(Math.abs(time))

      const miliseconds = date.getUTCMilliseconds() / 10 < 10 ? "0" + date.getUTCMilliseconds() / 10 : date.getUTCMilliseconds() / 10
      const seconds = date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds()
      const minutes = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes()


      return `${minutes}:${seconds}:${miliseconds}`
    }
  },

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');
#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212121;
  width: 600px;
  margin: 60px auto;
}

#timer{
  font-size: 48px;
  font-weight: 400;
  margin: 0;
}

#laps-title{
  font-size: 24px;
  font-weight: 300;
  margin: 48px 0 16px;
}

hr{
  margin: 16px auto;
  width: 80%;
  border: 1px solid #212121;
}

#laps-divisor{
  width: 100%;
}

.buttons-container{
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.buttons-container button, .buttons-container button:focus{
  background: none;
  border: 4px solid #212121;
  border-radius: 4px;
  width: 150px;
  padding: 8px 0;
  text-align: center;
  transition: background-color 0.1s, color 0.1s;
  font-family: "Ubuntu", sans-serif;
  font-size: 14px;
}

.buttons-container button:hover{
  cursor: pointer;
  background: #212121;
  color: #eeeeee;
}

.laps{
  width: 120%;
  position: relative;
  left: -10%;
}

.lap-info{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  font-family: monospace;
  font-size: 16px;
}

.lap-fields{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
}

.lap-fields h2{
  font-weight: 300;
  font-size: 20px;
  margin: 8px 0;
}

.negative{
  color: #32d43a;
}

.positive{
  color: #f7772d;
}
</style>
