const ul=document.querySelector('ul');

const url='https://crudcrud.com/api/b1b96e92f37a42e3bf3ea43efd29d627/Veg_Shop/';

const form=document.querySelector('form');
form.addEventListener('submit',(event)=>{
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
    
    form.reset();
})

function displayUserDetails(user_details){
    const list=document.createElement('li');
    list.dataset.id = user_details._id; 
    list.dataset.name = user_details.name;
    list.dataset.price = user_details.price;
    list.dataset.quantity = user_details.quantity;

    list.innerHTML=`${user_details.name}   RS: ${user_details.price}   ${user_details.quantity}KG 
    <input type='number' name='buy'>
    <button class="buy">BUY</button>
    <button class='delete'>Delete</button>`;
    ul.insertBefore(list, ul.firstChild);
    TotalItems();
}
ul.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('buy')) {
        const listItem = target.closest('li');
        const remain = listItem.querySelector('[name=buy]');
        const requantity = parseInt(listItem.dataset.quantity) - Math.abs(parseInt(remain.value));
        listItem.dataset.quantity = requantity;
        if(requantity<1){
            ul.removeChild(listItem);
            axios.delete(url + listItem.dataset.id);
        }
        try {
            const updated_items={
                    name: listItem.dataset.name,
                    price: listItem.dataset.price,
                    quantity: requantity
                }
            await axios.put(url + listItem.dataset.id, updated_items);
            listItem.innerHTML = `${listItem.dataset.name}   RS: ${listItem.dataset.price}   ${requantity}KG 
            <input type='number' name='buy'>
            <button class="buy">BUY</button>
            <button class='delete'>Delete</button>`;
            remain.value = '';
        } catch (error) {
            console.log(error);
        }
    } else if (target.classList.contains('delete')) {
        const listItem = target.closest('li');
        ul.removeChild(listItem);
        axios.delete(url+listItem.dataset.id)
            .then(response=>{console.log(response)})
            .catch(err=>console.log(err))
    }
    TotalItems();
});

window.addEventListener("DOMContentLoaded",win)

async function win(){
    try{
        const response=await axios.get(url);
        for(let i of response.data) displayUserDetails(i);
    }
    catch(error){
        console.log(error);
    }
}

function TotalItems()
{
    const count=ul.getElementsByTagName('li');
    
    document.getElementById('count').textContent=count.length;
    
}
window.onload=TotalItems();



































    // const buybutton=document.querySelector('.buy');
    // buybutton.addEventListener("click",async ()=> {
    //         const remain=list.querySelector('[name=buy]');
    //         const requantity=parseInt(user_details.quantity)-Math.abs(parseInt(remain.value));
    
    //         user_details.quantity=requantity;
    //         try{
    //             const updated_items={
    //                 name: user_details.name,
    //                 price: user_details.price,
    //                 quantity: user_details.quantity
    //             }
    //         axios.put(url + user_details._id, updated_items)
    //         list.innerHTML=`${user_details.name}   RS: ${user_details.price}   ${user_details.quantity}KG 
    //             <input type='number' name='buy'>
    //             <button class="buy">BUY</button><button class='delete'>Delete</button>`;
    //         }
    //         catch(err){console.log(err)};
    //     });
    // list.querySelector('.delete').addEventListener("click", ()=> {
    //     ul.removeChild(list);
    //         axios.delete(url+user_details._id)
    //             .then(response=>{console.log(response)
    //             TotalItems();
    //             })
    //             .catch(err=>console.log(err))
    //     });



// window.addEventListener("DOMContentLoaded",function (){
//     axios.get(url)
//       .then(resolve=>{
//         for(let i of response.data) displayUserDetails(i);
//       })
//       .catch(err=> console.log(error));
// });