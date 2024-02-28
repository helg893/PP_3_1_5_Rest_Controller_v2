const urlUsers = 'http://localhost:8080/api/users'

async function getAllUsers() {
    try {
        let response = await fetch(urlUsers)
        if (response.ok) {
            return await response.json()
        } else {
            alert('fetching users unexpected response: ' + response.status + ' ' + response.statusText)
        }
    } catch (e) {
        alert('fetching users unexpected error: ' + e);
    }
}

// async function showAllUsers() {
//     try {
//         let response = await fetch(urlUsers)
//
//         if (response.ok) {
//             let content = await response.json()
//             let usersTable = document.querySelector('#usersTable')
//
//             for (let key in content) {
//                 usersTable.innerHTML += `
//                     <tr>
//                         <td>${content[key].id}</td>
//                         <td>${content[key].username}</td>
//                         <td>${content[key].name}</td>
//                         <td>${content[key].surname}</td>
//                         <td>${content[key].age}</td>
//                         <td>${content[key].email}</td>
//                         <td>${content[key].roles.map(value => value.name.substring(5)).join(' ')}</td>
//                         <td>
//                             <button type="button" class="btn btn-primary" data-bs-toggle="modal"
//                                     data-bs-target="#editModal"
//                                     th:data-id="${content[key].id}"
//                                     th:data-username="${content[key].username}"
//                                     th:data-name="${content[key].name}"
//                                     th:data-surname="${content[key].surname}"
//                                     th:data-age="${content[key].age}"
//                                     th:data-email="${content[key].email}"
//                                     th:data-roles="${content[key].roles}">
//                                 Edit
//                             </button>
//                         </td>
//                         <td>Delete</td>
//                     </tr>
//                 `
//             }
//         } else {
//             alert('Unexpected getAllUsers response: ' + response.status + ' ' + response.statusText)
//         }
//     } catch (e) {
//         alert('Fetching users error: ' + e)
//     }
// }

async function showAllUsers() {
    const users = await getAllUsers()
    let usersTable = document.querySelector('#usersTable')

    usersTable.innerHTML = ""
    for (let key in users) {
        usersTable.innerHTML += `
                    <tr>
                        <td>${users[key].id}</td>
                        <td>${users[key].username}</td>
                        <td>${users[key].name}</td>
                        <td>${users[key].surname}</td>
                        <td>${users[key].age}</td>
                        <td>${users[key].email}</td>
                        <td>${users[key].roles.map(value => value.name.substring(5)).join(' ')}</td>
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#modalEdit"
                                    data-operation="edit"
                                    data-id="${users[key].id}">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#modalEdit"
                                    data-operation="delete"
                                    data-id="${users[key].id}">
                                Delete
                            </button>
                        </td>
                    </tr>
                `
    }
}

showAllUsers()


const urlRoles = 'http://localhost:8080/api/roles'
async function getAllRoles() {
    try {
        let response = await fetch(urlRoles)
        if (response.ok) {
            return await response.json()

        } else {
            alert('fetching users roles unexpected response: ' + response.status + ' ' + response.statusText)
        }
    } catch (e) {
        alert('fetching users roles unexpected error: ' + e)
    }

}

async function showAllRoles() {
    const roles = await getAllRoles()
    const newUserRoles = document.getElementById("newUserRoles")
    newUserRoles.innerHTML = ""
    for (let key in roles) {
        newUserRoles.innerHTML += `
            <option id="${roles[key].id}" value="${roles[key].name}">${roles[key].shortName}</option>
        `
    }
}

// async function showAllRoles() {
//     try {
//         let response = await fetch(urlRoles)
//         if (response.ok) {
//             let content = await response.json()
//             let roles = document.querySelector('#roles')
//             for (let key in content) {
//                 roles.innerHTML += `<option value="${content[key].name}">${content[key].shortName}</option>`
//             }
//         } else {
//             alert('Unexpected response: ' + response.status + ' ' + response.statusText)
//         }
//     } catch (e) {
//         alert('Fetching users roles error: ' + e)
//     }
// }

showAllRoles()

const usersTabletab = document.getElementById("usersTable-tab");
usersTabletab.addEventListener("click", () => {
    showAllUsers()
})

