const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
function toast(message){
 const el=$("#toast"); if(!el)return; el.textContent=message;el.classList.add("show");
 clearTimeout(window.toastTimeout);window.toastTimeout=setTimeout(()=>el.classList.remove("show"),2800);
}
function openModal(title,html){
 $("#modal-content").innerHTML=`<span class="kicker">TRIPGO</span><h2 id="modal-title">${title}</h2>${html}`;
 $("#modal").classList.add("show");$("#modal").setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
}
function closeModal(){ $("#modal").classList.remove("show");$("#modal").setAttribute("aria-hidden","true");document.body.classList.remove("modal-open"); }
function destinationCard(d){
 return `<article class="destination-card"><div class="card-image"><img src="${d.image}" alt="${d.name}" loading="lazy"><span>${d.category}</span></div><div class="card-body"><small>⌖ ${d.location}</small><h3>${d.name}</h3><p>${d.description}</p><div class="card-bottom"><strong>Mulai ${formatRupiah(d.price)}</strong><button class="text-button" data-detail="${d.id}">Lihat Detail ↗</button></div></div></article>`;
}
function renderDestinations(target,items){const el=$(target);if(el)el.innerHTML=items.length?items.map(destinationCard).join(""):'<div class="empty">Destinasi tidak ditemukan. Coba kata kunci lain.</div>';}
function detailModal(id){
 const d=DESTINATIONS.find(x=>x.id===Number(id));if(!d)return;
 openModal("Jelajahi "+d.name,`<img class="modal-photo" src="${d.image}" alt="${d.name}"><p>${d.description}</p><div class="modal-meta"><span>⌖ ${d.location}</span><span>◷ ${d.duration}</span></div><h3>Aktivitas menarik</h3><ul>${d.activities.map(x=>`<li>${x}</li>`).join("")}</ul><div class="modal-price">Mulai ${formatRupiah(d.price)} / orang</div><a class="btn primary full" href="pemesanan.html?destinasi=${d.id}">Pilih Destinasi Ini</a>`);
}
function renderPackages(){
 const el=$("#package-list");if(!el)return;
 el.innerHTML=PACKAGES.map(p=>`<article class="package-card"><span class="package-label">${p.id==="favorit"?"PALING POPULER":"PAKET PERJALANAN"}</span><h2>${p.name}</h2><p>${p.description}</p><strong class="package-price">${formatRupiah(p.price)} <small>/ orang</small></strong><hr><h4>Fasilitas</h4><ul>${p.features.map(f=>`<li>✓ ${f}</li>`).join("")}</ul><a class="btn primary full" href="pemesanan.html?paket=${p.id}">Pilih Paket</a></article>`).join("");
}
function setupBooking(){
 const form=$("#booking-form");if(!form)return;
 const dest=$("#booking-destination"),pack=$("#booking-package"),people=$("#booking-people"),date=$("#booking-date");
 dest.innerHTML=DESTINATIONS.map(d=>`<option value="${d.id}">${d.name}</option>`).join("");
 pack.innerHTML=PACKAGES.map(p=>`<option value="${p.id}">${p.name} — ${formatRupiah(p.price)}</option>`).join("");
 const params=new URLSearchParams(location.search);
 if(params.get("destinasi"))dest.value=params.get("destinasi");
 if(params.get("paket"))pack.value=params.get("paket");
 date.min=new Date().toISOString().split("T")[0];
 function update(){
  const p=PACKAGES.find(x=>x.id===pack.value);const n=Math.max(1,Math.min(20,Number(people.value)||1));
  $("#estimate-total").textContent=formatRupiah((p?.price||0)*n);
 }
 [dest,pack,people].forEach(el=>el.addEventListener("input",update));update();
 form.addEventListener("submit",e=>{
  e.preventDefault();
  const d=DESTINATIONS.find(x=>x.id===Number(dest.value));const p=PACKAGES.find(x=>x.id===pack.value);const n=Number(people.value);
  const order={code:"TG"+Date.now().toString().slice(-6),name:$("#booking-name").value.trim(),email:$("#booking-email").value.trim(),destination:d.name,package:p.name,date:date.value,people:n,total:p.price*n};
  const orders=JSON.parse(localStorage.getItem("tripgo_orders")||"[]");orders.push(order);localStorage.setItem("tripgo_orders",JSON.stringify(orders));
  openModal("Simulasi berhasil dikirim",`<div class="success-mark">✓</div><p>Terima kasih, <strong>${order.name}</strong>! Berikut ringkasan simulasi pemesananmu.</p><div class="receipt"><p>Kode simulasi <strong>${order.code}</strong></p><p>Destinasi <strong>${order.destination}</strong></p><p>Paket <strong>${order.package}</strong></p><p>Tanggal <strong>${order.date}</strong></p><p>Peserta <strong>${order.people} orang</strong></p><p class="receipt-total">Perkiraan total <strong>${formatRupiah(order.total)}</strong></p></div><p class="fine">Ini bukan tiket atau reservasi sungguhan. Tidak ada pembayaran yang dilakukan.</p><button class="btn primary full" data-close-modal>Tutup</button>`);
  form.reset();update();
 });
}
function setupSearch(){
 const input=$("#search-destination");if(!input)return;let category="Semua";
 const update=()=>{const q=input.value.toLowerCase().trim();renderDestinations("#destination-list",DESTINATIONS.filter(d=>(category==="Semua"||d.category===category)&&(d.name.toLowerCase().includes(q)||d.location.toLowerCase().includes(q)||d.description.toLowerCase().includes(q))));};
 input.addEventListener("input",update);
 $$(".filter").forEach(btn=>btn.addEventListener("click",()=>{$$(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");category=btn.dataset.filter;update();}));
 update();
}
document.addEventListener("click",e=>{
 const detail=e.target.closest("[data-detail]");if(detail)detailModal(detail.dataset.detail);
 const modalBtn=e.target.closest("[data-modal]");
 if(modalBtn){
  const type=modalBtn.dataset.modal;
  if(type==="cara")openModal("Cara Memesan",`<ol class="steps"><li>Pilih destinasi yang ingin dikunjungi.</li><li>Tentukan paket perjalanan dan jumlah peserta.</li><li>Isi formulir simulasi pemesanan.</li><li>Lihat ringkasan dan estimasi biaya.</li></ol><a class="btn primary full" href="destinasi.html">Mulai Jelajahi</a>`);
  if(type==="kalkulator")openModal("Kalkulator Cepat",`<label>Destinasi<select id="quick-dest">${DESTINATIONS.map(d=>`<option value="${d.id}">${d.name}</option>`).join("")}</select></label><label>Jumlah peserta<input id="quick-people" type="number" min="1" max="20" value="2"></label><div class="estimate"><span>Perkiraan biaya</span><strong id="quick-total"></strong></div><p class="fine">Perhitungan menggunakan harga awal destinasi per orang, bukan penawaran resmi.</p>`);
 }
 if(e.target.closest("[data-close-modal]"))closeModal();
});
document.addEventListener("input",e=>{
 if(e.target.id==="quick-dest"||e.target.id==="quick-people"){
  const d=DESTINATIONS.find(x=>x.id===Number($("#quick-dest").value));const n=Math.max(1,Math.min(20,Number($("#quick-people").value)||1));$("#quick-total").textContent=formatRupiah(d.price*n);
 }
});
document.addEventListener("DOMContentLoaded",()=>{
 $$(".year").forEach(el=>el.textContent=new Date().getFullYear());
 const toggle=$(".menu-toggle");toggle?.addEventListener("click",()=>$(".nav-links").classList.toggle("open"));
 $("#modal-close")?.addEventListener("click",closeModal);
 $("#modal")?.addEventListener("click",e=>{if(e.target.id==="modal")closeModal();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
 renderDestinations("#home-destinations",DESTINATIONS.slice(0,3));setupSearch();renderPackages();setupBooking();
 $("#contact-form")?.addEventListener("submit",e=>{e.preventDefault();openModal("Pesan diterima",`<div class="success-mark">✓</div><p>Terima kasih, ${$("#contact-name").value}! Pesan demo kamu berhasil diproses di halaman ini.</p><p class="fine">Karena website tidak menggunakan backend, pesan tidak dikirim ke email atau server.</p><button class="btn primary full" data-close-modal>Tutup</button>`);e.target.reset();});
});
