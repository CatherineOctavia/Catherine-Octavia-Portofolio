import { Mail, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2d0202] py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <h2 className="text-3xl font-serif text-white">Get in touch with me</h2>
        
        <div className="flex gap-8">
          <a href="mailto:octaviacatherine20@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Mail size={18} />
            </div>
            <span>octaviacatherine20@gmail.com</span>
          </a>
          <a href="https://instagram.com/turtle12313" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <Instagram size={18} />
            </div>
            <span>@turtle12313</span>
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex justify-between text-xs text-white/40 uppercase tracking-widest">
        <p>© 2026 Catherine Octavia. All rights reserved.</p>
        <p className="italic text-yellow-600/60">Made with passion for Chinese Culture</p>
      </div>
    </footer>
  );
}
