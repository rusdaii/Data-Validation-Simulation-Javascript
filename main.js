let arrMembers = [];
let form = document.getElementById("form")

class Person {
    constructor(name, age, allowance) {
        this.name = name;
        this.age = age;
        this.allowance = allowance;
    }

    save() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }
}

// Validasi input
function validateInput() {
    const formData = new FormData(form)
    const nameInput = formData.get('nameInput')
    const ageInput = formData.get('ageInput')
    const allowanceInput = formData.get('allowanceInput')

    if (nameInput.length < 10) {
        alert("Nama harus memiliki minimal 10 karakter");
        return false;
    }
    if (ageInput < 25) {
        alert("Umur minimal 25 tahun");
        return false;
    }
    if (allowanceInput < 100000 || allowanceInput > 1000000) {
        alert("Uang Saku harus antara 100 ribu sampai 1 juta");
        return false;
    }
    return true;
}

// Menambahkan member ke tabel
async function addMember() {
    const formData = new FormData(form)
    const nameInput = formData.get('nameInput')
    const ageInput = formData.get('ageInput')
    const allowanceInput = formData.get('allowanceInput')
    const memberTable = document.getElementById("membersTable");

    const newRow = memberTable.insertRow();
    const rowNumber = memberTable.rows.length;

    newRow.insertCell(0).textContent = rowNumber;
    newRow.insertCell(1).textContent = nameInput;
    newRow.insertCell(2).textContent = ageInput;
    newRow.insertCell(3).textContent = allowanceInput;

    let addMembers = new Person(nameInput, ageInput, allowanceInput);
    await addMembers.save();
    arrMembers.push(addMembers);
}

// Mencari rata-rata dari umur & uang saku
function average() {
    const memberTable = document.getElementById("membersTable");
    const rows = memberTable.rows;
    let totalAge = 0;
    let totalAllowance = 0;

    for (let i = 0; i < rows.length; i++) {
        const ageCell = rows[i].cells[2];
        const age = parseInt(ageCell.textContent);
        totalAge += age;

        const allowanceCell = rows[i].cells[3];
        const allowance = parseInt(allowanceCell.textContent);
        totalAllowance += allowance;
    }

    const averageAge = Math.round(totalAge / (rows.length));
    const averageAllowance = Math.round(totalAllowance / (rows.length));

    document.getElementById("resumeAge").innerHTML = "Rata-rata Umur: " + averageAge
    document.getElementById("resumeAllowance").innerHTML = "Rata-rata Uang Saku: " + averageAllowance
}

// Triger Modal Bootstrap
const myModal = new bootstrap.Modal(document.getElementById("modal-signup"))

// Eventlistener
let registerButton = document.getElementById("registerBtn")
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (validateInput()) {
        await addMember();
        myModal.show();
        form.reset();
        average();
    }
    setTimeout(() => {
        myModal.hide();
    }, 3000);
});

