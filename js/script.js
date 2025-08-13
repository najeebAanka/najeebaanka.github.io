// script.js
document.addEventListener('DOMContentLoaded', function(){
  // Nav toggle
  document.querySelectorAll('.nav-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      // Find the associated nav-links
      let id = btn.id.replace('nav-toggle', 'nav-links');
      let links = document.getElementById(id);
      if(!links){
        // fallback
        links = btn.closest('.nav').querySelector('.nav-links');
      }
      if(links) links.classList.toggle('show');
    });
  });

  // Floating effect for avatars
  document.querySelectorAll('.avatar').forEach(function(el){
    el.style.transformOrigin = 'center';
  });

});


// FAB
const fabToggle = document.getElementById('fabToggle');
const fabMenu = document.getElementById('fabMenu');
let isOpen = false;

fabToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
        fabMenu.classList.add('show');
        fabToggle.innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>`;
    } else {
        fabMenu.classList.remove('show');
        fabToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>`;

    }
});
