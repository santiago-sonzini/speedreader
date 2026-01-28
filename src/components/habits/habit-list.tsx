'use client';

import { Habit } from "@/lib/mockData";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HabitChecklistProps {
  habits: Habit[];
  date: string;
  onToggle: (habitId: string) => void;
  onAddHabit: (name: string) => void;
}

export default function HabitChecklist({
  habits,
  date,
  onToggle,
  onAddHabit,
}: HabitChecklistProps) {
  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const [open, setOpen] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newHabit.trim()) return;

    onAddHabit(newHabit.trim());
    setNewHabit("");
    setOpen(false);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider opacity-40">
          Habits
        </span>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-xs uppercase tracking-wider border-gray-300 dark:border-gray-700 rounded-none"
            >
              + Add Habit
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-transparent border-none shadow-none">
            <Card className="border border-gray-300 dark:border-gray-700 rounded-none">
              <CardContent className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-sm uppercase tracking-wider">
                    New Habit
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block mb-2 text-xs uppercase tracking-wider opacity-40">
                      Habit Name
                    </label>
                    <Input
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      placeholder="e.g. Read 30 minutes"
                      className="rounded-none border-gray-300 dark:border-gray-700 uppercase tracking-wider text-sm"
                      autoFocus
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpen(false)}
                      className="text-xs uppercase tracking-wider"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="text-xs uppercase tracking-wider rounded-none"
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>

      {/* Status Bar */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1">
          <div className="h-8 border border-gray-300 dark:border-gray-700 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-black dark:bg-white transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="text-xs uppercase tracking-wider tabular-nums">
          {completedCount}/{totalCount}
          <span className="opacity-50 ml-2">[{percentage}%]</span>
        </div>
      </div>

      {/* Habit List */}
      <div className="space-y-1">
        {habits.map((habit) => (
          <label
            key={habit.id}
            className="flex items-center gap-4 p-3 border border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="relative w-5 h-5 flex-shrink-0">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => onToggle(habit.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 transition-all ${
                  habit.completed
                    ? "bg-black dark:bg-white border-black dark:border-white"
                    : "bg-transparent border-gray-300 dark:border-gray-700"
                }`}
              >
                {habit.completed && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-white dark:text-black"
                  >
                    <polyline points="4,10 8,14 16,6" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <span
                className={`text-sm uppercase tracking-wider transition-opacity ${
                  habit.completed ? "opacity-50" : "opacity-100"
                }`}
              >
                {habit.name}
              </span>
              <span className="text-xs opacity-30 uppercase tracking-wider">
                {date}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
