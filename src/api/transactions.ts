const API_URL = import.meta.env.VITE_API_URL;
import type {
  Balance,
  Transaction,
  Category,
  DataOptions,
} from "../types/types";

export async function getTransactions(filters = {}): Promise<Transaction[]> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/api/transactions?${params}`);
  if (!res.ok) throw new Error(`Error loading transactions: ${res.status}`);
  return res.json();
}

export async function getBalance(filters = {}): Promise<Balance> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/api/stats/monthly?${params}`);
  if (!res.ok) throw new Error(`"Error loading balance ${res.status}`);
  return res.json();
}

export async function getYears(): Promise<number[]> {
  const res = await fetch(`${API_URL}/api/transactions/years`);
  if (!res.ok) throw new Error(`Error fetching years ${res.status}`);
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/categories`);
  if (!res.ok) throw new Error(`Error fetching categories ${res.status}`);
  return res.json();
}

export async function getTopCategories(filters = {}): Promise<DataOptions[]> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/api/stats/top-categories?${params}`);
  if (!res.ok) throw new Error(`Error fetching categories ${res.status}`);
  return res.json();
}

export async function getAllCategories(filters = {}): Promise<DataOptions[]> {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/api/stats/by-category?${params}`);
  if (!res.ok) throw new Error(`Error fetching categories ${res.status}`);
  return res.json();
}

export async function createTransaction(newItem: Transaction) {
  try {
    await fetch(`${API_URL}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
  } catch (error) {
    throw new Error(`Error adding transition ${error}`);
  }
}

export async function updateTransaction(item: Transaction) {
   try {
    await fetch(`${API_URL}/api/transactions/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  } catch (error) {
    throw new Error(`Error editing transition ${error}`);
  }
}