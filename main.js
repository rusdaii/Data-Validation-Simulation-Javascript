let arrMembers = [];

class Person {
    constructor(number, name, age, allowance) {
        this.number = number;
        this.name = name;
        this.age = age;
        this.allowance = allowance;
    }

    async save() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
}

// Validasi input
function validateInput() {
    let nameInput = document.getElementById("nameInput").value;
    let ageInput = document.getElementById("ageInput").value;
    let allowanceInput = document.getElementById("allowanceInput").value;

    if (nameInput.length < 10) {
        alert("Nama harus memiliki minimal 10 karakter");
        return false;
    }
    if (ageInput < 25) {
        alert("Umur minimal 25 tahun");
        return false;
    }
    if (allowanceInput < 100000 || allowanceInput > 1000000) {
        alert("Uang Sangu harus antara 100 ribu dan 1 juta");
        return false;
    }
    return true;
}

// Menambahkan member ke tabel
async function addMember() {
    let nameInput = document.getElementById("nameInput").value;
    let ageInput = document.getElementById("ageInput").value;
    let allowanceInput = document.getElementById("allowanceInput").value;
    let memberTable = document.getElementById("membersTable");

    const newRow = memberTable.insertRow();
    const rowNumber = memberTable.rows.length;

    newRow.insertCell(0).textContent = rowNumber;
    newRow.insertCell(1).textContent = nameInput;
    newRow.insertCell(2).textContent = ageInput;
    newRow.insertCell(3).textContent = allowanceInput;

    let addMembers = new Person(rowNumber, nameInput, ageInput, allowanceInput);
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


// Eventlistener
let form = document.getElementById("form")
let registerButton = document.getElementById("registerBtn")
registerButton.addEventListener("click", async function (event) {
    event.preventDefault();
    if (validateInput()) {
        await addMember();
        form.reset();
        average();
    }
});