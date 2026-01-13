// Gallery data
const galleryImages = [
  { title: 'Fabric Collections', description: 'Extensive Range of Sarees', category: 'store' },
  { title: 'Store Interior', description: 'Premium Shopping Experience', category: 'store' },
  { title: 'Store View', description: 'Wide Collection Display', category: 'store' },
  { title: 'Shopping Area', description: 'Comfortable Browsing Space', category: 'store' },
  { title: 'Saree Collection', description: 'Traditional & Designer', category: 'collections' },
  { title: 'Traditional Wear', description: 'Kerala Kasavu Saree', category: 'wedding' },
  { title: 'Wedding Collection', description: 'Bridal Special', category: 'wedding' },
  { title: 'Festival Special', description: 'Vibrant Colors', category: 'collections' },
  { title: 'Traditional Elegance', description: 'Bridal Collection', category: 'wedding' }
];

let currentImageIndex = 0;

// Open lightbox
function openLightbox(index) {
  currentImageIndex = index;
  const modal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  // Get the clicked gallery item
  const galleryItems = document.querySelectorAll('.gallery-item');
  const clickedItem = galleryItems[index];
  const img = clickedItem.querySelector('img');
  
  // Display the actual image in lightbox
  lightboxImage.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-width: 100%; max-height: 80vh; border-radius: 12px;">`;
  lightboxCaption.innerHTML = `<strong>${galleryImages[index].title}</strong><br>${galleryImages[index].description}`;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Change image in lightbox
function changeImage(direction) {
  currentImageIndex += direction;
  
  // Loop around
  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }
  
  openLightbox(currentImageIndex);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('lightboxModal');
  if (modal.style.display === 'flex') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
  }
});
