"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Clock,
  Flame,
  Target,
  Plus,
  Trash2,
  Dumbbell,
  Play,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
  Category,
} from "@/lib/slices/categoriesSlice";
import {
  fetchExercises,
  selectExercisesByCategory,
  selectExercisesLoading,
  type Exercise as FullExercise,
} from "@/lib/slices/exercisesSlice";

export default function CategoryDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const [imageError, setImageError] = useState(false);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoadingCategory = useAppSelector(selectCategoriesLoading);
  const isLoadingExercises = useAppSelector(selectExercisesLoading);
  const exercises = useAppSelector(selectExercisesByCategory(categoryId));

  const category = categories.find(
    (cat) => cat.id === categoryId || (cat as any)._id === categoryId
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchExercises(categoryId));
    }
  }, [categoryId, dispatch]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTargetColor = (target: string) => {
    const colors = {
      pectorals: "bg-red-100 text-red-800",
      triceps: "bg-blue-100 text-blue-800",
      biceps: "bg-green-100 text-green-800",
      shoulders: "bg-purple-100 text-purple-800",
      back: "bg-orange-100 text-orange-800",
      core: "bg-yellow-100 text-yellow-800",
      legs: "bg-indigo-100 text-indigo-800",
    };
    return colors[target as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (isLoadingCategory) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/dashboard/categories")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Button>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              Category not found
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard/categories")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {category.programName || "Category Details"}
              </h1>
              <p className="text-muted-foreground">
                View and manage exercises in this category
              </p>
            </div>
          </div>
          <Link href={`/dashboard/categories/${categoryId}/exercises/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Category Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Thumbnail */}
              {category.thumbnail && !imageError ? (
                <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={category.thumbnail}
                    alt={category.programName || "Category thumbnail"}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                </div>
              ) : (
                <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>No thumbnail available</p>
                  </div>
                </div>
              )}

              {/* Category Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Program Name
                  </label>
                  <p className="text-lg font-semibold mt-1">
                    {category.programName || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Workout Name
                  </label>
                  <p className="text-lg font-semibold mt-1">
                    {category.workoutName || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Duration
                  </label>
                  <div className="flex items-center mt-1">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <p className="text-lg">
                      {category.timeOf_FullProgram || "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Level
                  </label>
                  <div className="mt-1">
                    <Badge
                      className={getLevelColor(category.level || "Unknown")}
                    >
                      {category.level || "Unknown"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Calories Burned
                  </label>
                  <div className="flex items-center mt-1">
                    <Flame className="mr-2 h-4 w-4 text-orange-500" />
                    <p className="text-lg">
                      {category.burnedCalories || 0} cal
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Total Exercises
                  </label>
                  <div className="flex items-center mt-1">
                    <Target className="mr-2 h-4 w-4 text-blue-500" />
                    <p className="text-lg">{exercises.length} exercises</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Exercises List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Exercises in this Category</CardTitle>
              <Link href={`/dashboard/categories/${categoryId}/exercises/new`}>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exercise
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingExercises ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : exercises.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No exercises found in this category.</p>
                <Link
                  href={`/dashboard/categories/${categoryId}/exercises/new`}
                >
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Exercise
                  </Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Secondary Muscles</TableHead>
                    <TableHead>Instructions</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exercises.map((exercise) => (
                    <TableRow key={exercise._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Play className="h-4 w-4 text-muted-foreground" />
                          <span>{exercise.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Dumbbell className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{exercise.equipment}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTargetColor(exercise.target)}>
                          <Target className="mr-1 h-3 w-3" />
                          {exercise.target}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {exercise.secondaryMuscles.map((muscle, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {exercise.instructions[0]}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/dashboard/categories/${categoryId}/exercises/${exercise._id}/edit`
                                )
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
