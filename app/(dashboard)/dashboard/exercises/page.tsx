"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Target,
  Dumbbell,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  fetchExercises,
  addExercise,
  editExercise,
  clearErrors,
  selectExercises,
  selectExercisesLoading,
  selectExercisesError,
  selectIsAddingExercise,
  selectAddExerciseError,
  selectIsEditingExercise,
  selectEditExerciseError,
  type Exercise,
} from "@/lib/slices/exercisesSlice";
import { AppDispatch } from "@/lib/store";

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

// Mock category ID for now - in a real app, this would come from the category selection
const MOCK_CATEGORY_ID = "670a36f16e468473ea13f948";

export default function ExercisesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const exercises = useSelector(selectExercises);
  const isLoading = useSelector(selectExercisesLoading);
  const error = useSelector(selectExercisesError);
  const isAdding = useSelector(selectIsAddingExercise);
  const addError = useSelector(selectAddExerciseError);
  const isEditing = useSelector(selectIsEditingExercise);
  const editError = useSelector(selectEditExerciseError);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [secondaryMusclesInput, setSecondaryMusclesInput] = useState("");
  const [instructionsInput, setInstructionsInput] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    dispatch(fetchExercises(MOCK_CATEGORY_ID));
  }, [dispatch]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (editingExercise) {
      form.reset({
        name: editingExercise.name,
        equipment: editingExercise.equipment,
        target: editingExercise.target,
        gifUrl: editingExercise.gifUrl,
        secondaryMuscles: editingExercise.secondaryMuscles,
        instructions: editingExercise.instructions,
      });
      setSecondaryMusclesInput(editingExercise.secondaryMuscles.join(", "));
      setInstructionsInput(editingExercise.instructions.join("\n"));
    }
  }, [editingExercise, form]);

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTarget =
      selectedTarget === "all" || exercise.target === selectedTarget;
    return matchesSearch && matchesTarget;
  });

  const targets = Array.from(new Set(exercises.map((ex) => ex.target)));

  const onSubmit = async (values: ExerciseFormData) => {
    const exerciseData = {
      ...values,
      secondaryMuscles: values.secondaryMuscles,
      instructions: values.instructions,
    };

    if (editingExercise) {
      await dispatch(
        editExercise({ exerciseId: editingExercise._id!, exerciseData })
      );
      setEditingExercise(null);
    } else {
      await dispatch(addExercise(exerciseData));
    }

    if (!addError && !editError) {
      form.reset();
      setSecondaryMusclesInput("");
      setInstructionsInput("");
      setIsAddDialogOpen(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsAddDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingExercise(null);
    form.reset();
    setSecondaryMusclesInput("");
    setInstructionsInput("");
    setIsAddDialogOpen(true);
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading exercises...</p>
        </div>
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Exercises</h1>
            <p className="text-muted-foreground">
              Manage your exercise library and track your workouts
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingExercise ? "Edit Exercise" : "Add New Exercise"}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exercise Name</FormLabel>
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
                          <FormLabel>Equipment</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., bodyweight, dumbbell"
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
                          <FormLabel>Target Muscle</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., pectorals, triceps"
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
                        <FormLabel>GIF URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter GIF URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="secondaryMuscles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Secondary Muscles (comma-separated)
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructions (one per line)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter instructions, one per line"
                            value={instructionsInput}
                            onChange={(e) =>
                              handleInstructionsChange(e.target.value)
                            }
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isAdding || isEditing}>
                      {isAdding || isEditing
                        ? "Saving..."
                        : editingExercise
                        ? "Update"
                        : "Add"}{" "}
                      Exercise
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {(error || addError || editError) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-md p-4"
        >
          <p className="text-red-800">{error || addError || editError}</p>
        </motion.div>
      )}

      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-md p-4"
        >
          <p className="text-green-800">
            Exercise {editingExercise ? "updated" : "added"} successfully!
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
            <div className="flex items-center justify-between">
              <CardTitle>Exercise Library</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select
                  value={selectedTarget}
                  onValueChange={setSelectedTarget}
                >
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Target" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Targets</SelectItem>
                    {targets.map((target) => (
                      <SelectItem key={target} value={target}>
                        {target}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
                {filteredExercises.map((exercise) => (
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
                            onClick={() => handleEdit(exercise)}
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
            {filteredExercises.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No exercises found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
