// Data contoh destinasi dan paket TripGo. Silakan ubah sesuai kebutuhan.
const DESTINATIONS = [
 {id:1,name:"Bali",category:"Pantai",location:"Bali",price:1500000,duration:"3 hari 2 malam",image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900",description:"Nikmati pantai tropis, panorama sawah, budaya, dan suasana Pulau Dewata.",activities:["Menikmati pantai","Wisata budaya","Berburu kuliner"]},
 {id:2,name:"Labuan Bajo",category:"Alam",location:"Nusa Tenggara Timur",price:2500000,duration:"3 hari 2 malam",image:"https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=900",description:"Jelajahi gugusan pulau, laut jernih, dan pemandangan alam yang memukau.",activities:["Wisata pulau","Menikmati panorama","Wisata bahari"]},
 {id:3,name:"Yogyakarta",category:"Budaya",location:"DI Yogyakarta",price:1200000,duration:"2 hari 1 malam",image:"https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=900",description:"Kenali warisan budaya, bangunan bersejarah, dan kuliner khas Yogyakarta.",activities:["Wisata sejarah","Wisata budaya","Kuliner lokal"]},
 {id:4,name:"Raja Ampat",category:"Pantai",location:"Papua Barat Daya",price:4500000,duration:"4 hari 3 malam",image:"https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=900",description:"Kagumi gugusan pulau dan keindahan bawah laut di timur Indonesia.",activities:["Wisata bahari","Menikmati pulau","Fotografi alam"]},
 {id:5,name:"Bromo",category:"Alam",location:"Jawa Timur",price:1800000,duration:"2 hari 1 malam",image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",description:"Saksikan lanskap pegunungan dan panorama matahari terbit.",activities:["Menikmati sunrise","Wisata alam","Fotografi"]},
 {id:6,name:"Bandung",category:"Alam",location:"Jawa Barat",price:950000,duration:"2 hari 1 malam",image:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=900",description:"Nikmati udara sejuk, wisata alam, dan berbagai pilihan kuliner.",activities:["Wisata alam","Belanja","Kuliner"]}
];
const PACKAGES = [
 {id:"hemat",name:"Paket Hemat",description:"Pilihan praktis untuk perjalanan singkat.",price:950000,features:["Transportasi lokal","Akomodasi 1 malam","Pemandu wisata"]},
 {id:"favorit",name:"Paket Favorit",description:"Pengalaman seimbang dengan fasilitas lebih lengkap.",price:1500000,features:["Transportasi lokal","Akomodasi 2 malam","Pemandu wisata","Tiket objek wisata"]},
 {id:"premium",name:"Paket Premium",description:"Perjalanan nyaman dengan layanan tambahan.",price:2300000,features:["Transportasi pilihan","Akomodasi nyaman","Pemandu wisata","Tiket objek wisata","Dokumentasi perjalanan"]}
];
const formatRupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
