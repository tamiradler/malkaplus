package malka.plus.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import malka.plus.controller.DishController;
import malka.plus.view.Dish;

@RestController
public class DishRestController 
{
	@Autowired
	private DishController dishController;
	
	@CrossOrigin
	@GetMapping("/dishes")
	public List<Dish> getDishes()
	{
		return dishController.getDishes();
	}
	
	@CrossOrigin
	@PostMapping("/dishes")
	public Dish addDish(@RequestBody Dish dish)
	{
		return dishController.addDish(dish);
	}
}