let formNewUser = document.getElementById("formNewUser")
formNewUser.addEventListener("submit",  async (event) =>  {
    try {

        event.preventDefault()


        const newUserRoles = document.getElementById("newUserRoles")
        let roles = []

        for (const option of newUserRoles.selectedOptions) {
            let r = {
                id: option.id,
                name: option.value
            }
            roles.push(r)
        }

        const formData = new FormData(formNewUser)
        let object = {roles: roles};
        formData.forEach((value, key) => {
            // Reflect.has in favor of: object.hasOwnProperty(key)
            if(!Reflect.has(object, key)){
                object[key] = value;
            }

        });
        // let json = JSON.stringify(object);
        // console.log(json)


//         const jsonNewUser = `
// {
// "username": "U5",
// "password": "555",
// "name": "U5",
// "surname": "U5",
// "age": 55,
// "email": "u5@mail.ru",
// "roles": [
// {
// "id": 5,
// "name": "ROLE_ADMIN"
// },
// {
// "id": 6,
// "name": "ROLE_USER"
// }
// ]
// }
//         `



        // const formData = new FormData(formNewUser)
        // let object = {};
        // formData.forEach((value, key) => {
        //     // Reflect.has in favor of: object.hasOwnProperty(key)
        //     if(!Reflect.has(object, key)){
        //         object[key] = value;
        //         return;
        //     }
        //     if(!Array.isArray(object[key])){
        //         object[key] = [object[key]];
        //     }
        //     object[key].push(value);
        // });
        // console.log(object)
        // let json = JSON.stringify(object);
        // console.log(json)



        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        //
        // console.log(fd.get('username'))


        const response = await fetch(urlUsers, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
            // body: json
        })

        if (!response.ok) {
            alert("fetching new user unexpected response: " + response.status + " " + response.statusText)
        } else {

            formNewUser.reset()
            showAllUsers()
            document.getElementById("usersTable-tab").click()
        }

        // const response = await fetch(urlUsers, {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: jsonNewUser
        // })

        // console.log("response.ok=" + response.ok)
        // console.log("response.status=" + response.status)
        // console.log("response.statusText=" + response.statusText)
        // console.log(await response.json())



    } catch (e) {
        alert("fetching new user unexpected error: " + e)
    }
})

const newUserUsername = document.getElementById("newUserUsername")
newUserUsername.addEventListener("input", event => {
    const checkIfUsersExists = async () => {
        const users = await getAllUsers()
        newUserUsername.setCustomValidity("");
        for (let key in users) {
            if (users[key].username.toLowerCase() === newUserUsername.value.toLowerCase()) {
                newUserUsername.setCustomValidity("this username exists. please enter new username");
                break
            }
        }
    }
    checkIfUsersExists()
})

const newUserEmail = document.getElementById("newUserEmail")
newUserEmail.addEventListener("input", () => {
    const checkIfEmailExists = async () => {
        const users = await getAllUsers()
        newUserEmail.setCustomValidity("")
        for (let key in users) {
            if (users[key].email.toLowerCase() === newUserEmail.value.toLowerCase()) {
                newUserEmail.setCustomValidity("user with this email exists. please enter new email")
                break
            }
        }
    }
    checkIfEmailExists()
})

async function getUser(id) {
    try {
        let response = await fetch(urlUsers + "/" + id)
        if (response.ok) {
            return await response.json()
        } else {
            alert("fetching user id=" + id + " unexpected response: " + response.status + " " + response.statusText)
        }

    } catch (e) {
        alert("fetching user id=" + id + " unexpected error: " + e)
    }
}

let formEditUser = document.getElementById("formEditUser")
const modalEdit = document.getElementById("modalEdit")

