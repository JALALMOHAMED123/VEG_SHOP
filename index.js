const ul=document.querySelector('ul');
// const list=ul.getElementsByTagName('li');
const url='https://crudcrud.com/api/9c6e5d9c1ef743d59d0bbb381c2b0bc1/Veg_Shop/';

const form=document.querySelector('form');
function handleFormSubmit(event){
    event.preventDefault();
    const user_details={
        name: event.target.name.value,
        price: event.target.price.value,
        quantity: event.target.quantity.value,
    }
    axios
      .post(
        "https://crudcrud.com/api/9c6e5d9c1ef743d59d0bbb381c2b0bc1/Veg_Shop",
        user_details
      )
      .then((response) => displayUserDetails(response.data))
      .catch((error) => console.log(error));

    // displayUserDetails(user_details);
    
    form.reset();
}

function displayUserDetails(user_details){
    const list=document.createElement('li');
    list.innerHTML=`${user_details.name} - ${user_details.price} - ${user_details.quantity} 
    <input type='number' name='buy'>
    <button id="buy">BUY</button><button id='delete'>Delete</button>`;
    if(ul.firstChild){
         ul.insertBefore(list,ul.firstChild);
    }
    else{
        ul.appendChild(list);
    }
    document.getElementById('buy').addEventListener("click", function (event) {
        const remain=list.querySelector('[name=buy]');
        const requantity=parseInt(user_details.quantity)-parseInt(remain.value);

        user_details.quantity=requantity;
        updateQuantityAndSendRequest(user_details);
                
        list.innerHTML=`${user_details.name} - ${user_details.price} - ${user_details.quantity} 
        <input type='number' name='buy'>
        <button id="buy">BUY</button><button id='delete'>Delete</button>`;
        remain.value='';
        
    });
    function updateQuantityAndSendRequest(user_details) {
        
        axios.put(url + user_details._id, user_details)
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));
    }
    document.getElementById('delete').addEventListener("click", function (event) {
        ul.removeChild(event.target.parentElement);
        
            axios.delete(url+user_details._id)
                .then(response=>console.log(response))
                .catch(err=>console.log(err))
                TotalItems();
        });
        
    TotalItems();
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/9c6e5d9c1ef743d59d0bbb381c2b0bc1/Veg_Shop/")
    .then((response) => {
        for(let i of response.data) displayUserDetails(i);

    })
    .catch((error) => console.log(error));
    })
function TotalItems()
{
    const count=ul.getElementsByTagName('li');
    
    document.getElementById('count').innerHTML=count.length;
    
}
window.onload=TotalItems();
