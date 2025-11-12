"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
} from "@/lib/slices/categoriesSlice";
import {
  fetchExercises,
  editExercise,
  selectExercisesByCategory,
  selectIsEditingExercise,
  selectEditExerciseError,
  type Exercise,
} from "@/lib/slices/exercisesSlice";

const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  equipment: z.string().min(1, "Equipment is required"),
  target: z.string().min(1, "Target muscle is required"),
  gifUrl: z.string().url("Must be a valid URL"),
  secondaryMuscles: z
    .array(z.string())
    .min(1, "At least one secondary muscle is required"),
  instructions: z
    .array(z.string())
    .min(1, "At least one instruction is required"),
});

type ExerciseFormData = z.infer<typeof exerciseSchema>;

export default function EditExercisePage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;
  const exerciseId = params.exerciseId as string;

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoadingCategory = useAppSelector(selectCategoriesLoading);
  const isEditing = useAppSelector(selectIsEditingExercise);
  const editError = useAppSelector(selectEditExerciseError);
  const exercises = useAppSelector(selectExercisesByCategory(categoryId));

  const [secondaryMusclesInput, setSecondaryMusclesInput] = useState("");
  const [instructionsInput, setInstructionsInput] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const category = categories.find(
    (cat) => cat.id === categoryId || (cat as any)._id === categoryId
  );

  const exercise = exercises.find(
    (ex) => ex._id === exerciseId || ex.id?.toString() === exerciseId
  );

  const form = useForm<ExerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: "",
      equipment: "",
      target: "",
      gifUrl: "",
      secondaryMuscles: [],
      instructions: [],
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchExercises(categoryId));
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (exercise) {
      form.reset({
        name: exercise.name,
        equipment: exercise.equipment,
        target: exercise.target,
        gifUrl: exercise.gifUrl,
        secondaryMuscles: exercise.secondaryMuscles,
        instructions: exercise.instructions,
      });
      setSecondaryMusclesInput(exercise.secondaryMuscles.join(", "));
      setInstructionsInput(exercise.instructions.join("\n"));
    }
  }, [exercise, form]);

  const handleSecondaryMusclesChange = (value: string) => {
    const muscles = value
      .split(",")
      .map((muscle) => muscle.trim())
      .filter(Boolean);
    form.setValue("secondaryMuscles", muscles);
    setSecondaryMusclesInput(value);
  };

  const handleInstructionsChange = (value: string) => {
    const instructions = value.split("\n").filter(Boolean);
    form.setValue("instructions", instructions);
    setInstructionsInput(value);
  };

  const onSubmit = async (values: ExerciseFormData) => {
    const exerciseData = {
      ...values,
      secondaryMuscles: values.secondaryMuscles,
      instructions: values.instructions,
      categoryId: categoryId,
    };

    const result = await dispatch(
      editExercise({ exerciseId: exerciseId, exerciseData })
    );

    if (editExercise.fulfilled.match(result)) {
      // Refresh exercises list
      await dispatch(fetchExercises(categoryId));
      setShowSuccessMessage(true);
      setTimeout(() => {
        router.push(`/dashboard/categories/${categoryId}`);
      }, 1500);
    }
  };

  if (isLoadingCategory) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.push(`/dashboard/categories/${categoryId}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              Exercise not found
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push(`/dashboard/categories/${categoryId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Exercise</h1>
            <p className="text-muted-foreground">
              Edit exercise in{" "}
              <span className="font-semibold">
                {category?.programName || category?.workoutName || "Category"}
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      {editError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-md p-4"
        >
          <p className="text-red-800">{editError}</p>
        </motion.div>
      )}

      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-md p-4"
        >
          <p className="text-green-800">
            Exercise updated successfully! Redirecting...
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Exercise Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exercise Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter exercise name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="equipment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., bodyweight, dumbbell, barbell"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Muscle *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., pectorals, triceps, legs"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="gifUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GIF URL *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/exercise.gif"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {field.value && (
                        <div className="mt-2">
                          <img
                            src={field.value}
                            alt="Exercise preview"
                            className="w-32 h-32 object-cover rounded border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondaryMuscles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Secondary Muscles * (comma-separated)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., triceps, shoulders, core"
                          value={secondaryMusclesInput}
                          onChange={(e) =>
                            handleSecondaryMusclesChange(e.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Separate multiple muscles with commas
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructions * (one per line)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter instructions, one per line&#10;Example:&#10;Start in a push-up position&#10;Lower your body&#10;Push back up"
                          value={instructionsInput}
                          onChange={(e) =>
                            handleInstructionsChange(e.target.value)
                          }
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        Enter each instruction on a new line
                      </p>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      router.push(`/dashboard/categories/${categoryId}`)
                    }
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isEditing}>
                    {isEditing ? "Updating..." : "Update Exercise"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
