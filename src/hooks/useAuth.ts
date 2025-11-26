'use client'
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

// The existing useAuth in AuthContext is fine, but this can be a convenience export
// to avoid importing useContext and AuthContext everywhere.
export { useAuth } from '@/context/AuthContext';
