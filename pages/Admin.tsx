import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Plus, X } from 'lucide-react';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setMessage('Project added successfully!');
        setTitle('');
        setCategory('');
        setDescription('');
        setImage(null);
        setPreview(null);
      } else {
        setMessage('Error adding project.');
      }
    } catch (err) {
      setMessage('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-10 rounded-[2rem]">
        <h2 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
          <Plus className="text-yellow-400" /> Add New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-white/50 mb-2 uppercase tracking-widest">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/50 mb-2 uppercase tracking-widest">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. SCHOOL PROJECT, ART"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/50 mb-2 uppercase tracking-widest">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-yellow-400 outline-none transition-all resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/50 mb-2 uppercase tracking-widest">Project Image (JPG only)</label>
            <div className="relative group">
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                accept=".jpg,.jpeg"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer group-hover:border-yellow-400/50 transition-all overflow-hidden"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="text-white/20 mb-4 group-hover:text-yellow-400 transition-colors" size={48} />
                    <span className="text-white/40 group-hover:text-white transition-colors">Click to upload image</span>
                  </>
                )}
              </label>
              {preview && (
                <button
                  type="button"
                  onClick={() => { setImage(null); setPreview(null); }}
                  className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white shadow-lg"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}
            >
              {message}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-yellow-400 text-[#4a0404] font-bold rounded-2xl hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding Project...' : 'Save Project'}
          </button>
        </form>
      </div>
    </div>
  );
}
