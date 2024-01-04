package com.example.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entities.Grocery;
import com.example.repositories.GroceryRepository;

@Service
public class GroceryServiceImpl implements GroceryService{

	@Autowired
	private GroceryRepository repository;
	@Override
	public void addGrocery(Grocery grocery_item) {
		// TODO Auto-generated method stub
		repository.save(grocery_item);
		
	}

	@Override
	public List<Grocery> getGroceries() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

}
