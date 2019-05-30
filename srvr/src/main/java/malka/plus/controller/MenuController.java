package malka.plus.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import malka.plus.authentication.Authentication;
import malka.plus.maps.DishModelToViewMapper;
import malka.plus.maps.MenuModelToViewMapper;
import malka.plus.maps.MenuViewToModelMapper;
import malka.plus.model.DishItem;
import malka.plus.repository.MenuRepository;
import malka.plus.view.Dish;
import malka.plus.view.Menu;

@Controller
public class MenuController 
{
	@Autowired
	private MenuRepository menuRepository;
	
	@Autowired
	private MenuModelToViewMapper menuModelToViewMapper;
	
	@Autowired
	private MenuViewToModelMapper menuViewToModelMapper;
	
	@Autowired
	private Authentication authentication;
	
	public List <Menu> getMenus() 
	{
		List <Menu> menus = new ArrayList<>();
		menuModelToViewMapper.apply(menuRepository.findAll(), menus, Menu.class);
		return menus;
	}

	public Menu addMenu(Menu menu, String authTokenId) 
	{
		authentication.authenticatAndGetUser(authTokenId, "admin", "menuEditor");
		
		malka.plus.model.Menu menuModel = new malka.plus.model.Menu();
		menuViewToModelMapper.apply(menu, menuModel);
		menuRepository.save(menuModel);
		return menu;
	}

	public Menu getMenus(String id) 
	{
		malka.plus.model.Menu menuModel = menuRepository.findById(id).orElse(new malka.plus.model.Menu());
		Menu menu = new Menu();
		menuModelToViewMapper.apply(menuModel, menu);
		return menu;
	}
	
	public List<String> getDistinctSubjects()
	{
		List <String> subjects = new ArrayList<String>();
		
		List <malka.plus.model.Menu> menusModels = menuRepository.findAll();
		for (malka.plus.model.Menu menu : menusModels) 
		{
			if(menu.getDishs() != null)
			{
				List<malka.plus.model.Dish> dishesModels = menu.getDishs();
				for (malka.plus.model.Dish dish : dishesModels) 
				{
					if(!subjects.contains(dish.getSubject()))
					{
						subjects.add(dish.getSubject());
					}
				}
			}
		}
		
		return subjects;
	}
	
	public List<String> getDistinctDishes()
	{
		List <malka.plus.model.Menu> menusModels = menuRepository.findAll();
		List <String> dishes = new ArrayList<String>();
		
		for (malka.plus.model.Menu menu : menusModels) 
		{
			if(menu.getDishs() != null)
			{
				List<malka.plus.model.Dish> dishesModels = menu.getDishs();
				for (malka.plus.model.Dish dish : dishesModels) 
				{
					List<DishItem> dishItems = dish.getDishItems();
					for (DishItem dishItem : dishItems) 
					{
						if(!dishes.contains(dishItem.getSubject()))
						{
							dishes.add(dishItem.getSubject());
						}
					}
				}
			}
		}
		return dishes;
	}
}
