import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      await emailjs.send(
        'service_7mbqrbm',
        'template_0ce974d',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'OIR7X9yXBMUSGGs_-'
      );

      setFormStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you as soon as possible.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'An error occurred while sending the message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 relative z-10">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1.5 text-left">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg 
              focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all
              text-slate-900 placeholder-slate-400 font-medium"
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1.5 text-left">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg 
              focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all
              text-slate-900 placeholder-slate-400 font-medium"
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1.5 text-left">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg 
              focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all
              text-slate-900 placeholder-slate-400 resize-none font-medium"
            placeholder="How can I help you?"
            disabled={isSubmitting}
          />
        </div>

        {formStatus.type && (
          <div className={`flex items-start gap-3 p-4 rounded-lg text-sm font-medium ${
            formStatus.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {formStatus.type === 'success' ? (
              <CheckCircle size={20} className="shrink-0" />
            ) : (
              <AlertCircle size={20} className="shrink-0" />
            )}
            <p>{formStatus.message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500
            transition-all rounded-lg font-bold text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40
            flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>Sending... <Loader2 className="animate-spin w-5 h-5" /></>
          ) : (
            <>Send Message <Send className="w-5 h-5" /></>
          )}
        </button>
      </form>
    </div>
  );
}