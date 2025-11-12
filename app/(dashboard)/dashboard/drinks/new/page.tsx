"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addDrink,
  fetchDrinks,
  selectIsAddingDrink,
  selectAddDrinkError,
} from "@/lib/slices/drinksSlice";

const drinkSchema = z.object({
  name: z.string().min(1, "Drink name is required"),
  calories: z.number().min(0, "Calories must be a positive number"),
  protein: z.number().min(0, "Protein must be a positive number"),
  fats: z.number().min(0, "Fats must be a positive number"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type DrinkFormData = z.infer<typeof drinkSchema>;

export default function NewDrinkPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAdding = useAppSelector(selectIsAddingDrink);
  const addError = useAppSelector(selectAddDrinkError);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [imageError, setImageError] = useState(false);

  const form = useForm<DrinkFormData>({
    resolver: zodResolver(drinkSchema),
    defaultValues: {
      name: "",
      calories: 0,
      protein: 0,
      fats: 0,
      image: "",
    },
  });

  const onSubmit = async (values: DrinkFormData) => {
    const result = await dispatch(
      addDrink({
        name: values.name,
        calories: values.calories,
        protein: values.protein,
        fats: values.fats,
        image: values.image || undefined,
      })
    );

    if (addDrink.fulfilled.match(result)) {
      await dispatch(fetchDrinks());
      setShowSuccessMessage(true);
      setTimeout(() => {
        router.push("/dashboard/drinks");
      }, 1500);
    }
  };

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
            onClick={() => router.push("/dashboard/drinks")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Drink</h1>
            <p className="text-muted-foreground">
              Add a new drink item to your beverage database
            </p>
          </div>
        </div>
      </motion.div>

      {addError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-md p-4"
        >
          <p className="text-red-800">{addError}</p>
        </motion.div>
      )}

      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-md p-4"
        >
          <p className="text-green-800">
            Drink added successfully! Redirecting...
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
            <CardTitle>Drink Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Image Preview */}
                {form.watch("image") && !imageError && (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={form.watch("image")}
                      alt="Drink preview"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Drink Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter drink name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/drink.jpg"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setImageError(false);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calories *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 110"
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
                  <FormField
                    control={form.control}
                    name="protein"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protein (g) *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 2"
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

                <FormField
                  control={form.control}
                  name="fats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fats (g) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 0"
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

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/drinks")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isAdding}>
                    {isAdding ? "Adding..." : "Add Drink"}
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
