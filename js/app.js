const reload = document.querySelector(".reload");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const text = document.querySelector(".text");

const check = "bi-check-circle";
const uncheck = "bi-circle ";
const line_through = "linethrough";

// let LIST = []
// ,id = 0;
let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [],
    id = 0;
}
function loadList(array){
    array.forEach(function(item){
        add(item.name,item.id,item.done,item.trash);
    });
}
//clear localstoge
reload.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

const options = {time:"numeric",weekday:"long",month:"short",day:"numeric",year:"numeric"};
const today = new Date();


date.innerHTML = today.toLocaleTimeString("en-US",options);


//add 
function add(toDo, id , done, trash){
    if(trash){return;}
    const DONE = done ? check : uncheck;
    const LINE = done ? line_through : "";
    const item = `
    <li class="item">
    <i class=" fa ${DONE}  co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="bi bi-trash de" job="delete" id="${id}"></i> 
    </li>

                `
    const position = "beforeend";
    list.insertAdjacentHTML(position,item);
}
// add item user click
document.addEventListener("keyup", function(even){
    if (event.keyCode == 13) {
        const toDo =  input.value;
        //nếu input k có 
        if (toDo) {
            add(toDo,id,false,false);
            LIST.push({
                name: toDo,
                id: id,
                done:false,
                trash:false,
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value ="";
    }
});

function hctoDo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.text.classList.toggle(line_through);
    LIST[element.id].done = LIST[element.id].done ? false :true;

}

//xoa
function xoaTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        hctoDo(element);
    }else if(elementJob == "delete"){
        xoaTodo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
})