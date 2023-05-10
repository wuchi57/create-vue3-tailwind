<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

</script>

<template>
  <svg class="inline w-6 h-6 fill-current align-baseline" aria-hidden="true">
    <use :href="symbolId" :fill="color"/>
  </svg>
</template>
