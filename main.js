// modal
let crud_modal = document.querySelector(".modal-cud");
let button_add = document.querySelector(".add");
let close_modal = document.querySelector(".close-modal");
const modal = document.querySelector("#modal");
crud_modal.style.display = "none";
// modal.style.display = "none";

// body
let body = document.querySelector("body");

button_add.addEventListener("click", function () {
    crud_modal.style.display = "block";
    crud_modal.style.display = "flex";
});

close_modal.addEventListener("click", function () {
    crud_modal.style.display = "none";
});

function Add() {
    const data = JSON.parse(localStorage.getItem('data')) || [];

    const nom_tache = document.querySelector("#name");
    const type_tache = document.querySelector(".type-tache");
    const description_tache = document.querySelector("#description");
    const submit_button = document.querySelector(".submit_boutton");

    submit_button.addEventListener("click", function (event) {
        location.reload();
        event.preventDefault();

        const datatache = {
            name: nom_tache.value,
            type: type_tache.value,
            description: description_tache.value
        };

        data.push(datatache);

        localStorage.setItem('data', JSON.stringify(data));

        crud_modal.style.display = 'none';

        affiche();
    });
}

Add();

function affiche() {
    const board1 = document.querySelector(".tache1");
    const board2 = document.querySelector(".tache2");
    const board3 = document.querySelector(".tache3");
    // console.log(board3)
    const board4 = document.querySelector(".tache4");


    // board1.innerHTML = '';
    // board2.innerHTML = '';
    // board3.innerHTML = '';


    const datalo = JSON.parse(localStorage.getItem('data')) || [];
    console.log(typeof(datalo))
    datalo.forEach(element => {
        const div_tache = document.createElement("div");
        div_tache.classList.add("tachelo");
        div_tache.classList.add("tache");

        div_tache.innerHTML = `
            <div draggable="true" class="tache">
                <h1>${element.description}</h1>
                    <button class="button-delete">Delete</button>
                    <button class="button-edit">Modifier</button>
            </div>
        `;

        if (element.type === "backlog") {
            board1.appendChild(div_tache);
        } else if (element.type === "todo") {
            board2.appendChild(div_tache);
        } else if (element.type === "doing") {
            board3.appendChild(div_tache);
        }
        else if (element.type == "done") {
            board4.appendChild(div_tache);
        }


    });
    // location.reload();
    // else if(element.type == "done")
    // {
    //     board4.appendChild(div_tache);
    // }
    // location.reload();
}

setTimeout(function () {
    function placetache() {
        let boardclicked;

        const parenttache = document.querySelectorAll(".tacho");
        child = parenttache.children;
        const taches = document.querySelectorAll(".tachelo");
        //  console.log(parenttache);
        //  console.log(taches);

        parenttache.forEach(function (element) {
            console.log(element);
            element.addEventListener("click", function () {
                boardclicked = element;
                console.log(boardclicked);

            })
        })
        taches.forEach(function (element) {
            element.addEventListener("click", function () {
                boardclicked.appendChild(element);
            })
        })


    }
    placetache();
}, 500);

setTimeout(function () {
    function edit() {
        const submit_button = document.querySelector(".submit_boutton");
        const description_tache = document.querySelector("#description");
        const type_tache = document.querySelector(".type-tache");
        const datalo = JSON.parse(localStorage.getItem('data')) || [];
        const button_edit = document.querySelectorAll(".button-edit");
        button_edit.forEach(element => {
            element.addEventListener("click", function () {
                const parentdiv = element.parentNode;
                //    console.log(parentdiv);
                const elementh1 = parentdiv.querySelector("h1");
                // console.log(elementh1);
                datalo.forEach(element => {
                    if (element.description == elementh1.textContent) {

                        crud_modal.style.display = "block";
                        description_tache.value = element.description;
                        type_tache.value = element.type;
                        submit_button.addEventListener("click", function () {
                            element.description = description_tache.value;
                            element.type = type_tache.value;
                            localStorage.setItem('data', JSON.stringify(datalo));
                            console.log(element.description);
                            crud_modal.style.display = "none";
                            affiche();

                        })



                    }
                })




            })


        })


    }

    edit();
}, 500);

setTimeout(function () {
    function delete_tache() {
        const de_button = document.querySelectorAll(".button-delete");
        const type_tache = document.querySelector(".type-tache");
        const datalo = JSON.parse(localStorage.getItem('data')) || [];
        // console.log(de_button);

        de_button.forEach(element => {
            element.addEventListener("click", function () {
                const ElementNode = element.parentNode;
                const h1element = ElementNode.querySelector("h1");

                console.log(h1element);
      let newarrayfiltered =  datalo.filter(function(element){
                 return   element.description != h1element.textContent;
                })
                console.log(newarrayfiltered);
                localStorage.setItem('data', JSON.stringify(newarrayfiltered));
                affiche();
                location.reload();
            })
        })




    }

    delete_tache();

}, 500);

document.addEventListener("DOMContentLoaded", function () {
    affiche();
});
