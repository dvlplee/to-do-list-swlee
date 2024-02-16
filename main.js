//유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가됨
// delete 버튼을 누르면, 할일이 삭제된다
// check 버튼을 누르면, 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 true를 false로
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난 걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝난탭은, 끝난 아이템만. 진행중탭은 진행중인 아이템만.
// 전체탭을 누르면 다시 전체아이템으로 돌아옴.

let taskInput = document.getElementById("task-input"); //html에서 아이디로 요소를 가져오기.태그에 id를 주고 들고옴.
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div"); // tabs의 div 요소 모두 가져오기
let underLine = document.getElementById("under-line");
let taskList = []; //입력값들의 배열
let mode = "all"; // 전역변수로
let filterList = []; // 전역변수로

addButton.addEventListener("mousedown", addTask); //이벤트발생할 때 실행할 함수. ("이벤트", 함수명)
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  //탭에 클릭이벤트 주기. underline은 빼야하므로 인덱스 1부터 시작
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

// 추가 함수
function addTask() {
  if (taskInput.value === "") return alert("할일을 입력해주세요");
  // 객체 : 추가정보를 묶어줌.
  let task = {
    id: randomIDGenerate(), // 고유한 랜덤 ID 부여
    taskContent: taskInput.value, // 입력창 값.
    isComplete: false, // 끝나지 않음(false)가 기본값.
  };
  taskList.push(task); // 객체task를 리스트taskList에 추가하기
  taskInput.value = "";
  render(); // 그리기
}
// 그리기 함수
function render() {
  //1.내가선택한 탭에따라서
  let list = [];
  if (mode === "all") {
    list = taskList; // all은 taskList 그대로
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  //2.리스트를 달리보여준다.

  let resultHTML = "";

  for (let i = 0; i < list.length; i++) {
    //차례대로 '보여야'하기 때문에 반복문
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task" id="taskBG"> 
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">
                    <i class="fa-solid fa-rotate-left" style="color: #4f5763;"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')">
                    <i class="fa-solid fa-eraser" style="color: #ff000d;"></i>
                </button>
            </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">
                    <i class="fa-solid fa-check" style="color: #059e47;"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')">
                    <i class="fa-solid fa-eraser" style="color: #ff000d;"></i>
                </button>
            </div>
        </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML; // 문자열을 HTML형식으로 붙여넣는다
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      //id로 해당 객체 찾아냄.
      taskList[i].isComplete = !taskList[i].isComplete; // 누를때마다 true->false, false->true로 스위치역할.
      break; // 한번 찾아내면 끝이니까.
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1); // 리스트 i번째 있는 해당 객체 삭제.
    }
  }
  filter();
}

function filter(event) {
  // 클락한 탭의 정보는 event가 가지고 있음.
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }
  filterList = [];

  if (mode === "ongoing") {
    //진행중인 아이템을 보여준다.
    //task.isComplete=false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]); // 진행중인 아이템을 모아놓는다.
      }
    }
  } else if (mode === "done") {
    //끝난 아이템을 보여준다.
    //task.isComplete=true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]); // 진행중인 아이템을 모아놓는다.
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
// 버튼에 이벤트주는 방식 : addEventListener("이벤트", 함수) or 버튼 속성값에 onclick="함수"
/*
filter를 호출하는 케이스가 2가지 입니다
1. 탭을 클릭했을때
2. 삭제버튼 또는 끝남 안끝남 을 toggle 했을때
탭을 클릭했을때는 내가 클릭한 탭이 뭔지 이름을 알기위해 event로 부터 
이름을 알아옵니다 (event.target.id) 따라서 이떄 filter를 호출할떄는 event 가 매개변수로 들어오고
삭제 버튼, 끝남 안 끝남을 클릭할 시에는 다시 리스트를 정렬해줘야 하기떄문에 filter를 부르지만 
현재 있는 탭에서 이동을 하는게 아니기 떄문에 event를 가져오거나 탭을 알 필요가 없습니다
따라서 이 두 가지 케이스를 반영하기 위해서 만약에 event가 있는 (다시 말하면 탭이 변하는) 케이스라면 
mode를 바꿔주는 거고, 그게 아니라면 모드 바꿔줄 필요 없이 필터링만 진행하고 render하는 것 입니다! 
*/
