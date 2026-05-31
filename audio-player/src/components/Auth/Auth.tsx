import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, register, clearError } from '../../store/authSlice';
import styles from './Auth.module.scss';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      await dispatch(login({ username, password }));
    } else {
      await dispatch(register({ username, password }));
    }
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
    setUsername('');
    setPassword('');
  };

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/assets/images/icons/Mithosis.svg" alt="Mithosis" className={styles.logo} />
          <p className={styles.subtitle}>Audio Player</p>
        </div>
        
        <h2 className={styles.title}>
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>
        
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              required
              disabled={loading}
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>
        
        <button 
          className={styles.switchButton}
          onClick={handleSwitchMode}
          disabled={loading}
        >
          {isLogin 
            ? 'Нет аккаунта? Зарегистрироваться' 
            : 'Уже есть аккаунт? Войти'}
        </button>
      </div>
    </div>
  );
};

export default Auth;