import { create } from 'zustand'

interface Student {
  id: number
  fullname: string
  email: string
  phone: string
  password: string
}

interface StudentStore {
  students: Student[]
  isModalOpen: boolean
  editStudent: Student | null

  setStudents: (students: Student[]) => void
  openModal: () => void
  closeModal: () => void
  addStudent: (student: Student) => void
  deleteStudent: (id: number) => void
  updateStudent: (student: Student) => void
  setEditStudent: (student: Student | null) => void  
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  isModalOpen: false,
  editStudent: null,  

  setStudents: (students) => set({ students }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),

  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((s) => s.id !== id)
    })),

  updateStudent: (updated) =>
    set((state) => ({
      students: state.students.map((s) =>s.id === updated.id ? updated : s
      )
    })),

  setEditStudent: (student) => set({ editStudent: student }),  
}))