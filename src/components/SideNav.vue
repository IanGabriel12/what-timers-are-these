<template>
  <div class="nav-container" :class="{'active': isOpen}">
    <transition name="fade">
      <div class="container-background" v-if="isOpen"/>
    </transition>
    <div class="nav-button" :class="{'active': isOpen}" @click="isOpen = !isOpen">
      <hr/>
      <hr/>
      <hr/>
    </div>

    <transition name="slide">
      <nav v-if="isOpen">
        <router-link to="/timer" class="small-title" >
          Progressivo
        </router-link>
        <router-link to="/regressive" class="small-title">
          Regressivo
        </router-link>
        <router-link to="/pomodoro" class="small-title">
          Pomodoro
        </router-link>
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Sidenav',
  data(){
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped>
.nav-container.active{
  position: absolute;
  z-index: 1;
}

.container-background{
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: var(--primary-color);
  opacity: 0.7;
}

.nav-button{
  width: 30px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.nav-button hr{
  transition: all 100ms;
  border: 1px solid var(--primary-color);
}

.nav-button.active hr{
  border-color: var(--secondary-color);
}

.nav-button.active hr:nth-child(1){
  transform: translateY(10px) rotate(45deg);
}
.nav-button.active hr:nth-child(2){
  opacity: 0;
}
.nav-button.active hr:nth-child(3){
  transform: translateY(-10px) rotate(-45deg);
}

.nav-button:hover{
  cursor: pointer;
}

nav{
  height: 100vh;
  width: 30vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--primary-color);
  padding-top: 70px;
}

nav a{
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  text-decoration: none;
  color: var(--secondary-color);
}

nav a svg{
  width: 30px;
  height: 30px;
  fill: var(--secondary-color);
}

nav a:hover{
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.slide-enter-active{
  animation: slide 100ms;
}

.slide-leave-active{
  animation: slide 100ms reverse;
}

.fade-enter-active{
  animation: fade 100ms;
}

.fade-leave-active{
  animation: fade 100ms reverse;
}

@keyframes slide{
  0%{
    width: 0;
  }

  100%{
    width: 30vw;
  }
}

@keyframes fade{
  0%{
    background-color: transparent;
    opacity: 0;
  }

  100%{
    background-color: var(--primary-color);
    opacity: 0.7;
  }
}
</style>