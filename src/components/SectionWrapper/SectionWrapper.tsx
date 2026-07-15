"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './SectionWrapper.module.css';

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]!.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`${styles.section} ${isVisible ? styles.visible : ''} ${className || ''}`}
    >
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
}
