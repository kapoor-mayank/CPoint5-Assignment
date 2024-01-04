package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Grocery;
import com.example.services.GroceryService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/grocery")
public class GroceryController {
	
	private final GroceryService grocService;

	@Autowired
	public GroceryController(GroceryService grocService) {
		this.grocService = grocService;
	}
	
	@GetMapping("/getGroceries")
	public List<Grocery> getGroceries() {
		return grocService.getGroceries();
	}
	
	@PostMapping("/addGrocery")
	public void addGrocery(@RequestBody Grocery grocery_item) {
		grocService.addGrocery(grocery_item);
	}
}
