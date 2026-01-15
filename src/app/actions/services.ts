"use server"

import { db } from "@/server/db";
import { services } from "@/server/db/schema";
import { eq } from "drizzle-orm";

type NewService = typeof services.$inferInsert;


export const create_service = async (input: NewService) => {
  try {
    const res = await db.insert(services).values(input);
    // RETURN 
    // await db.insert(users).values({ name: "Dan" }).returning();

    console.log("🚀 ~ handleClick ~ res:", res)
  } catch (error) {
    console.log("🚀 ~ handleClick ~ error:", error)
  }
}

export const get_services = async () => {
  try {
    const res = await db.query.services.findMany();
    console.log("🚀 ~ handleClick ~ res:", res)
  } catch (error) {
    console.log("🚀 ~ handleClick ~ error:", error)
  }
}

export const get_service = async (id: string) => {
  try {
    const res = await db.select().from(services).where(eq(services.id, id));;
    console.log("🚀 ~ handleClick ~ res:", res)
  } catch (error) {
    console.log("🚀 ~ handleClick ~ error:", error)
  }
}


export const update_service = async (id: string, input: any) => {
  try {
    const updated = await db.update(services)
      .set(input)
      .where(eq(services.id, id))
      .returning();
    console.log("🚀 ~ constupdate_service= ~ updated:", updated)

  } catch (error) {
    console.log("🚀 ~ constupdate_service= ~ error:", error)

  }
}