// Loader
const msgs=['Loading your experience...','Preparing the dashboard...','Setting up properties...','Almost there...','Welcome to Airly âœˆ'];
let mi=0;const mel=document.getElementById('ld-msg');
const mint=setInterval(()=>{mi=(mi+1)%msgs.length;mel.textContent=msgs[mi];},500);
window.addEventListener('load',()=>{
  setTimeout(()=>{clearInterval(mint);mel.textContent='Welcome to Airly âœˆ';
    setTimeout(()=>{document.getElementById('loader').classList.add('hide');},500);},2200);
});

// Navbar scroll
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>30);
});

// Mobile menu
function toggleMenu(){document.getElementById('mobile-menu').classList.toggle('open');}

// WhatsApp tooltip auto-hide
setTimeout(()=>{const t=document.getElementById('wa-tooltip');if(t)t.style.display='none';},5000);

// Scroll reveal
const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Animated spot counter
let spots=38;
setInterval(()=>{if(spots>12&&Math.random()<.3){spots--;document.getElementById('spot-count').textContent=spots;}},8000);

// Waitlist submit
function submitWaitlist(){
  const name=document.getElementById('wl-name').value.trim();
  const email=document.getElementById('wl-email').value.trim();
  if(!name||!email){alert('Please enter your name and email to join the waitlist!');return;}
  document.getElementById('wl-form').style.display='none';
  document.getElementById('wl-success').style.display='block';
  // Decrement spots
  if(spots>1){spots--;document.getElementById('spot-count').textContent=spots;}
}
