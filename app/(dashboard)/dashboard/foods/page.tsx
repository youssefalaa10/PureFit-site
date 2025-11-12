"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchFoods,
  selectFoods,
  selectFoodsLoading,
  selectFoodsError,
  type Food,
} from "@/lib/slices/foodsSlice";

export default function FoodsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectFoods);
  const isLoading = useAppSelector(selectFoodsLoading);
  const error = useAppSelector(selectFoodsError);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchFoods());
  }, [dispatch]);

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleFoodClick = (food: Food) => {
    const foodId = food._id;
    if (foodId) {
      router.push(`/dashboard/foods/${foodId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
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
            <h1 className="text-3xl font-bold tracking-tight">Foods</h1>
            <p className="text-muted-foreground">
              Manage your nutrition database and track your meals
            </p>
          </div>
          <Link href="/dashboard/foods/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Food
            </Button>
          </Link>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-md p-4"
        >
          <p className="text-red-800">{error}</p>
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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Calories</TableHead>
                  <TableHead>Protein</TableHead>
                  <TableHead>Carbs</TableHead>
                  <TableHead>Fat</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFoods.map((food) => (
                  <TableRow
                    key={food._id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleFoodClick(food)}
                  >
                    <TableCell>
                      {food.image ? (
                        <div className="relative w-16 h-16 rounded overflow-hidden bg-muted">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                          <Apple className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{food.name}</TableCell>
                    <TableCell>{food.calories} cal</TableCell>
                    <TableCell>{food.protein}g</TableCell>
                    <TableCell>{food.carbs || 0}g</TableCell>
                    <TableCell>{food.fat || 0}g</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFoodClick(food);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            View/Edit
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
                {searchTerm
                  ? "No foods found matching your search."
                  : "No foods found. Add your first food to get started."}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
