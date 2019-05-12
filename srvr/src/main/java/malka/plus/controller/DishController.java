package malka.plus.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.maps.DishModelToViewMapper;
import malka.plus.maps.DishViewToModelMapper;
import malka.plus.repository.DishRepository;
import malka.plus.view.Dish;

@Controller
public class DishController 
{
	@Autowired
	private DishRepository dishRepo;
	
	@Autowired
	private DishModelToViewMapper dishModelToViewMapper;
	
	@Autowired
	private DishViewToModelMapper dishViewToModelMapper;
	
	public List<Dish> getDishes()
	{
		List<Dish> dishes = new ArrayList<Dish>();
		dishModelToViewMapper.apply(dishRepo.findAll(), dishes, Dish.class);
		return dishes;
	}
	
	public Dish addDish(Dish dish)
	{
		malka.plus.model.Dish dishModel = new malka.plus.model.Dish();
		dishViewToModelMapper.apply(dish, dishModel);
		dishRepo.save(dishModel);
		return dish;
	}
}
