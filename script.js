const toggleKey = document.querySelector('.mobile-toggle');
const navbar = document.querySelector('.side-nav');
const openBtn = document.querySelector('#nav-btn-open');
const closeBtn = document.querySelector('#nav-btn-close');

const navBtn = document.querySelectorAll('[data-nav-btns]');

toggleKey.addEventListener('click', ()=>{
  if (navbar.getAttribute('data-is-open') === 'close'){
    navbar.setAttribute('data-is-open', 'open');
    openBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    
  }
  else if (navbar.getAttribute('data-is-open') === 'open'){
    navbar.setAttribute('data-is-open', 'close');
    openBtn.style.display = 'block';
    closeBtn.style.display = 'none';    
  }
})

navBtn.forEach((btn)=>{
  console.log(btn);
  btn.addEventListener('click', ()=>{
    navbar.setAttribute('data-is-open', 'close');
    openBtn.style.display = 'block';
    closeBtn.style.display = 'none'; 
    console.log('button is clicked!');
  })
})
