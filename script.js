const portfolio = [
  ['semanal','Festival da Carne','100% 0%'],['semanal','Semana do Hortifruti','0% 0%'],['varejo','Economia Todo Dia','0% 100%'],['semanal','Ofertas de Fim de Semana','100% 100%'],['varejo','Clube de Vantagens','0% 0%'],['sazonal','Black Friday','100% 0%'],['semanal','Especial Churrasco','100% 0%'],['varejo','Volta às Aulas','0% 100%'],['sazonal','Natal de Preços Baixos','0% 0%'],['varejo','Aniversário da Loja','100% 100%'],['semanal','Quarta da Economia','0% 100%'],['sazonal','Páscoa Especial','100% 0%']
];
const grid=document.querySelector('#portfolio-grid');
function showPortfolio(filter='all'){
  grid.innerHTML='';
  portfolio.forEach(([category,title,pos])=>{
    if(filter!=='all'&&filter!==category)return;
    const item=document.createElement('button');
    item.className='portfolio-item';item.dataset.title=title;item.dataset.category='campanha completa';item.dataset.pos=pos;
    item.innerHTML=`<div class="portfolio-art" style="--pos:${pos}"><small>ENCARTE · FEED · STORIES · WHATSAPP · BANNER</small><strong>${title}</strong></div>`;
    grid.appendChild(item);
  });
}
showPortfolio();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('[data-filter].active').classList.remove('active');button.classList.add('active');showPortfolio(button.dataset.filter)}));
const modal=document.querySelector('#portfolio-modal');
grid.addEventListener('click',e=>{const item=e.target.closest('.portfolio-item');if(!item)return;document.querySelector('#modal-art').style.cssText=`background-image:url('images/campanhas-portfolio.png');background-size:200% 200%;background-position:${item.dataset.pos}`;document.querySelector('#modal-category').textContent=item.dataset.category;document.querySelector('#modal-title').textContent=item.dataset.title;modal.classList.add('open');modal.setAttribute('aria-hidden','false')});
document.querySelector('.modal-close').onclick=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
modal.addEventListener('click',e=>{if(e.target===modal)document.querySelector('.modal-close').click()});

const comparisons=[
  {kicker:'FESTIVAL DA CARNE',title:'Preço que chama atenção.',price:'8',cents:'99',before:'8,99',pos:'100% 0%'},
  {kicker:'SEMANA DO HORTIFRUTI',title:'Frescor que salta da tela.',price:'3',cents:'49',before:'3,49',pos:'0% 0%'},
  {kicker:'CAFÉ DA MANHÃ',title:'Uma oferta bem servida.',price:'6',cents:'90',before:'6,90',pos:'0% 100%'},
  {kicker:'LIMPEZA EM OFERTA',title:'Destaque em cada detalhe.',price:'12',cents:'99',before:'12,99',pos:'100% 100%'}
];
let compareIndex=0;
const slider=document.querySelector('#compare-slider'),before=document.querySelector('#compare-before'),handle=document.querySelector('#compare-handle'),after=document.querySelector('#compare-after');
slider.addEventListener('input',()=>{before.style.width=`${slider.value}%`;handle.style.left=`${slider.value}%`});
const dots=document.querySelector('#compare-dots');
comparisons.forEach((_,i)=>{const dot=document.createElement('button');dot.setAttribute('aria-label',`Ver comparação ${i+1}`);dot.onclick=()=>renderComparison(i);dots.appendChild(dot)});
function renderComparison(index){
  compareIndex=(index+comparisons.length)%comparisons.length;const c=comparisons[compareIndex];
  document.querySelector('#after-kicker').textContent=c.kicker;document.querySelector('#after-title').textContent=c.title;document.querySelector('.compare-price b').textContent=c.price;document.querySelector('.compare-price sup').textContent=c.cents;document.querySelector('#before-price').textContent=c.before;document.querySelector('#compare-current').textContent=String(compareIndex+1).padStart(2,'0');after.style.setProperty('--compare-pos',c.pos);dots.querySelectorAll('button').forEach((d,i)=>d.classList.toggle('active',i===compareIndex));
}
document.querySelector('#compare-prev').onclick=()=>renderComparison(compareIndex-1);document.querySelector('#compare-next').onclick=()=>renderComparison(compareIndex+1);renderComparison(0);

const header=document.querySelector('#header');addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20));
document.querySelector('#menu-button').onclick=()=>document.querySelector('#mobile-menu').classList.toggle('hidden');document.querySelectorAll('#mobile-menu a').forEach(a=>a.onclick=()=>document.querySelector('#mobile-menu').classList.add('hidden'));
const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');addEventListener('mousemove',e=>{dot.style.left=ring.style.left=`${e.clientX}px`;dot.style.top=ring.style.top=`${e.clientY}px`});
document.querySelector('#year').textContent=new Date().getFullYear();window.addEventListener('load',()=>{AOS.init({once:true,offset:55,duration:650,easing:'ease-out-cubic'});setTimeout(()=>document.querySelector('#loader').classList.add('done'),400)});
