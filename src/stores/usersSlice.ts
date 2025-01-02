import { StateCreator } from "zustand"
import { User } from "../types"
import { getUsers } from "../services/UsersServices"

export type UsersSliceType = {
    users: User[]
    fetchUsers: () => Promise<void>
   
}


export const createUsersSlice : StateCreator<UsersSliceType> = (set) => ({
    users: [],
    fetchUsers: async () => {
        const response = await getUsers()
        set({
            users: response?.data || []
        })
    },
    
})