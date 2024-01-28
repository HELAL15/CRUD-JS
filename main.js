var productName     = document.getElementById("productName");
var productPrice    = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc     = document.getElementById("productDesc");
var productList = [];

if(localStorage.getItem("myProducts") == null)
{
  productList = [];
}
else
{
  productList = JSON.parse(localStorage.getItem("myProducts"));
  displayProduct();
}

function addProduct()
{
  var product = {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    desc:productDesc.value,
  }
  productList.push(product)
  localStorage.setItem("myProducts" , JSON.stringify(productList));

  displayProduct();
  clearForm();
}

function displayProduct()
{
  var cont = "";
  for(i=0 ; i<productList.length ; i++)
  {
    cont +=`<tr>
      <td>` + [i+1] +` </td>
      <td>` + productList[i].name+` </td>
      <td>` +productList[i].price+`</td>
      <td>` +productList[i].category+`</td>
      <td>`+productList[i].desc+`</td>
      <td><button onclick="updateProduct(`+i+`)" class="btn btn-warning">update</button></td>
      <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button></td>
    </tr>`
  }
  document.getElementById("tableBody").innerHTML = cont;
}

function clearForm()
{
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
  
}

function search(term)
{
  var searchList = "";
  //var srchResult = "";

  for (var i = 0; i < productList.length; i++)
  {
    if (productList[i].name.includes(term.trim()) == true) {
      
      searchList +=`<tr>
      <td>` + [i+1] +` </td>
      <td>` + productList[i].name+` </td>
      <td>` +productList[i].price+`</td>
      <td>` +productList[i].category+`</td>
      <td>`+productList[i].desc+`</td>
      <td><button onclick="updateProduct(`+i+`)" class="btn btn-warning">update</button></td>
      <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button></td>
      </tr>`;

      //srchResult += `<p>`+ productList[i].name +`</p>`;
    }
  }
  document.getElementById("tableBody").innerHTML = searchList;
  //document.getElementById("searchResult").innerHTML = srchResult;
}

function deleteProduct(index)
{
  productList.splice(index,1);
  localStorage.setItem("myProducts" , JSON.stringify(productList));
  displayProduct();
}

function updateProduct(i)
{
    productName.value = productList[i].name
    productPrice.value = productList[i].price
    productCategory.value = productList[i].category
    productDesc.value = productList[i].desc
}



var regex = /^[A-Z]/
productName.addEventListener("keyup" , function(){
  if(regex.test(productName.value) == false){
    productName.classList.remove("is-valid");
    productName.classList.add("is-invalid");
    productName.classList.add("animate__animated" , "animate__shakeX");
  }
  else{
    productName.classList.remove("is-invalid")
    productName.classList.add("is-valid");
  }
})