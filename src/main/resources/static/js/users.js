async function getUsers() {
    let response = await fetch('http://localhost:8080/api/users')
    let content = await response.json()

    let usersTable = document.querySelector('#usersTable')

    for (let key in content) {

        usersTable.innerHTML += `
            <tr>
                <td>${content[key].id}</td>
                <td>${content[key].username}</td>
                <td>${content[key].name}</td>
                <td>${content[key].surname}</td>
                <td>${content[key].age}</td>
                <td>${content[key].email}</td>
                <td>${content[key].roles.map(value => value.name.substring(5)).join(' ')}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#editModal"
                            th:data-id="${content[key].id}"
                            th:data-username="${content[key].username}"
                            th:data-name="${content[key].name}"
                            th:data-surname="${content[key].surname}"
                            th:data-age="${content[key].age}"
                            th:data-email="${content[key].email}"
                            th:data-roles="${content[key].roles}">
                        Edit
                    </button>
                </td>
                <td>Delete</td>
            </tr>
        `

    }
}

getUsers()