const listItem = Object.values(document.getElementsByClassName("list-group-item"));

function selectedItem(e) {
  listItem.forEach(function (item) {
    if (item === e.target) {
      if (!item.classList.contains("active")) {
        // only add active class if the current item does not have it
        item.classList.add("active");
      }
    } else {
      item.classList.remove("active");
    }
  });
  console.log(listItem);
}

listItem.forEach(function (item) {
  item.addEventListener("click", selectedItem);
});


//DElete Category
const deleteCategory = Array.from(document.getElementsByClassName("deleteButton"));
deleteCategory.forEach((item) => {
  item.addEventListener("click", function getText(event) {
    clickedText = event.target.parentNode.parentNode.children[0].innerText
    clickedText = clickedText.split("\n")
    deleteRequest(clickedText[0])
  })
});

async function deleteRequest(clickedText){
    try{
        const response = await fetch('/remove-category', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'categoryName': clickedText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
