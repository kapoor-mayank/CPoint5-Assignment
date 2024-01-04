package com.example.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.Grocery;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface GroceryRepository extends JpaRepository<Grocery, Long>{
	
}