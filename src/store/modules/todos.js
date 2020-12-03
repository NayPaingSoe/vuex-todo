import axios from "axios";
const Todos={
    state:{
        todos:[]
    },
    getters:{
        allTodos: (state) => state.todos
    },
    mutations:{
        setTodos: (state,todo) => (state.todos=todo),
        //updateTodo: (state,todo) => (state.todos filter),
        newTodo: (state,newtodo) => state.todos.unshift(newtodo),
        removeTodo: (state,id) => (state.todos = state.todos.filter(todo => todo.id !== id)),
        fixTodo: (state,updTodo ) => {
            const index = state.todos.findIndex(todo => todo.id ===updTodo.id);
            if (index !== -1) {
                state.todos.splice(index,1,updTodo);
            }
        }
        

       
    },
    actions:    {
        async fetchTodos({ commit }) {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos'
        );
        commit('setTodos',response.data);
        },
        async addTodo({commit},title) {
            const response = await axios.post('https://jsonplaceholder.typicode.com/todos',{title,completed:false});
            commit('newTodo',response.data);
        },
        async deleteTodo({commit},id) {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
            commit('removeTodo',id);
            commit('removeTodo',id);
        },
        async filterTodos({commit},e) {
            //Get selected number
            const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
            
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
            );
            commit('setTodos',response.data);

        },
        async updateTodo ({commit},updTodo)
        {
        const response= await axios.put(
                `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,updTodo
            );
            commit('fixTodo',response.data);
            console.log(response.data);
        }

    }
};
export default Todos;

