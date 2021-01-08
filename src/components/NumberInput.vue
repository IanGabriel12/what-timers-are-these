<template>
  <input 
    type="number"
    :min="minimum"
    :max="maximum"
    :value="formattedValue"
    @input="updateValue"
    @blur="validateInput"
  >
</template>

<script>
export default {
  props: ['value', 'minimum', 'maximum'],
  computed:{
    formattedValue(){
      return this.value < 10 ? '0' + this.value : this.value
    }
  },
  methods:{
    updateValue(event){
      this.$emit('input', parseInt(event.target.value, 10))
      event.target.value = this.formattedValue
    },

    validateInput(){
      if(this.value > this.maximum){
        this.$emit('input', this.maximum)
      }else if(isNaN(this.value)){
        this.$emit('input', this.minimum)
      }

      this.$emit('blur')
    }
  }
}
</script>

<style scoped>
input{
  font-size: 60px;
  font-weight: 400;
  width: 100px;
  border:none;
  appearance: none;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

input:disabled{
  background: none;
  color: var(--primary-color);
}
</style>