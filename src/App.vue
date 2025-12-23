<script setup>
import { computed, ref } from "vue";
import CreateTodo from "./components/todo.vue";


let id = 0;
const inputText = ref("")
const todoList = ref([])
const isAll = ref(false);
const type = ref(location.hash.replace("#/", ''))

const addNewTodo = () => {
  if (!inputText.value.trim()) return

  const newTodo = {
    id: id++,
    value: inputText.value,
    isFinish: false,
    isEdit: false
  }

  todoList.value.push(newTodo)

  inputText.value = ''
}

const delTodo = idx => todoList.value = todoList.value.filter(e => e.id !== idx)

const toggleTodo = () => {
  const isAll = todoList.value.every(e => e.isFinish);
  todoList.value.forEach(e => e.isFinish = !isAll)
}

const clearCompleted = () => todoList.value = todoList.value.filter(e => e.isFinish !== true)

window.addEventListener("hashchange", () => type.value = location.hash.replace("#/", ''))

const editTodo = (e) => todoList.value.forEach(el => { if (el.id == e) { el.isEdit = true } })

const editCom = (e) => todoList.value.forEach(el => { if (el.id == e[0]) { el.isEdit = false; el.value = e[1] } })

const isZero = computed(() => todoList.value.length !== 0);

const allCompleted = computed(() => todoList.value.every(e => e.isFinish))

const count = computed(() => todoList.value.filter(e => !e.isFinish).length)

</script>
<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" v-model="inputText" @keyup.enter="addNewTodo()"
        autofocus />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" @change="toggleTodo()" v-model="allCompleted" />
      <label for="toggle-all" v-show="isZero">Mark all as complete</label>
      <ul class="todo-list">
        <CreateTodo :list="todoList" :hash="type" @remove="delTodo" @edit="editTodo" @editCom="editCom">
        </CreateTodo>
      </ul>
      <footer class="footer" v-show="isZero">
        <span class="todo-count">
          <strong>{{ count }}</strong>
          {{ count == 1 ? 'item' : 'items' }} left
        </span>
        <ul class="filters">
          <li v-for="(item, index) in ['All', 'Active', 'Completed']" :key="index">
            <a :href="`#/${item}`" :class="type == item ? 'selected' : ''">{{ item }}</a>
          </li>
        </ul>
        <button class="clear-completed" @click="clearCompleted"> Clear
          completed </button>
      </footer>
    </section>
  </section>
</template>