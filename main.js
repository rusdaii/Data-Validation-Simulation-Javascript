let arrayMembers = [];
const form = document.getElementById('form')
const nameInput = document.getElementById('nameInput');
const ageInput = document.getElementById('ageInput');
const allowanceInput = document.getElementById('allowanceInput');
const memberTable = document.getElementById("membersTable");

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
    const nameInputValue = formData.get('nameForm')
    const ageInputValue = parseInt(formData.get('ageForm'));
    const allowanceInputValue = parseInt(formData.get('allowanceForm'));

    const nameValid = nameInputValue.length >= 10;
    const ageValid = ageInputValue >= 25;
    const allowanceValid = allowanceInputValue >= 100000 && allowanceInputValue <= 1000000;

    nameInput.classList.toggle('is-valid', nameValid);
    nameInput.classList.toggle('is-invalid', !nameValid);
    document.getElementById('nameInputAlert').textContent = nameValid ? '' : 'Nama harus memiliki minimal 10 karakter';

    ageInput.classList.toggle('is-valid', ageValid);
    ageInput.classList.toggle('is-invalid', !ageValid);
    document.getElementById('ageInputAlert').textContent = ageValid ? '' : 'Umur minimal 25 Tahun';

    allowanceInput.classList.toggle('is-valid', allowanceValid);
    allowanceInput.classList.toggle('is-invalid', !allowanceValid);
    document.getElementById('allowanceInputAlert').textContent = allowanceValid ? '' : 'Uang Saku Antara Rp 100.000 - Rp 1.000.000';

    return nameValid && ageValid && allowanceValid;
}

// Function untuk reset form setelah proses submit
function resetValidity() {
    form.reset()
    nameInput.classList.remove('is-valid');
    ageInput.classList.remove('is-valid');
    allowanceInput.classList.remove('is-valid');
}

// Menambahkan member ke tabel
async function addMember() {
    const formData = new FormData(form)
    const nameInputValue = formData.get('nameForm')
    const ageInputValue = parseInt(formData.get('ageForm'));
    const allowanceInputValue = parseInt(formData.get('allowanceForm'));

    const newRow = memberTable.insertRow();
    const rowNumber = memberTable.rows.length;

    newRow.insertCell(0).textContent = rowNumber;
    newRow.insertCell(1).textContent = nameInputValue;
    newRow.insertCell(2).textContent = ageInputValue;
    newRow.insertCell(3).textContent = allowanceInputValue;

    let addMembers = new Person(nameInputValue, ageInputValue, allowanceInputValue);
    await addMembers.save();
    arrayMembers.push(addMembers);
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
form.addEventListener("input", validateInput);
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (validateInput()) {
        await addMember();
        myModal.show();
        average();
        resetValidity();
    }
    setTimeout(() => {
        myModal.hide();
    }, 3000);
});



