import { useEffect, useState } from 'react';

export function ViewportBadge() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-[60] rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
      {size.width} x {size.height}
    </div>
  );
}
