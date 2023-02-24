//Function to validate form
function validateForm() {
    var productid = document.getElementById("productid").value;
    var productname = document.getElementById("productname").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;
    var regex = /^[^\s][a-zA-Z]+[a-zA-Z0-9 ]*[^\s]$/;
    var priceRegx = /^[0-9]/;

    if (productid == "" || productname == "" || description == "") {
        alert("All fields are required!");
        return false;
    }
    else if (isNaN(productid)) {
        alert("Please enter only numeric value");
        return false;
    }
    else if (!price.match(priceRegx)) {
        alert("Price is invalid.")
        return false;
    }
    else if (!description.match(regex) || !productname.match(regex)) {
        alert("Enter proper details.");
        return false;
    }
    return true;
}

//Function to validate Image
function validateImage() {
    var image = document.getElementById('image');
    var file = image.value;
    var extensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!extensions.exec(file)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    }
    return true;
}

//Function to validate name and Id during add data
function validateIdName() {
    var productid = document.getElementById("productid").value;
    var productname = document.getElementById("productname").value;
    var productList;
    productList = JSON.parse(localStorage.getItem("productList"));
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].productid === productid || productList[i].productname.toLowerCase() === productname.toLowerCase()) {
            swal("Enter unique Product Id And Name!", {
                icon: "warning",
                timer: 2000
            });
            return false;
        }
    }
    return true;
}

//Function to validate Name while editing data
function validateName(index) {
    var productname = document.getElementById("productname").value;
    var productList;
    productList = JSON.parse(localStorage.getItem("productList"));
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].productname.toLowerCase() === productname.toLowerCase()) {
            if (productList[index].productname.toLowerCase() === productname.toLowerCase()) {
                return true;
            }
            else {
                swal("Enter unique Product Name!", {
                    icon: "warning",
                    timer: 2000
                });
                return false;
            }
        }
    }
    return true;
}

function setItems(setProductItems){
    localStorage.setItem('productList', JSON.stringify(setProductItems));
}

//Function to clear data after using modal
function clearValue() {
    $('#addAdmin').modal('hide');
    document.getElementById("productid").value = "";
    document.getElementById("productname").value = "";
    document.getElementById("image").value = "";
    document.getElementById("imgedit").src = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
}

//Function to sort/filter
function changeBy(sortId) {
    var productList;
    productList = JSON.parse(localStorage.getItem("productList"));
    switch (sortId) {
        case "lowFirst":
            productList.sort((a, b) => {
                return a.price - b.price;
            });
            setItems(productList);
            showData();
            break;
        case "highFirst":
            productList.sort((a, b) => {
                return b.price - a.price;
            });
            setItems(productList);
            showData();
            break;
        case "idFirst":
            productList.sort((a, b) => {
                return a.productid - b.productid;
            });
            setItems(productList);
            showData();
            break;
        case "nameFirst":
            productList.sort(function (a, b) {
                var x = a.productname.toLowerCase();
                var y = b.productname.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            setItems(productList);
            showData();
            break;
    }
}

function alertMsg(){
    swal({
        title: 'Data has been recorded!',
        text: 'Redirecting back...',
        icon: 'success',
        timer: 2000,
    })
}

//Function to show image while adding or editing
function readURL(input) {
    document.getElementById("image").src = "";
    if (input.files || input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imgedit')
                .attr('src', e.target.result)
                .width(80)
                .height(80);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

//Function to show the input data 
function showData() {
    var productList;
    productList = JSON.parse(localStorage.getItem("productList"));
    var html = "";
    productList.forEach(function (element, index) {
        html += `<tr>
                <td> ${element.productid} </td>
                <td> ${element.productname} </td>
                <td> <img src= "${element.image}" style='height:80px; width:80px;' alt='Image Product'></td>
                <td> &#8377; ${element.price} </td>
                <td> ${element.description} </td>
                <td> <button onclick="editData(${index})" data-toggle='modal' data-target='#addAdmin' class='btn btn-success'>Edit</button></td>
                <td> <button onclick='deleteData(${index})' class='btn btn-danger'>Delete</button></td>
                </tr>`;
    });
    document.querySelector("#dataTable tbody").innerHTML = html;
}

//Shows data while windows load.
document.onload = showData();

//Function to add data
function addData() {
    if (validateForm() && validateImage() && validateIdName()) {
        var productid = document.getElementById("productid").value;
        var productname = document.getElementById("productname").value;
        var image = document.getElementById("image").files[0];
        var price = document.getElementById("price").value;
        var flt = Number(price).toFixed(2);
        var description = document.getElementById("description").value;
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("load", () => {
            var url = reader.result;
            var productList;
            productList = (localStorage.getItem("productList") == null) ? productList = [] : JSON.parse(localStorage.getItem("productList"));
            productList.push({
                productid: productid,
                productname: productname,
                image: url,
                price: flt,
                description: description,
            });
            localStorage.setItem("productList", JSON.stringify(productList));
            showData();
        });
        clearValue();
        alertMsg();
    }
}

//Function to delete data
function deleteData(index) {
    var productList;
    productList = JSON.parse(localStorage.getItem("productList"));
    swal({
        title: "Are you sure ??",
        text: "Your will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((result) => {
            if (result) {
                productList.splice(index, 1);
                localStorage.setItem("productList", JSON.stringify(productList));
                showData();
                swal("Your data has been deleted!", {
                    icon: "success",
                    timer: 2000
                });
            }
        });
}

//Function to edit data
function editData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("submit2").style.display = "block";
    document.getElementById("exampleModalLabel").style.display = "none";
    document.getElementById("data2").style.display = "block";
    let imgnew = document.getElementById("image");

    productList = JSON.parse(localStorage.getItem("productList"));

    document.getElementById("productid").value = productList[index].productid;
    document.getElementById("productname").value = productList[index].productname;
    document.getElementById("imgedit").src = productList[index].image;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("description").value = productList[index].description;

    productid.disabled = true;
    document.querySelector("#submit2").onclick = function () {
        if (imgnew.value == "") {
            if (validateForm() && validateName(index)) {
                productList[index].productname = document.getElementById("productname").value;
                productList[index].price = Number(document.getElementById("price").value).toFixed(2);
                productList[index].description = document.getElementById("description").value;

                localStorage.setItem("productList", JSON.stringify(productList));
                showData();
                clearData();
                alertMsg();
            }
        }
        else if (validateForm() && validateImage() && validateName(index)) {
            let image = imgnew.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);

            reader.addEventListener("load", () => {
                url = reader.result;
                productList[index].productname = document.getElementById("productname").value;
                productList[index].image = url;
                productList[index].price = Number(document.getElementById("price").value).toFixed(2);
                productList[index].description = document.getElementById("description").value;

                localStorage.setItem("productList", JSON.stringify(productList));
                showData();
                clearData();
                alertMsg();
            });
        }
    }
}

//Function to make display block and none and clear values.
function clearData() {
    clearValue();
    document.getElementById("submit").style.display = "block";
    document.getElementById("submit2").style.display = "none";
    document.getElementById("exampleModalLabel").style.display = "block";
    document.getElementById("data2").style.display = "none";
    productid.disabled = false;
}

//Function to search by id in search bar.
function searchById() {
    var input, filter, table, tr, td, i, txtValue, j;
    input = document.getElementById("Input1");
    filter = input.value;
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        for (j = 0; j <= i; j++) {
            td = tr[j].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.innerText;
                if (txtValue.indexOf(filter) > -1) {
                    tr[j].style.display = "";
                } else {
                    tr[j].style.display = "none";
                }
            }
        }
    }
}
