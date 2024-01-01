
//Delete Item
const getDeleteItem = document.getElementById("deleteItemButton");
getDeleteItem.addEventListener("click", function getId(event) {
  deleteItem(event.target.parentNode.parentNode.parentNode.id)
})

async function deleteItem(id){
  try{
      const response = await fetch(`/remove-item/${id}`, {
          method: 'delete',
          headers: {'Content-Type': 'application/json'},
        })
      const data = await response.json()
      location.href = "/";
  }catch(err){
      console.log(err)
  }
}

//PUT: Reduce quantity by one
const removeOneButton = document.querySelector(".removeOneButton");
removeOneButton.addEventListener("click", function getId(event) {
  reduceByOne(event.target.parentNode.parentNode.parentNode.parentNode.id)
    // deleteItem(item.parentNode.parentNode.parentNode.id)
})

async function reduceByOne(id){
  try{
      const response = await fetch(`/remove-one/${id}`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
        })
      const data = await response.json()
      location.reload()
  }catch(err){
      console.log(err)
  }
}

//PUT: Increase quantity by one
const addOneButton = document.querySelector(".addOneButton");
addOneButton.addEventListener("click", function getId(event) {
  addOne(event.target.parentNode.parentNode.parentNode.parentNode.id)
})

async function addOne(id){
  try{
      const response = await fetch(`/add-one/${id}`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
        })
      const data = await response.json()
      location.reload()
  } catch(err){
      console.log(err)
  }
}