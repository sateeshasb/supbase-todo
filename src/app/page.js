"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*').order('id', { ascending: true });
    if (!error) setTodos(data);
    else console.error('Fetch error:', error);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const { error } = await supabase.from('todos').insert([{ title: trimmed }]);
    if (error) console.error('Insert error:', error);
    setTitle('');
    fetchTodos();
  };

  const toggleComplete = async (id, is_complete) => {
    const { error } = await supabase.from('todos').update({ is_complete: !is_complete }).eq('id', id);
    if (error) console.error('Update error:', error);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) console.error('Delete error:', error);
    fetchTodos();
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#f3f4f6',
        color: '#111827',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem',   }}>
       TODO App
      </h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem',  }}>
        <input
          style={{
            border: '1px solid #d1d5db',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            width: '250px',
          }}
          placeholder="New Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 ,   width:'400px'}}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <span
              onClick={() => toggleComplete(todo.id, todo.is_complete)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.is_complete ? 'line-through' : 'none',
                color: todo.is_complete ? '#9ca3af' : '#111827',
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '1.2rem',
              
              }}
              onMouseOver={(e) => (e.target.style.color = '#b91c1c')}
              onMouseOut={(e) => (e.target.style.color = '#ef4444')}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
