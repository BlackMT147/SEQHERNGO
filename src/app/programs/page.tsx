import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Program {
  id: string;
  [key: string]: any;
}

async function getPrograms(): Promise<Program[]> {
  // Prevent build failure when Firestore is not configured (db === null)
  if (!db) {
    console.error('Firestore is not configured (db is null). Check env vars in Vercel.');
    return [];
  }

  const programsCol = collection(db, 'programs');
  const programSnapshot = await getDocs(programsCol);

  return programSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Program[];
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div>
      <h1>Programs</h1>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>{program.name || 'Untitled Program'}</li>
        ))}
      </ul>
    </div>
  );
}
