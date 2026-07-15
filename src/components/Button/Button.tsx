import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}
