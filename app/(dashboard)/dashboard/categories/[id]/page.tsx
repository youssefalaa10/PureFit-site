"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
  Category,
} from "@/lib/slices/categoriesSlice";

const categoryScheme = z.object({
  thumbnail: z.string().min(1, "Thumbnail URL is required"),
  programName: z.string().min(1, "Program name is required"),
  workoutName: z.string().min(1, "Workout name is required"),
  timeOf_FullProgram: z.string().min(1, "Time is required"),
  level: z.string().min(1, "Level is required"),
  burnedCalories: z.number().min(1, "Calories must be at least 1"),
  exercises: z
    .array(
      z.object({
        name: z.string().min(1, "Exercise name is required"),
        duration: z.string().min(1, "Duration is required"),
        caloriesBurned: z.number().min(1, "Calories burned must be at least 1"),
      })
    )
    .min(1, "At least one exercise is required"),
});

type CategoryFormData = z.infer<typeof categoryScheme>;

export default function CategoryDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const [isEditMode, setIsEditMode] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [previewImageError, setPreviewImageError] = useState(false);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);

  const category = categories.find(
    (cat) => cat.id === categoryId || (cat as any)._id === categoryId
  );

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryScheme),
    defaultValues: {
      thumbnail: "",
      programName: "",
      workoutName: "",
      timeOf_FullProgram: "",
      level: "",
      burnedCalories: 0,
      exercises: [
        {
          name: "",
          duration: "",
          caloriesBurned: 0,
        },
      ],
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (category && !isEditMode) {
      form.reset({
        thumbnail: category.thumbnail || "",
        programName: category.programName || "",
        workoutName: category.workoutName || "",
        timeOf_FullProgram: category.timeOf_FullProgram || "",
        level: category.level || "Beginner",
        burnedCalories: category.burnedCalories || 0,
        exercises: category.exercises || [],
      });
    }
  }, [category, isEditMode, form]);

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const onSubmit = (values: CategoryFormData) => {
    // Handle edit (not implemented in API yet)
    console.log("Edit functionality not implemented", values);
    setIsEditMode(false);
  };

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

  const addExercise = () => {
    const currentExercises = form.getValues("exercises");
    form.setValue("exercises", [
      ...currentExercises,
      { name: "", duration: "", caloriesBurned: 0 },
    ]);
  };

  const removeExercise = (index: number) => {
    const currentExercises = form.getValues("exercises");
    if (currentExercises.length > 1) {
      form.setValue(
        "exercises",
        currentExercises.filter((_, i) => i !== index)
      );
    }
  };

  if (isLoading) {
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
                View and edit category information
              </p>
            </div>
          </div>
          {!isEditMode && (
            <Button onClick={() => setIsEditMode(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Category
            </Button>
          )}
        </div>
      </motion.div>

      {!isEditMode ? (
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
                      <p className="text-lg">
                        {category.exercises?.length || 0} exercises
                      </p>
                    </div>
                  </div>
                </div>

                {/* Exercises List */}
                {category.exercises && category.exercises.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">
                      Exercises
                    </label>
                    <div className="space-y-3">
                      {category.exercises.map((exercise, index) => (
                        <Card key={index}>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg">
                                  {index + 1}. {exercise.name}
                                </h4>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {exercise.duration}
                                  </div>
                                  <div className="flex items-center">
                                    <Flame className="mr-1 h-3 w-3 text-orange-500" />
                                    {exercise.caloriesBurned} cal
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Edit Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter thumbnail URL"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setPreviewImageError(false);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        {field.value && !previewImageError && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden mt-2 bg-muted">
                            <Image
                              src={field.value}
                              alt="Thumbnail preview"
                              fill
                              className="object-cover"
                              onError={() => setPreviewImageError(true)}
                              unoptimized
                            />
                          </div>
                        )}
                        {field.value && previewImageError && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden mt-2 bg-muted flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                              Invalid image URL
                            </p>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="programName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter program name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workoutName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Workout Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter workout name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="timeOf_FullProgram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 40 minutes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {levels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="burnedCalories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Calories Burned</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 400"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel>Exercises</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addExercise}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Exercise
                      </Button>
                    </div>

                    {form.watch("exercises").map((_, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Exercise {index + 1}</h4>
                          {form.watch("exercises").length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeExercise(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`exercises.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Exercise name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`exercises.${index}.duration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., 10 minutes"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`exercises.${index}.caloriesBurned`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Calories</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="e.g., 100"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditMode(false);
                        setPreviewImageError(false);
                        if (category) {
                          form.reset({
                            thumbnail: category.thumbnail || "",
                            programName: category.programName || "",
                            workoutName: category.workoutName || "",
                            timeOf_FullProgram:
                              category.timeOf_FullProgram || "",
                            level: category.level || "Beginner",
                            burnedCalories: category.burnedCalories || 0,
                            exercises: category.exercises || [],
                          });
                        }
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Update Category</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
