"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import Rodal from "rodal"
import "rodal/lib/rodal.css"

type Category = {
  id: number
  name: string
}

type Food = {
  id: number
  image: string
  available: boolean
  name: string
  price: number
  describe: string
  category_id: number
}

export default function FoodPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [foods, setFoods] = useState<Food[]>([])
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  const [foodModalOpen, setFoodModalOpen] = useState(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [editId, setEditId] = useState<number | null>(null)

  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [available, setAvailable] = useState(false)
  const [price, setPrice] = useState(0)
  const [describe, setDescribe] = useState("")
  const [categoryId, setCategoryId] = useState<number>(0)

  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    getCategories()
    getFoods()
  }, [])

  const getCategories = async () => {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .order("id", { ascending: true })

    if (error) {
      console.log("Kategoriya olishda xatolik:", error)
      return
    }

    setCategories(data || [])
  }

  const getFoods = async () => {
    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .order("id", { ascending: true })

    if (error) {
      console.log("Ovqatlarni olishda xatolik:", error)
      return
    }

    setFoods(data || [])
  }

  const getFoodsByCategory = async (id: number) => {
    setActiveCategory(id)

    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .eq("category_id", id)
      .order("id", { ascending: true })

    if (error) {
      console.log("Kategoriya bo'yicha olishda xatolik:", error)
      return
    }

    setFoods(data || [])
  }

  const showAllFoods = () => {
    setActiveCategory(null)
    getFoods()
  }

  const clearFoodForm = () => {
    setImage("")
    setName("")
    setAvailable(false)
    setPrice(0)
    setDescribe("")
    setCategoryId(0)
    setEditId(null)
  }

  const openAddFoodModal = () => {
    clearFoodForm()
    setFoodModalOpen(true)
  }

  const closeFoodModal = () => {
    setFoodModalOpen(false)
    clearFoodForm()
  }

  const addFood = async () => {
    const newFood = {
      image,
      name,
      available,
      price: Number(price),
      describe,
      category_id: Number(categoryId),
    }

    const { error } = await supabase.from("foods").insert([newFood])

    if (error) {
      console.log("Qo'shishda xatolik:", error)
      return
    }

    closeFoodModal()

    if (activeCategory) {
      getFoodsByCategory(activeCategory)
    } else {
      getFoods()
    }
  }

  const openEdit = (food: Food) => {
    setEditId(food.id)
    setImage(food.image)
    setName(food.name)
    setAvailable(food.available)
    setPrice(food.price)
    setDescribe(food.describe)
    setCategoryId(food.category_id)
    setFoodModalOpen(true)
  }

  const updateFood = async () => {
    if (!editId) return

    const updatedFood = {
      image,
      name,
      available,
      price: Number(price),
      describe,
      category_id: Number(categoryId),
    }

    const { error } = await supabase
      .from("foods")
      .update(updatedFood)
      .eq("id", editId)

    if (error) {
      console.log("Yangilashda xatolik:", error)
      return
    }

    closeFoodModal()

    if (activeCategory) {
      getFoodsByCategory(activeCategory)
    } else {
      getFoods()
    }
  }

  const deleteFood = async (id: number) => {
    const { error } = await supabase.from("foods").delete().eq("id", id)

    if (error) {
      console.log("O'chirishda xatolik:", error)
      return
    }

    setFoods(foods.filter((food) => food.id !== id))
  }

  const handleFoodSubmit = () => {
    if (editId) {
      updateFood()
    } else {
      addFood()
    }
  }

  const openCategoryModal = () => {
    setCategoryName("")
    setCategoryModalOpen(true)
  }

  const closeCategoryModal = () => {
    setCategoryModalOpen(false)
    setCategoryName("")
  }

  const addCategory = async () => {
    const { data, error } = await supabase
      .from("category")
      .insert([{ name: categoryName }])
      .select()
      .single()

    if (error) {
      console.log("Kategoriya qo'shishda xatolik:", error)
      return
    }

    setCategories([...categories, data])
    closeCategoryModal()
  }

  return (
    <main className="min-h-screen bg-slate-50 px-8 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black text-slate-900">Menu</h1>

          <div className="flex gap-3">
            <button
              onClick={openCategoryModal}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700"
            >
              + Category
            </button>

            <button
              onClick={openAddFoodModal}
              className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white"
            >
              + Food
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={showAllFoods}
            className={`rounded-2xl px-5 py-2.5 text-sm font-bold ${
              activeCategory === null
                ? "bg-slate-950 text-white"
                : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            Hammasi
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => getFoodsByCategory(category.id)}
              className={`rounded-2xl px-5 py-2.5 text-sm font-bold ${
                activeCategory === category.id
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {foods.map((food) => (
            <div
              key={food.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative h-56">
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-full w-full object-cover"
                />

                <span
                  className={`absolute left-6 top-5 rounded-full px-4 py-1.5 text-sm font-bold ${
                    food.available
                      ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                      : "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
                  }`}
                >
                  {food.available ? "Mavjud" : "Mavjud emas"}
                </span>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 className="text-xl font-black text-slate-900">
                    {food.name}
                  </h2>

                  <p className="whitespace-nowrap text-lg font-black text-slate-900">
                    {Number(food.price).toLocaleString()} so'm
                  </p>
                </div>

                <p className="mb-8 line-clamp-2 text-base leading-7 text-slate-500">
                  {food.describe}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-400">
                    ID: f-{food.id}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openEdit(food)}
                      className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteFood(food.id)}
                      className="rounded-xl border border-rose-100 bg-rose-50 px-5 py-2.5 text-sm font-bold text-rose-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {foods.length === 0 && (
          <p className="mt-20 text-center text-slate-400">
            Bu kategoriyada mahsulot yo'q
          </p>
        )}
      </div>

      <Rodal
        visible={foodModalOpen}
        onClose={closeFoodModal}
        width={460}
        height={620}
        customStyles={{
          borderRadius: "24px",
          padding: "0",
        }}
      >
        <div className="p-7">
          <h2 className="mb-6 text-2xl font-black text-slate-900">
            {editId ? "Ovqatni tahrirlash" : "Yangi ovqat"}
          </h2>

          <div className="flex flex-col gap-4">
            <input
              placeholder="Rasm URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />

            <input
              placeholder="Ovqat nomi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />

            <input
              type="number"
              placeholder="Narxi"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value={0}>Kategoriya tanlang</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Ta'rif"
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
              className="h-24 resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
              Mavjud
            </label>

            <div className="mt-2 flex gap-3">
              <button
                onClick={closeFoodModal}
                className="flex-1 rounded-xl border border-slate-200 py-3 font-bold text-slate-600"
              >
                Bekor qilish
              </button>

              <button
                onClick={handleFoodSubmit}
                className="flex-1 rounded-xl bg-slate-950 py-3 font-bold text-white"
              >
                {editId ? "Saqlash" : "Qo'shish"}
              </button>
            </div>
          </div>
        </div>
      </Rodal>

      <Rodal
        visible={categoryModalOpen}
        onClose={closeCategoryModal}
        width={420}
        height={230}
        customStyles={{
          borderRadius: "24px",
          padding: "0",
        }}
      >
        <div className="p-7">
          <h2 className="mb-5 text-2xl font-black text-slate-900">
            Yangi kategoriya
          </h2>

          <input
            placeholder="Kategoriya nomi"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
          />

          <div className="flex gap-3">
            <button
              onClick={closeCategoryModal}
              className="flex-1 rounded-xl border border-slate-200 py-3 font-bold text-slate-600"
            >
              Bekor qilish
            </button>

            <button
              onClick={addCategory}
              className="flex-1 rounded-xl bg-slate-950 py-3 font-bold text-white"
            >
              Qo'shish
            </button>
          </div>
        </div>
      </Rodal>
    </main>
  )
}