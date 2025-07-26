"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Apple,
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

const foodSchema = z.object({
  name: z.string().min(1, "Food name is required"),
  category: z.string().min(1, "Category is required"),
  calories: z.string().min(1, "Calories is required"),
  protein: z.string().min(1, "Protein is required"),
  carbs: z.string().min(1, "Carbs is required"),
  fat: z.string().min(1, "Fat is required"),
  description: z.string().min(1, "Description is required"),
  servingSize: z.string().min(1, "Serving size is required"),
});

type Food = z.infer<typeof foodSchema> & {
  id: string;
  createdAt: string;
};

const mockFoods: Food[] = [
  {
    id: "1",
    name: "Grilled Chicken Breast",
    category: "Protein",
    calories: "165",
    protein: "31",
    carbs: "0",
    fat: "3.6",
    description: "Lean protein source, perfect for muscle building",
    servingSize: "100g",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Brown Rice",
    category: "Grains",
    calories: "111",
    protein: "2.6",
    carbs: "23",
    fat: "0.9",
    description: "Complex carbohydrates for sustained energy",
    servingSize: "100g",
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    name: "Broccoli",
    category: "Vegetables",
    calories: "34",
    protein: "2.8",
    carbs: "7",
    fat: "0.4",
    description: "Nutrient-rich vegetable high in fiber and vitamins",
    servingSize: "100g",
    createdAt: "2024-01-17",
  },
];

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>(mockFoods);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);

  const form = useForm<z.infer<typeof foodSchema>>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: "",
      category: "",
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
      description: "",
      servingSize: "",
    },
  });

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "Protein",
    "Grains",
    "Vegetables",
    "Fruits",
    "Dairy",
    "Nuts",
    "Oils",
    "Supplements",
  ];

  const onSubmit = (values: z.infer<typeof foodSchema>) => {
    if (editingFood) {
      setFoods(
        foods.map((food) =>
          food.id === editingFood.id ? { ...food, ...values } : food
        )
      );
      setEditingFood(null);
    } else {
      const newFood: Food = {
        id: Date.now().toString(),
        ...values,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setFoods([...foods, newFood]);
    }
    form.reset();
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    form.reset(food);
    setIsAddDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Protein":
        return "bg-red-100 text-red-800";
      case "Grains":
        return "bg-yellow-100 text-yellow-800";
      case "Vegetables":
        return "bg-green-100 text-green-800";
      case "Fruits":
        return "bg-orange-100 text-orange-800";
      case "Dairy":
        return "bg-blue-100 text-blue-800";
      case "Nuts":
        return "bg-amber-100 text-amber-800";
      case "Oils":
        return "bg-purple-100 text-purple-800";
      case "Supplements":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Foods</h1>
            <p className="text-muted-foreground">
              Manage your nutrition database and track your meals
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingFood(null);
                  form.reset();
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Food
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingFood ? "Edit Food" : "Add New Food"}
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
                        <FormLabel>Food Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter food name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
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
                      name="servingSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Serving Size</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 100g" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter food description"
                            {...field}
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
                          <FormLabel>Calories</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 165" {...field} />
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
                          <FormLabel>Protein (g)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 31" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="carbs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carbs (g)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 23" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fat (g)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 3.6" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingFood ? "Update" : "Add"} Food
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Food Database</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search foods..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
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
                  <TableHead>Category</TableHead>
                  <TableHead>Calories</TableHead>
                  <TableHead>Protein</TableHead>
                  <TableHead>Carbs</TableHead>
                  <TableHead>Fat</TableHead>
                  <TableHead>Serving</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFoods.map((food) => (
                  <TableRow key={food.id}>
                    <TableCell className="font-medium">{food.name}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(food.category)}>
                        {food.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{food.calories} cal</TableCell>
                    <TableCell>{food.protein}g</TableCell>
                    <TableCell>{food.carbs}g</TableCell>
                    <TableCell>{food.fat}g</TableCell>
                    <TableCell>{food.servingSize}</TableCell>
                    <TableCell>{food.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(food)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(food.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredFoods.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No foods found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
