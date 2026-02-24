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

export async function createTransaction( newItem: Transaction ): Promise<Transaction> {
  const response = await fetch(`${API_URL}/api/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      data.message ?? `Error adding transaction (${response.status})`,
    );
  }

  return response.json();
}

export async function updateTransaction(item: Transaction): Promise<Transaction> {
  const response = await fetch(`${API_URL}/api/transactions/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      data.message ?? `Error editing transaction (${response.status})`,
    );
  }

  return response.json();
}

export async function deleteTransaction(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/transactions/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      data.message ?? `Error delete transition (${response.status})`,
    );
  }
}

export async function createCategory(newItem: Category): Promise<Category> {
  const response = await fetch(`${API_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      data.message ?? `Error adding category (${response.status})`,
    );
  }

  return response.json();
}

export async function updateCategory(item: Category): Promise<Category> {
  const response = await fetch(`${API_URL}/api/categories/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      data.message ?? `Error editing category (${response.status})`,
    );
  }

  return response.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      data.message ?? `Error deleting category (${response.status})`,
    );
  }
}
