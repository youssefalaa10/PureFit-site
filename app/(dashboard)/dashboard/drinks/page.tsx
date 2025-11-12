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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchDrinks,
  selectDrinks,
  selectDrinksLoading,
  selectDrinksError,
  type Drink,
} from "@/lib/slices/drinksSlice";

export default function DrinksPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const drinks = useAppSelector(selectDrinks);
  const isLoading = useAppSelector(selectDrinksLoading);
  const error = useAppSelector(selectDrinksError);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  const filteredDrinks = drinks.filter((drink) => {
    const matchesSearch = drink.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDrinkClick = (drink: Drink) => {
    const drinkId = drink._id;
    if (drinkId) {
      router.push(`/dashboard/drinks/${drinkId}`);
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
            <h1 className="text-3xl font-bold tracking-tight">Drinks</h1>
            <p className="text-muted-foreground">
              Manage your beverage database and track your hydration
            </p>
          </div>
          <Link href="/dashboard/drinks/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Drink
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
                  <TableHead>Fats</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrinks.map((drink) => (
                  <TableRow
                    key={drink._id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleDrinkClick(drink)}
                  >
                    <TableCell>
                      {drink.image ? (
                        <div className="relative w-16 h-16 rounded overflow-hidden bg-muted">
                          <img
                            src={drink.image}
                            alt={drink.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded bg-muted flex items-center justify-center">
                          <Droplets className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{drink.name}</TableCell>
                    <TableCell>{drink.calories} cal</TableCell>
                    <TableCell>{drink.protein}g</TableCell>
                    <TableCell>{drink.fats || 0}g</TableCell>
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
                              handleDrinkClick(drink);
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
            {filteredDrinks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm
                  ? "No drinks found matching your search."
                  : "No drinks found. Add your first drink to get started."}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
