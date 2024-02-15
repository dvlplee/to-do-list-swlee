//유저가 값을 입력한다.
// + 버튼을 누른, 할일이 추가
// delete 버튼을 누르면 할일이 삭제
// check 버튼을  누르면 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난탭만. 진행중탭은, 진행중인 아이템만.
// 전체탭을 누르면 다시 전체아이템으로 돌아옴.

let taskInput = document.getElementById("task-input") //id로 가져오기
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let under = document.getElementById("under-line");
let taskList = []
let mode = "all"
let filterList =[]

addButton.addEventListener("mousedown", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});


for(let i=1;i<tabs.length;i++) {
    tabs[i].addEventListener("click", function(event){filter(event)})
}
console.log(tabs)

function addTask() {
    let taskValue = taskInput.value;
    if (taskValue === "") return alert("할일을 입력해주세요");
    let task = {
        id:randomIDGenerate(),
        taskContent: taskValue,
        isComplete: false
    }
    taskList.push(task)
    taskInput.value = "";
    render();
}

function render() { // 화면에 그리기. onclick방식
    //1. 내가선택한 탭에 따라서
    let list=[]
    if(mode === "all") {
        list = taskList
    }else if(mode === "ongoing" || mode === "done") {
        list = filterList
    }
    //2. 리스트를 달리 보여준다
    
    let resultHTML = ''

    for(let i=0;i<list.length;i++) {
        if(list[i].isComplete) {
            resultHTML+=`<div class="task">
            <div class ="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">
                    <img src="https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-return-icon-image_1344469.jpg" width = "10">
                </button> 
                <button onclick="deleteTask('${list[i].id}')">
                    <img src="https://cdn-icons-png.flaticon.com/512/6048/6048205.png" width = "10">
                </button>
            </div>
        </div>` // https://cdn-icons-png.flaticon.com/512/5290/5290119.png
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">
                <img src="https://cdn-icons-png.flaticon.com/512/5290/5290119.png" width = "10">
            </button> 
            <button onclick="deleteTask('${list[i].id}')">
                <img src="https://cdn-icons-png.flaticon.com/512/6048/6048205.png" width = "10">
            </button>
        </div>
    </div>`
        }
            
       
    }
    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id) {
    console.log("id:", id)
    for(let i = 0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete= !taskList[i].isComplete // 스위치
            break;
        }
    }
    filter()
    console.log(taskList)
}
function filter(event) {
    ///mode = event.target.id
    if (event) {
        mode = event.target.id;
        under.style.width = event.target.offsetWidth + "px";
        under.style.left = event.target.offsetLeft + "px";
        under.style.top =
        event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
      }

    filterList = []
    if(mode === "all") {
        //전체 리스트를 보여준다.
        render()
    } else if(mode === "ongoing") {
        //진행중인 아이템을 보여준다.
        //task.isComplete=false
        for(let i=0;i<taskList.length;i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i])
            }
        }
        
    } else if(mode === "done") {
        //끝나는 케이스
        //task.isComplete=true
        for(let i=0;i<taskList.length;i++) {
            if(taskList[i].isComplete) {
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    for(let i=0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
           
        }
    }
    filter() 
}