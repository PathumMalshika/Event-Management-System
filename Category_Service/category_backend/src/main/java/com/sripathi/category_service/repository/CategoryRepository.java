package com.sripathi.category_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sripathi.category_service.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}