modalEdit.addEventListener("show.bs.modal", event => {
    const showAllRoles = async () => {
        const roles = await getAllRoles()
        formEditUser.roles.innerHTML = ""
        for (let role of roles) {
            formEditUser.roles.innerHTML += `<option id="${role.id}" value="${role.name}">${role.shortName}</option>`
        }
    }
    showAllRoles()

    const showUser = async () => {
        const user = await getUser(event.relatedTarget.dataset.id)
        formEditUser.id.value = user.id
        formEditUser.username.value = user.username
        formEditUser.name.value = user.name
        formEditUser.surname.value = user.surname
        formEditUser.email.value = user.email
        formEditUser.age.value = user.age
        for (let option of formEditUser.roles) {
            for (let role of user.roles) {
                if (option.id == role.id) {
                    option.selected = true
                }
            }
        }
    }
    showUser()

    const modalDivPassword = document.getElementById("modalDivPassword")
    const modalHeaderLabel = document.getElementById("modalHeaderLabel")
    const modalButtonSubmit = document.getElementById("modalButtonSubmit")
    if (event.relatedTarget.dataset.operation === "delete") {
        formEditUser.setAttribute("method", "DELETE")
        // formEditUser.method = "DELETE"
        formEditUser.password.value="pwd"
        modalDivPassword.style.display = "none"
        formEditUser.username.disabled = true
        formEditUser.name.disabled = true
        formEditUser.surname.disabled = true
        formEditUser.email.disabled = true
        formEditUser.age.disabled = true
        formEditUser.roles.disabled = true
        modalButtonSubmit.textContent = "Delete"
        modalHeaderLabel.textContent = "Delete user"
    } else if (event.relatedTarget.dataset.operation === "edit") {
        formEditUser.setAttribute("method", "PUT")
        // formEditUser.method = "PATCH"
        modalDivPassword.style.display = ""
        formEditUser.username.disabled = false
        formEditUser.name.disabled = false
        formEditUser.surname.disabled = false
        formEditUser.email.disabled = false
        formEditUser.age.disabled = false
        formEditUser.roles.disabled = false
        modalButtonSubmit.textContent = "Edit"
        modalHeaderLabel.textContent = "Edit user"
    } else {
        alert("unexpected user operation value")
    }
})

const modalUserId = document.getElementById("modalUserId")
formEditUser.addEventListener("submit", async (event)=>{
    event.preventDefault()

    if (formEditUser.getAttribute("method") === "DELETE") {
        try {
            const response = await fetch(urlUsers + "/" + formEditUser.id.value, {
                method: "DELETE"
            })

            if (response.ok) {
                showAllUsers()
                document.getElementById("modalButtonClose").click()
            } else {
                alert("fetch-delete user id=" + formEditUser.id.value + " unexpected response:"
                    + response.status + " " + response.statusText)
            }
        } catch (e) {
            alert("fetch-delete user id=" + formEditUser.id.value + " unexpected error: " + e)
        }

    } else if (formEditUser.getAttribute("method") === "PUT") {
        const editUserRoles = document.getElementById("editUserRoles")
        let roles = []

        for (const option of editUserRoles.selectedOptions) {
            let r = {
                id: option.id,
                name: option.value
            }
            roles.push(r)
        }

        const formData = new FormData(formEditUser)
        let object = {
            id: modalUserId.value,
            roles: roles
        }
        formData.forEach((value, key) => {
            // Reflect.has in favor of: object.hasOwnProperty(key)
            if(!Reflect.has(object, key)){
                object[key] = value;
            }

        });

        try {
            const response = await fetch(urlUsers, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object)
            })

            if (response.ok) {
                formEditUser.reset()
                showAllUsers()
                document.getElementById("modalButtonClose").click()
            } else {
                alert("fetch-edit user id=" + modalUserId.value + " unexpected response:"
                    + response.status + " " + response.statusText)
            }
        } catch (e) {
            alert("fetch-edit user id=" + modalUserId.value + " unexpected error: " + e)
        }

    } else {
        alert("modal form submit: unexpected user operation value")
    }

})

const modalUsername = document.getElementById("modalUsername");
modalUsername.addEventListener("input", ()=> {
    const checkIfUsernameExists = async () => {
        const users = await getAllUsers()
        modalUsername.setCustomValidity("")
        for (const user of users) {
            if (user.id != modalUserId.value && modalUsername.value.toLowerCase() === user.username.toLowerCase()) {
                modalUsername.setCustomValidity("another user with this username exists. please enter new username")
                break
            }
            // if (user.id != modalUserId.value) {
            //     if (modalUsername.value === user.username) {
            //         modalUsername.setCustomValidity("another user with this username exists. please enter new username")
            //         break
            //     }
            // }
        }
    }
    checkIfUsernameExists()
})

const modalUserEmail = document.getElementById("modalUserEmail")
modalUserEmail.addEventListener("input", ()=> {
    const checkIfUserEmailExists = async () => {
        const users = await getAllUsers()
        modalUserEmail.setCustomValidity("")
        for (const user of users) {
            if (user.id != modalUserId.value && modalUserEmail.value.toLowerCase() === user.email.toLowerCase()) {
                modalUserEmail.setCustomValidity("another user with this email exists. please enter new email")
                break
            }
            // if (user.id != modalUserId.value) {
            //     if (modalUserEmail.value === user.email) {
            //         modalUserEmail.setCustomValidity("another user with this email exists. please enter new email")
            //         break
            //     }
            // }
        }
    }
    checkIfUserEmailExists()
})