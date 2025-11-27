export interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'admin';
}

// Mock usuarios
export const mockUsers: { [key: string]: { email: string; password: string; name: string; id: string; role: 'citizen' | 'admin' } } = {
  'citizen@example.com': {
    email: 'citizen@example.com',
    password: 'password123',
    name: 'Usuario Ciudadano',
    id: '1',
    role: 'citizen',
  },
  'admin@example.com': {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Administrador',
    id: '2',
    role: 'admin',
  },
};

export function validateCredentials(email: string, password: string) {
  const user = mockUsers[email];
  if (user && user.password === password) {
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }
  return null;
}
