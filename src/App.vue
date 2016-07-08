<template>
  <div id="app">
    <pre>{{ anObject | json }}</pre>
    <ul>
      <li v-for="item in anArray">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
// import Wilddog from 'Wilddog'
import Hello from './components/Hello'

export default {
  components: {
    Hello
  }
}
</script>
