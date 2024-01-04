package com.example.services;

import java.util.List;

import com.example.entities.Grocery;

public interface GroceryService {
	void addGrocery(Grocery grocery_item);
	List<Grocery> getGroceries();
}
