import apiClient from "./apiClient"

// User data interface
export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
  address: {
    city: string
    zipcode: string
  }
}

// User input for create/update
export interface UserInput {
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: {
    name: string
  }
  address: {
    city: string
    zipcode: string
  }
}

// Get all users - using async/await approach
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get("/users")
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error}`)
  }
}

// Get user by ID - using async/await approach
export const getUser = async (id: number): Promise<User> => {
  try {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch user ${id}: ${error}`)
  }
}

// Create new user - using async/await approach
export const createUser = async (userData: UserInput): Promise<User> => {
  try {
    const response = await apiClient.post("/users", userData)
    return response.data
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`)
  }
}

// Update user - using .then/.catch approach (alternative to async/await)
export const updateUser = (
  id: number,
  userData: Partial<UserInput>
): Promise<User> => {
  return apiClient
    .put(`/users/${id}`, userData)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(`Failed to update user ${id}: ${error}`)
    })
}

// Delete user - using .then/.catch approach (alternative to async/await)
export const deleteUser = (id: number): Promise<void> => {
  return apiClient
    .delete(`/users/${id}`)
    .then(() => {
      // Success - no need to return anything for delete
    })
    .catch((error) => {
      throw new Error(`Failed to delete user ${id}: ${error}`)
    })
}
