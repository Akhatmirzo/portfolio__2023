const membersEl = document.getElementById('members');
const formEl = document.getElementById('formEl');
const formCash = document.getElementById('formCash');
const info = document.getElementById('info');
const editModalEl = document.querySelector('.editModal');

let users = [];
let usersCash = [];

// Locale storage get users
const localeUserFit = localStorage.getItem('usersFitness');
if (JSON.parse(localeUserFit)) {
    users = JSON.parse(localeUserFit);
} else {
    users = [];
}

// Locale storage get usersCash
const localeUserCash = localStorage.getItem('usersCash');
if (JSON.parse(localeUserCash)) {
    usersCash = JSON.parse(localeUserCash);
} else {
    usersCash = [];
}

// render function activity
renderEl()
console.log(users);
console.log(usersCash);
// Form submit function
formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    // form input values
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const ageDate = e.target[2].value.split('-');
    const nowDate = new Date();

    // User name is finding
    let isFinding = true;
    if (users.length) {
        for (let user of users) {
            if (user.firstName === firstName && user.lastName === lastName) {
                isFinding = false;
                break;
            }
        }
    }

    if (ageDate[0] < nowDate.getFullYear() && isFinding) {
        const age = nowDate.getFullYear() - ageDate[0];

        const user = {
            id: users.length,
            firstName,
            lastName,
            age,
            createAt: nowDate
        }

        users.push(user);
        localStorage.setItem('usersFitness', JSON.stringify(users));

        // Render the users list
        renderEl();
        // User select form

        userSelectRender();

        ErrorElement("toast_success_template", "Foydalanuvchi ro'yxatga olindi!");

    } else if (!isFinding) {
        ErrorElement("toast_danger_template", "Bu foydalanuvchi mavjud!");
    } else {
        ErrorElement("toast_error_template", "Noto'g'ri sana kiritildi!");
    }
})

// Render html
function renderEl() {
    membersEl.innerHTML = "";

    users.forEach(user => {
        const template = `
        <div class="w-[400px] p-4 bg-white text-[#333] flex flex-col rounded-[15px]">
            <h4>Firstname: <span>${user.firstName}</span></h4>
            <h4>Lastname: <span>${user.lastName}</span></h4>
            <h4>Age: <span>${user.age}</span></h4>

            <div class="self-end">
                <button onclick="editMember(${user.id}, saveEditMember)" class="inline-block rounded bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]">
                    edit
                </button>

                <button onclick="userInfoRender(${user.id})" class="inline-block rounded bg-blue-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0">More</button>
                
                <button  onclick="deleteMember(${user.id})" class="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                    delete
                </button>
            </div>
        </div>
        `

        membersEl.innerHTML += template;
    });
}

// Charckout template render function
const userSelect = document.getElementById('userSelect');

function userSelectRender() {
    userSelect.innerHTML = "";
    userSelect.innerHTML = `
    <option value=".">Select user</option>
    `

    for (let user of users) {

        const template = `
        <option value="${user.id}">
            ${user.firstName} ${user.lastName}
        </option>
        `

        userSelect.innerHTML += template;
    }
}

userSelectRender();

// Form checkout
formCash.addEventListener('submit', (e) => {
    e.preventDefault();

    // Cash form input
    let fromInput = e.target[2].value;
    let toInput = e.target[3].value;
    let price = e.target[4].value;
    let select = userSelect.value;
    let fullName = `${users[select]?.firstName} ${users[select]?.lastName}`;

    if (select != '.') {
        const userCash = {
            userCashId: usersCash.length,
            from: fromInput,
            to: toInput,
            fullName,
            userId: select,
            price
        }

        e.target[2].value = '';
        e.target[3].value = '';
        e.target[4].value = '';
        userSelect.value = '';

        usersCash.push(userCash);
        localStorage.setItem('usersCash', JSON.stringify(usersCash));
        ErrorElement("toast_success_template", "Foydalanuvchi to'lovi ro'yxatga olindi!");
    } else {
        ErrorElement("toast_danger_template", "Select orqali userni tanlang!!!");
    }
    console.log(usersCash);
});

// User cash information rendering
const userInformationWrap = document.querySelector('.userInformationWrap');
const userInfo = document.getElementById('userInfo');
const cashsInfo = document.getElementById('cashsInfo');

