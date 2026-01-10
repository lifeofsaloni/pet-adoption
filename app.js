
fetch('config.json').then(r=>r.json()).then(config => {
  const listPet = document.getElementById('listPet');
  if(listPet) listPet.href = config.forms.list_pet;

  const catalog = document.getElementById('catalog');
  if(catalog){
    const pets = [
      {id:1, name:'Bruno', type:'Dog'},
      {id:2, name:'Misty', type:'Cat'}
    ];
    pets.forEach(p=>{
      const d=document.createElement('div');
      d.className='card';
      d.innerText = p.name + " ("+p.type+")";
      d.onclick=()=>location.href='detail.html?id='+p.id;
      catalog.appendChild(d);
    });
  }

  const detail = document.getElementById('detail');
  if(detail){
    const params=new URLSearchParams(location.search);
    const id=params.get('id');
    detail.innerText="Pet details for ID "+id;
    document.getElementById('adoptLink').href=config.forms.adoption_interest;
  }
});
