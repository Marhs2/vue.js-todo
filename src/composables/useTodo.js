import { computed, onMounted, ref, watch } from "vue";

export function useTodo() {
  const todoList = ref(JSON.parse(localStorage.getItem('todoList')) ?? [])
  const inputValue = ref('')
  const hash = ref(location.hash)

  onMounted(() => window.addEventListener("hashchange", () => hash.value = location.hash))

  watch(todoList, () => {
    localStorage.setItem('todoList', JSON.stringify(todoList.value))
  }, { deep: true })

  const createTodo = () => {
    if (!inputValue.value.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      value: inputValue.value,
      isFinish: false,
      isEditing: false
    }

    todoList.value.push(newTodo)
    inputValue.value = ''
  }
  const removeTodo = (id) => todoList.value = todoList.value.filter(e => e.id !== id)
  const toggleTodo = (id) => todoList.value.forEach(e => e.id === id ? e.isFinish = !e.isFinish : null)

  const toggleAll = () => {
    const isAll = todoList.value.every(e => e.isFinish)
    todoList.value.forEach((e) => e.isFinish = !isAll)
  }

  const clearCompleted = () => todoList.value = todoList.value.filter(e => !e.isFinish)

  const editAble = (id) => {
    todoList.value.forEach((e) => {
      if (e.id === id) {
        e.isEditing = true
      }
    })
  }

  const editEnd = (id, value) => {
    if (!value.trim()) return todoList.value = todoList.value.filter(e => e.id !== id)

    todoList.value.forEach((e) => {
      if (e.id === id) {
        e.isEditing = false
        e.value = value
      }
    })
  }

  const fitleredTodo = computed(() => {
    if (hash.value === '#/completed') {
      return todoList.value.filter(e => e.isFinish)
    } else if (hash.value === '#/active') {
      return todoList.value.filter(e => !e.isFinish)
    }
    return todoList.value
  })

  return { todoList, fitleredTodo, inputValue, createTodo, removeTodo, toggleTodo, toggleAll, clearCompleted, hash, editAble, editEnd }
}