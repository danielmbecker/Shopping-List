const listQuantity = document.querySelectorAll('.listItem')
const listName = document.querySelectorAll(`.listName`)
const listNum = document.querySelectorAll(`.listNumber`)
const listBoolean = document.querySelectorAll(`.boolean-value`)
const listDel = document.querySelectorAll(`.delete-listing-button`)
const listStrike = document.querySelectorAll(`.strikethrough-button`)
const ul = document.querySelectorAll(`.ul`)

//Events for each grocery item delete button
Array.from(listDel).forEach((el)=>{
    el.addEventListener('click', deletefunc)
})

//Events for each grocery item strikethrough button
Array.from(listStrike).forEach((el)=>{
    el.addEventListener('click', strikefunc)
})

//Toggle strikethrough class for each completed grocery item
Array.from(listQuantity).forEach((el, i)=>{
    const itemBool = el.dataset.bool
    if (itemBool === 'true'){
        listName[i].classList.toggle('strikethrough')
        listNum[i].classList.toggle('strikethrough')
        // console.log(el.parentNode.childElementCount)
      }
})

//Toggle strikethrough class for each completed grocery store
Array.from(ul).forEach((el)=>{
    let ulListItems = Array.from(el.children)
    let boolChecker = (e) => e.dataset.bool === "true"
     if (ulListItems.every(boolChecker)){
        el.previousElementSibling.classList.toggle('strikethrough')
     }
})

//Transpose store value text from dropdown menu to store input feild, which is hidden.
//NEEDS ATTENTION - the stores list needs to change into its own database, or else i cant add stores and stores listings that get deleted vanish from drop down! 
//It is currently satisfied by a server that creates the list of stores from the saved item objects. 
// let storeNamesList = []
// Array.from(document.querySelectorAll(`.storeName`)).forEach(e => storeNamesList.push(e.innerHTML))
// let selectedDropDownIndex = document.getElementById('stores').value


// let dropDownSelection = storeNamesList[selectedDropDownIndex]
// storeTextFeild.value = dropDownSelection

// storeDropDown.addEventListener("change", function(){

//     dropDownSelection = storeNamesList[document.getElementById('stores').value]
//     console.log(dropDownSelection)
//     storeTextFeild.value = dropDownSelection
// })

//dropDownText is an array of the text values of the drop down options
let dropDownText = []
Array.from(document.querySelectorAll(`.dropDownSelection`)).forEach(e => dropDownText.push(e.innerHTML.replace("&amp;", "&")))

//storeTextFeild is a hidden html input that passes the desired store name data with each item entry
let storeTextFeild = document.getElementById('input-store') 

//dropDownText is the text value of the drop down feild on page load, to be passed to storeTextFeild to prevent empty store feild if user does not interact with the drop down before submitting a value
let selectedDropDownIndex = document.getElementById('stores').value
storeTextFeild.value = dropDownText[selectedDropDownIndex]

//storeDropDown is the drop down. An event listener allows for selected values to be passed to the hidden storeTextFeild html input.
let storeDropDown = document.getElementById('stores') 
storeDropDown.addEventListener("change", function(){

    dropDownSelection = dropDownText[document.getElementById('stores').value]
    console.log(dropDownSelection)
    // console.log(storeTextFeild.value)
    storeTextFeild.value = dropDownSelection
})

//addStoreButton serves to add a storeName object to the database for use in the dropdown
let addStoreButton = document.getElementById('add-store-button') 
//newStoreDiv is a div element that is hidden by default, and appears when addStoreButton is clicked, for users to add a new store name to drop down.
let newStoreDiv = document.getElementById('new-store-div')
addStoreButton.addEventListener("click", function(){
    console.log("addStoreButton")
    newStoreDiv.classList.toggle('hidden')
})

//this button serves to remove a storeName object from the database when no longer desired to have in the drop down.
let removeStoreButton = document.getElementById('remove-store-button')
let modal = document.getElementById("myModal")

let confirmAddButton = document.getElementById('confirm-add-button')

removeStoreButton.addEventListener('click', function(){
// When the user clicks on the button, open the modal
    modal.style.display = "block"
})
// removeStoreButton.addEventListener('click', deleteStorefunc)





// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 


let confirmDeleteButton = document.getElementById("confirm-delete-button")

confirmDeleteButton.addEventListener('click', deleteStorefunc)







//newStoreInput is a text feild that is hidden by default, and appears when addStoreButton is clicked, for users to add a new store name to drop down.
let newStoreInput = document.getElementById('input-new-store')

confirmAddButton.addEventListener('click', addStorefunc)

    // console.log(newStoreInput.value)
    

// el.addEventListener('click', strikefunc)
// type: "storeName",
// storeName: newStoreName,




//delete event
async function deletefunc() {
    console.log("deelaytay")
    const itemName = this.parentNode.dataset.name

    try {
        const response = await fetch('/quotes', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: itemName,
            })
        
        })

        location.reload()
    }catch(err){
        console.log(err)
    }
}



//strikethrough event
async function strikefunc() {

    const itemName = this.parentNode.dataset.name
    let itemBool = this.parentNode.dataset.bool
        itemBool = itemBool.toLowerCase() === 'true'

        try {
            // console.log(`Item had no strike through:`, itemBool)
            // console.log(`!Value`, !itemBool)

            const response = await fetch('/quotes', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: itemName,
                    quote: this.parentNode.dataset.quote,
                    st: itemBool,
                    store: this.parentNode.dataset.store,
                  })
              
                })

            location.reload()
        }catch(err){
            console.log(err)
        
        }
}

async function addStorefunc() {

    console.log("Hmmm")

    let newStoreName = newStoreInput.value

        try {
            const response = await fetch('/quotes', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: "storeName",
                    storeName: newStoreName,
                  })
                })

            location.reload()
        }catch(err){
            console.log(err)
        
       }
}




async function deleteStorefunc() {

    console.log("Hmmm")

    const dropDownSelection = dropDownText[document.getElementById('stores').value]

    try {
        const response = await fetch('/quotes', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                storeName: dropDownSelection,
                type: "storeName",
            })
        })

        location.reload()
    }catch(err){
        console.log(err)
    }
}