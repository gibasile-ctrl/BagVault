
const $=id=>document.getElementById(id);
let bags=JSON.parse(localStorage.getItem('bagvault')||'[]');
let editIndex=-1;

function save(){
 localStorage.setItem('bagvault',JSON.stringify(bags));
}
function clearForm(){
 ['brand','series','colorway','speed','value','notes'].forEach(i=>$(i).value='');
 $('status').selectedIndex=0;
 editIndex=-1;
 $('formTitle').textContent='Add Bag';
 $('saveBtn').textContent='Save Bag';
}
function render(){
 const q=$('search').value.toLowerCase();
 let total=0,sell=0,html='';
 bags.forEach((b,i)=>{
   total+=Number(b.value||0);
   if(b.status==='Sell') sell++;
   const txt=(b.brand+' '+b.series+' '+b.colorway+' '+b.status).toLowerCase();
   if(txt.includes(q)){
    html+=`<div class="item">
      <b>${b.brand} ${b.series}</b><br>
      ${b.colorway}<br>
      <span class="badge">${b.speed}</span> <span class="badge">${b.status}</span> $${b.value||0}
      <div class="actions">
      <button onclick="editBag(${i})">✏️ Edit</button>
      <button onclick="deleteBag(${i})">🗑 Delete</button>
      </div>
    </div>`;
   }
 });
 $('stats').textContent=`${bags.length} Bags • ${sell} For Sale • $${total.toFixed(2)}`;
 $('list').innerHTML=html||'<p>No bags yet.</p>';
}
function editBag(i){
 const b=bags[i];
 editIndex=i;
 brand.value=b.brand;series.value=b.series;colorway.value=b.colorway;
 speed.value=b.speed;value.value=b.value;status.value=b.status;notes.value=b.notes;
 formTitle.textContent='Edit Bag';
 saveBtn.textContent='Update Bag';
 window.scrollTo({top:0,behavior:'smooth'});
}
function deleteBag(i){
 if(confirm('Delete this bag?')){
   bags.splice(i,1);
   save();
   render();
 }
}
saveBtn.onclick=()=>{
 const b={brand:brand.value,series:series.value,colorway:colorway.value,speed:speed.value,value:value.value,status:status.value,notes:notes.value};
 if(editIndex>=0) bags[editIndex]=b; else bags.push(b);
 save();clearForm();render();
};
search.oninput=render;
render();
