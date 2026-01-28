'use server'

import { db } from "@/server/db"

export type ApiResponse<T = any> = {
    data: T | null
    status: number
    message: string
  }



/* ---------------- CREATE ---------------- */

export async function createHabit(
  userId: string,
  input: {
    name: string
    description?: string
    color?: string
    icon?: string
    goalPerDay?: number
  }
): Promise<ApiResponse> {
  try {
    const habit = await db.habit.create({
      data: {
        ...input,
        userId,
      },
    })


    return {
      data: habit,
      status: 201,
      message: 'Habit created successfully',
    }
  } catch (error) {
    console.error('CREATE HABIT ERROR:', error)

    return {
      data: null,
      status: 500,
      message: 'Failed to create habit',
    }
  }
}

/* ---------------- READ (ALL) ---------------- */

export async function getHabits(
  userId: string
): Promise<ApiResponse> {
  try {
    const habits = await db.habit.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      data: habits,
      status: 200,
      message: 'Habits fetched successfully',
    }
  } catch (error) {
    console.error('GET HABITS ERROR:', error)

    return {
      data: null,
      status: 500,
      message: 'Failed to fetch habits',
    }
  }
}

/* ---------------- READ (ONE) ---------------- */

export async function getHabitById(
  habitId: string,
  userId: string
): Promise<ApiResponse> {
  try {
    const habit = await db.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
      include: {
        entries: {
          orderBy: { date: 'desc' },
          take: 30,
        },
      },
    })

    if (!habit) {
      return {
        data: null,
        status: 404,
        message: 'Habit not found',
      }
    }

    return {
      data: habit,
      status: 200,
      message: 'Habit fetched successfully',
    }
  } catch (error) {
    console.error('GET HABIT ERROR:', error)

    return {
      data: null,
      status: 500,
      message: 'Failed to fetch habit',
    }
  }
}

/* ---------------- UPDATE ---------------- */

export async function updateHabit(
  habitId: string,
  userId: string,
  input: {
    name?: string
    description?: string
    color?: string
    icon?: string
    goalPerDay?: number
    isActive?: boolean
  }
): Promise<ApiResponse> {
  try {
    const habit = await db.habit.updateMany({
      where: {
        id: habitId,
        userId,
      },
      data: input,
    })

    if (habit.count === 0) {
      return {
        data: null,
        status: 404,
        message: 'Habit not found or not authorized',
      }
    }


    return {
      data: true,
      status: 200,
      message: 'Habit updated successfully',
    }
  } catch (error) {
    console.error('UPDATE HABIT ERROR:', error)

    return {
      data: null,
      status: 500,
      message: 'Failed to update habit',
    }
  }
}

/* ---------------- DELETE (SOFT DELETE) ---------------- */

export async function deleteHabit(
  habitId: string,
  userId: string
): Promise<ApiResponse> {
  try {
    const habit = await db.habit.updateMany({
      where: {
        id: habitId,
        userId,
      },
      data: {
        isActive: false,
      },
    })

    if (habit.count === 0) {
      return {
        data: null,
        status: 404,
        message: 'Habit not found or not authorized',
      }
    }


    return {
      data: true,
      status: 200,
      message: 'Habit deleted successfully',
    }
  } catch (error) {
    console.error('DELETE HABIT ERROR:', error)

    return {
      data: null,
      status: 500,
      message: 'Failed to delete habit',
    }
  }
}
