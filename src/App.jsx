import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LeadForm from "./components/LeadForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white py-4 px-6 shadow">
        <h1 className="text-2xl font-bold">LeadFlow</h1>
        <p className="text-sm text-blue-200">Lead Management System</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex gap-8">
        <LeadForm />
      </main>
    </div>
  );
}

export default App;
