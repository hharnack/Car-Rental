"use strict";

let filterResults = [];

window.onload = time;

//shows live time
function time() {
    let date = new Date();
    document.getElementById("time").innerHTML = date.toLocaleTimeString() + " " + date.toLocaleDateString();

    setTimeout(time, 1000);
}

//searchs for clients with the written last name 
function search() {
    let searchInput = document.getElementById("textInput").value;
    let inputText = searchInput.trim();

    if (!inputText) {
        return;
    }

    filterResults = [];

    filterResults = rentalClients.filter(customer => {
        return customer.last_name.toUpperCase().startsWith(inputText.toUpperCase());
    });

    displayResults();
}

//displays the results of the search 
function displayResults() {
    let result = document.getElementById("searchResult");
    result.innerHTML = "";

    for (let i = 0; i < filterResults.length; i++) {

        const container = document.createElement("button");
        container.style.border = "1px solid black";
        container.style.width = "210px";
        container.style.height = "20px";
        container.setAttribute("onclick", `showInfo(${i});`);

        container.innerHTML = (filterResults[i].first_name + " " + filterResults[i].last_name);

        result.append(container);
    }
}

//displays all of theinformation in the input boxes
function showInfo(index) {

    let lname = document.getElementById("lastName");
    lname.disabled = false;
    lname.value = filterResults[index].last_name;

    let fname = document.getElementById("firstName");
    fname.disabled = false;
    fname.value = filterResults[index].first_name;

    let address = document.getElementById("address");
    address.disabled = false;
    address.value = filterResults[index].address;

    let state = document.getElementById("state");
    state.disabled = false;
    state.value = filterResults[index].state_prov;

    let email = document.getElementById("email");
    email.disabled = false;
    email.value = filterResults[index].email;

    let phone = document.getElementById("phone");
    phone.disabled = false;
    phone.value = filterResults[index].phone;
}

//calculates and displays the total
function calcRental() {

    let total = 0;

    if (checkValid()) {

        document.getElementById("carType").style.display = "none";
        document.getElementById("output").style.display = "flex";

        let customer = {
            "lname": document.getElementById("lastName").value,
            "fname": document.getElementById("firstName").value,
            "address": document.getElementById("address").value,
            "state": document.getElementById("state").value,
            "email": document.getElementById("email").value,
            "phone": document.getElementById("phone").value,
        }

        let order = {
            "carType": document.querySelector('input[name="carType"]:checked').value,
            "options": document.querySelectorAll('input[name="options"]:checked'),
            "days": document.getElementById("days").value,
        }

        document.getElementById("orderItems").innerHTML = customer.fname + " " + customer.lname + "<br>" + customer.address +
            "<br>" + customer.state + "<br>" + customer.email + "<br>" + customer.phone + "<br><br>";

        document.getElementById("totals").innerHTML = "<br><br><br><br><br><br>";

        let carInfo = order.carType.split(":");
        let type = carInfo[0];
        let typePrice = parseFloat(carInfo[1]);

        document.getElementById("orderItems").innerHTML += type + "<br>";
        document.getElementById("totals").innerHTML += "$" + (typePrice).toFixed(2) + "/" + order.days + " days" + "<br>";

        total += typePrice * order.days;

        for (let i = 0; i < (order.options).length; i++) {
            let optionArray = order.options;
            let option = optionArray[i].value;
            document.getElementById("orderItems").innerHTML += option + "<br>";
            if (option == "Roof/Bicycle Rack") {
                document.getElementById("totals").innerHTML += "$" + 5.00 + "/" + order.days + " days" + "<br>";
                total += 5 * order.days;
            }
            if (option == "GPS") {
                document.getElementById("totals").innerHTML += "$" + 10 + "<br>";
                total += 10;
            }
            if (option == "Child Seat") {
                document.getElementById("totals").innerHTML += "FREE<br>";
            }
        }

        document.getElementById("orderItems").innerHTML += "Total:";
        document.getElementById("totals").innerHTML += "$" + total.toFixed(2);

    } else {
        alert("Invalid Input.");
    }

}

function editForm() {

    document.getElementById("carType").style.display = "flex";
    document.getElementById("output").style.display = "none";

}

function checkValid() {

    if (((document.getElementById("firstName").value != "") && (document.getElementById("lastName").value != "") && (document.getElementById("address").value != "") &&
            (document.getElementById("phone").value != "") && (document.getElementById("phone").value != "") && 
            (document.getElementById("days").value >= 1 && document.getElementById("days").value <= 30))) {
        return true;
    } else {
        return false;
    }
}