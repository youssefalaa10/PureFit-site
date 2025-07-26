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
  Droplets,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const drinkSchema = z.object({
  name: z.string().min(1, "Drink name is required"),
  category: z.string().min(1, "Category is required"),
  calories: z.string().min(1, "Calories is required"),
  sugar: z.string().min(1, "Sugar content is required"),
  caffeine: z.string().min(1, "Caffeine content is required"),
  description: z.string().min(1, "Description is required"),
  servingSize: z.string().min(1, "Serving size is required"),
  hydration: z.string().min(1, "Hydration level is required"),
});

type Drink = z.infer<typeof drinkSchema> & {
  id: string;
  createdAt: string;
};

const mockDrinks: Drink[] = [
  {
    id: "1",
    name: "Water",
    category: "Hydration",
    calories: "0",
    sugar: "0",
    caffeine: "0",
    description: "Pure water for optimal hydration",
    servingSize: "500ml",
    hydration: "High",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Green Tea",
    category: "Tea",
    calories: "2",
    sugar: "0",
    caffeine: "25",
    description: "Antioxidant-rich tea with moderate caffeine",
    servingSize: "250ml",
    hydration: "Medium",
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    name: "Protein Shake",
    category: "Supplement",
    calories: "120",
    sugar: "3",
    caffeine: "0",
    description: "Post-workout protein supplement",
    servingSize: "300ml",
    hydration: "Low",
    createdAt: "2024-01-17",
  },
];

export default function DrinksPage() {
  const [drinks, setDrinks] = useState<Drink[]>(mockDrinks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDrink, setEditingDrink] = useState<Drink | null>(null);

  const form = useForm<z.infer<typeof drinkSchema>>({
    resolver: zodResolver(drinkSchema),
    defaultValues: {
      name: "",
      category: "",
      calories: "",
      sugar: "",
      caffeine: "",
      description: "",
      servingSize: "",
      hydration: "",
    },
  });

  const filteredDrinks = drinks.filter((drink) => {
    const matchesSearch =
      drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || drink.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "Hydration",
    "Tea",
    "Coffee",
    "Juice",
    "Smoothie",
    "Supplement",
    "Energy",
    "Sports",
  ];

  const onSubmit = (values: z.infer<typeof drinkSchema>) => {
    if (editingDrink) {
      setDrinks(
        drinks.map((drink) =>
          drink.id === editingDrink.id ? { ...drink, ...values } : drink
        )
      );
      setEditingDrink(null);
    } else {
      const newDrink: Drink = {
        id: Date.now().toString(),
        ...values,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setDrinks([...drinks, newDrink]);
    }
    form.reset();
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setDrinks(drinks.filter((drink) => drink.id !== id));
  };

  const handleEdit = (drink: Drink) => {
    setEditingDrink(drink);
    form.reset(drink);
    setIsAddDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Hydration":
        return "bg-blue-100 text-blue-800";
      case "Tea":
        return "bg-green-100 text-green-800";
      case "Coffee":
        return "bg-amber-100 text-amber-800";
      case "Juice":
        return "bg-orange-100 text-orange-800";
      case "Smoothie":
        return "bg-purple-100 text-purple-800";
      case "Supplement":
        return "bg-pink-100 text-pink-800";
      case "Energy":
        return "bg-red-100 text-red-800";
      case "Sports":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getHydrationColor = (hydration: string) => {
    switch (hydration) {
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-red-100 text-red-800";
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
            <h1 className="text-3xl font-bold tracking-tight">Drinks</h1>
            <p className="text-muted-foreground">
              Manage your beverage database and track your hydration
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingDrink(null);
                  form.reset();
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Drink
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingDrink ? "Edit Drink" : "Add New Drink"}
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
                        <FormLabel>Drink Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter drink name" {...field} />
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
                            <Input placeholder="e.g., 500ml" {...field} />
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
                            placeholder="Enter drink description"
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
                            <Input placeholder="e.g., 0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sugar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sugar (g)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="caffeine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Caffeine (mg)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hydration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hydration Level</FormLabel>
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
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
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
                      {editingDrink ? "Update" : "Add"} Drink
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
              <CardTitle>Drink Database</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search drinks..."
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
                  <TableHead>Sugar</TableHead>
                  <TableHead>Caffeine</TableHead>
                  <TableHead>Hydration</TableHead>
                  <TableHead>Serving</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrinks.map((drink) => (
                  <TableRow key={drink.id}>
                    <TableCell className="font-medium">{drink.name}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(drink.category)}>
                        {drink.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{drink.calories} cal</TableCell>
                    <TableCell>{drink.sugar}g</TableCell>
                    <TableCell>{drink.caffeine}mg</TableCell>
                    <TableCell>
                      <Badge className={getHydrationColor(drink.hydration)}>
                        {drink.hydration}
                      </Badge>
                    </TableCell>
                    <TableCell>{drink.servingSize}</TableCell>
                    <TableCell>{drink.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(drink)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the drink "{drink.name}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(drink.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredDrinks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No drinks found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
