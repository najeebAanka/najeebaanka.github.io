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
