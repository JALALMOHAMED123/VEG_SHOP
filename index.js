const ul=document.querySelector('ul');

const url='https://crudcrud.com/api/e46cbc641a5c4cb5b2a31da8861f8670/Veg_Shop/';

const form=document.querySelector('form');
function handleFormSubmit(event){
    event.preventDefault();
    const user_details={
        name: event.target.name.value,
        price: event.target.price.value,
        quantity: event.target.quantity.value
    }
    axios
      .post( url,user_details )
      .then((response) => displayUserDetails(response.data))
      .catch((error) => console.log(error));

    // displayUserDetails(user_details);
    
    form.reset();
}

function displayUserDetails(user_details){
    const list=document.createElement('li');
    list.innerHTML=`${user_details.name} - ${user_details.price} - ${user_details.quantity} 
    <input type='number' name='buy'>
    <button class="buy">BUY</button><button id='delete'>Delete</button>`;
    if(ul.firstChild){
         ul.insertBefore(list,ul.firstChild);
    }
    else{
        ul.appendChild(list);
    }
    const buybutton=document.querySelector('.buy');
        buybutton.addEventListener("click", function (event) {
            const remain=list.querySelector('[name=buy]');
            const requantity=parseInt(user_details.quantity)-Math.abs(parseInt(remain.value));
    
            user_details.quantity=requantity;
            // console.log(user_details.quantity);
            
            const updated_items={
                name: user_details.name,
                price: user_details.price,
                quantity: user_details.quantity
            }
            axios.put(url + user_details._id, updated_items)
            .then(response => {
                console.log(response);
            })
            .catch(err => console.log(err));

            list.innerHTML=`${user_details.name} - ${user_details.price} - ${user_details.quantity} 
            <input type='number' name='buy'>
            <button id="buy">BUY</button><button id='delete'>Delete</button>`;
            remain.value='';
            
        });
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
    axios.get(url)
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
