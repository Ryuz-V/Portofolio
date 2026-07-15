"use client";
import { useState } from 'react';
import styles from './Contact.module.css';
import Button from '../Button/Button';
import SectionWrapper from '../SectionWrapper/SectionWrapper';

export default function Contact() {
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  return (
    <SectionWrapper id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className={styles.title}>Get In <span className="text-gradient">Touch</span></h2>
          <p className={styles.description}>
            I'm currently looking for new opportunities. Whether you have a question, 
            a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className={styles.contactDetails}>
            <div className={styles.detailItem}>
              <div className={styles.icon}>✉</div>
              <div className={styles.detailText}>
                <span>Email</span>
                <a href="mailto:hello@example.com">hello@example.com</a>
              </div>
            </div>
            <div className={styles.detailItem}>
              <div className={styles.icon}>📍</div>
              <div className={styles.detailText}>
                <span>Location</span>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required placeholder="John Doe" />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required placeholder="john@example.com" />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" required rows={5} placeholder="Your message here..."></textarea>
          </div>
          
          <Button variant="primary" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </Button>

          {status === 'success' && (
            <p className={styles.successMessage}>Message sent successfully!</p>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
}
