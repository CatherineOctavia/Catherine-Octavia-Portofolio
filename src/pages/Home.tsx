import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Languages, GraduationCap, Utensils, PenTool } from 'lucide-react';
import profileImage from '../assets/Profil.jpeg';

interface Experience {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: string;
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => setExperiences(data));
  }, []);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'present': return <Languages className="text-yellow-400" size={24} />;
      case 'school project': return <Utensils className="text-yellow-400" size={24} />;
      case 'extracurricular': return <PenTool className="text-yellow-400" size={24} />;
      default: return <GraduationCap className="text-yellow-400" size={24} />;
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-medium mb-6 tracking-widest">
            你好! Welcome to my world
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6">
            Catherine <span className="text-yellow-400">Octavia</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 font-light tracking-wide">
            Chinese Language Enthusiast & High School Student
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-yellow-400 text-[#4a0404] font-bold rounded-xl hover:bg-yellow-300 transition-all transform hover:scale-105">
              Get in Touch
            </button>
            <Link 
              to="/portfolio"
              className="px-8 py-4 bg-white/5 text-white border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              View My Work
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="py-24 px-6 bg-[#3d0303]/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-4/5 rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src={profileImage}
                alt="Catherine Octavia" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-2xl flex items-center justify-center text-4xl font-serif text-[#4a0404] shadow-2xl">
              你好
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif text-white mb-8">About Me</h2>
            <p className="text-lg text-white/70 leading-relaxed mb-12">
              I am a student passionate about the Chinese language and culture. Currently, I am improving my Mandarin skills and deepening my cultural understanding. I am highly motivated to continue learning and to apply my language skills in real-world communication.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <Languages className="text-yellow-400 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-bold">Mandarin</h4>
                  <p className="text-white/50 text-sm">HSK 3 Certified</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <GraduationCap className="text-yellow-400 mt-1" size={24} />
                <div>
                  <h4 className="text-white font-bold">Education</h4>
                  <p className="text-white/50 text-sm">High School Student</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-white mb-4">Experience</h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto" />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-yellow-400/10 transition-colors">
                    {getIcon(exp.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <span className="text-yellow-400 font-medium text-sm">{exp.period}</span>
                    </div>
                    <p className="text-white/40 text-sm mb-4">{exp.organization}</p>
                    <p className="text-white/60 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
