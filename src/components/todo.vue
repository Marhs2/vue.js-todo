<script setup>
import { computed, ref } from 'vue';


const props = defineProps(['list', 'hash'])

const editText = ref("")

const emit = defineEmits(['remove', 'edit', 'editCom']);

const vFocus = {
  mounted: (el) => { el.focus() }
}


const filteredTodo = computed(() => {
  if (props.hash == 'Active') {
    return props.list.filter(e => !e.isFinish)
  } else if (props.hash == 'Completed') {
    return props.list.filter(e => e.isFinish)
  }
  return props.list
})


</script>

<template>
  <li v-for="item in filteredTodo" :key="item.id" :class="{ completed: item.isFinish, editing: item.isEdit }">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="item.isFinish" />
      <label @dblclick="$emit('edit', item.id); editText = item.value;">{{ item.value }} </label>
      <button class="destroy" @click="$emit('remove', item.id)"></button>
    </div>
    <input class="edit" v-model="editText" type="text" v-show="item.isEdit"
    @blur="$emit('editCom', [item.id, !editText.trim() ? item.value : editText ]);"
    @keyup.enter="(e) => e.target.blur()""
    v-if="item.isEdit" v-focus />

  </li>
</template>
