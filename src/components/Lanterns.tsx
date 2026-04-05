import { motion } from 'motion/react';

export default function Lanterns() {
  const lanterns = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {lanterns.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: '110vh', 
            x: `${Math.random() * 100}vw`,
            opacity: 0.2 + Math.random() * 0.4,
            scale: 0.5 + Math.random() * 0.5
          }}
          animate={{ 
            y: '-10vh',
            x: `${(Math.random() - 0.5) * 20 + 50}vw`
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute w-8 h-10 bg-orange-500/30 rounded-sm blur-[1px]"
          style={{
            boxShadow: '0 0 15px 5px rgba(249, 115, 22, 0.2)',
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%)'
          }}
        />
      ))}
    </div>
  );
}
