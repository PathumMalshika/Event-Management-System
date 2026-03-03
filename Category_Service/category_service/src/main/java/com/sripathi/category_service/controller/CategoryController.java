package com.sripathi.category_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.sripathi.category_service.model.Category;
import com.sripathi.category_service.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService service;

    @PostMapping
    public Category create(@RequestBody Category category) {
        return service.createCategory(category);
    }

    @GetMapping
    public List<Category> getAll() {
        return service.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id) {
        return service.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id,
                           @RequestBody Category category) {
        return service.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteCategory(id);
        return "Category deleted successfully";
    }
}