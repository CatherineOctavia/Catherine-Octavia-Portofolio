import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Globe, MessageSquare, PenTool, Book, Utensils, Languages } from 'lucide-react';
import projectImage from '../assets/Foto.jpeg';

interface Skill {
  id: number;
  name: string;
  percentage: number;
  icon: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
}

export default function Portfolio() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/skills').then(res => res.json()).then(data => setSkills(data));
    fetch('/api/projects').then(res => res.json()).then(data => setProjects(data));
  }, []);

  const getSkillIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('mandarin')) return <Globe size={24} className="text-yellow-400" />;
    if (n.includes('speaking')) return <MessageSquare size={24} className="text-yellow-400" />;
    if (n.includes('calligraphy')) return <PenTool size={24} className="text-yellow-400" />;
    if (n.includes('research')) return <Book size={24} className="text-yellow-400" />;
    if (n.includes('culinary')) return <Utensils size={24} className="text-yellow-400" />;
    return <Languages size={24} className="text-yellow-400" />;
  };

  return (
    <div className="pt-32 pb-24 px-6">
      {/* Skills Section */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-white mb-6">My <span className="text-yellow-400">Skills</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Developing a unique blend of linguistic skills and cultural understanding through dedicated study and practice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-xl">
                  {getSkillIcon(skill.name)}
                </div>
                <h4 className="text-white font-bold">{skill.name}</h4>
              </div>
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-yellow-400"
                />
              </div>
              <div className="flex justify-end mt-2">
                <span className="text-xs text-white/40 font-mono">{skill.percentage}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-white mb-6">Featured <span className="text-yellow-400">Projects</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Showcasing my academic explorations and creative pursuits in Chinese culture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden relative">
                <img
                  src={project.image_url || projectImage}
                  alt={project.title}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <span className="text-yellow-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-serif text-white mb-4 leading-tight">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-br from-yellow-400/20 to-transparent border border-yellow-400/30 p-12 rounded-[3rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400" />
          <h2 className="text-4xl font-serif text-white mb-6">Let's Connect</h2>
          <p className="text-white/70 mb-10 max-w-md mx-auto leading-relaxed">
            I'm always looking to learn more and collaborate on cultural projects.
          </p>
          <button className="px-10 py-4 bg-yellow-400 text-[#4a0404] font-bold rounded-2xl hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl shadow-yellow-400/10">
            Send me a message
          </button>
        </motion.div>
      </section>
    </div>
  );
}
