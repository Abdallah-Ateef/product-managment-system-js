/* setup variables */
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let bttnsubmit=document.getElementById('submit');
let searchbox=document.getElementById('search');
let searchbytitle=document.getElementById('searchbytitle');
let searchbycategory=document.getElementById('searchbycategory');
let tablebody=document.querySelector('table tbody');
let switchbtt='Create';
let cnt;

let bttnscroll=document.querySelector('.scroll-up');
/* ScrollY*/
window.addEventListener('scroll',function(){
    if(this.scrollY>=400){
        bttnscroll.style.display='block';
    }else bttnscroll.style.display='none';
})

bttnscroll.addEventListener('click',()=>{
    scroll({
        top:0,
        behavior:'smooth',
    })
})


/* get Total */
 
function getTotal(){
 if(price.value !=''){
    let result =(Number(price.value)+Number(taxes.value)+Number(ads.value))-Number(discount.value);
    total.textContent=result;
    total.style.background='green';
 }
 else{
    total.textContent='';
    total.style.background='rgba(154, 43, 3, 0.9)'
 }
}

/*creat product*/
let productdata=JSON.parse(localStorage.getItem('prodata'))?JSON.parse(localStorage.getItem('prodata')):[];
drawUi(productdata);

bttnsubmit.addEventListener('click',createproduct);

function createproduct(){
 
        let obj={
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value,
        }
 if(switchbtt=='Create'){
    for(let i=0;i<count.value;i++){
        productdata.push(obj);
    }
}else{
    productdata[cnt]=obj;
    switchbtt='Create';
    bttnsubmit.innerHTML='Create';
    count.style.display='block';

}  

   saveproduct(productdata);
   drawUi(productdata)
   cleardata();
}

/* drawUi */

 
function drawUi(data){
    getTotal();
    let index=0;
    tablebody.innerHTML='';
   
    data.forEach(ele => {
        tablebody.innerHTML +=`
        <tr>
            <td>${index+1}</td>
            <td>${ele.title}</td>
            <td>${ele.price}</td>
            <td>${ele.taxes}</td>
            <td>${ele.ads}</td>
            <td>${ele.discount}</td>
            <td>${ele.total}</td>
            <td>${ele.category}</td>
            <td><button id="update" onclick='modifyproduct(${index})'>Update</button></td>
            <td><button id="delete" onclick="deletitem(${index})">Delete</button></td>
        </tr>
        ` 
        index++;  
    });

    let deletall=document.getElementById('deleteAll');
     productdata.length>0?deletall.style.display='block':deletall.style.display='none';
     document.getElementById('number').innerHTML=productdata.length;
}

/* clear data */

function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    category.value='';
    count.value='';
}


/* save product data from local storage */

function saveproduct(data){
    localStorage.setItem('prodata',JSON.stringify(data));
}

/* delete product */

function deletitem(num){
    productdata.splice(num,1);
    drawUi(productdata);
    saveproduct(productdata);
}

/* delete All product */

function deletall(){
    productdata.splice(0);
    drawUi(productdata);
    saveproduct(productdata)
}


/* modify product */

function modifyproduct(ind){
    title.value=productdata[ind].title;
    price.value=productdata[ind].price;
    taxes.value=productdata[ind].taxes;
    ads.value=productdata[ind].ads;
    discount.value=productdata[ind].discount;
    getTotal();
    count.style.display='none';
    category.value=productdata[ind].category;
    bttnsubmit.innerHTML='Update';
    switchbtt='Update';
    cnt=ind;
    scroll({
        top:0,
        behavior:'smooth',
    });
    title.focus();
}

/* search product */

var modesearch='title';

 function getsearchmode(id){
    if(id=='searchbytitle'){
        modesearch='title';
    }else{
        modesearch='category';  
    }
    searchbox.setAttribute('placeholder',`Search by ${modesearch}`);
    searchbox.focus();
   searchbox.value='';
   drawUi(productdata);
}

searchbox.addEventListener('keyup',function(){
   if(modesearch=='title'){
    tablebody.innerHTML='';
     for(let i=0;i<productdata.length;i++){
        if(productdata[i].title.toLowerCase().includes(searchbox.value.toLowerCase())){
            tablebody.innerHTML +=`
            <tr>
                <td>${i+1}</td>
                <td>${productdata[i].title}</td>
                <td>${productdata[i].price}</td>
                <td>${productdata[i].taxes}</td>
                <td>${productdata[i].ads}</td>
                <td>${productdata[i].discount}</td>
                <td>${productdata[i].total}</td>
                <td>${productdata[i].category}</td>
                <td><button id="update" onclick='modifyproduct(${i})'>Update</button></td>
                <td><button id="delete" onclick="deletitem(${i})">Delete</button></td>
            </tr>
            ` 
            
        }
     }

    
   }
   else{
    if(modesearch=='category'){
        tablebody.innerHTML='';
         for(let i=0;i<productdata.length;i++){
            if(productdata[i].title.toLowerCase().includes(searchbox.value.toLowerCase())){
                tablebody.innerHTML +=`
                <tr>
                    <td>${i+1}</td>
                    <td>${productdata[i].title}</td>
                    <td>${productdata[i].price}</td>
                    <td>${productdata[i].taxes}</td>
                    <td>${productdata[i].ads}</td>
                    <td>${productdata[i].discount}</td>
                    <td>${productdata[i].total}</td>
                    <td>${productdata[i].category}</td>
                    <td><button id="update" onclick='modifyproduct(${i})'>Update</button></td>
                    <td><button id="delete" onclick="deletitem(${i})">Delete</button></td>
                </tr>
                ` 
                
            }
         }

    
   }
}});












