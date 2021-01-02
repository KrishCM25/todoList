// Script+
const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTarea = document.getElementById('lista-tareas')
const template = document .getElementById('template').content
const fragment = document.createDocumentFragment()
// let tareas = {
//     14134234:{
//         id: 14134234,
//         texto: 'Tarea 1',
//         estado: false
//     },
//     14134544:{
//         id: 14134544,
//         texto: 'Tarea 2',
//         estado: false
//     }
// }

let tareas = {}

document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

listaTarea.addEventListener('click', e => {
   btnAction(e)
})

formulario.addEventListener('submit', e =>{
    e.preventDefault()
    // console.log(e.target[0].value)
    // console.log(e.target.querySelector('input').value)
    // console.log(input.value)
    setTarea(e)
})

const setTarea = e =>{
    input.focus()
    if (input.value.trim() === ''){
        console.log('Esta vacio')
        return
    }
    
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    tareas[tarea.id] = tarea
    // console.log(tareas)
    formulario.reset()
    pintarTareas()

}

const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
    if(Object.values(tareas).length === 0) {
        listaTarea.innerHTML = `
           <div class="alert-nothing">
                No hay tareas Pendientes 🤩
            </div>
        `
        return
    }
    listaTarea.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto
        if(tarea.estado){
            clone.querySelector('.alert').classList.replace('alert','alert-complete')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    listaTarea.appendChild(fragment)
}

const btnAction = e => {

    iconClass = e.target.classList
    iconID = e.target.dataset.id
    
    if(e.target.localName == "i"){
        if(iconClass.contains('fa-minus-circle')) 
            delete tareas[iconID]
        else if(iconClass.contains('fa-check-circle')) 
            tareas[iconID].estado = true
        else tareas[iconID].estado = false
        console.log(tareas)
        pintarTareas()
    }
    e.stopPropagation()
}