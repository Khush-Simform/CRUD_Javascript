//Function to validate form
function validateForm() {
    var productid = document.getElementById("productid").value;
    var productname = document.getElementById("productname").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;

    if (productid == "") {
        alert("Product-Id is required");
        return false;
    }
    else if (isNaN(productid)) {
        alert("Only numeric Value");
        return false;
    }
    if (productname == "") {
        alert("Product Name is required");
        return false;
    }
    if (price == "") {
        alert("Price is required");
        return false;
    }
    else if (price < 0) {
        alert("Price must be positive.")
        return false;
    }
    if (description == "") {
        alert("Description is required");
        return false;
    }
    //console.log("Validate form is called");
    return true;
}

//Function to show the input data 
function showData() {
    var productList;
    //console.log(localStorage.getItem("productList"));
    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
        var html = "";

        productList.forEach(function (element, index) {
            html += "<tr>";
            html += "<td>" + element.productid + "</td>";
            html += "<td>" + element.productname + "</td>";
            html += "<td> <img src=" + element.image + " style='height:80px; width:80px;' alt='Image Product' </img></td>";
            html += "<td>" + element.price + "</td>";
            html += "<td>" + element.description + "</td>";
            html += "<td> <button onclick='EditData(" + index + ")' data-toggle='modal' data-target='#addadminprofile' class='btn btn-success'>Edit</button></td>";
            html += "<td> <button onclick='DeleteData(" + index + ")' class='btn btn-danger'>Delete</button></td>";
            html += "</tr>";
        });
        document.querySelector("#dataTable tbody").innerHTML = html;
    }
}

//
document.onload = showData();



function AddData() {
    if (validateForm() == true) {
        var productid = document.getElementById("productid").value;
        var productname = document.getElementById("productname").value;
        var image = document.getElementById("image").files[0];
        var price = document.getElementById("price").value;
        var description = document.getElementById("description").value;

        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", () => {
            var url = reader.result;
            var productList;
            if (localStorage.getItem("productList") == null) {
                productList = [];
            }
            else {
                productList = JSON.parse(localStorage.getItem("productList"));
            }
            productList.push({
                productid: productid,
                productname: productname,
                image: url,
                price: price,
                description: description,
            });

            localStorage.setItem("productList", JSON.stringify(productList));
            showData();
        });
        //console.log("Add Data is called");
        document.getElementById("productid").value = "";
        document.getElementById("productname").value = "";
        document.getElementById("image").value = "";
        document.getElementById("price").value = "";
        document.getElementById("description").value = "";
    }
}



function DeleteData(index) {
    var productList;
    //console.log(index);
    //console.log("delete is called");
    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }
    var result = confirm("Are you sure to delete?");
    if (result) {
        productList.splice(index, 1);
        localStorage.setItem("productList", JSON.stringify(productList));
        showData();
    }
}

function EditData(index) {
    console.log(index);
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Submit2").style.display = "block";
    document.getElementById("imgedit").style.display = "block";
    let imgnew = document.getElementById("image");

    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }

    document.getElementById("productid").value = productList[index].productid;
    document.getElementById("productname").value = productList[index].productname;
    document.getElementById("imgedit").src = productList[index].image;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("description").value = productList[index].description;

    document.querySelector("#Submit2").onclick = function () {
        if (imgnew.value == "") {
            productList[index].productid = document.getElementById("productid").value;
            productList[index].productname = document.getElementById("productname").value;
            productList[index].price = document.getElementById("price").value;
            productList[index].description = document.getElementById("description").value;

            localStorage.setItem("productList", JSON.stringify(productList));
            showData();
            document.getElementById("productid").value = "";
            document.getElementById("productname").value = "";
            document.getElementById("image").value = "";
            document.getElementById("price").value = "";
            document.getElementById("description").value = "";
        }
        else {
            let image = imgnew.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);

            reader.addEventListener("load", () => {
                url = reader.result;
                productList[index].productid = document.getElementById("productid").value;
                productList[index].productname = document.getElementById("productname").value;
                productList[index].image = url;
                productList[index].price = document.getElementById("price").value;
                productList[index].description = document.getElementById("description").value;

                localStorage.setItem("productList", JSON.stringify(productList));
                showData();
                document.getElementById("productid").value = "";
                document.getElementById("productname").value = "";
                document.getElementById("image").value = "";
                document.getElementById("price").value = "";
                document.getElementById("description").value = "";
                document.getElementById("imgedit").style.display = "none";
            });
        }
    }
}

document.querySelector("#cancel").onclick = function () {

    document.getElementById("productid").value = "";
    document.getElementById("productname").value = "";
    document.getElementById("image").src = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Submit2").style.display = "none";
    document.getElementById("imgedit").style.display = "none";
}

function searchById() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("Input1");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.innerText[0];
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function ChangeByPrice() {
    var productList;
    if (localStorage.getItem("productList") == null) {
        productList = [];
    }
    else {
        productList = JSON.parse(localStorage.getItem("productList"));
    }
    document.getElementById("LowFirst").onclick = function () {
        productList.sort((a, b) => {
            return a.price - b.price;
        });
        localStorage.setItem('productList', JSON.stringify(productList));
        showData();
    }
    document.getElementById("HighFirst").onclick = function () {
        productList.sort((a, b) => {
            return b.price - a.price;
        });
        localStorage.setItem('productList', JSON.stringify(productList));
        showData();
    }
    document.getElementById("IdFirst").onclick = function () {
        productList.sort((a, b) => {
            return a.productid - b.productid;
        });
        localStorage.setItem('productList', JSON.stringify(productList));
        showData();
    }
    document.getElementById("nameFirst").onclick = function () {
        productList.sort(function (a, b) {
            var x = a.productname.toLowerCase();
            var y = b.productname.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        localStorage.setItem('productList', JSON.stringify(productList));
        showData();
    }
}


