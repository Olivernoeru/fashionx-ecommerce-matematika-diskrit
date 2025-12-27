import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { hashPassword, verifyPassword } from '@/lib/crypto/hash';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'fashionx_user';
const USERS_DB_KEY = 'fashionx_users_db';

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  phone?: string;
  address?: User['address'];
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error loading user:', e);
      }
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const getUsersDb = (): StoredUser[] => {
    const db = localStorage.getItem(USERS_DB_KEY);
    return db ? JSON.parse(db) : [];
  };

  const saveUsersDb = (users: StoredUser[]) => {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  };

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const users = getUsersDb();
    const storedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!storedUser) {
      toast({
        title: 'Login Gagal',
        description: 'Email tidak ditemukan',
        variant: 'destructive'
      });
      return false;
    }

    if (!verifyPassword(password, storedUser.passwordHash)) {
      toast({
        title: 'Login Gagal',
        description: 'Password salah',
        variant: 'destructive'
      });
      return false;
    }

    const { passwordHash, ...userWithoutPassword } = storedUser;
    setUser(userWithoutPassword);

    toast({
      title: 'Login Berhasil',
      description: `Selamat datang kembali, ${storedUser.name}!`
    });

    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    const users = getUsersDb();

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast({
        title: 'Registrasi Gagal',
        description: 'Email sudah terdaftar',
        variant: 'destructive'
      });
      return false;
    }

    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      passwordHash: hashPassword(password)
    };

    users.push(newUser);
    saveUsersDb(users);

    const { passwordHash, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);

    toast({
      title: 'Registrasi Berhasil',
      description: `Selamat datang, ${name}!`
    });

    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    toast({
      title: 'Logout Berhasil',
      description: 'Sampai jumpa lagi!'
    });
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);

    // Also update in DB
    const users = getUsersDb();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = { ...users[index], ...data };
      saveUsersDb(users);
    }

    toast({
      title: 'Profil Diperbarui',
      description: 'Data profil berhasil disimpan'
    });
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
