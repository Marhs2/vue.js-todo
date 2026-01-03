<script setup>


const props = defineProps({
  todos: Array
})

defineEmits(['remove', 'toggle', 'edit-able', 'edit-end'])

const vFocus = {
  mounted: (el) => el.focus()

}
</script>

<template>


  <li v-for="(item) in props.todos" :key="item.id" :class="{ 'completed': item.isFinish, 'editing': item.isEditing }">
    <div class="view">
      <input class="toggle" type="checkbox" @change="$emit('toggle', item.id)" :checked="item.isFinish" />
      <label @dblclick="$emit('edit-able', item.id)">{{ item.value }}</label>
      <button class="destroy" @click="$emit('remove', item.id)"></button>
    </div>
    <input class="edit" type="text" v-if="item.isEditing" v-Focus v-model="item.value"
      @blur="$emit('edit-end', item.id, item.value)" @keyup.enter="$event.target.blur()" />
  </li>
</template>
