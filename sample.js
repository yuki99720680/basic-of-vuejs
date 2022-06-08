LOCAL_STORAGE_KEY = 'todos'

const todoApp = Vue.createApp({
  data() {
    return {
      todos: [],
      newId: 0,
      newTodo: null
    }
  },
  mounted() {
    if(localStorage.getItem(LOCAL_STORAGE_KEY)) {
      this.todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      if(this.todos.length == 1) {
        this.newId = this.todos[0].id + 1
      }else{
        this.newId = this.todos.reduce(function (todoA, todoB) { return Math.max(todoA.id, todoB.id) }) + 1
      }
    }
  },
  methods: {
    addTodo() {
      if(!this.newTodo) return

      this.todos.push({
        id: this.newId,
        todo: this.newTodo
      })
      this.newId++
      this.newTodo = ''
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos))
    },
    updateTodo(index, todo) {
      this.todos[index] = todo
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos))
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todos))
      if(localStorage.getItem(LOCAL_STORAGE_KEY) == '[]') localStorage.clear()
    }
  }
})

todoApp.mount('#todo-app')
