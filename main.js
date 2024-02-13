//유저가 값을 입력한다.
// + 버튼을 누른, 할일이 추가
// delete 버튼을 누르면 할일이 삭제
// check 버튼을  누르면 할일이 끝나면서 밑줄이 간다.
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난탭만. 진행중탭은, 진행중인 아이템만.
// 전체탭을 누르면 다시 전체아이템으로 돌아옴.

let taskInput = document.getElementById("task-input") //id로 가져오기
let addButton = document.getElementById("add-button")
let taskList = []

addButton.addEventListener("click", addTask)

function addTask() {
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList)
    render();
}

function render() { // 화면에 그리기
    let resultHTML = ''
    for(let i=0;i<taskList.length;i++) {
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`
    }
    document.getElementById("task-board").innerHTML = resultHTML
}