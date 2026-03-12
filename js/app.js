// â”€â”€ Loader â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const msgs=['Loading demo data...','Setting up properties...','Fetching bookings...','Almost ready...','Welcome to Airly! âœˆ'];
let mi=0;const mel=document.getElementById('ld-msg');
const mint=setInterval(()=>{mi=(mi+1)%msgs.length;mel.textContent=msgs[mi];},480);
window.addEventListener('load',()=>{setTimeout(()=>{clearInterval(mint);mel.textContent='Welcome to Airly! âœˆ';setTimeout(()=>{document.getElementById('loader').classList.add('hide');},500);},2200);});

// â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function goTo(page, el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(el) el.classList.add('active');
  else {
    document.querySelectorAll('.nav-item').forEach(n=>{
      if(n.onclick&&n.onclick.toString().includes("'"+page+"'")){n.classList.add('active');}
    });
  }
  document.getElementById('main-content').scrollTop=0;
  window.scrollTo({top:0,behavior:'instant'});
  if(window.innerWidth<768) document.getElementById('sidebar').classList.remove('open');
}

// â”€â”€ Sidebar mobile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');}

// â”€â”€ Modals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-overlay').forEach(m=>{m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');});});

// â”€â”€ Tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function activateTab(el){el.closest('.booking-tabs').querySelectorAll('.b-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');}
function activateSettingTab(el){el.closest('.settings-nav').querySelectorAll('.sn-item').forEach(t=>t.classList.remove('active'));el.classList.add('active');}

// â”€â”€ Toggles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function toggleSwitch(el){el.classList.toggle('on');showToast(el.classList.contains('on')?'âœ… Setting enabled':'Setting disabled');}

// â”€â”€ Toast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function showToast(msg, type=''){
  const wrap=document.getElementById('toast-wrap');
  const t=document.createElement('div');
  t.className='toast'+(type?' '+type:'');
  t.textContent=msg;
  wrap.appendChild(t);
  setTimeout(()=>t.remove(),3000);
}

// â”€â”€ Add Property â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function addProperty(){
  closeModal('modal-add-prop');
  showToast('ðŸ  Property added & iCal sync started!','success');
}

// â”€â”€ Add Booking â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function addBooking(){
  closeModal('modal-add-booking');
  showToast('ðŸ“… Manual booking added successfully!','success');
}

// â”€â”€ Nearby cleaner filter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function filterCleaners(el, filter){

  el.closest('.nearby-filter')
    .querySelectorAll('.nf-btn')
    .forEach(b => b.classList.remove('active'));

  el.classList.add('active');

  const msgs = {
    all: 'ðŸ“ Showing all 5 cleaners nearby',
    avail: 'âœ… Showing 3 available cleaners',
    rating4: 'â­ Showing 4 cleaners rated 4â˜…+',
    km2: 'ðŸ“ Showing 2 cleaners within 2km'
  };

}

// â”€â”€ Highlight cleaner from map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function highlightCleaner(id){
  document.querySelectorAll('.cleaner-card').forEach(c=>c.classList.remove('highlighted'));
  const el=document.getElementById('cc-'+id);
  if(el){el.classList.add('highlighted');el.scrollIntoView({behavior:'smooth',block:'nearest'});}
}

// â”€â”€ Check URL hash â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const hash=window.location.hash.replace('#','');
if(hash&&document.getElementById('page-'+hash)){goTo(hash,null);}
