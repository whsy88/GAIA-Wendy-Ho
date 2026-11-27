import React, { useState, useEffect } from 'react';

const images = [
  { id: 1, src: 'https://picsum.photos/id/1018/600/400', title: 'Mountain Landscape' },
  { id: 2, src: 'https://picsum.photos/id/1015/600/400', title: 'River & Valley' },
  { id: 3, src: 'https://picsum.photos/id/1019/600/400', title: 'Ocean Waves' },
  { id: 4, src: 'https://picsum.photos/id/1039/600/400', title: 'Waterfall' },
];

export default function ImageGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
      <h2>Image Gallery</h2>
      <p>Use <b>Arrow Keys</b> to navigate, <b>Space</b> to toggle fullscreen, <b>Escape</b> to close.</p>

      <div style={{ margin: '20px 0' }}>
        <img
          src={images[selectedIndex].src}
          alt={images[selectedIndex].title}
          style={{ width: '500px', height: '350px', borderRadius: '8px', cursor: 'pointer', objectFit: 'cover' }}
          onClick={() => setIsFullscreen(true)}
        />
        <p>{images[selectedIndex].title}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {images.map((img, index) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.title}
            onClick={() => setSelectedIndex(index)}
            style={{
              width: '80px',
              height: '60px',
              borderRadius: '4px',
              cursor: 'pointer',
              objectFit: 'cover',
              border: selectedIndex === index ? '3px solid #007bff' : '2px solid transparent',
            }}
          />
        ))}
      </div>

      {isFullscreen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setIsFullscreen(false)}
        >
          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].title}
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
}