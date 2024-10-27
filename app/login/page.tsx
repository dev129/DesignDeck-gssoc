"use client"
import { useUser } from '@/context/UserContext';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState, FormEvent, useEffect } from 'react';
import { User } from '@/context/UserContext';

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidden, setHidden] = useState(true);

  const { user, setUser, loggedIn, setLoggedIn } = useUser();

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const data = {
      username: username,
      email: email,
      password: password
    }

    try {
      const response = await fetch("http://localhost:3000/api/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      const userData: User = {
        id: result.data.id,
        username: result.data.username
      }

      setUser(userData);
      setLoggedIn(true);
      console.log('Success:', result);
      router.push("/");

    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <div className="relative">
                <input
                type={hidden ? "password" : "text"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                />
                <button className="absolute right-2 top-0 h-full p-2" onClick={()=>setHidden(!hidden)}>
                    {
                        hidden ? <EyeOff /> : <Eye />
                    }
                </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-semibold transition duration-300"
          >
            Log in
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
