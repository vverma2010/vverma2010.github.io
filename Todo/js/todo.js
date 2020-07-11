// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes name
const Check = "fa-check-circle";
const Uncheck = "fa-circle-thin";
const strike = "lineThrough";
// variables
let Lists,id;

// get list from localstorage
let alltasks = localStorage.getItem("Tasks");

if(alltasks)
{
    Lists = JSON.parse(alltasks);
    id = Lists.length;
    loadList(Lists);
}
else
{
    Lists = [];
    id = 0;
}

function loadList(array)
{
    array.forEach(function(item){
        addTAsk(item.name,item.id,item.done,item.removed);
    });
}
// add list from localstorage
// localStorage.setItem("Task",JSON.stringify(Lists));

// show date
const options = {weekday: "long", month:"short",day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US",options);

// function to-do

function addTAsk(task, id, done, removed)
{
    if(removed)
    {
        return;
    }
    const completed  = done ? Check : Uncheck;
    const striked= done ? strike : "";
    const item = `
                    <li class="item">
                        <i class="fa ${completed} co" job="complete" id=${id}></i>
                        <p class="text ${striked}">${task}</p>
                        <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                    </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
// add task to list
document.addEventListener("keyup",function(even)
{
    if(event.keyCode == 13)
    {
        const task = input.value;
        if(task)
        {
            addTAsk(task,id,false,false);

            Lists.push({
                name: task,
                id: id,
                done: false,
                removed: false
            });

            localStorage.setItem("Tasks",JSON.stringify(Lists));     
            id++;
        }
        input.value = "";
    }
    
});
// testing function
// addTAsk("Cook",1, true,false);

// completed

function completedTask(e)
{
    e.classList.toggle(Check);
    e.classList.toggle(Uncheck);
    e.parentNode.querySelector(".text").classList.toggle("lineThrough");

    Lists[e.id].done = Lists[e.id].done ? false : true;
}

// removed task

function removedTask(e)
{
    e.parentNode.parentNode.removeChild(e.parentNode);

    Lists[e.id].removed = true;
}

// target to create items dynamically

list.addEventListener("click",function(event){
    const item = event.target;
    const eventJob = item.attributes.job.value;

    if(eventJob == "complete")
    {
        completedTask(item);
    }
    else if(eventJob == "delete")
    {
        removedTask(item);
    }
    localStorage.setItem("Tasks",JSON.stringify(Lists));
});
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})