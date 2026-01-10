
const mockPets = [
  {
    id: 1,
    name: "Bruno",
    species: "Dog",
    age: "6 months",
    interests: 3,
    image: "https://place-puppy.com/400x300",
    adopters: [
      {name:"Anita", contact:"anita@email.com"},
      {name:"Rahul", contact:"rahul@email.com"}
    ]
  },
  {
    id: 2,
    name: "Misty",
    species: "Cat",
    age: "4 months",
    interests: 1,
    image: "https://placekitten.com/400/300",
    adopters: [
      {name:"Sneha", contact:"sneha@email.com"}
    ]
  }
];

fetch('config.json').then(r=>r.json()).then(config => {
  document.getElementById('listPet')?.setAttribute('href', config.forms.list_pet);
  document.getElementById('volunteer')?.setAttribute('href', config.forms.volunteer);

  const catalog = document.getElementById('catalog');
  if(catalog){
    mockPets.forEach(p => {
      const c = document.createElement('div');
      c.className = 'card';
      c.innerHTML = `
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.species} • ${p.age}</p>
        <span class="badge">${p.interests} interests</span>
      `;
      c.onclick = () => location.href = `detail.html?id=${p.id}`;
      catalog.appendChild(c);
    });
  }

  const params = new URLSearchParams(location.search);
  const petId = params.get('id');
  if(petId){
    const pet = mockPets.find(p=>p.id==petId);
    if(!pet) return;

    document.getElementById('petName').innerText = pet.name;
    document.getElementById('petImage').src = pet.image;
    document.getElementById('petInfo').innerText =
      `${pet.species}, ${pet.age}. Currently has ${pet.interests} interested adopters.`;

    document.getElementById('adoptLink').href = config.forms.adoption_interest;

    const list = document.getElementById('interests');
    pet.adopters.forEach(a=>{
      const d = document.createElement('div');
      d.innerHTML = `<strong>${a.name}</strong> – ${a.contact}`;
      list.appendChild(d);
    });
  }
});
