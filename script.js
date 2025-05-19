const API_URL = 'http://localhost:3000/users';

// Crate a new user

    function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const _id = document.getElementById('studentId').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email,_id, mobile, address, gender})
    })
    .then(res => res.json())
    .then(() => fetchUsers());
}
// Fetch all users
function fetchUsers() {
    fetch(API_URL)
        .then(res => res.json())
        .then(users => {
            const list = document.getElementById('userList');
            list.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `StudentId: ${user._id}, Name: ${user.name}, Email:${user.email}, MobileNo: ${user.mobile}, Gender: ${user.gender},Address: ${user.address})`;
                li.onclick = () => selectUser(user);
                list.appendChild(li);
            });
        });
}

// Update an existing user
function updateUser() {
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    })
    .then(() => fetchUsers());
}

// Delete a user
function deleteUser() {
    const id = document.getElementById('studentId').value;
    console.log("id ",id)
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchUsers());
}

function selectUser(user) {
    document.getElementById('studentId').value = user._id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('mobile').value = user.mobile;
    document.getElementById('address').value = user.address;
    document.getElementById('gender').value = user.gender;
}
