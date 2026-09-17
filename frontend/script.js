const API_URL = "http://127.0.0.1:8000/api/students/";

// GET ALL STUDENTS
function getStudents() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("studentTable");
            table.innerHTML = "";

            data.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.age}</td>
                        <td>${student.course}</td>
                        <td>
                            <button onclick="editStudent(${student.id})">
                                Edit
                            </button>
                            <button onclick="deleteStudent(${student.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

                table.innerHTML += row;
            });
        })
        .catch(error => {
            console.error("Error loading students:", error);
        });
}


// CREATE STUDENT
function createStudent() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const course = document.getElementById("course").value;

    if (!name || !email || !age || !course) {
    alert("Please fill in all fields.");
    return;
}

if (age <= 0) {
    alert("Age must be greater than 0.");
    return;
}

if (!email.includes("@")) {
    alert("Please enter a valid email.");
    return;
}

    const student = {
        name: name,
        email: email,
        age: age,
        course: course
    };

    fetch("http://127.0.0.1:8000/api/students/create/", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)
    })

    .then(response => response.json())

    .then(data => {

        alert("Student added successfully!");

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("course").value = "";

        getStudents();
    })

    .catch(error => {
    console.error("Error creating student:", error);
    alert("Error: " + error.message);
});
}


// DELETE STUDENT
function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
        return;
    }

    fetch(`http://127.0.0.1:8000/api/students/delete/${id}/`, {
        method: "DELETE"
    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        getStudents();
    })

    .catch(error => {

        console.error("Error deleting student:", error);

        alert("Could not delete student.");
    });
}


// EDIT STUDENT
function editStudent(id) {

    const name = prompt("Enter new name:");

    if (name === null) {
        return;
    }

    const email = prompt("Enter new email:");

    if (email === null) {
        return;
    }

    const age = prompt("Enter new age:");

    if (age === null) {
        return;
    }

    const course = prompt("Enter new course:");

    if (course === null) {
        return;
    }

    const student = {
        name: name,
        email: email,
        age: age,
        course: course
    };

    fetch(`${API_URL}${id}/`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)
    })

    .then(response => response.json())

    .then(data => {

        alert("Student updated successfully!");

        getStudents();
    })

    .catch(error => {

        console.error("Error updating student:", error);

        alert("Could not update student.");
    });
}


// LOAD STUDENTS WHEN PAGE OPENS
getStudents();