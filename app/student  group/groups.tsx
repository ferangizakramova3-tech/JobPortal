"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Group = {
  id: number
  name: string
  active: boolean
}

type Student = {
  id: number
  fullname: string
  age: number
  email: string
  active: boolean
  group_id: number
}

function groups() {
const [groupModalOpen, setGroupModalOpen] = useState(false)
const [groupName, setGroupName] = useState("")
const [groups, setGroups] = useState<Group[]>([])
const [students, setStudents] = useState<Student[]>([])
const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null)
const [search, setSearch] = useState("")

useEffect(() => {
  getGroups()
}, [])

const getGroups = async () => {
  const { data, error } = await supabase.from("groups").select("*").order("id", { ascending: true })

  if (error) {
    console.log("Guruhlarni olishda xatolik:", error)
    return
  }

  setGroups(data || [])


}
const filteredGroups = groups.filter((group) =>
  group.name.toLowerCase().includes(search.toLowerCase())
)

const getStudentsByGroup = async (groupId: number) => {
  setSelectedGroupId(groupId)

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("group_id", groupId)
    .order("id", { ascending: true })

  if (error) {
    console.log("O'quvchilarni olishda xatolik:", error)
    return
  }

  setStudents(data || [])
}

const addGroup = async () => {
  const { data, error } = await supabase
    .from("groups")
    .insert([{ name: groupName, active: false }])
    .select()
    .single()

  if (error) {
    console.log("Guruh qo'shishda xatolik:", error)
    return
  }

  setGroups([...groups, data])
  setGroupName("")
  setGroupModalOpen(false)
}
  return (
    <div>
        <main className="min-h-screen bg-slate-100 p-8">
  <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6">
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="h-16 w-16 rounded-2xl border bg-white"></div>

      <input
        placeholder="search by group name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-96 rounded-xl border px-4 py-3"
      />

      <div className="flex gap-4">
 <button
  onClick={() => setGroupModalOpen(true)}
  className="rounded-xl border px-5 py-3"
>
  add group
</button>

        <button className="rounded-xl border px-5 py-3">
          add student
        </button>
      </div>
    </div>
  </div>
</main>

<div className="mb-8 grid grid-cols-3 gap-6">
  {filteredGroups.map((group) => (
    <div
      key={group.id}
     onClick={() => getStudentsByGroup(group.id)}
      className={`cursor-pointer rounded-3xl border bg-white p-8 shadow-sm ${
        selectedGroupId === group.id ? "border-blue-400" : "border-slate-200"
      }`}
    >
      <h2 className="text-center text-4xl font-bold">{group.name}</h2>

      <p className="mt-2 text-center text-xl text-slate-500">
        students
      </p>

      <div className="mt-6 flex justify-end">
        <div
          className={`h-8 w-14 rounded-full p-1 ${
            group.active ? "bg-blue-500" : "bg-slate-300"
          }`}
        >
          <div
            className={`h-6 w-6 rounded-full bg-white ${
              group.active ? "ml-6" : ""
            }`}
          />
        </div>
      </div>
    </div>
  ))}
</div>
<table className="w-full">
  <thead>
    <tr>
      <th className="p-4 text-left">N°</th>
      <th className="p-4 text-left">Fullname</th>
      <th className="p-4 text-left">Age</th>
      <th className="p-4 text-left">Email</th>
      <th className="p-4 text-left">Active</th>
      <th className="p-4 text-left">Actions</th>
    </tr>
  </thead>

  <tbody>
    {students.map((student, index) => (
      <tr key={student.id}>
        <td className="p-4">{index + 1}</td>
        <td className="p-4">{student.fullname}</td>
        <td className="p-4">{student.age}</td>
        <td className="p-4">{student.email}</td>
        <td className="p-4">
          <input type="checkbox" checked={student.active} readOnly />
        </td>
        <td className="p-4">
          <button className="mr-3 text-red-500">Delete</button>
          <button className="text-blue-500">Edit</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
{groupModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40">
    <div className="w-96 rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-2xl font-bold">Add group</h2>

      <input
        placeholder="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="mb-4 w-full rounded-xl border px-4 py-3"
      />

      <button
        onClick={addGroup}
        className="rounded-xl bg-black px-5 py-3 text-white"
      >
        Save
      </button>
    </div>
  </div>
)}
    </div>
  )
}

export default groups