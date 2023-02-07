//Function to validate form
function validateForm() {
    var productid = document.getElementById("productid").value;
    var productname = document.getElementById("productname").value;
    var price = document.getElementById("price").value;
    var description = document.getElementById("description").value;
    var regex = /^[^\s][a-zA-Z]+[a-zA-Z0-9 ]*[^\s]$/;
    

    if (productid == "" || productname == "" || price == "" || description == "") {
        alert("All fields are required!");
        return false;
    }
    else if (isNaN(productid)) {
        alert("Only numeric Value");
        return false;
    }
    else if (price < 0) {
        alert("Price must be positive.")
        return false;
    }
    else if(!description.match(regex) || !productname.match(regex)){
        alert("Enter proper details.");
        return false;
    }
    return true;
}
function validateImage(){
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

function clearValue(){
    $('#addadminprofile').modal('hide'); 
    document.getElementById("productid").value = "";
    document.getElementById("productname").value = "";
    document.getElementById("image").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
}


function changeBy(x) {
    var productList;
    productList = (localStorage.getItem("productList") == null) ? productList = [] : JSON.parse(localStorage.getItem("productList"));
    switch(x){
        case "LowFirst":
            productList.sort((a, b) => {
                return a.price - b.price;
            });
            localStorage.setItem('productList', JSON.stringify(productList));
            showData();
            break;
        case "HighFirst":
            productList.sort((a, b) => {
                return b.price - a.price;
            });
            localStorage.setItem('productList', JSON.stringify(productList));
            showData();
            break;
        case "IdFirst":
            productList.sort((a, b) => {
                return a.productid - b.productid;
            });
            localStorage.setItem('productList', JSON.stringify(productList));
            showData();
            break;
        case "nameFirst":
            productList.sort(function (a, b) {
                var x = a.productname.toLowerCase();
                var y = b.productname.toLowerCase();
                return x < y ? -1 : x > y ? 1 : 0;
            });
            localStorage.setItem('productList', JSON.stringify(productList));
            showData();
            break;
    }
}


//Function to show the input data 
function showData() {
    var productList;
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
            html += "<td>" + "&#8377;" +element.price + "</td>";
            html += "<td>" + element.description + "</td>";
            html += "<td> <button onclick='editData(" + index + ")' data-toggle='modal' data-target='#addadminprofile' class='btn btn-success'>Edit</button></td>";
            html += "<td> <button onclick='deleteData(" + index + ")' class='btn btn-danger'>Delete</button></td>";
            html += "</tr>";
        });
        document.querySelector("#dataTable tbody").innerHTML = html;
    }
}

//
document.onload = showData();



function addData() {
    if (validateForm() == true && validateImage() == true) {
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
            productList = (localStorage.getItem("productList") == null) ? productList = [] : JSON.parse(localStorage.getItem("productList"));
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
        clearValue();
        swal("Your data has been Added!", {
            icon: "success",
            timer: 2000
        });
    }
}

function deleteData(index) {
    var productList;
    productList = (localStorage.getItem("productList") == null) ? productList = [] : JSON.parse(localStorage.getItem("productList"));
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

function editData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Submit2").style.display = "block";
    document.getElementById("exampleModalLabel").style.display = "none";
    document.getElementById("data2").style.display = "block";
    document.getElementById("imgedit").style.display = "block";
    let imgnew = document.getElementById("image");

    productList = (localStorage.getItem("productList") == null) ? productList = [] : JSON.parse(localStorage.getItem("productList"));

    document.getElementById("productid").value = productList[index].productid;
    document.getElementById("productname").value = productList[index].productname;
    document.getElementById("imgedit").src = productList[index].image;
    document.getElementById("price").value = productList[index].price;
    document.getElementById("description").value = productList[index].description;

    productid.disabled = true;
    document.querySelector("#Submit2").onclick = function () {
        if (imgnew.value == "") {
            if(validateForm() == true){
                productList[index].productname = document.getElementById("productname").value;
                productList[index].price = document.getElementById("price").value;
                productList[index].description = document.getElementById("description").value;
            
                localStorage.setItem("productList", JSON.stringify(productList));
                showData();
                clearData();
                swal({title: 'Updated Successfully!', 
                text: 'Redirecting back', 
                icon: 'success',
                timer: 2000,
                buttons: false,})
            }
        }
        else if(validateForm() == true && validateImage() == true){
            
            let image = imgnew.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
        
            reader.addEventListener("load", () => {
                url = reader.result;
                productList[index].productname = document.getElementById("productname").value;
                productList[index].image = url;
                productList[index].price = document.getElementById("price").value;
                productList[index].description = document.getElementById("description").value;
        
                localStorage.setItem("productList", JSON.stringify(productList));
                showData();
                clearData();
                swal({title: 'Updated Successfully!', 
                text: 'Redirecting back', 
                icon: 'success',
                timer: 2000,
                buttons: false,})
            });
        }
    }
}

function clearData(){
    clearValue();
    document.getElementById("Submit").style.display = "block";
    document.getElementById("Submit2").style.display = "none";
    document.getElementById("imgedit").style.display = "none";
    document.getElementById("exampleModalLabel").style.display = "block";
    document.getElementById("data2").style.display = "none";
    productid.disabled = false;
}

// document.querySelectorAll('#close, #cancel').onclick = function () {

//     document.getElementById("productid").value = "";
//     document.getElementById("productname").value = "";
//     document.getElementById("image").src = "";
//     document.getElementById("price").value = "";
//     document.getElementById("description").value = "";
//     document.getElementById("Submit").style.display = "block";
//     document.getElementById("Submit2").style.display = "none";
//     document.getElementById("imgedit").style.display = "none";
//     document.getElementById("exampleModalLabel").style.display = "block";
//     document.getElementById("data2").style.display = "none";
// }

function searchById() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("Input1");
    filter = input.value.toUpperCase();
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
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


