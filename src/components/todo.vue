<script setup>
import { ref } from 'vue';


const props = defineProps(['list', 'hash'])

const editText = ref("")

const emit = defineEmits(['remove', 'edit', 'editCom']);

const vFocus = {
  mounted: (el) => { el.focus() }
}


</script>

<template>
  <li v-for="item in props.list" :key="item.id" :class="{ completed: item.isFinish, editing: item.isEdit }"
    v-show="props.hash === 'active' ? item.isFinish !== true : props.hash === 'completed' ? item.isFinish !== false : true">
    <div class="view">
      <input class="toggle" type="checkbox" v-model="item.isFinish" />
      <label @dblclick="$emit('edit', item.id); editText = item.value;">{{ item.value }} </label>
      <button class="destroy" @click="$emit('remove', item.id)"></button>
    </div>
    <input class="edit" v-model="editText" type="text" v-show="item.isEdit"
      @blur="$emit('editCom', [item.id, editText]);
      editText = ''"
         @keyup.enter="(e) => e.target.blur()"

      editText = ''" v-if="item.isEdit" v-focus />

  </li>
</template>