function userInfoRender(id) {
    userInfo.innerHTML = "";
    cashsInfo.innerHTML = "";

    let userCashEl = usersCash.filter((cash) => cash.userId == id);

    const userInfoTemplate = `
        <h2>Firstname: ${users[id].firstName}</h2>
        <h2>Lastname: ${users[id].lastName}</h2>
        <h2>Age: ${users[id].age}</h2>
    `
    userInfo.innerHTML = userInfoTemplate;

    userCashEl.forEach((res, index) => {
        const cashElTemplate = `
        <tr>
            <th class="border-2">${index + 1}</th>
            <th class="border-2">${res.fullName}</th>
            <th class="border-2">${res.from}</th>
            <th class="border-2">${res.to}</th>
            <th class="border-2"><span>$</span>${res.price}</th>
        </tr>
        `

        cashsInfo.innerHTML += cashElTemplate;
    });

    userInformationWrap.classList.remove('hidden');
    userInformationWrap.classList.add('flex');
}

function closeModal(type) {
    switch (type) {
        case "memberCashModalClosed":
            userInformationWrap.classList.add('hidden');
            userInformationWrap.classList.remove('flex');
            break
        case "editModalClosed":
            editModalEl.classList.add('hidden');
            break
    }
}

function deleteMember(id) {
    const res = users.filter(user => user.id != id);
    const resMemberCash = usersCash.filter(cash => cash.userId != id);

    const confirmDel = confirm("Siz userni o'chirib yubormoqchimisiz?");

    if (confirmDel) {
        users = res;
        usersCash = resMemberCash;

        localStorage.setItem('usersFitness', JSON.stringify(users));
        localStorage.setItem('usersCash', JSON.stringify(usersCash));

        ErrorElement("toast_success_template", "User O'chirib tashlandi!");

        renderEl()
    }else {
        ErrorElement("toast_error_template", "Delete bekor qilindi!");
    }
}

const editModalForm = document.querySelector('.editModalForm');

function editMember(id, cb) {
    editModalEl.classList.remove('hidden');
    editModalEl.classList.add('flex');

    const res = users.filter(user => user.id == id);

    editModalForm[0].value = res[0].firstName;
    editModalForm[1].value = res[0].lastName;
    editModalForm[2].value = res[0].age;

    editModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        cb(res, id);
    });
}

function saveEditMember(arr, id) {
    editModalEl.classList.add('hidden');

    const editFirstName = editModalForm[0].value;
    const editLastName = editModalForm[1].value;
    const editAge = editModalForm[2].value;

    arr[0].firstName = editFirstName;
    arr[0].lastName = editLastName;
    arr[0].age = editAge;

    const confirmedEdit = confirm("O'rgarishlarni saqlashni hohlaysizmi?");

    if (confirmedEdit) {
        usersCash.map(userCash => {
            if (userCash.userId == id) {
                userCash.fullName = editFirstName + " " + editLastName;
            }
        })

        localStorage.setItem('usersFitness', JSON.stringify(users));
        localStorage.setItem('usersCash', JSON.stringify(usersCash));

        renderEl();

        ErrorElement("toast_success_template", "O'rgarishlar saqlandi!");
    } else {
        ErrorElement("toast_error_template", "O'rgarishlar saqlanishi bekor qilindi!");
    }

}


function ErrorElement(error, text) {
    const alertError = document.getElementById('alertError');
    alertError.innerHTML = "";

    const toast_success_template = `
        <div id="toast-success" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <span class="sr-only">Check icon</span>
            </div>
            <div class="ms-3 text-sm font-normal">${text}</div>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    `

    const toast_danger_template = `
        <div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
                <span class="sr-only">Error icon</span>
            </div>
            <div class="ms-3 text-sm font-normal">${text}</div>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    `

    const toast_error_template = `
        <div id="toast-warning" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
                <span class="sr-only">Warning icon</span>
            </div>
            <div class="ms-3 text-sm font-normal">${text}</div>
            <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    `

    const errors = ["toast_success_template", "toast_danger_template", "toast_error_template"];
    switch (error) {
        case `${errors[0]}`:
            alertError.innerHTML += toast_success_template;
            break;

        case `${errors[1]}`:
            alertError.innerHTML += toast_danger_template;
            break;

        case `${errors[2]}`:
            alertError.innerHTML += toast_error_template;
            break;
        default:
            console.log("Error: " + typeof (error));
    }

    setTimeout(() => {
        alertError.innerHTML = "";
    }, 1000 * 3)
}