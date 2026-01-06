<script setup>
import { computed } from 'vue';
import CreateTodo from './components/createTodo.vue';
import { useTodo } from './composables/useTodo';


const { todoList, fitleredTodo, inputValue, createTodo, removeTodo, toggleTodo, toggleAll, clearCompleted, hash, editAble, editEnd } = useTodo()

const countActive = () => todoList.value.filter(e => !e.isFinish).length;

const isAll = computed(() => todoList.value.every(e => e.isFinish))
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus v-model="inputValue"
        @keyup.enter="createTodo" />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" @click="toggleAll" v-model="isAll" />
      <label for="toggle-all" v-show="todoList.length > 0">Mark all as complete</label>
      <ul class="todo-list">
        <CreateTodo :todos="fitleredTodo" @remove="removeTodo" @edit-able='editAble' @toggle="toggleTodo"
          @edit-end="editEnd"></CreateTodo>
      </ul>
      <footer class="footer" v-show="todoList.length > 0">
        <span class="todo-count"><strong>{{ countActive() }}</strong> {{ countActive() === 1 ? 'item' : 'items' }}
          left</span>
        <ul class="filters">
          <li>
            <a href="#/" :class="{ selected: hash === '#/' || hash === '' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: hash === '#/active' }">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{ selected: hash === '#/completed' }">Completed</a>
          </li>
        </ul>
        <button class="clear-completed" @click="clearCompleted">Clear completed</button>
      </footer>
    </section>
  </section>
</template>