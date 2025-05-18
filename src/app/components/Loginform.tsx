'use client';

import React, { useState } from 'react';
import styles from '@/app/styles/loginForm.module.css';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try{
      const res = await fetch(`http://127.0.0.1:8001/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username ,password}),
      })

      const data = await res.json()

      if(!res.ok){
        throw new Error(data.detail || 'Login failed')
      }

      localStorage.setItem('jwt_access', data.access)
      localStorage.setItem('jwt_refresh', data.refresh)
      document.cookie = `jwt_access=${data.access}; path=/;`

      router.push('/home')
    } catch (err){
      alert('YOur username/password are incorrect!')
      console.error(err)
    }
  }


  return (
    <form className={styles.form} onSubmit={onLogin}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      
      <div className={styles.inputGroup}>
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button
        type="submit"
        className={styles.loginButton}
      >
        LOGIN
      </button>
    </form>
  );
}